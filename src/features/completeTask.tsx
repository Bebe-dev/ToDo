import { Checkbox } from "@mui/material";
import { Calendar, Circle } from "tabler-icons-react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { undoTask } from "../reducers/taskReducer";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

export default function CompleteTask() {
  const dispatch = useDispatch();

  const completedTasks = useSelector(
    (state: RootState) => state.tasks.completedTasks
  );

  const handleUndoTask = (taskId: number) => {
    dispatch(undoTask(taskId));
  };

  return (
    <div className="pt-10">
      <div className="flex gap-4">
        <img src="images/TaskComplete.svg" alt="completed task" />
        <p className="text-[#F24E1E]">Completed Task</p>
      </div>

      {/* COMPLETED TASK ONE */}
      {/* <div className="pt-8">
        <div className=" flex gap-4 border-b-2 border-black pt-2">
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
        </div>
   
      </div> */}

      <div className="flex flex-col">
        {completedTasks.map((task:any) => (
          <div key={task.id} className="flex gap-4 border-b-2 border-black pt-2">
            <Checkbox
              {...label}
              icon={<Circle color="#FF6767" />}
              checkedIcon={<Circle color="#05A301" />}
              onChange={() => handleUndoTask(task.id)}
              checked={true}
            />
            <p>{task.title}</p>
            <div className="flex gap-24 justify-between items-center pb-2">
              <div className="flex gap-4">
                <Calendar />
                <p>{task.date}</p>
              </div>
              <div className="flex gap-4">
                <p>{task.description}</p>
                {/* <p>F</p> */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
