import { useState, useEffect } from "react";
import { useGifs } from "hooks/useGifs";
import getSingleGif from "services/getSingleGif";

export default function useSingleGif({ id }) {
  const {gifs} = useGifs()
  const gifFromCache = gifs.find(singleGif => singleGif.id === id)

  const [gif, setGif] = useState(gifFromCache)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
      if (!gif) {
        setLoading(true)
        //llamar al servicio si no tenemos el gif en cache
        getSingleGif({ id })
            .then(gif => {
                setGif(gif)
                setLoading(false)
                setError(false)
            }).catch(err => {
                setLoading(false)
                setError(true)
            })
      }
  }, [id, gif])

  return { gif, loading, error }
}