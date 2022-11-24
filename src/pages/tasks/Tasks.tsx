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
} from "@chakra-ui/react";
import { useDataContext } from "../../hooks/useDataContext";
import { useEffect } from "react";
import axios from "axios";

export default function Tasks() {
  const { tasks, getTasks, token } = useDataContext();

  useEffect(() => {
    getTasks();
  }, []);

  async function deleteTask(id: number) {
    const accessToken = token();
    if (accessToken !== false) {
      try {
        await axios.delete(`http://localhost:3000/tasks/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken.accessToken}`,
          },
        });
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
        <title>Invoice dashboard - Task List</title>
      </Helmet>
      <Flex direction="column" w="100%" h="100vh">
        <Flex h="5.5em" bg="white" align="center">
          <Heading p="1em">Tasks</Heading>
        </Flex>
        <TableContainer m="2em" bg="white">
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Task Name</Th>
                <Th>Project Name</Th>
              </Tr>
            </Thead>
            <Tbody>
              {tasks.map((task) => {
                return (
                  <Tr
                    key={task.id}
                    borderTop="1px solid"
                    borderBottom="1px Solid"
                    borderColor="gray.100"
                  >
                    <Td>{task.name}</Td>
                    <Td>{task.project}</Td>
                    <Td p="0.5em">
                      <Button onClick={() => deleteTask(task.id)}>
                        Delete
                      </Button>
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </Flex>
    </>
  );
}
