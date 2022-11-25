import { Helmet } from "react-helmet-async";
import {
  Flex,
  Heading,
  TableContainer,
  Table,
  Thead,
  Tr,
  Td,
  Th,
  Tbody,
  Button,
  Box,
  useMediaQuery,
} from "@chakra-ui/react";
import { useDataContext } from "../../hooks/useDataContext";
import { useEffect } from "react";
import axios from "axios";
import NavbarToggle from "../../components/NavbarToggle";

export default function Project({ onToggle }: Toggle) {
  const { projects, getProjects, tasks, getTasks, token } = useDataContext();
  const [phoneSize] = useMediaQuery("(max-width: 950px)");

  useEffect(() => {
    getProjects();
    getTasks();
  }, []);

  async function deleteProject(id: number) {
    const accessToken = token();
    if (accessToken !== false) {
      try {
        await axios.delete(`http://localhost:3000/projects/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken.accessToken}`,
          },
        });
        getProjects();
        getTasks();
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("not logged in");
    }
  }

  return (
    <>
      <Helmet>
        <title>Invoice dashboard - Projects</title>
      </Helmet>
      <Flex direction="column" w="100%" h="100vh">
        <Flex h="5.5em" bg="white" align="center">
          {phoneSize && <NavbarToggle onToggle={onToggle} />}
          <Heading p="1em" ml="1em">
            Projects
          </Heading>
        </Flex>
        <Flex direction="column" overflow="auto">
          <Box minH="min-content">
            <TableContainer m="2em" bg="white">
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Project Name</Th>
                    <Th>Amount of Tasks</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {projects.map((project) => {
                    const allTasks = tasks.filter((task) => {
                      return task.project === project.name;
                    });
                    return (
                      <Tr
                        key={project.id}
                        borderTop="1px solid"
                        borderBottom="1px Solid"
                        borderColor="gray.100"
                      >
                        <Td>{project.name}</Td>
                        <Td>{allTasks.length}</Td>
                        <Td p="0.5em">
                          <Button onClick={() => deleteProject(project.id)}>
                            Delete
                          </Button>
                        </Td>
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
        </Flex>
      </Flex>
    </>
  );
}
