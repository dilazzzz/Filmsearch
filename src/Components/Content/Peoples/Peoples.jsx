import React from 'react';
import InputGroup from "../Inputs/InputGroup";

const Peoples = () => {

    // https://api.themoviedb.org/3/person/287/movie_credits?api_key=573fc27946f40ab3d839b3bed3cc233c&language=en-US
    //  запрос на все фильмы актера


    return (
        <div>
            <InputGroup placeholder='Поиск человека...' />


        </div>
    );
};

export default Peoples;