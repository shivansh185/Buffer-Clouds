import React from 'react'
import { Box } from '@chakra-ui/react';
import JavaCodeEditor from '../components/javaCodeEditor';

const JavaCodeEditorBase=()=>{
    return(
        <Box minH="100vh" bg="#0f0a19" color="gray.500" px={6} py={8}>
            < JavaCodeEditor/>
    </Box>
    )
}


export default JavaCodeEditorBase;