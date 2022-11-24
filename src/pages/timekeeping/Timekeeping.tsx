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

export default function Timekeeping() {
  const { tasks, getTasks, token } = useDataContext();

  useEffect(() => {
    getTasks(true);
  }, []);

  async function patchTask(id: number) {
    const accessToken = token();
    if (accessToken !== false) {
      try {
        await axios.patch(
          `http://localhost:3000/tasks/${id}`,
          { seconds: 0, time: "00:00:00" },
          {
            headers: {
              Authorization: `Bearer ${accessToken.accessToken}`,
            },
          }
        );
        getTasks(true);
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
        <title>Invoice dashboard - Timekeeping</title>
      </Helmet>
      <Flex direction="column" w="100%" h="100vh">
        <Flex h="5.5em" bg="white" align="center">
          <Heading p="1em">Tasks</Heading>
        </Flex>
        <TableContainer m="2em" bg="white">
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Time</Th>
                <Th>Task Name</Th>
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
                    <Td>{task.time}</Td>
                    <Td>{task.name}</Td>
                    <Td p="0.5em">
                      <Button onClick={() => patchTask(task.id)}>Delete</Button>
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
