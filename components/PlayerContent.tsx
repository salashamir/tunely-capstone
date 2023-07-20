"use client";

import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { PiSpeakerSlashBold, PiSpeakerHighBold } from "react-icons/pi";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";
import { Song } from "@/types";
import LikeButton from "./LikeButton";
import MediaItem from "./MediaItem";
import Slider from "./Slider";
import usePlayer from "@/hooks/usePlayer";
import { useEffect, useState } from "react";
import { isDataView } from "util/types";
import useSound from "use-sound";

interface PlayerContentProps {
  song: Song;
  songUrl: string;
}

const PlayerContent: React.FC<PlayerContentProps> = ({ song, songUrl }) => {
  const player = usePlayer();
  const [vol, setVol] = useState(1);
  const [playing, setPlaying] = useState(false);
  const Icon = playing ? BsPauseFill : BsPlayFill;
  const VolumeIcon = vol !== 0 ? PiSpeakerHighBold : PiSpeakerSlashBold;

  //   functionf for skippign forward ot next track in playlsit
  const playNext = () => {
    if (player.ids.length === 0) {
      return;
    }

    // get index in playlist list of current song
    const currIdx = player.ids.findIndex((id) => id === player.activeId);
    // get next song
    const nextSong = player.ids[currIdx + 1];

    // check that it exists, you havent gone out of bounds; if you have, then reset fromt he beginnning
    if (!nextSong) {
      return player.setId(player.ids[0]);
    }

    player.setId(nextSong);
  };

  //   fucntion for pressing back button
  const playPrev = () => {
    // check that there even is a playlsit
    if (player.ids.length === 0) {
      return;
    }

    // get index in playlist list of current song
    const currIdx = player.ids.findIndex((id) => id === player.activeId);
    // get next song
    const prevSong = player.ids[currIdx - 1];

    // check that it exists, you havent gone out of bounds; if you have, then reset from the last song in the arr
    if (!prevSong) {
      return player.setId(player.ids[player.ids.length - 1]);
    }

    player.setId(prevSong);
  };

  //   get hook to play sound: returns play function, obj w pause and sound
  const [play, { pause, sound }] = useSound(songUrl, {
    volume: vol,
    onplay: () => setPlaying(true),
    onend: () => {
      setPlaying(false);
      playNext();
    },
    onpause: () => setPlaying(false),
    format: ["mp3"],
  });

  //   useeffect to automatically play song whent he component loads
  useEffect(() => {
    sound?.play();

    return () => {
      sound?.unload();
    };
  }, [sound]);

  const handlePlay = () => {
    if (!playing) {
      play();
    } else {
      pause();
    }
  };

  //   handling mute
  const toggleVolMute = () => {
    if (vol === 0) {
      setVol(1);
    } else {
      setVol(0);
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 h-full">
      <div className="flex w-full justify-start">
        <div className="flex gap-x-4 items-center">
          <MediaItem data={song} />
          <LikeButton songId={song.id} />
        </div>
      </div>
      <div className="flex md:hidden col-auto w-full justify-end items-center">
        <div
          onClick={handlePlay}
          className="h-10 flex w-10 justify-center items-center bg-pink-400 drop-shadow-sm rounded-full p-1 cursor-pointer"
        >
          <Icon size={30} className="text-gray-99" />
        </div>
      </div>
      <div className="hidden md:flex h-full items-center justify-center w-full gap-x-6 max-w-[722px]">
        <AiFillStepBackward
          onClick={playPrev}
          size={30}
          className="text-gray-900 cursor-pointer transition hover:text-pink-700"
        />
        <div
          onClick={handlePlay}
          className="items-center flex justify-center h-10 w-10 bg-pink-400 rounded-full p-1 cursor-pointer"
        >
          <Icon size={30} className="text-gray-900" />
        </div>
        <AiFillStepForward
          size={30}
          onClick={playNext}
          className="text-gray-900 cursor-pointer transition hover:text-pink-700"
        />
      </div>

      <div className="hidden md:flex w-full justify-end pr-2">
        <div className="flex gap-x-2 w-[120px] items-center">
          <VolumeIcon
            onClick={toggleVolMute}
            size={30}
            className="cursor-pointer"
          />
          <Slider value={vol} onChange={(value) => setVol(value)} />
        </div>
      </div>
    </div>
  );
};

export default PlayerContent;
