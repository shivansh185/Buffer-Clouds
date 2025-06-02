import React from 'react'
import { Box } from '@chakra-ui/react';
import CsharpCodeEditor from '../components/Csharpcodeeditor';
const CsharpcodeEditorBase=()=>{
    return(
        <Box minH="100vh" bg="#0f0a19" color="gray.500" px={6} py={8}>
            < CsharpCodeEditor/>
    </Box>
    )
}


export default CsharpcodeEditorBase;