import React, { useRef, useState } from "react";
import { Box, HStack, Text, Button } from "@chakra-ui/react";
import Editor from "@monaco-editor/react";
import JavaOutput from "./javaoutput";

const defaultcode = {
    java: `\npublic class HelloWorld {\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println("Hello World");\n\t}\n}\n`,
};

const JavaCodeEditor = () => {
  const editorRef = useRef();
  const [language, setLanguage] = useState("java");
  const [value, setValue] = useState(defaultcode["java"]);

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
      <JavaOutput editorRef={editorRef} />
    </HStack>
  );
};

export default JavaCodeEditor;