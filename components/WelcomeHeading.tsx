"use client";

import { useUser } from "@/hooks/useUser";
import { PiMusicNotesPlusBold } from "react-icons/pi";

const WelcomeHeading = () => {
  const { user } = useUser();

  if (!user)
    return (
      <h1 className="text-gray-900 text-3xl font-semibold">
        Join to start uploading! <PiMusicNotesPlusBold />
      </h1>
    );

  return <h1 className="text-gray-900 text-3xl font-semibold">Welcome</h1>;
};

export default WelcomeHeading;
