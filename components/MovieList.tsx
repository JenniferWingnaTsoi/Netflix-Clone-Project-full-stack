import React from 'react';


import MovieCard from '@/components/MovieCard';
import { isEmpty } from 'lodash';

interface MovieListProps {
  data: MovieInterface[];
  title: string;
}

interface MovieInterface {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;
  duration: string;
  genre: string;
}

const MovieList: React.FC<MovieListProps> = ({ data, title }) => {
  if (isEmpty(data)) {
    return null;
  }

  //styles
  const listBox:string = "px-4 md:px-12 mt-4 space-y-8"
  const listTitle:string ="text-white text-md md:text-xl lg:text-2xl font-semibold mb-4"
  const movieBox:string = "grid grid-cols-4 gap-2"
  return (
    <div className={listBox}>
      <div>
        <p className={listTitle}>{title}</p>
        <div className={movieBox}>
          {data.map((movie) => (
            <MovieCard key={movie.id} data={movie} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default MovieList;
