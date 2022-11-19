import { Routes, Route } from "react-router-dom";
import Overview from "../pages/overview/Overview";
import Invoices from "../pages/invoices/Invoices";
import Tasks from "../pages/tasks/Tasks";
import TaskList from "../pages/tasks/task-list/TaskList";
import TimekeepingList from "../pages/tasks/timekeeping-list/TimekeepingList";
import Projects from "../pages/projects/Projects";
import NoMatch from "./NoMatch";

export default function Main() {
  return (
    <Routes>
      <Route index element={<Overview />} />
      <Route path="invoices" element={<Invoices />} />
      <Route path="tasks" element={<Tasks />}>
        <Route index element={<TaskList />} />
        <Route path="tasklist" element={<TaskList />} />
        <Route path="timekeepinglist" element={<TimekeepingList />} />
        <Route path="*" element={<NoMatch />} />
      </Route>
      <Route path="projects" element={<Projects />} />
      <Route path="*" element={<NoMatch />} />
    </Routes>
  );
}
