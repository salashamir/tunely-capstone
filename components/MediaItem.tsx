"use client";

import useLoadImage from "@/hooks/useLoadImage";
import { Song } from "@/types";
import Image from "next/image";
import usePlayer from "@/hooks/usePlayer";

interface MediaItemProps {
  data: Song;
  onClick?: (id: string) => void;
}

const MediaItem: React.FC<MediaItemProps> = ({ data, onClick }) => {
  // get img url
  const imageUrl = useLoadImage(data);
  const player = usePlayer();

  const handleClick = () => {
    if (onClick) {
      return onClick(data.id);
    }
    // default turn on player
    return player.setId(data.id);
  };
  return (
    <div
      onClick={handleClick}
      className="flex items-center gap-x-3 cursor-pointer hover:bg-neutral-300 w-full p-2 rounded-md"
    >
      <div className="relative rounded-md min-h-[48px] min-w-[48px] overflow-hidden">
        <Image
          alt="Media item"
          className="object-cover"
          fill
          src={imageUrl || "/images/ambientt.jpeg"}
        />
      </div>
      <div className="flex flex-col gap-y-1 overflow-hidden">
        <p className="text-gray-900 truncate">{data.title}</p>
        <p className="text-gray-500 text-sm truncate">{data.author}</p>
      </div>
    </div>
  );
};

export default MediaItem;
