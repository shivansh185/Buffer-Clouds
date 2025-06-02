import React, { useState } from "react";
import { Box, Button, Text, useToast } from "@chakra-ui/react";
import { executeCode } from "../api"; // Ensure this is correctly set

const TypescriptOutput = ({ editorRef }) => {
  const toast = useToast();
  const [output, setOutput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const runCode = async () => {
    const sourceCode = editorRef.current?.getValue();
    if (!sourceCode) return;
    try {
      setIsLoading(true);
      const { run: result } = await executeCode("typescript", sourceCode);
      setOutput(result.output.split("\n"));
      setIsError(!!result.stderr);
    } catch (error) {
      toast({
        title: "Execution Error",
        description: error.message || "Unable to run the code",
        status: "error",
        duration: 6000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box flex="1" p={4} bg="gray.800" borderLeft="1px solid #333">
      <Text mb={2} fontSize="xl" fontWeight="bold" color="white">
        Output
      </Text>
      <Button
        width="100%"
        py={2}
        fontSize="lg"
        bg="linear-gradient(to right, #38A169, #2F855A, #276749)"
        color="white"
        _hover={{ bg: "linear-gradient(to right, #2F855A, #276749)", transform: "scale(1.05)" }}
        _active={{ transform: "scale(0.95)" }}
        transition="all 0.2s"
        mb={4}
        isLoading={isLoading}
        onClick={runCode}
      >
         Run Code
      </Button>
      <Box
  height="calc(100vh - 100px)" // Full height minus header & button spacing
  p={4}
  color={isError ? "red.300" : "white"} // Brighter color for visibility
  border="1px solid"
  borderRadius={4}
  borderColor={isError ? "red.500" : "#444"} // Slightly lighter border
  bg="gray.900" // Dark but not fully black
  overflowY="auto" // Enables scrolling for long output
>
  {output
    ? output.map((line, i) => <Text key={i}>{line}</Text>)
    : <Text color={"white"}>Click "Run Code" to see the output here</Text>}
</Box>

    </Box>
  );
};

export default TypescriptOutput;
