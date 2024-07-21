import { useEffect, useRef, useState } from "react";
import ProgressBar from "../components/ProgressBar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button, Spin } from "antd";
import Task from "../components/Task";

import { Form, Input } from "antd";
import { useParams } from "react-router-dom";
import {
  getData,
  storeData,
  getProjectTasks,
  setProjectTasksDB,
} from "../lib/localDB";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import EmptyState from "../components/EmptyState";
import ModalT from "../components/ModalT";
import create from "@ant-design/icons/lib/components/IconFont";

const Project = () => {
  const { id } = useParams();
  const [tasks, setTasks] = useState([]);
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(true);
  const [isEditingTask, setIsEditingTask] = useState(false);

  const inputRef = useRef(null);

  

  useEffect(() => {
    const tasks = getProjectTasks(id).sort((a, b) => a.completed - b.completed);
    setTasks(tasks);
    setIsLoading(false);
  }, []);

  const onFinish = (values) => {
    if (isEditingTask) {

      const { projectItem, taskId } = values;
      const newTask = tasks.map((task) => {
        if (task.id == taskId) {
          return { ...task, title: projectItem };
        }
        return task;
      });
      setTasks((prevState) => newTask);
      setProjectTasksDB(id, newTask);
      form.resetFields();
      setIsEditingTask(false);
    } else {
      const task = {
        id: new Date().getTime(),
        title: values.projectItem,
        completed: false,
        priority: 0,
      };
      const project = getData("projects");
      const getProject = project.find((p) => p.id == id);
      getProject.tasks.unshift(task);
      storeData("projects", project);
      setTasks((prevState) => [task, ...prevState]);

      form.setFieldsValue({
        projectItem: "",
      });
    }
  };

  const handleDelete = (taskId) => {
    const newTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(newTasks);
    setProjectTasksDB(id, newTasks);
  };
  const changeTaskStatus = (taskId, status) => {
    const newTasks = tasks.map((task) => {
      if (task.id == taskId) {
        return { ...task, completed: status };
      }
      return task;
    });
    setTasks(newTasks);
    const project = getData("projects");
    const getProject = project.find((p) => p.id == id);
    getProject.tasks = newTasks;
    storeData("projects", project);
  };

  const getCompletedTasks = () => {
    return tasks.filter((task) => task.completed).length;
  };
  const getTotalTasks = () => {
    return tasks.length;
  };

  const handleEditTask = (values, taskId) => {
    form.setFieldsValue({
      projectItem: values,
      taskId: taskId,
    });

    inputRef.current.focus();

    setIsEditingTask(true);
  };




  const orderNewTasks = () => {
    setTasks((prevTasks) =>
      prevTasks.sort((a, b) => a.completed - b.completed)
    );
  
  };

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 w-100">
        <Spin />
      </div>
    );
  }
  return (
    <div>
      <Container fluid className="bg-projects">
        <Row className=" vh-100 mx-0 justify-content-center align-items-center py-4 ">
          <div className="w-100 w-md-50 justify-content-center align-items-center">
            {/* Begin Progress Bar */}
            <Col className=" bg-white shadow-sm rounded  justify-content-center py-3 d-flex mb-5">
              <div className="d-flex   justify-content-center align-items-center">
                <div className="  me-3 text-center">
              
                  <p className="m-0  ">Tasks: <span className="badge bg-primary align-text-bottom fs-6">{getTotalTasks()}</span></p>
                  <p className="text-muted ">
                    {getCompletedTasks()}/{getTotalTasks()} tasks completed
                  </p>
                </div>

                <ProgressBar
                  completedTask={getCompletedTasks()}
                  totalTask={getTotalTasks()}
                  type="circle"
                  size={90}
                />
              </div>
            </Col>
            {/* End Progress Bar */}
            <Col sm={0} className=" bg-white shadow-lg py-5  rounded">
              <Row>
                <div className="d-flex justify-content-center  ">
                  <Form
                    className="flex-nowrap"
                    form={form}
                    name="projectForm"
                    labelCol={{
                      span: 8,
                    }}
                    wrapperCol={{
                      span: 100,
                    }}
                    style={{
                      maxWidth: 600,
                    }}
                    initialValues={{
                      remember: true,
                    }}
                    onFinish={onFinish}
                    autoComplete="off"
                    layout="inline"
                  >
                    <Form.Item
                      name="projectItem"
                      rules={[
                        {
                          required: true,
                          message: "Add a task or an item",
                        },
                      ]}
                      required={false}
                    >
                      <Input ref={inputRef} />
                    </Form.Item>
                    <Form.Item name="taskId" style={{ display: "none" }}>
                      <Input type="hidden" />
                    </Form.Item>

                    <Form.Item
                      wrapperCol={{
                        // offset: 8,

                        span: 1,
                      }}
                    >
                      {!isEditingTask ? (
                        <Button type="primary" htmlType="submit">
                          <PlusOutlined className="fs-5" />
                          Add
                        </Button>
                      ) : (
                        <Button
                          type="primary"
                          htmlType="submit"
                          style={{ backgroundColor: "primary", border: "none" }}
                        >
                          <EditOutlined className="fs-5" /> Edit
                        </Button>
                      )}
                    </Form.Item>
                  </Form>
                </div>
              </Row>
              <div className="text-centerr my-2">
                <ModalT tasks={tasks} setTasks={setTasks} projectId={id} />
              </div>
              <div className="bg-successs d-flex flex-column justify-content-center align-items-center  ">

                {tasks.length == 0 ? (
                  <EmptyState
                    firstMessage="Add a task or an item"
                    secondMessage="Focus your energy, achieve more."
                  />
                ) : (
                  tasks.map((task, i) => (
                    <Task
                      index={i}
                      key={task.id}
                      task={task}
                      tasks={tasks}
                      changeTaskStatus={changeTaskStatus}
                      handleDeleteTask={handleDelete}
                      handleEditTask2={handleEditTask}
                      orderNewTasks={orderNewTasks}
                    />
                  ))
                )}
              </div>
            </Col>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default Project;
