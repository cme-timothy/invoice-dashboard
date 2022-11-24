import { Helmet } from "react-helmet-async";
import { Flex, Heading, SimpleGrid, Box } from "@chakra-ui/react";
import { useDataContext } from "../../hooks/useDataContext";
import { useEffect } from "react";

export default function Overview() {
  const { projects, getProjects, tasks, getTasks } = useDataContext();

  useEffect(() => {
    getProjects();
    console.log(projects);
    getTasks();
    console.log(tasks);
  }, []);

  return (
    <>
      <Helmet>
        <title>Invoice dashboard - Overview</title>
      </Helmet>
      <Flex direction="column" w="100%" h="100vh">
        <Flex h="5.5em" bg="white" align="center">
          <Heading p="1em">Overview</Heading>
        </Flex>
        <SimpleGrid minChildWidth="25em" spacing="1em" m="2em" overflow="auto">
          <Box bg="white" minH="15em" p="1em">
            Projects
          </Box>
          <Box bg="white" minH="15em" p="1em">
            Tasks
          </Box>
          <Box bg="white" minH="15em" p="1em">
            Invoices
          </Box>
          <Box bg="white" minH="15em" p="1em">
            Logged time: past 30 days
          </Box>
          <Box bg="white" minH="15em" p="1em">
            Money earned: past year
          </Box>
        </SimpleGrid>
      </Flex>
    </>
  );
}
