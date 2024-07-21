import { Flex, Progress } from "antd";
import { useCallback, useEffect, useState } from "react";

const ProgressBar = ({
  completedTask,
  totalTask,
  type = "circle",
  size = "small",
}) => {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    if (totalTask >= 0) {
      calculatePercent();
    }
  }, [completedTask, totalTask]);

 

  const calculatePercent = () => {

    console.log("calculatePercent", completedTask, totalTask);
    if (totalTask === 0) {
      setPercent(0);
    }
    const percent = Math.round((completedTask / totalTask) * 100);
    setPercent(percent);
  };

  return (
    <Flex vertical gap="small">
      <Flex vertical gap="small">
        <Progress percent={percent} type={type} size={size} />
      </Flex>
    </Flex>
  );
};

export default ProgressBar;
