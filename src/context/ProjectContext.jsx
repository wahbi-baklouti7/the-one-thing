import { createContext, useContext, useRef, useState } from "react";
import { getProjectsDB, setProjectsDB } from "../lib/localDB";
import { Form } from "antd";
import formatDate from "../lib/formatDate";

const ProjectContext = createContext();
const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const inputRef = useRef(null);
  const [isEditingProject, setIsEditingProject] = useState(false);
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(true);

  const getProjects = () => {
    const project = getProjectsDB();
    setProjects(project);
    setIsLoading(false);
  };
  const addProject = (projectName) => {
    const project = {
      id: new Date().getTime(),
      title: projectName,
      tasks: [],
      createdAt: formatDate(new Date()),
    };
    const newProjects = [project, ...projects];
    setProjects(newProjects);
    setProjectsDB(newProjects);
  };
  const updateProject = (projectId, projectName) => {
    const newProject = projects.map((p) => {
      if (p.id == projectId) {
        return { ...p, title: projectName };
      }
      return p;
    });
    setProjects(newProject);
    setProjectsDB(newProject);
    form.resetFields();

    setIsEditingProject(false);
  };
  const handleDeleteProject = (id) => {
    const newProjects = projects.filter((project) => project.id !== id);
    setProjects(newProjects);
    setProjectsDB(newProjects);
  };
  const handleEditProject = (id) => {
    form.setFieldsValue({
      projectName: projects.find((p) => p.id == id).title,
      projectId: id,
    });
    inputRef.current.focus();
    setIsEditingProject(true);
  };

  return (
    <ProjectContext.Provider
      value={{
        projects,
        setProjects,
        getProjects,
        addProject,
        handleDeleteProject,
        handleEditProject,
        updateProject,
        form,
        inputRef,
        isEditingProject,
        isLoading,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export default ProjectProvider;

export const useProject = () => {
  return useContext(ProjectContext);
};
