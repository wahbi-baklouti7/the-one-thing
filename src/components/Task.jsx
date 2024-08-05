import { DeleteFilled, EditFilled } from "@ant-design/icons";
import { Button, Card,Checkbox } from "antd";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useParams } from "react-router-dom";
import { useTasks } from "../context/TaskContext";

const Task = ({
  task,
  index,
}) => {
  const { id } = useParams()
  const {changeTaskStatus,handleDelete,orderTasks,handleEditTask} = useTasks()
  const checkedTask = task.completed ? "checked" : "";



  const onChange = (e) => {
    changeTaskStatus(task.id, e.target.checked, id);
    orderTasks();
  };

  



  return (
    <Card
      className="card-custom shadow rounded"
      bordered={true}
      size="small"
      style={{
        marginTop: 16,
      }}
    >
      <Row className="align-middle">
        <Col md={9} xs={9} className="bg-dangerr d-flex align-items-center  ">
          <Checkbox
            checked={task.completed}
            onChange={onChange}
            disabled={index != 0 && !task.completed}
          >
          </Checkbox>
          <p className= {`${checkedTask}  m-0 ms-2 text-truncate`}>{task.title}</p>
        </Col>
        <Col md={3} xs={3}>
          <div className=" d-flex justify-content-end">
            <Button
              icon={<EditFilled color="danger" className="fs-5 " />}
              onClick={() => handleEditTask(task.title, task.id)}
              type="text"
              shape="circle"
              style={{ border: "none" }}
            ></Button>
            <Button
              icon={<DeleteFilled className="fs-5 " />}
              onClick={() => handleDelete(task.id,id)}
              type="text"
              shape="circle"
              danger
            ></Button>
          </div>
        </Col>
      </Row>
      {/* </Button> */}
    </Card>
  );
};

export default Task;
