import React, {Fragment, useEffect, useState} from 'react';
import InputGroup from "../Inputs/InputGroup";
import peopleStyles from './people.module.css'
import {Link, useLocation} from 'react-router-dom'
import poster from "../../../img/pinterest_profile_image.png";
import {Pagination, PaginationItem} from "@mui/material";

const Peoples = () => {

    const [peopleList, setPeopleList] = useState([])
    const [totalPage, setTotalPage] = useState(1)

    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const page = parseInt(query.get('page') || '1', 10)
    const search = query.get('search') || ''

    const searchPeople = () => {
        fetch(`https://api.themoviedb.org/3/search/person?api_key=573fc27946f40ab3d839b3bed3cc233c&language=en-US&query=${search || ' '}&page=${page}&include_adult=false`)
            .then(res => res.json())
            .then(result => {
                if (result.success === false) {
                    return
                }
                setTotalPage(result.total_pages)
                setPeopleList(result.results.map(people => {
                    return {
                        id: people.id,
                        name: people.name,
                        profile_path: people.profile_path ? `https://image.tmdb.org/t/p/original/${people.profile_path}` : `${poster}`
                    }
                }))
            })
    }

    useEffect(() => {
        searchPeople()

        return () => {
            setTotalPage(1)
            setPeopleList([])
        }
    },[page, search])



    return (
        <div className={peopleStyles.componentWrapper}>
            <InputGroup placeholder='Поиск человека...' search={search} peopleList={peopleList} setPeopleList={setPeopleList} onSearch={searchPeople}/>
            <div className={peopleStyles.peopleListWrapper}>
                {
                    !peopleList.length && search ?
                        <div className={peopleStyles.notFound}>Ничего не найдено :(</div>
                        :
                        peopleList.map(people => {
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
                    })
                }
            </div>
            {!peopleList.length || peopleList.length < 20?
                null
                :
                <Pagination
                    className={peopleStyles.pagination}
                    color='primary'
                    page={page}
                    count={totalPage}
                    renderItem={(item) => (
                        <PaginationItem
                            component={Link}
                            to={`/peoples?search=${search}${item.page === 1 ? '' : `&page=${item.page}`}`}
                            {...item}
                        />
                    )}
                />
            }
        </div>
    );
};

export default Peoples;