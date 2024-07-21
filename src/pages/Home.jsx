import { useEffect, useRef, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button, Form, Input, Spin } from "antd";
import ProjectCard from "../components/ProjectCard";
import {
  EditOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {  getProjects, setProjectsDB } from "../lib/localDB";
import EmptyState from "../components/EmptyState";
import formatDate from "../lib/formatDate";

const Home = () => {
  const [projects, setProjects] = useState([]);

  const [isEditingProject, setIsEditingProject] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [form] = Form.useForm();
  const inputRef = useRef(null);
  useEffect(  () => {
    const storedProjects =   getProjects();
    if (storedProjects) {
      setProjects(storedProjects);
    }

    setIsLoading(false);
  }, []);
  const onFinish = (values) => {
    const { projectName, projectId } = values;
    if (isEditingProject) {
      const newProject = projects.map((p) => {
        if (p.id == projectId) {
          return { ...p, title: projectName };
        }
        return p;
      });
      setProjects(newProject);
      localStorage.setItem("projects", JSON.stringify(newProject));
      form.resetFields();
      
      setIsEditingProject(false);
    } else {
      const project = {
        id: new Date().getTime(),
        title: values.projectName,
        tasks: [],
        createdAt: formatDate(new Date()),

      };
      const newProjects = [project, ...projects];
      setProjects(newProjects);
      localStorage.setItem("projects", JSON.stringify(newProjects));
    }


    form.setFieldsValue({
      projectName: "",
    })
  };
  

  const handleDeleteProjct = (id) => {
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

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 w-100">
        <Spin />
      </div>
    )
  }
  return (
    
    <Container fluid className="home-bg-color ">
     
      <Row className=" vh-100 mx-0 justify-content-md-center align-items-center py-5">
        <Col sm={12} className="bg-white shadow-lg py-5 rounded" md={7}>
         
          <Row>
            <div className="d-flex   justify-content-center p-0 ">
              <Form
                form={form}
                className="  flex-nowrap justify-content-md-center "
                name="homeForm"
                size="middle"
                
                
                style={{
                  maxWidth: 1000,
                }}
                initialValues={{
                  remember: true,
                }}
                onFinish={onFinish}
                autoComplete="off"
                layout="inline"
              >
                <Form.Item
                  name="projectName"
                  rules={[
                    {
                      required: true,
                      message: "Please enter Project name!",
                    },
                  ]}
                  required={false}
                  
                >
                  <Input ref={inputRef} />
                </Form.Item>

                <Form.Item name="projectId" style={{ display: "none" }}>
                  <Input type="hidden" />
                </Form.Item>

                <Form.Item style={{ width: "10%" }} wrapperCol={{}}>
                  {!isEditingProject ? (
                    <Button
                      icon={<PlusOutlined className="fs-5" />}
                      type="primary"
                      htmlType="submit"
                      style={{ backgroundColor: "", border: "none" }}
                    >
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
              {/* </Col> */}
            </div>
          </Row>
          
          <div className="align-items-md-center flex-wrap d-flex flex-md-column py-5 ">
            <div>
             
              <div>
                
              </div>

            </div>
            


            <p className="align-self-start badge bg-success fs-6 text-white ">Total Projects/Goals: {projects.length}</p>
            {projects.length != 0 ? (
              projects.map((project) => (

                <ProjectCard
                  key={project.id}
                  project={project}
                  handleDeleteProjct={handleDeleteProjct}
                  handleEditProject={handleEditProject}
                />
              ))
            ) : (
              <EmptyState  firstMessage="Add a Project/Goal"  secondMessage="Unlock your full potential with clear focus."/>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
