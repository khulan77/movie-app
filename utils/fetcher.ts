// export const fetcher = async (endpoint: string) => {
//   const response = await fetch(endpoint, {
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_KEY}`,
//     },
//     cache: "force-cache",
//   });

//   return await response.json();
// };
// app/api/search/route.ts
// app/api/search/route.ts
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");

  if (!query) return NextResponse.json({ results: [] });

  const res = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
      query
    )}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_KEY}`,
      },
    }
  );

  const data = await res.json();
  console.log(data);
  return NextResponse.json(data);
}
