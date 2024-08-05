import { useEffect, useState } from "react";
import ProgressBar from "../components/ProgressBar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button, Spin, Form, Input } from "antd";
import Task from "../components/Task";

import { useParams } from "react-router-dom";
import { getProjectDB } from "../lib/localDB";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import EmptyState from "../components/EmptyState";
import ModalT from "../components/ModalT";
import { useTasks } from "../context/TaskContext";

const Project = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [projectName, setProjectName] = useState("");

  const {
    getTasks,
    addTask,
    isEditingTask,
    inputRef,
    tasks,
    updateTask,
    setTasks,
    getCompletedTasks,
    getTotalTasks,
    form,
  } = useTasks();

  useEffect(() => {
    getTasks(id);
    setProjectName(getProjectDB(id).title);
    setIsLoading(false);
  }, []);

  const onFinish = (values) => {
    if (isEditingTask) {
      updateTask(id, values.projectItem, values.taskId);
    } else {
      addTask(id, values.projectItem);
    }
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

            <Col className=" bg-white shadow-sm rounded d-flex flex-column text-center align-items-center justify-content-center py-3 px-3 d-flex mb-5">
              <p className=" fs-5 fw-bold">{projectName}</p>
              <div className="d-flex  justify-content-center align-items-center">
                <div className="  me-3 text-center">
                  <p className="m-0  ">
                    Tasks:{" "}
                    <span className="badge bg-primary align-text-bottom fs-6">
                      {getTotalTasks()}
                    </span>
                  </p>
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
              <div className=" my-2">
                <ModalT tasks={tasks} setTasks={setTasks} projectId={id} />
              </div>
              <div className=" d-flex flex-column justify-content-center align-items-center  ">
                {tasks.length == 0 ? (
                  <EmptyState
                    firstMessage="Add a task or an item"
                    secondMessage="Focus your energy, achieve more."
                  />
                ) : (
                  tasks.map((task, i) => (
                    <Task index={i} key={task.id} task={task} />
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
