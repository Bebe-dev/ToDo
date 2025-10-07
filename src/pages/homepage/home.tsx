import Navbar from "../../components/navbar";
//import SideNav from "../../components/sidenav";
import TaskStatus from "../../features/taskStatus";
import ToDoList from "../../features/toDoList";

export default function HomePage() {
  return (
    <div>
      <Navbar />

      <div className="flex">
        {/* <SideNav /> */}
        <ToDoList />
        <TaskStatus />

        
      </div>
    </div>
  );
}
