import React, { useCallback } from "react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

import PlayButton from "@/components/PlayButton";
import useBillboard from "@/hooks/useBillboard";
import useInfoModalStore from "@/hooks/useInfoModal";

const Billboard: React.FC = () => {
  const { openModal } = useInfoModalStore();
  const { data } = useBillboard();
  const handleOpenModal = useCallback(() => {
    openModal(data?.id);
  }, [openModal, data?.id]);

  
  //styles
  const movieBox: string = "relative h-[56.25vw]";
  const movieVideo: string ="w-full h-[56.25vw] object-cover brightness-[60%] transition duration-500";
  const infoBox: string = "absolute top-[30%] md:top-[40%] ml-4 md:ml-16";
  const playButtonBox: string = "flex flex-row items-center mt-3 md:mt-4 gap-3";
  const movieTitle: string = "text-white text-1xl md:text-5xl h-full w-[50%] lg:text-6xl font-bold drop-shadow-xl";
  const movieDesc: string = "text-white text-[8px] md:text-lg mt-3 md:mt-8 w-[90%] md:w-[80%] lg:w-[50%] drop-shadow-xl";
  const playButton: string = "bg-white text-white bg-opacity-30 rounded-md py-1 md:py-2 px-2 md:px-4 w-auto text-xs lg:text-lg font-semibold flex flex-row items-center hover:bg-opacity-20 transition";
  const infoIcon: string = "w-4 md:w-7 mr-1";

  return (
    <div className={movieBox}>
      <video
        poster={data?.thumbnailUrl}
        className={movieVideo}
        autoPlay
        muted
        loop
        src={data?.videoUrl}
      ></video>
      <div className={infoBox}>
        <p className={movieTitle}>{data?.title}</p>
        <p className={movieDesc}>{data?.description}</p>
        <div className={playButtonBox}>
          <PlayButton movieId={data?.id} />
          <button onClick={handleOpenModal} className={playButton}>
            <InformationCircleIcon className={infoIcon} />
            More Info
          </button>
        </div>
      </div>
    </div>
  );
};
export default Billboard;
