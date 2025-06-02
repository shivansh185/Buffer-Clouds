import React from 'react'
import { Box } from '@chakra-ui/react';
import CppCodeEditor from '../components/c++codeEditor';
const CppCodeEditorBase=()=>{
    return(
        <Box minH="100vh" bg="#0f0a19" color="gray.500" px={6} py={8}>
            < CppCodeEditor/>
    </Box>
    )
}


export default CppCodeEditorBase;