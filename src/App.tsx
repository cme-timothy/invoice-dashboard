import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter as Router } from "react-router-dom";
import { Flex } from "@chakra-ui/react";
import Main from "./components/Main";
import Header from "./components/Header";

export default function App() {
  return (
    <HelmetProvider>
      <Router>
        <Flex bg="blackAlpha.50">
          <Header />
          <Main />
        </Flex>
      </Router>
    </HelmetProvider>
  );
}
