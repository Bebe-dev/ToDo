import { Checkbox } from "@mui/material";
import { Calendar, Circle } from "tabler-icons-react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { completeTask } from "../reducers/taskReducer";
import { SetStateAction, useState } from "react";
import EditPopup from "./editpopup";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

export default function Tasks() {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  const [selectedTask, setSelectedTask] = useState(null);

  const handleTaskClick = (task: SetStateAction<null>) => {
    setSelectedTask(task);
  };

  const closePopup = () => {
    setSelectedTask(null);
  };

  const dispatch = useDispatch();

  const handleCompleteTask = (taskId: number) => {
    dispatch(completeTask(taskId));
  };

  return (
    <div>
      <div className="flex gap-4 pt-2">
        <div className="flex flex-col gap-2">
          {tasks.map((task, index) => (
            <div
              key={index}
              className="flex gap-4  w-[100%] border-b-2 border-black pt-2 cursor-pointer hover:border-2 hover:rounded-xl hover:border-[#FF6767] p-4"
              
            >
              <Checkbox
                {...label}
                icon={<Circle color="#FF6767" />}
                checkedIcon={<Circle color="#05A301" />}
                onChange={() => handleCompleteTask(task.id)}
                checked={false}
              />
              <div onClick={() => handleTaskClick(task)}>
                <div className="flex gap-16">
                  <p>{task.title}</p>
                  <div className="flex gap-4">
                    <Calendar />
                    <p>{task.date}</p>
                  </div>
                </div>
                <div className="flex gap-24 justify-between items-center pb-2">
                  <div className="flex gap-4">
                    <p>{task.description}</p>
                    
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedTask && <EditPopup task={selectedTask} onClose={closePopup} />}
      </div>

      {/* TASK 2 */}
      {/* <div className=" flex gap-4 border-b-2 border-black pt-2">
        <Checkbox
          {...label}
          icon={<Circle color="#FF6767" />}
          checkedIcon={<Circle color="#05A301" />}
        />

        <div>
          <div>User flow update</div>
          <div className="flex gap-24 justify-between items-center pb-2">
            <div className="flex gap-4">
              <Calendar />
              <p>Today till 11:00 am</p>
            </div>
            <div className="flex gap-4">
              <p>Fitness App</p>
              <p>F</p>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}




