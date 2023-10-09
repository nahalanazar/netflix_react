import React,{useState, useEffect} from 'react'
import './RowPost.css';
import {imageUrl, API_KEY} from '../../Constants/Constants';
import Axios from '../../Axios';
import Youtube from 'react-youtube'
function RowPost(props) {

  // to get movies
  const [movies, setMovies] = useState([])

  // to play movie trailer
  const [urlId, setUrlId] = useState('')

  useEffect(() => {
    Axios.get(props.url)
      .then((response) => {
        // console.log(response.data)
        setMovies(response.data.results)
      }).catch(error => {
      // alert('Network error')
    })
  }, [props.url])
  
  const opts = {
      height: '390',
      width: '100%',
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
      },
  };
  
  const handleMovie = (id) => {
    // console.log("movieId ", id)
    Axios.get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`)
      .then(response => {
        if (response.data.results.length !== 0) {
          setUrlId(response.data.results[0])
        } else {
          console.log('Array Empty')
          alert("Empty Array")
        }
      })
  }

  return (
    <div className='row'>
      <h2>{ props.title }</h2>
      <div className='posters'>
        {movies.map((obj) =>
          <div>
            <img onClick={() => handleMovie(obj.id)} className={props.isSmall ? 'smallPoster' : 'poster'} src={`${imageUrl + obj.backdrop_path}`} alt='poster' />        
            <p>{obj.name || obj.original_title}</p>
          </div>
        )}
      </div>
      { urlId && <Youtube videoId={urlId.key} opts={opts} />}
    </div>
  )
}

export default RowPost
