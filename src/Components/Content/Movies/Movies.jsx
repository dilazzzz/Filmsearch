import React, {useState, useEffect} from 'react';
import moviesStyle from './movies.module.css'
import poster from '../../../img/pinterest_profile_image.png'
import InputGroup from "../Inputs/InputGroup";
import {Link} from "react-router-dom";

const Movies = () => {

    const [movieList, setMovieList] = (useState(JSON.parse(localStorage.getItem('movieList')) || []))

    const searchMovie = (search) => {
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=573fc27946f40ab3d839b3bed3cc233c&query=${search}`)
            .then(res => res.json())
            .then(result => setMovieList(result.results.map(movie => {
                return  {
                    id: movie.id,
                    title: movie.title,
                    poster_path: movie.poster_path ? `https://image.tmdb.org/t/p/original/${movie.poster_path}` : `${poster}`,
                    vote_average: movie.vote_average,
                    overview:  movie.overview,
                    original_language: movie.original_language,
                    popularity: movie.popularity,
                    original_title: movie.original_title,
                    release_date: movie.release_date
                }
            })))
    }

    useEffect(() => {
        localStorage.setItem('movieList', JSON.stringify(movieList))
    }, [movieList])

    return (
        <div className={moviesStyle.componentWrapper}>
            <InputGroup placeholder='Поиск фильма...' movieList={movieList} searchMovie={searchMovie}/>
            <div className={moviesStyle.movieListWrapper}>
                {movieList.map(movie => {
                    return  (
                        <>
                            <Link
                                to={`/currentMovie/${movie.id}`}
                                key={movie.id}
                                className={moviesStyle.wrapper}
                            >
                                <div className={moviesStyle.cardContent}>
                                    <h3 className={moviesStyle.title}>{movie.title}</h3>
                                    <div className={moviesStyle.poster} style={{backgroundImage: `url("${movie.poster_path}")`}}></div>
                                    <div className={moviesStyle.rate}>Рейтинг: {movie.vote_average}</div>
                                </div>
                            </Link>
                        </>
                    )
                })}
            </div>
        </div>
    );
};

export default Movies;