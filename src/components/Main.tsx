import { Routes, Route } from "react-router-dom";
import Overview from "../pages/overview/Overview";
import Invoices from "../pages/invoices/Invoices";
import Tasks from "../pages/tasks/Tasks";
import Timekeeping from "../pages/timekeeping/Timekeeping";
import Projects from "../pages/projects/Projects";
import NoMatch from "./NoMatch";

export default function Main() {
  return (
    <Routes>
      <Route index element={<Overview />} />
      <Route path="invoices" element={<Invoices />} />
      <Route path="tasks" element={<Tasks />} />
      <Route path="timekeeping" element={<Timekeeping />} />
      <Route path="projects" element={<Projects />} />
      <Route path="*" element={<NoMatch />} />
    </Routes>
  );
}
