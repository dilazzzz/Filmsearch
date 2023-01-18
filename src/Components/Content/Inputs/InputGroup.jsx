import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import {Button} from "@mui/material";
import inputGroupStyles from './inputGroup.module.css'
import {useNavigate} from "react-router-dom";


const InputGroup = (
    { placeholder, peopleList, setPeopleList, search, movieList, setMovieList}
) => {

    const [searchString, setSearchString] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
            setSearchString(search)
    },[search])

    return (
        <Box
            style={{marginTop: 20}}
            component="form"
            sx={{
                '& > :not(style)': { m: 1 },
            }}
            noValidate
            autoComplete="off"
        >
            <Input
                className={inputGroupStyles.input}
                placeholder={placeholder}
                value={searchString}
                onChange={e => setSearchString(e.target.value)}
            />
            <Button
                variant="outlined"
                className={inputGroupStyles.button}
                onClick={() => navigate(`/peoples?search=${searchString}`)}
                disabled={!searchString}
            >Поиск</Button>
            <Button
                variant="outlined"
                className={inputGroupStyles.button}
                onClick={() => {
                    setPeopleList([])
                    setSearchString('')
                    navigate('/peoples')
                }}
                disabled={!peopleList && !movieList}
            >Очистить список</Button>
        </Box>
    );
};

export default InputGroup;