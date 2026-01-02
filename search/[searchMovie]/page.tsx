import { Loader } from "lucide-react";
import useSWR from "swr";
import { ChangeEvent, useState } from "react";
import { fetcher } from "@/utils/fetcher";
import { useRouter, usePathname } from "next/navigation";
import { Input } from "@/components/ui/input";

export default async function Page({
  params,
}: {
  params: Promise<{ searchMovie: string }>;
}) {
  return (
    <div>
      <h1>khulan</h1>
    </div>
  );
}
