import React, {useState, useEffect, Fragment} from 'react';
import moviesStyle from './movies.module.css'
import poster from '../../../img/pinterest_profile_image.png'
import InputGroup from "../Inputs/InputGroup";
import {Link, useLocation} from "react-router-dom";
import {Pagination, PaginationItem, Stack} from "@mui/material";
import peopleStyles from "../Peoples/people.module.css";
import CircularProgress from "@mui/material/CircularProgress";

const Movies = () => {

    const [movieList, setMovieList] = useState([])
    const [totalPage, setTotalPage] = useState(1)
    const [loading, setLoading] = useState(false)

    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const page = parseInt(query.get('page') || '1', 10)
    const search = query.get('search') || ''

    const searchMovie = () => {
        setLoading(true)
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=573fc27946f40ab3d839b3bed3cc233c&query=${search || ' '}&page=${page}&include_adult=false`)
            .then(res => res.json())
            .then(result => {
                setTotalPage(result.total_pages)
                setMovieList(result.results.map(movie => {
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
            }))})
            .finally(() => setLoading(false))
    }

    useEffect(() => {
        searchMovie()

        return () => {
            setTotalPage(1)
            setMovieList([])
        }
    },[page, search])


    return (
        <div className={moviesStyle.componentWrapper}>
            <InputGroup routeTo='movies' placeholder='Поиск фильма...' search={search} movieList={movieList} setMovieList={setMovieList} onSearch={searchMovie}/>
            <div className={moviesStyle.movieListWrapper}>
                {loading ?
                    <Stack className={peopleStyles.loading} sx={{ color: 'white.500' }} spacing={2} direction="row">
                        <CircularProgress color="inherit" />
                    </Stack>
                    :
                    !movieList.length && search ?
                        <div className={peopleStyles.notFound}>Ничего не найдено :(</div>
                        :
                        movieList.map(movie => {
                            return  (
                                <Fragment key={movie.id}>
                                    <Link
                                        to={`/currentMovie/${movie.id}`}
                                        className={moviesStyle.wrapper}>
                                        <div className={moviesStyle.cardContent}>
                                            <h3 className={moviesStyle.title}>{movie.title}</h3>
                                            <div className={moviesStyle.poster} style={{backgroundImage: `url("${movie.poster_path}")`}}></div>
                                            <div className={moviesStyle.rate}>Рейтинг: {movie.vote_average}</div>
                                        </div>
                                    </Link>
                                </Fragment>
                        )
                    })
                }
            </div>
            {!movieList.length || movieList.length < 20?
                null
                :
                <Pagination
                    className={moviesStyle.pagination}
                    color='primary'
                    page={page}
                    count={totalPage}
                    renderItem={(item) => (
                        <PaginationItem
                            component={Link}
                            to={`/movies?search=${search}${item.page === 1 ? '' : `&page=${item.page}`}`}
                            {...item}
                        />
                    )}
                />
            }
        </div>
    );
};

export default Movies;