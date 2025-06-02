import { useState } from "react";
import { Box, Button, Text, useToast } from "@chakra-ui/react";
import { executeCode } from "../api";

const Output = ({ editorRef }) => {
  const toast = useToast();
  const [output, setOutput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const runCode = async () => {
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;

    try {
      setIsLoading(true);
      const { run: result } = await executeCode("javascript", sourceCode);
      setOutput(result.output.split("\n"));
      setIsError(!!result.stderr);
    } catch (error) {
      console.log(error);
      toast({
        title: "An error occurred.",
        description: error.message || "Unable to run code",
        status: "error",
        duration: 6000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box flex="1" p={4} bg="gray.800">
      <Text fontSize="2xl" fontWeight="bold" mb={3} textAlign="left" color="white">
        Output
      </Text>

      {/* Run Code Button */}
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

      {/* Output Box */}
      <Box
        height="calc(100vh - 100px)" // Full height minus header & button spacing
        p={4}
        border="1px solid"
        borderRadius={4}
        borderColor={isError ? "red.500" : "white"}
        bg="blackAlpha.800" // Darker output box
        overflowY="auto" // Scroll for long output
      >
        {output && output.length > 0 ? (
          output.map((line, i) => (
            <Text key={i} color="white"> {/* ✅ Ensures text is always white */}
              {line}
            </Text>
          ))
        ) : (
          <Text color="white">Click "Run Code" to see the output here</Text>
        )}
      </Box>
    </Box>
  );
};

export default Output;




