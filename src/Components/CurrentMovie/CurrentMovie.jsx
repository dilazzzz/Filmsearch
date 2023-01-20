import React, {Fragment, useEffect, useState} from 'react';
import currentMovieStyle from './currentMovie.module.css'
import {Link, useNavigate, useParams} from 'react-router-dom'
import {Button} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import peopleStyles from "../Content/Peoples/people.module.css";
import poster from "../../img/pinterest_profile_image.png";

const CurrentMovie = () => {

    const {currentMovieId} = useParams()
    const [currentMovie, setCurrentMovie] = useState(null)
    const [currentMovieActors, setCurrentMovieActors] = useState([])
    const navigate = useNavigate()


    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${currentMovieId}?api_key=573fc27946f40ab3d839b3bed3cc233c&language=en-US`)
            .then(res => res.json())
            .then(result => setCurrentMovie(result))
        fetch(`https://api.themoviedb.org/3/movie/${currentMovieId}/credits?api_key=573fc27946f40ab3d839b3bed3cc233c&language=en-US`)
            .then(res => res.json())
            .then(result => setCurrentMovieActors(result.cast.map(actors => {
                return {
                    id: actors.id,
                    name: actors.name,
                    profile_path: actors.profile_path ? `https://image.tmdb.org/t/p/original/${actors.profile_path}` : `${poster}`
                }
            })))
    },[])


     if (!currentMovie) {
         return null
     }

    return (
        <>
            <Link to={'/movies'} className={currentMovieStyle.link}>
                <Button
                    startIcon={<ArrowBackIcon />}
                    variant="outlined"
                    className={currentMovieStyle.btn}
                    onClick={() => navigate(-1)}
                >Назад к фильмам</Button>
            </Link>
            <div className={currentMovieStyle.wrapper}>
                <div className={currentMovieStyle.leftCardContent}>
                    <h3 className={currentMovieStyle.title}>{currentMovie.title}</h3>
                    <div className={currentMovieStyle.poster} style={{backgroundImage: `url(https://image.tmdb.org/t/p/original/${currentMovie.poster_path})`}}></div>
                    <div className={currentMovieStyle.rate}>Рейтинг: {currentMovie.vote_average}</div>
                </div>
                <div className={currentMovieStyle.rightCardContent}>
                    <div className={currentMovieStyle.descr}>Описание: {currentMovie.overview}</div>
                    <div className={currentMovieStyle.original_language}>Оригинальный язык: {currentMovie.original_language}</div>
                    <div className={currentMovieStyle.popularity}>Запросов: {currentMovie.vote_count}</div>
                    <div className={currentMovieStyle.original_title}>Оригинальное название: {currentMovie.original_title}</div>
                    <div className={currentMovieStyle.releaseDate}>Дата релиза: {currentMovie.release_date}</div>
                    <div className={currentMovieStyle.genre}>Жанр: {currentMovie.genres.map(genre => genre.name).join(', ')}</div>
                    <div className={currentMovieStyle.budget}>Бюджет: {currentMovie.budget}</div>
                    <div className={currentMovieStyle.revenue}>Мировые сборы: {currentMovie.revenue}</div>
                    <div className={currentMovieStyle.runtime}>Продолжительность: {currentMovie.runtime} min</div>
                </div>
            </div>
            <>
                <h2 className={currentMovieStyle.actorsTitle}>Актеры фильма :</h2>
                <div className={peopleStyles.peopleListWrapper}>
                    {currentMovieActors.map(actors => {
                       return(
                            <Fragment>
                                <Link to={`/currentPeople/${actors.id}`} className={peopleStyles.wrapper}>
                                    <div className={peopleStyles.cardContent}>
                                        <div className={peopleStyles.poster} style={{backgroundImage: `url("${actors.profile_path}")`}}></div>
                                        <h3 className={peopleStyles.name}>{actors.name}</h3>
                                    </div>
                                </Link>
                            </Fragment>
                           )
                    })}
                </div>
            </>
        </>
    );
};

export default CurrentMovie;