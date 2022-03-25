import { useContext } from "react";
import GifsContext from '../context/GifsContext'

export default function useGlobalGifs () {
    const { gifs } = useContext(GifsContext)
    return gifs

    // en una sola linea
    // return useContext(GifsContext).gifs
}