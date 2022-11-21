import { Flex, Heading, Box } from "@chakra-ui/react";
import Navbar from "./Navbar";
import LogIn from "./LogIn";

export default function Header() {
  return (
    <Flex
      color="whiteAlpha.500"
      direction="column"
      p="2.5em"
      h="100vh"
      bg="blackAlpha.900"
    >
      <Box>
        <Heading color="white">Dashboard</Heading>
        <Navbar />
      </Box>
      <Flex flex={1} />
      <Box>
        <LogIn />
      </Box>
    </Flex>
  );
}
