import React, { useState } from "react";
import { Box, Button, Text, useToast } from "@chakra-ui/react";
import { executeCode } from "../api"; // Ensure this is correctly set

const JavaOutput = ({ editorRef }) => {
  const toast = useToast();
  const [output, setOutput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const runCode = async () => {
    const sourceCode = editorRef.current?.getValue();
    
    // Handle empty code case
    if (!sourceCode) {
      toast({
        title: "No Code Provided",
        description: "Please enter some Java code before running.",
        status: "warning",
        duration: 4000,
      });
      return;
    }

    try {
      setIsLoading(true);
      setOutput([]); // Clear previous output before running
      
      // 🔍 Debugging: Log input code
      console.log("Executing Java Code:\n", sourceCode);

      const result = await executeCode("java", sourceCode);

      // 🔍 Debugging: Log API response
      console.log("Execution Result:", result);

      // Validate response format
      if (!result || !result.run) {
        throw new Error("Invalid API response format");
      }

      // Extract output or show a fallback message
      const executionOutput = result.run.output
        ? result.run.output.split("\n")
        : ["No output from execution"];

      setOutput(executionOutput);
      setIsError(Boolean(result.run.stderr));

    } catch (error) {
      console.error("Execution Error:", error); // Debugging log
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
        height="calc(100vh - 100px)"
        p={4}
        color={isError ? "red.300" : "white"}
        border="1px solid"
        borderRadius={4}
        borderColor={isError ? "red.500" : "#444"}
        bg="gray.900"
        overflowY="auto"
      >
        {output
          ? output.map((line, i) => <Text key={i}>{line}</Text>)
          : <Text color="white">Click "Run Code" to see the output here</Text>}
      </Box>
    </Box>
  );
};

export default JavaOutput;
