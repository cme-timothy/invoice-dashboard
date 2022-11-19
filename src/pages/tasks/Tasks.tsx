import { Outlet } from 'react-router-dom';
import TasksNavbar from "./TasksNavbar";

export default function Tasks() {
  return (
    <>
      <TasksNavbar />
      <Outlet />
    </>
  );
}
