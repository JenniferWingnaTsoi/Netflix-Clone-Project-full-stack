import React, { useCallback, useEffect, useState } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai'

import PlayButton from '@/components/PlayButton';
import FavoriteButton from '@/components/FavoriteButton';
import useInfoModalStore from '@/hooks/useInfoModal';
import useMovie from '@/hooks/useMovie';

interface InfoModalProps {
  visible?: boolean;
  onClose: any;
}

const InfoModal: React.FC<InfoModalProps> = ({ visible, onClose }) => {
  const [isVisible, setIsVisible] = useState<boolean>(!!visible);

  const { movieId } = useInfoModalStore();
  const { data = {} } = useMovie(movieId);

  useEffect(() => {
    setIsVisible(!!visible);
  }, [visible]);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose]);

  if (!visible) {
    return null;
  }

  //styles
  const shadowPart:string = "z-50 transition duration-300 bg-black bg-opacity-80 flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0"
  const infoBox:string = "relative w-auto mx-auto max-w-4xl rounded-md overflow-hidden"
  const infoBoxSize:string = "relative h-96"
  const descPart:string =`${isVisible ? 'scale-100' : 'scale-0'} transform duration-300 relative flex-auto bg-gray-700 drop-shadow-md`
  const videoSetting:string = "w-full brightness-[60%] object-cover h-full"
  const closeButton:string = "cursor-pointer absolute top-3 right-3 h-10 w-10 rounded-full bg-black bg-opacity-70 flex items-center justify-center"
  const titleBox:string = "absolute bottom-[10%] left-10"
  const title:string = "text-white text-3xl md:text-4xl h-full lg:text-5xl font-bold mb-8"
  const playFavBox :string = "flex flex-row gap-4 items-center"
  const descBox:string = "px-12 py-8"
  const descFirstLine :string = "flex flex-row items-center gap-2 mb-8"
  const status:string ="text-green-400 font-semibold text-lg"
  const descLine:string = "text-white text-lg"



  return (
    <div className={shadowPart}>
      <div className={infoBox}>
        <div className={descPart}>

          <div className={infoBoxSize}>
            <video poster={data?.thumbnailUrl} autoPlay muted loop src={data?.videoUrl} className={videoSetting} />
            <div onClick={handleClose} className={closeButton}>
              <AiOutlineCloseCircle size={30} className="text-white w-6" />
            </div>
            <div className={titleBox}>
              <p className={title}>
                {data?.title}
              </p>
              <div className={playFavBox}>
                <PlayButton movieId={data?.id} />
                <FavoriteButton movieId={data?.id} />
              </div>
            </div>
          </div>

          <div className={descBox}>
            <div className={descFirstLine}>
              <p className={status}>
                New
              </p>
              <p className={descLine}>
                {data?.duration}
              </p>
              <p className={descLine}>
                {data?.genre}
              </p>
            </div>
            <p className={descLine}>
              {data?.description}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default InfoModal;
