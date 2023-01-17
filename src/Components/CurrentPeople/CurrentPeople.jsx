import React, {useEffect, useState} from 'react';
import currentPeopleStyle from './currentPeople.module.css'
import {Link, useParams} from "react-router-dom";
import {Button} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const CurrentPeople = () => {

    const {currentPeopleId} = useParams()

    const [currentPeople, setCurrentPeople] = useState(null)

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/person/${currentPeopleId}?api_key=573fc27946f40ab3d839b3bed3cc233c&language=en-US`)
            .then(res => res.json())
            .then(result => setCurrentPeople(result))
    },[])

    if (!currentPeople) {
        return null
    }

    console.log(currentPeople)
    return (
        <>
            <div className={currentPeopleStyle.wrapper}>
                <div className={currentPeopleStyle.leftCardContent}>
                    <div className={currentPeopleStyle.poster} style={{backgroundImage: `url(https://image.tmdb.org/t/p/original/${currentPeople.profile_path})`}}></div>
                    <h3 className={currentPeopleStyle.title}>{currentPeople.name}</h3>
                </div>
                <div className={currentPeopleStyle.rightCardContent}>
                    <div className={currentPeopleStyle.row}>Краткая биография: {currentPeople.biography}</div>
                    <div className={currentPeopleStyle.row}>Дата рождения: {currentPeople.birthday}</div>
                    <div className={currentPeopleStyle.row}>Дата смерти: {currentPeople.deathday || "еше жив"} {/*= null считается что ничего нет, а не то что есть, но null*/}</div>
                    <div className={currentPeopleStyle.row}>Место рождения: {currentPeople.place_of_birth}</div>
                    <div className={currentPeopleStyle.row}>Профессия: {currentPeople.known_for_department}</div>
                    <div className={currentPeopleStyle.row}>Популярность: {currentPeople.popularity}</div>
                </div>
            </div>
            <Link to={'/peoples'} className={currentPeopleStyle.link}>
                <Button
                    startIcon={<ArrowBackIcon />}
                    variant="outlined"
                    className={currentPeopleStyle.btn}
                >Назад к людям</Button>
            </Link>
        </>
    );
};

export default CurrentPeople;