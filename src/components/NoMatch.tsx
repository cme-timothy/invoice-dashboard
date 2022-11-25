import { Helmet } from "react-helmet-async";
import { Flex, Heading } from "@chakra-ui/react";

export default function NoMatch() {
  return (
    <>
      <Helmet>
        <title>Page does not exist!</title>
      </Helmet>
      <Flex direction="column" w="100%" h="100vh">
        <Flex h="5.5em" bg="white" align="center">
          <Heading p="1em">No Match </Heading>
        </Flex>
        <Heading m="1em" bg="white" h="100%" p="1em">
          Wrong URL: Page does not exist!
        </Heading>
      </Flex>
    </>
  );
}
