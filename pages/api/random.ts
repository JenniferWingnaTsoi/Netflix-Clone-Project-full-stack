//每次打開頁面都是不同的電影
import { NextApiRequest, NextApiResponse } from "next";

import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  try {
    await serverAuth(req);
    const movieCount = await prismadb.movie.count();
    const randomIndex = Math.floor(Math.random() * movieCount);

    const randomMovies = await prismadb.movie.findMany({
      take: 1, //take only 1 in many movies
      skip: randomIndex,
    });

    return res.status(200).json(randomMovies[0]);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
