import React, {useEffect, useState} from 'react';
import currentMovieStyle from './currentMovie.module.css'
import {Link, useNavigate, useParams} from 'react-router-dom'
import {Button} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const CurrentMovie = () => {

    const {currentMovieId} = useParams()
    const [currentMovie, setCurrentMovie] = useState(null)
    const navigate = useNavigate()


    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${currentMovieId}?api_key=573fc27946f40ab3d839b3bed3cc233c&language=en-US`)
            .then(res => res.json())
            .then(result => setCurrentMovie(result))
    },[])

     if (!currentMovie) {
         return null
     }

    return (
        <>
        <div className={currentMovieStyle.wrapper}>
            <div className={currentMovieStyle.leftCardContent}>
                <h3 className={currentMovieStyle.title}>{currentMovie.title}</h3>
                <div className={currentMovieStyle.poster} style={{backgroundImage: `url(https://image.tmdb.org/t/p/original/${currentMovie.poster_path})`}}></div>
                <div className={currentMovieStyle.rate}>Рейтинг: {currentMovie.vote_average}</div>
            </div>
            <div className={currentMovieStyle.rightCardContent}>
                <div className={currentMovieStyle.descr}>{currentMovie.overview}</div>
                <div className={currentMovieStyle.original_language}>Оригинальный язык: {currentMovie.original_language}</div>
                <div className={currentMovieStyle.popularity}>Запросов: {currentMovie.vote_count}</div>
                <div className={currentMovieStyle.original_title}>Оригинальное название: {currentMovie.original_title}</div>
                <div className={currentMovieStyle.releaseDate}>Дата релиза: {currentMovie.release_date}</div>
                <div className={currentMovieStyle.genre}>Жанр: {currentMovie.genres.map(genre => genre.name).join(', ')}</div>
                <div className={currentMovieStyle.budget}>Бюджет: {currentMovie.budget}</div>
                <div className={currentMovieStyle.revenue}>Мировые сборы: {currentMovie.revenue}</div>
                <div className={currentMovieStyle.runtime}>Продолжительность: {currentMovie.runtime}</div>
            </div>
        </div>
             <Link to={'/movies'} className={currentMovieStyle.link}>
                <Button
                    startIcon={<ArrowBackIcon />}
                    variant="outlined"
                    className={currentMovieStyle.btn}
                    onClick={() => navigate(-1)}
                >Назад к фильмам</Button>
             </Link>
        </>
    );
};

export default CurrentMovie;