//如果不登錄 無法回到主頁,只能在登錄頁面
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import Navbar from "@/components/Navbar";
import Billboard from "@/components/Billboard";
import MovieList from "@/components/MovieList";
import useMovieList from "@/hooks/useMovieList";
import useFavorites from "@/hooks/useFavorites";
import InfoModal from "@/components/InfoModal";
import useInfoModal from "@/hooks/useInfoModal";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);
  //檢查用戶是否登錄
  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false, // broswer不會緩存
      },
    };
  }
  //如果用戶已經登錄,返回一個空的props
  return {
    props: {},
  };
}

export default function Home() {
  // load movie
  const { data: movies = [] } = useMovieList();
  const { data: favourites = [] } = useFavorites();
  const { isOpen, closeModal } = useInfoModal();

  // do not forget to put await to the index ofmovie page as well

  return (
    <>
      <InfoModal visible onClose={() => {}} />
      <Navbar />
      <Billboard />
      <div className="pb-40">
        <MovieList title="Trending Now" data={movies} />
        <MovieList title="My Favorites" data={favourites} />
      </div>
    </>
  );
}
