import {useContext,  useEffect, useState } from "react"
import getGifs from "../services/getGifs"
import GifsContext from '../context/GifsContext'

const INITIAL_PAGE = 0

export function useGifs ({ keyword } = { keyword: null}) {
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(INITIAL_PAGE)
    const [loadingNextPage, setLoadingNextPage] = useState(false)
    const {gifs, setGifs} = useContext(GifsContext)

    // recuperamos la keyword del localStorage
    const keyuwordToUse = keyword || localStorage.getItem('lastKeyword') || 'random'

    useEffect(() => {
        setLoading(true)
        
        getGifs({ keyword: keyuwordToUse })
            .then(gifs => {
                setGifs(gifs)
                setLoading(false)
                // guardamos la keyword en el localStorage
                localStorage.setItem('lastKeyword', keyword)
            })
    }, [keyword, keyuwordToUse, setGifs])

    useEffect(() => {
        if (page === INITIAL_PAGE) return

        setLoadingNextPage(true)

        getGifs({ keyword: keyuwordToUse, page })
            .then(nextGifs => {
                setGifs(prevGifs => prevGifs.concat(nextGifs))
                setLoadingNextPage(false)
            })
    }, [keyuwordToUse, page])

    return {loading, loadingNextPage, gifs, setPage}
}
