import React from 'react'
import Gif from 'components/Gif'
import useSingleGif from 'hooks/useSingleGif'
import Spinner from 'components/Spinner'
import { Redirect } from 'wouter'
import { Helmet } from 'react-helmet'

export default function Detail ({ params }) {
  const {gif, loading, error} = useSingleGif({ id: params.id })

  const title = gif ? gif.title : 'Giffy'
  // useSEO({ description: `Detail of ${title}`, title })

  if (loading) {
    return (
      <>
        <Helmet>
          <title>Loading...</title>
        </Helmet>
        <Spinner />
      </>
    )
  }
  if (error) return <Redirect to='/404' />
  if (!gif) return null

  return <>
        <Helmet>
          <title>{title} || Giffy</title>
        </Helmet>
      <h3 className="App-title">{gif.title}</h3>
      <Gif {...gif} />
    </>
}