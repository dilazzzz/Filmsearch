import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import {Button} from "@mui/material";
import inputGroupStyles from './inputGroup.module.css'
import {useNavigate, useLocation} from "react-router-dom";


const InputGroup = ({ placeholder, search}) => {

    const [searchString, setSearchString] = useState('')
    const navigate = useNavigate()
    const {pathname} = useLocation()

    useEffect(() => {
            setSearchString(search)
    },[search])



    return (
            <Box
                style={{marginTop: 20}}
                component="form"
                onSubmit={(e) => {
                    e.preventDefault()
                    navigate(`${pathname}?search=${searchString}`)
                }}
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
                    type='submit'
                    variant="outlined"
                    className={inputGroupStyles.button}
                    disabled={!searchString}
                >Поиск</Button>
                <Button
                    variant="outlined"
                    className={inputGroupStyles.button}
                    onClick={() => {
                        navigate('')
                        setSearchString('')
                    }}
                    disabled={!search}
                >Очистить список</Button>
            </Box>
    );
};

export default InputGroup;