import React from 'react';
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { useRouter } from 'next/router';
import useMovie from '@/hooks/useMovie';

const Watch = () => {
  const router = useRouter();
  const { movieId } = router.query;

  const { data } = useMovie(movieId as string);

  //styles
  const watchBox:string = "h-screen w-screen bg-black"
  const navBarBox:string = "fixed w-full p-4 z-10 flex flex-row items-center gap-8 bg-black bg-opacity-70"
  const backToHomwIcon:string = "w-4 md:w-10 text-white cursor-pointer hover:opacity-80 transition"
  const movieTitle:string = "text-white text-1xl md:text-3xl font-bold"
  const videoStyles:string = "h-full w-full"
  
  return (
    <div className={watchBox}>
      <nav className={navBarBox}>
        <AiOutlineArrowLeft size={30} onClick={() => router.push('/')} className={backToHomwIcon}/>
        <p className={movieTitle}>
          <span className="font-light">Watching:</span> {data?.title}
        </p>
      </nav>
      <video className={videoStyles} autoPlay controls src={data?.videoUrl}></video>
    </div>
  )
}

export default Watch;
