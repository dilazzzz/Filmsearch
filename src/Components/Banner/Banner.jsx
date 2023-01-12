import React from 'react';
import logo from '../../img/twitter_header_photo_2.png'
import bannerStyles from './banner.module.css'

const Banner = () => {
    return (
        <div className={bannerStyles.wrapper}>
            <div className={bannerStyles.banner} style={{backgroundImage: `url("${logo}")`}}/>
        </div>
    );
};

export default Banner;