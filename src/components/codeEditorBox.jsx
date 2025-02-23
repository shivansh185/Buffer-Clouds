import React, { useRef, useState } from "react";
import { Box, HStack, Text, Button } from "@chakra-ui/react";
import Editor from "@monaco-editor/react";
import Output from "./outputBox";

const defaultCode = {
  javascript: `console.log("Hello, World!");`,
};

const CodeEditor = () => {
  const editorRef = useRef();
  const [language, setLanguage] = useState("javascript");
  const [value, setValue] = useState(defaultCode["javascript"]);

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  return (
    <HStack height="100vh" spacing={0} align="stretch"> 
      {/* Editor Box */}
      <Box flex="1" p={4} bg="gray.900">
        <Text fontSize="2xl" fontWeight="bold" mb={3} textAlign="left" color="white">
          {language.toUpperCase()}
        </Text>
        <Editor
          height="calc(100vh - 50px)" // Adjusting for header spacing
          theme="vs-dark"
          language={language}
          value={value}
          onChange={(val) => setValue(val)}
          onMount={onMount}
        />
      </Box>

      {/* Output Box */}
      <Output editorRef={editorRef} />
    </HStack>
  );
};

export default CodeEditor;


