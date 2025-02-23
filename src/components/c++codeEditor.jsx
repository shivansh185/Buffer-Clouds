import React, { useRef, useState } from "react";
import { Box, HStack, Text, Button } from "@chakra-ui/react";
import Editor from "@monaco-editor/react";
import Cppoutput from "./c++output";

const defaultCode = {
 cpp: `#include <iostream>\nusing namespace std;\nint main() {\n    cout << "Hello, World!" << endl;\n    return 0;\n}`
};

const CppCodeEditor = () => {
  const editorRef = useRef();
  const [language, setLanguage] = useState("cpp");
  const [value, setValue] = useState(defaultCode["cpp"]);

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
      <Cppoutput editorRef={editorRef} />
    </HStack>
  );
};

export default CppCodeEditor;

