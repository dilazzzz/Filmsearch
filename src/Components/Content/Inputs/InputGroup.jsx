import React, {useState} from 'react';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import {Button} from "@mui/material";
import inputGroupStyles from './inputGroup.module.css'


const InputGroup = ({ placeholder, searchMovie }) => {

    const [searchMovies, setSearchMovies] = useState('')

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
                value={searchMovies}
                onChange={e => setSearchMovies(e.target.value)}
            />
            <Button
                variant="outlined"
                className={inputGroupStyles.button}
                onClick={() => searchMovie(searchMovies)}
                disabled={!searchMovies}
            >Поиск</Button>
        </Box>
    );
};

export default InputGroup;