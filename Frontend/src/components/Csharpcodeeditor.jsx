import React, { useRef, useState } from "react";
import { Box, HStack, Text, Button } from "@chakra-ui/react";
import Editor from "@monaco-editor/react";
import Csharpoutput from "./csharpoutput";

const defaultCode = {
 csharp: 'using System;\n\nnamespace HelloWorld\n{\n\tclass Hello { \n\t\tstatic void Main(string[] args) {\n\t\t\tConsole.WriteLine("Hello World in C#");\n\t\t}\n\t}\n}\n'
};

const CsharpCodeEditor = () => {
  const editorRef = useRef();
  const [language, setLanguage] = useState("csharp");
  const [value, setValue] = useState(defaultCode["csharp"]);

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
      <Csharpoutput editorRef={editorRef} />
    </HStack>
  );
};

export default CsharpCodeEditor;
