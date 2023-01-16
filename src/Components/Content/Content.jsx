import React from 'react';
import {Route, Routes} from "react-router-dom";
import Movies from "./Movies/Movies";
import Peoples from "./Peoples/Peoples";
import CurrentMovie from "../CurrentMovie/CurrentMovie";
import contentStyles from './contentStyles.module.css'


const Content = () => {

    return (
        <div className={contentStyles.wrapper}>
            <Routes>
                <Route path='/movies'  element={<Movies />} />
                <Route path='/peoples' element={<Peoples />} />
                <Route path='/currentMovie/:currentMovieId' element={<CurrentMovie />}/>
            </Routes>
        </div>
    );
};

export default Content;