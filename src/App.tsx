import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter as Router } from "react-router-dom";
import Main from "./components/Main";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <HelmetProvider>
      <Router>
        <Navbar />
        <Main />
      </Router>
    </HelmetProvider>
  );
}
