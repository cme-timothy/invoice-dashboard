import React, { createContext, useState } from "react";
import axios from "axios";

interface PostResponse {
  accessToken: string;
  user: {
    email: string;
    id: number;
  };
}

type Projects = {
  name: string;
  color: string;
  id: number;
};

type Tasks = {
  project: string;
  color: string;
  name: string;
  date: string;
  time: string;
  seconds: number;
  projectId: string;
  id: number;
};

type InvoiceTasks = {
  seconds: number;
};

interface DashboardContext {
  token(): false | PostResponse;
  getProjects: () => Promise<void>;
  projects: Projects[];
  getTasks: (patch?: boolean) => Promise<void>;
  tasks: Tasks[];
  invoiceTasks: InvoiceTasks[];
  setInvoiceTasks: React.Dispatch<React.SetStateAction<InvoiceTasks[]>>;
}

export const DataContext = createContext<DashboardContext | null>(null);

export function DataProvider({ children }: { children?: React.ReactNode }) {
  const [projects, setProjects] = useState<Projects[]>([]);
  const [tasks, setTasks] = useState<Tasks[]>([]);
  const [invoiceTasks, setInvoiceTasks] = useState<InvoiceTasks[]>([]);

  function token() {
    const stringifiedAuthentication = localStorage.getItem("data");
    if (stringifiedAuthentication !== null) {
      const parsedAuthentication: PostResponse = JSON.parse(
        stringifiedAuthentication
      );
      function isData(data: PostResponse): data is PostResponse {
        return "accessToken" in data && "user" in data;
      }
      const data = isData(parsedAuthentication);
      if (data === true) {
        return parsedAuthentication;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  async function getProjects() {
    const accessToken = token();
    if (accessToken !== false) {
      try {
        const response = await axios.get<Projects[]>(
          "http://localhost:3000/projects",
          {
            headers: {
              Authorization: `Bearer ${accessToken.accessToken}`,
            },
          }
        );
        const dataChecked = response.data.map((project) => {
          return "name" in project && "color" in project && "id" in project;
        });

        const found = dataChecked.find((element) => element === false);
        if (found !== false) {
          setProjects(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("not logged in");
    }
  }

  async function getTasks(patch?: boolean) {
    const accessToken = token();
    if (accessToken !== false) {
      try {
        const response = await axios.get<Tasks[]>(
          "http://localhost:3000/tasks",
          {
            headers: {
              Authorization: `Bearer ${accessToken.accessToken}`,
            },
          }
        );

        const dataChecked = response.data.map((tasks) => {
          return (
            "project" in tasks &&
            "color" in tasks &&
            "name" in tasks &&
            "date" in tasks &&
            "time" in tasks &&
            "seconds" in tasks &&
            "projectId" in tasks &&
            "id" in tasks
          );
        });

        const found = dataChecked.find((element) => element === false);
        if (found !== false) {
          if (patch === true) {
            const allTimestamps = response.data.filter((task) => {
              return task.time !== "00:00:00";
            });
            setTasks(allTimestamps);
          } else {
            setTasks(response.data);
          }
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("not logged in");
    }
  }

  const dataValue = {
    token,
    getProjects,
    projects,
    getTasks,
    tasks,
    invoiceTasks,
    setInvoiceTasks,
  };

  return (
    <DataContext.Provider value={dataValue}>{children}</DataContext.Provider>
  );
}
