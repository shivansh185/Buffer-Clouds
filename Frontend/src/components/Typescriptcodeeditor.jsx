import React, { useRef, useState } from "react";
import { Box, HStack, Text, Button } from "@chakra-ui/react";
import Editor from "@monaco-editor/react";
import TypescriptOutput from "./TypeScriptOutput";

const defaultCode = {
    typescript: `\ntype Params = {\n\tname: string;\n}\n\nfunction greet(data: Params) {\n\tconsole.log("Hello, " + data.name + "!");\n}\n\ngreet({ name: "Alex" });\n`,
};

const TypescriptcodeEditor = () => {
  const editorRef = useRef();
  const [language, setLanguage] = useState("typescript");
  const [value, setValue] = useState(defaultCode["typescript"]);

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
      <TypescriptOutput editorRef={editorRef} />
    </HStack>
  );
};

export default TypescriptcodeEditor;

