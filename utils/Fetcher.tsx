"use client";

import { log } from "console";
import { Input } from "@/components/ui/input";
import { Loader } from "lucide-react";
import useSWR from "swr";
import { ChangeEvent, useState } from "react";

const Home = () => {
  const [searchValue, setSearchValue] = useState("");

  const { data, isLoading, error } = useSWR(
    `${process.env.NEXT_PUBLIC_TDMB_KEY}/search/movie?query= ${searchValue}&language=en-US&page=1`
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  return (
    <div>
      {data && isLoading && error && <Loader />}
      {<input onChange={handleChange} placeholder="Search..." />}
    </div>
  );
};
export default Home;
