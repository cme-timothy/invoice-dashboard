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
import CreateInvoice from "./CreateInvoice";
import { useEffect } from "react";
import { useDataContext } from "../../hooks/useDataContext";
import axios from "axios";

export default function Invoices() {
  const { invoices, getInvoices, getProjects, getTasks, token } =
    useDataContext();

  useEffect(() => {
    getProjects();
    getTasks();
    getInvoices();
  }, []);

  async function deleteInvoice(id: number) {
    const accessToken = token();
    if (accessToken !== false) {
      try {
        await axios.delete(`http://localhost:3000/invoices/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken.accessToken}`,
          },
        });
        getInvoices();
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
              {invoices.map((invoice) => {
                return (
                  <Tr
                    key={invoice.id}
                    borderTop="1px solid"
                    borderBottom="1px Solid"
                    borderColor="gray.100"
                  >
                    <Td>{invoice.customerName}</Td>
                    <Td>{invoice.sumTotal}</Td>
                    <Td>{invoice.expirationDate}</Td>
                    <Td>{invoice.status}</Td>
                    <Td p="0.5em">
                      <Button onClick={() => deleteInvoice(invoice.id)}>
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
