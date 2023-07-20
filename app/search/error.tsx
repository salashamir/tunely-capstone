"use client";

import Box from "@/components/Box";

const error = () => {
  return (
    <Box className="h-full flex justify-center items-center">
      <div className="text-gray-900">
        Something unfortunately went wrong! 😭{" "}
      </div>
    </Box>
  );
};

export default error;
