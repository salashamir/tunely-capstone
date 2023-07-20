"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useDebounce from "@/hooks/useDebounce";
import qs from "query-string";
import Input from "./Input";

const SearchInput = () => {
  const [value, setValue] = useState<string>("");
  const debouncedVal = useDebounce<string>(value, 500);
  const router = useRouter();

  useEffect(() => {
    const query = {
      title: debouncedVal,
    };

    const url = qs.stringifyUrl({
      url: "/search",
      query: query,
    });

    router.push(url);
  }, [debouncedVal, router]);

  return (
    <div>
      <Input
        className="text-white"
        placeholder="What would you like to search for?"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

export default SearchInput;
