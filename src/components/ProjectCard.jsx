import { Card } from "antd";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ProgressBar from "../components/ProgressBar";


import {  useNavigate } from "react-router-dom";
import ProjectActions from "./ProjectActions";
import { CheckSquareFilled, CheckSquareOutlined, ClockCircleFilled, ClockCircleOutlined } from "@ant-design/icons";

const ProjectCard = ({  project, handleDeleteProjct, handleEditProject }) => {
  const navigate = useNavigate();
  const getCompletedTasks = () => {
    return project.tasks.filter((task) => task.completed).length;
  };
  const getTotalTasks = () => {
    return project.tasks.length;
  };

  return (
    <Card
      hoverable={true}
      extra={
        <div onClick={(e) => e.stopPropagation()}>
          <ProjectActions
            id={project.id}
            project={project}
            getCompletedTasks={getCompletedTasks}
            getTotalTasks={getTotalTasks}
            handleDeleteProjct={handleDeleteProjct}
            handleEditProject={handleEditProject}
          />
        </div>
      }
      size="small"
      className=" bg-project-card project-card"
      onClick={() => navigate(`/project/${project.id}`)}
      key={project.id}
      style={{
        width: 350,
        marginTop: 16,
      }}
    >
      <Row className="w-100 bg-warningr justify-content-between">
        {/* Begin Project Details */}
        <Col md={8} xs={8} className=" align-self-end ">
          <h4 className="mb-4  text-break ">{project.title}</h4>
          <p className="m-0">
            Tasks: {getCompletedTasks()} / {getTotalTasks()} 
          </p>
          <p>Created at : {project.createdAt} </p> 

        </Col>
        <Col md={3} xs={3} className="p-0 m-0  justify-content-end">
          <ProgressBar
            completedTask={getCompletedTasks()}
            totalTask={getTotalTasks()}
            type="circle"
            size={90}
          />


        </Col>
        {/* End Project Progress */}
      </Row>
    </Card>
  );
};

export default ProjectCard;
