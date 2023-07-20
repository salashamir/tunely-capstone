"use client";

import { Song } from "@/types";
import { LuListMusic } from "react-icons/lu";
import { AiOutlinePlus } from "react-icons/ai";
import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import useUploadModal from "@/hooks/useUploadModal";
import MediaItem from "./MediaItem";
import useOnPlay from "@/hooks/useOnPlay";

interface LibraryProps {
  songs: Song[];
}

const Library: React.FC<LibraryProps> = ({ songs }) => {
  const authModal = useAuthModal();
  const uploadModal = useUploadModal();
  const onPlay = useOnPlay(songs);
  const { user } = useUser();

  const onClick = () => {
    // check whether logged in or not
    if (!user) {
      return authModal.onOpen();
    }

    return uploadModal.onOpen();
  };
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between px-5 pt-4">
        <div className="inline-flex items-center gap-x-2">
          <LuListMusic className="text-neutral-800" size={26} />
          <p className="text-neutral-800 font-medium text-md">Your Songs</p>
        </div>
        <AiOutlinePlus
          size={20}
          className="text-neutral-900 cursor-pointer hover:text-neutral-500 transition"
          onClick={onClick}
        />
      </div>
      <div className="flex flex-col text-black gap-y-2 mt-4 px-3">
        {songs.map((item) => (
          <MediaItem
            key={item.id}
            data={item}
            onClick={(id: string) => onPlay(id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Library;
