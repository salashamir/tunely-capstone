"use client";

import useOnPlay from "@/hooks/useOnPlay";
import { useEffect } from "react";
import { useUser } from "@/hooks/useUser";
import { Song } from "@/types";
import { useRouter } from "next/navigation";
import MediaItem from "@/components/MediaItem";
import LikeButton from "@/components/LikeButton";

interface LikedListProps {
  songs: Song[];
}

const LikedList: React.FC<LikedListProps> = ({ songs }) => {
  const onPlay = useOnPlay(songs);
  const { isLoading, user } = useUser();
  const router = useRouter();

  //   redirect user if not logged in
  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/");
    }
  }, [isLoading, user, router]);

  //   view for is user has no favorited songs
  if (songs.length === 0) {
    return (
      <div className="flex flex-col gap-y-3 w-full px-6 text-gray-500">
        No liked songs!
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-y-3 w-full p-6">
      {songs.map((song) => (
        <div key={song.id} className="flex items-center gap-x-4 w-full">
          <div className="flex-1">
            <MediaItem onClick={(id: string) => onPlay(id)} data={song} />
          </div>
          <LikeButton songId={song.id} />
        </div>
      ))}
    </div>
  );
};

export default LikedList;
