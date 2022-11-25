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
} from "@chakra-ui/react";
import CreateInvoice from "./CreateInvoice";
import { useEffect } from "react";
import { useDataContext } from "../../hooks/useDataContext";

export default function Invoices() {
  const { projects, getProjects, tasks, getTasks } = useDataContext();

  useEffect(() => {
    getProjects();
    getTasks();
  }, []);

  return (
    <>
      <Helmet>
        <title>Invoice dashboard - Invoices</title>
      </Helmet>
      <Flex direction="column" w="100%" h="100vh">
        <Flex justify="space-between" h="5.5em" bg="white" align="center">
          <Heading p="1em">Invoices</Heading>
          <CreateInvoice />
        </Flex>
        <TableContainer m="2em" bg="white">
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Customer Name</Th>
                <Th>Sum total</Th>
                <Th>Expiration date</Th>
                <Th>Status</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>0</Td>
                <Td>0</Td>
                <Td>0</Td>
                <Td>0</Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </Flex>
    </>
  );
}
