import  { useState } from "react";
import { Button, Popconfirm, Popover } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import { useProject } from "../context/ProjectContext";

const ProjectActions = ({ id }) => {
  const { handleDeleteProject, handleEditProject } = useProject();

  const [open, setOpen] = useState(false);
  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };

  return (
    <Popover
      placement="bottomRight"
      content={
        <>
          <p>
            <a onClick={() => handleEditProject(id)}>Edit</a>
          </p>

          <Popconfirm
            title="Are you sure to delete ?"
            placement="top"
            okText="Yes"
            cancelText="No"
            onConfirm={() => handleDeleteProject(id)}
          >
            {" "}
            <Button className="m-0 p-0" type="transparent">
              Delete
            </Button>{" "}
          </Popconfirm>
        </>
      }
      trigger="click"
      open={open}
      onOpenChange={handleOpenChange}
    >
      <Button type="transparent">
        <MoreOutlined />
      </Button>
    </Popover>
  );
};

export default ProjectActions;
