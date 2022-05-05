import './styles.css'
import Gif from '../Gif'

export default function ListOfGifs ({ gifs }) {
    return <div className='ListOfGifs'>
        {
            gifs.map(({ id, title, url }) =>
                <Gif
                    key={id}
                    title={title}
                    url={url}
                    id={id}
                />
            )
        }
    </div>
}