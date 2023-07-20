import getLikedSongs from "@/actions/getLikedSongs";
import Header from "@/components/Header";
import Image from "next/image";
import LikedList from "./components/LikedList";

export const revalidate = 0;

const Liked = async () => {
  const songs = await getLikedSongs();
  return (
    <div className="text-gray-900 bg-gray-50 drop-shadow-xl h-full w-full overflow-hidden overflow-y-auto">
      <Header className=" from-bg-white">
        <div className="mt-20">
          <div className="flex flex-col md:flex-row items-center gap-x-5">
            <div className="relative drop-shadow-2xl w-32 h-32 lg:h-44 lg:w-44">
              <Image
                fill
                src="/images/heart.png"
                alt="Liked songs image"
                className="object-cover drop-shadow-sm"
              />
            </div>
            <div className="flex flex-col mt-4 md:mt-0 gap-y-2">
              <p className="hidden md:block font-bold text-lg ">Playlist</p>
              <h1 className="text-gray-900 font-thin text-4xl sm:text-5xl lg:text-6xl">
                Liked Songs
              </h1>
            </div>
          </div>
        </div>
      </Header>
      <LikedList songs={songs} />
    </div>
  );
};

export default Liked;
