import React from 'react';
import {Route, Routes} from "react-router-dom";
import Movies from "./Movies/Movies";
import Peoples from "./Peoples/Peoples";
import CurrentMovie from "../CurrentMovie/CurrentMovie";
import CurrentPeople from "../CurrentPeople/CurrentPeople";

const Content = () => {

    return (
        <div>
            <Routes>
                <Route path='/movies'  element={<Movies />} />
                <Route path='/peoples' element={<Peoples />} />
                <Route path='/currentMovie/:currentMovieId' element={<CurrentMovie />}/>
                <Route path='/currentPeople/:currentPeopleId' element={<CurrentPeople />}/>
            </Routes>
        </div>
    );
};

export default Content;