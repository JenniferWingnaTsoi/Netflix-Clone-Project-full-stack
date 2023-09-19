import React from 'react';
import { BsFillPlayFill } from 'react-icons/bs'
import { useRouter } from 'next/router';

interface PlayButtonProps {
  movieId: string;
}

const playButtonBox:string = "bg-white rounded-md py-1 md:py-2 px-2 md:px-4 w-auto text-xs lg:text-lg font-semibold flex flex-row items-center hover:bg-neutral-300 transition"
const playIconStyle:string = "w-4 md:w-7 text-black mr-1"

const PlayButton: React.FC<PlayButtonProps> = ({ movieId }) => {
  const router = useRouter();

  return (
    <button 
      onClick={() => router.push(`/watch/${movieId}`)}
      className={playButtonBox}>
        <BsFillPlayFill size={30} className={playIconStyle} />
        Play
    </button>
  );
}

export default PlayButton;
