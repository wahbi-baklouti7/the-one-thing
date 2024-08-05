import { createContext, useContext, useRef, useState } from "react";
import { getProjectTasks, setProjectTasksDB } from "../lib/localDB";
import { Form } from "antd";

const TaskContext = createContext();
const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [isEditingTask, setIsEditingTask] = useState(false);
  const [form] = Form.useForm();
  const inputRef = useRef(null);

  const getTasks = (id) => {
    const task = getProjectTasks(id).sort((a, b) => a.completed - b.completed);
    setTasks(task);
  };

  const updateTask = (projectId, NewTaskTitle, taskId) => {
    const newTask = tasks.map((task) => {
      if (task.id == taskId) {
        return { ...task, title: NewTaskTitle };
      }
      return task;
    });
    setTasks(newTask);
    setProjectTasksDB(projectId, newTask);
    form.resetFields();
    setIsEditingTask(false);
  };
  const addTask = (projectId, taskTitle) => {
    const task = {
      id: new Date().getTime(),
      title: taskTitle,
      completed: false,
      priority: 0,
    };
    setTasks((prevState) => {
      const newTasks = [task, ...prevState];
      setProjectTasksDB(projectId, newTasks);
      return newTasks;
    });

    form.setFieldsValue({
      projectItem: "",
    });
  };

  const handleEditTask = (values, taskId) => {
    form.setFieldsValue({
      projectItem: values,
      taskId: taskId,
    });

    inputRef.current.focus();

    setIsEditingTask(true);
  };

  const handleDelete = (taskId, ProjectId) => {
    const newTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(newTasks);
    setProjectTasksDB(ProjectId, newTasks);
  };

  const getCompletedTasks = () => {
    return tasks.filter((task) => task.completed).length;
  };
  const getTotalTasks = () => {
    return tasks.length;
  };

  const changeTaskStatus = (taskId, status, projectId) => {
    const newTasks = tasks.map((task) => {
      if (task.id == taskId) {
        return { ...task, completed: status };
      }
      return task;
    });
    setTasks(newTasks);
    setProjectTasksDB(projectId, newTasks);
  };
  const orderTasks = () => {
    setTasks((prevTasks) =>
      prevTasks.sort((a, b) => a.completed - b.completed)
    );
  };
  return (
    <TaskContext.Provider
      value={{
        tasks,
        form,
        inputRef,
        addTask,
        updateTask,
        handleEditTask,
        isEditingTask,
        setTasks,
        getTasks,
        handleDelete,
        getCompletedTasks,
        getTotalTasks,
        changeTaskStatus,
        orderTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export default TaskProvider;

export const useTasks = () => useContext(TaskContext);
