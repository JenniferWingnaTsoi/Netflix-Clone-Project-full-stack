import axios from "axios";
import React,{useCallback,useMemo} from "react";
import {AiOutlinePlus,AiOutlineCheck} from 'react-icons/ai'

import useCurrentUser from "@/hooks/useCurrentUser";
import useFavourites from "@/hooks/useFavorites"


interface FavoriteButtonProps{
    movieId:string
}

const FavouriteButton:React.FC<FavoriteButtonProps>=({movieId})=>{
    const {mutate:mutateFavorites} = useFavourites();
    const{data: currentUser,mutate} = useCurrentUser();

    const isFavorite = useMemo(()=>{
        const list = currentUser?.favoriteIds || []
        
        return list.includes(movieId);
    },[currentUser,movieId])

    const toggleFavorites = useCallback(async()=>{
        let response;

        if(isFavorite){
            response = await axios.delete('/api/favorite',{data:{movieId}})
        } else{
            response = await axios.post('/api/favorites',{movieId})
        }
        const updatedFavortesIds = response?.data?.favoriteIds;

        mutate({
            ...currentUser,
            favoriteIds:updatedFavortesIds
        })

        mutateFavorites()
    },[movieId,isFavorite,currentUser,mutate,mutateFavorites])

    const Icon = isFavorite ? AiOutlineCheck:AiOutlinePlus

    return(
        <div onClick={toggleFavorites} 
        className="
        cursor-pointer
        group/item
        w-6
        h-6
        lg:w-10
        lg:h-10
        vorder-white
        border-2
        rounded-full
        flex
        justify-center
        items-center
        transition
        hover:border-netural-300
        ">
            <Icon on className="text-white" size={30} />

        </div>
    )
}
export default FavouriteButton;