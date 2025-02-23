import React from 'react'
import { Box } from '@chakra-ui/react';
import PythonCodeEditor from '../components/pythoneditor';

const PyCodeEditorBase=()=>{
    return(
        <Box minH="100vh" bg="#0f0a19" color="gray.500" px={6} py={8}>
            < PythonCodeEditor/>
    </Box>
    )
}


export default PyCodeEditorBase;