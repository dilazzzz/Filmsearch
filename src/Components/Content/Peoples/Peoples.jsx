import React, {Fragment, useEffect, useState} from 'react';
import InputGroup from "../Inputs/InputGroup";
import peopleStyles from './people.module.css'
import {Link} from 'react-router-dom'
import poster from "../../../img/pinterest_profile_image.png";

const Peoples = () => {

    const [peopleList, setPeopleList] = (useState(JSON.parse(localStorage.getItem('peopleList')) || []))

    const searchPeople = (search) => {
        fetch(`https://api.themoviedb.org/3/search/person?api_key=573fc27946f40ab3d839b3bed3cc233c&language=en-US&query=${search}&page=1&include_adult=false`)
            .then(res => res.json())
            .then(result => setPeopleList(result.results.map(people => {
                return {
                    id: people.id,
                    name: people.name,
                    profile_path: people.profile_path ? `https://image.tmdb.org/t/p/original/${people.profile_path}` : `${poster}`
                }
            })))
    }

    useEffect(() => {
        localStorage.setItem('peopleList', JSON.stringify(peopleList))
    },[peopleList])

    return (
        <div className={peopleStyles.componentWrapper}>
            <InputGroup placeholder='Поиск человека...' peopleList={peopleList} onSearch={searchPeople}/>
            <div className={peopleStyles.peopleListWrapper}>
            {peopleList.map(people => {
                return (
                    <Fragment key={people.id}>
                        <Link
                            to={`/currentPeople/${people.id}`}
                            className={peopleStyles.wrapper}
                        >
                            <div className={peopleStyles.cardContent}>
                                <div className={peopleStyles.poster} style={{backgroundImage: `url("${people.profile_path}")`}}></div>
                                <h3 className={peopleStyles.name}>{people.name}</h3>
                            </div>
                        </Link>
                    </Fragment>
                )
            })}
            </div>
        </div>
    );
};

export default Peoples;