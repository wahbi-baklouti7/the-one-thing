import React, { useEffect, useState } from "react";
import { Button, Modal } from "antd";
import {  getProjectDB, setProjectTasksDB } from "../lib/localDB";

const ModalT = ({ tasks, setTasks, projectId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [first, setFirst] = useState({ title: "", id: null });
  const [second, setSecond] = useState({ title: "", id: null });
  const [counter, setCounter] = useState(0);
  const [firstIndex, setFirstIndex] = useState(0);
  const [secondIndex, setSecondIndex] = useState(1);
  const [isEnable, setIsEnable] = useState(false);
  const [newTasks, setNewTasks] = useState([]);

  const [tasksNotCompleted, setTasksNotCompleted] = useState([]);

  const checkNumberOfTasks = () => {
    const notCompletedTasks = tasks.filter((task) => !task.completed);
    if (notCompletedTasks.length > 1) {
      setIsEnable(true);
    } else {
      setIsEnable(false);
    }
  };
  useEffect(() => {
      const project = getProjectDB(projectId);
      const notCompletedTasks = project.tasks.filter(
        (task) => !task.completed
      );
      setTasksNotCompleted(notCompletedTasks);
      
      
  }, [isModalOpen]);

  useEffect(() => {
    checkNumberOfTasks();
    setNewTasks(tasks.map((task) => ({ ...task, priority: 0 })));
  }, [tasks]);
  const showModal = () => {
    getFirst();
    getSecond();
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const getFirst = () => {
    const task = tasks[0];
    setFirst({ title: task?.title, id: task?.id });
  };
  const getSecond = () => {
    const task = tasks[1];
    setSecond({ title: task?.title, id: task?.id });
  };

  const updatePriority = (taskId) => {
    const index = newTasks.findIndex((t) => t.id == taskId);
    if (index != -1) {
      const updatedTasks = [...newTasks];
      updatedTasks[index].priority++;
      setNewTasks(updatedTasks);
    }
  };
 
  const prioritize = (taskId) => {
    let isFinish = false;


    if (counter == tasksNotCompleted.length - 1) {
      updatePriority(taskId);

      if(secondIndex == 2){
        isFinish = true;
      }
      
    }
    if (tasksNotCompleted.length == 2) {
      updatePriority(taskId);
      isFinish = true;
    } else if (
      counter <= tasksNotCompleted.length - 1
    ) {
      if (secondIndex < tasksNotCompleted.length - 1) {
      

        if (first.id == tasksNotCompleted[secondIndex + 1]?.id) {
          if (!tasksNotCompleted[secondIndex + 2]?.id) {
            isFinish = true;
          }
          setSecondIndex((prev) => prev + 2);
          setFirst({
            title: tasksNotCompleted[firstIndex]?.title,
            id: tasksNotCompleted[firstIndex]?.id,
          });
          setSecond({
            title: tasksNotCompleted[secondIndex + 2]?.title,
            id: tasksNotCompleted[secondIndex + 2]?.id,
          });
        } else {
          setSecondIndex((prev) => prev + 1);
          setFirst({
            title: tasksNotCompleted[firstIndex]?.title,
            id: tasksNotCompleted[firstIndex]?.id,
          });
          setSecond({
            title: tasksNotCompleted[secondIndex + 1]?.title,
            id: tasksNotCompleted[secondIndex + 1]?.id,
          });
        }
      } else {
        setCounter((prev) => prev + 1);
        setFirstIndex((prev) => prev + 1);
        setSecondIndex(0);

        setFirst({
          title: tasksNotCompleted[firstIndex + 1]?.title,
          id: tasksNotCompleted[firstIndex + 1]?.id,
        });
        setSecond({
          title: tasksNotCompleted[0]?.title,
          id: tasksNotCompleted[0]?.id,
        });
      }
 
      updatePriority(taskId);
    }
    if (isFinish) {
      const newTasksOrder = [...newTasks].sort(
        (a, b) => b.priority - a.priority
      );
      setTasks(newTasksOrder);
        setProjectTasksDB(projectId, newTasksOrder);
        
      setIsModalOpen(false);
      setFirstIndex(0);
      setSecondIndex(1);
      setCounter(0);
    }
  };

  return (
    <>
      {isEnable && <Button disabled={!isEnable}  className="prioritize-button m-3 bg-warning text-black fw-bold p-3"  onClick={showModal}>
        Prioritize Tasks
      </Button>}
      
      <Modal
        maskClosable={false}
        closable={false}
        okButtonProps={{ disabled: true, style: { display: "none" } }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p className="text-center fs-5 fw-bold">
          {" "}
          <q>
            {" "}
            What&#39;s the one thing you can do, such that by doing it,
            everything else will be easier or unnecessary?{" "}
          </q>
        </p>
        <Button
          id="first"
          className="box-buttonv  w-100  text-wrap text-truncate  p-5 mb-3"
          type="primary"
          size="large"
          onClick={() => prioritize(first.id)}
        >
          {" "}
          {first.title}{" "}
        </Button>
        <p className="text-danger text-center fs-3 fw-bold">Or</p>
        <Button
          id="second"
          className="box-buttonv  w-100  text-wrap   p-5"
          type="primary"
          size="large"
          onClick={() => prioritize(second.id)}
        >
          {" "}
          {second.title}{" "}
        </Button>


      </Modal>
    </>
  );
};

export default ModalT;