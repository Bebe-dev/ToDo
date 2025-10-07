import { CircularProgress } from "@mui/material";
import CompleteTask from "./completeTask";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export default function TaskStatus() {

  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  const completedTasks = useSelector(
    (state: RootState) => state.tasks.completedTasks
  );

  
  return (
    <div className="pl-20 pt-4">
      <div className="flex gap-4">
        <img src="images/TaskComplete.svg" alt="stats" />
        <p className="text-[#FF6767]">Task Status</p>
      </div>

      <div className="flex gap-8 pt-10">
        <div>
          <CircularProgress
            size={100}
            variant="determinate"
            value={completedTasks.length/(tasks.length+completedTasks.length)*100}
            sx={{ color: "#05A301" }}
          />
          <div className="flex gap-2">
            <img src="images/green.svg" alt="completed" />
            <p>Completed</p>
          </div>
        </div>       
        <div>
          <CircularProgress
            size={100}
            variant="determinate"
            value={tasks.length/completedTasks.length*100}
            sx={{ color: "#F21E1E" }}
          />
          <div className="flex gap-2">
            <img src="images/red.svg" alt="not started" />
            <p>Not Started</p>
          </div>
        </div>
      </div>

      <CompleteTask />
    </div>
  );
}
