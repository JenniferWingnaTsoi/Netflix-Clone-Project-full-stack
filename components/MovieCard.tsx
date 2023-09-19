import React, { useCallback } from 'react';
import { useRouter } from 'next/router';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { PlayIcon } from '@heroicons/react/24/solid';

import FavoriteButton from '@/components/FavoriteButton';
import useInfoModalStore from '@/hooks/useInfoModal';

interface MovieInterface {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;
  duration: string;
  genre: string;
}


interface MovieCardProps {
  data: MovieInterface;
}

const MovieCard: React.FC<MovieCardProps> = ({ data }) => {
  const router = useRouter();
  const { openModal } = useInfoModalStore();

  const redirectToWatch = useCallback(() => router.push(`/watch/${data.id}`), [router, data.id]);

  //styles
  const movieCardBox:string = "cursor-pointer object-cover transition duration shadow-xl rounded-md group-hover:opacity-90 sm:group-hover:opacity-0 delay-300 w-full h-[12vw]"
  const popUpBox:string = "opacity-0 absolute top-0 transition duration-200 z-10 invisible sm:visible delay-300 w-full scale-0 group-hover:scale-110 group-hover:-translate-y-[6vw] group-hover:translate-x-[2vw] group-hover:opacity-100"
  const posterBox:string = " cursor-pointer object-cover transition duration shadow-xl rounded-t-md w-full h-[12vw]"
  const infoBox:string ="z-10 bg-gray-800 p-2 lg:p-4 absolute w-full transition shadow-md rounded-b-md"
  const actionBox:string ="flex flex-row items-center gap-3"
  const watchBox:string ="cursor-pointer w-6 h-6 lg:w-10 lg:h-10 bg-white rounded-full flex justify-center items-center transition hover:bg-neutral-300"
  const playButton:string="text-black w-4 lg:w-6"
  const chevDownBox:string = "cursor-pointer ml-auto group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300"
  const chevDownIcon:string = "text-white group-hover/item:text-neutral-300 w-4 lg:w-6"
  const status:string = "text-green-400 font-semibold mt-4"
  const durationBox:string = "flex flex-row mt-4 gap-2 items-center"
  const durationTime:string = "text-white text-[10px] lg:text-sm"
  const genreBox:string = "flex flex-row items-center gap-2 mt-4 text-[8px] text-white lg:text-sm"
  
  return (
    <div className="group bg-zinc-900 col-span relative h-[12vw]">
      <img onClick={redirectToWatch} src={data.thumbnailUrl} alt="Movie" draggable={false} 
      className={movieCardBox} />
      <div className={popUpBox}>
        <img onClick={redirectToWatch} src={data.thumbnailUrl} alt="Movie" draggable={false} 
        className={posterBox} />
        <div className={infoBox}>
          <div className={actionBox}>
            <div onClick={redirectToWatch} className={watchBox}>
              <PlayIcon className={playButton}/>
            </div>
            
            <FavoriteButton movieId={data.id} />
            <div onClick={() => openModal(data?.id)} className={chevDownBox}>
              <ChevronDownIcon className= {chevDownIcon} />
            </div>
          </div>
          <p className={status}>
            New <span className="text-white">2023</span>
          </p>
          <div className={durationBox}> 
            <p className={durationTime}>{data.duration}</p>
          </div>
          <div className={genreBox}>
            <p>{data.genre}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieCard;