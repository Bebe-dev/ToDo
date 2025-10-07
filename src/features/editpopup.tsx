import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteTask, updateTask } from "../reducers/taskReducer";
//import { RootState } from "@reduxjs/toolkit/query";

export default function EditPopup({ task, onClose }) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  const handleSave = () => {
    dispatch(updateTask({ id: task.id, updates: { title, description } }));
    onClose();
  };

  const handleDelete = () => {
    dispatch(deleteTask(task.id));
    onClose();
  };


  return (
    <div className="mx-10 w-[100%] border-l-2 border-[#FF6767] pl-2">
      <div className="popup-content flex flex-col gap-4">
        <h3 className="text-2xl text-[#FF6767] text-center">Edit Task</h3>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border-2 rounded-xl p-1"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border-2 rounded-xl p-1"
        />
        <div className="popup-actions flex gap-4 text-white mb-2">
          <button className="bg-[#FF6767] rounded px-2 hover:bg-white hover:text-black hover:border-2 hover:text-lg ease-in duration-100" onClick={handleSave}>Save</button>
          <button className="bg-[#FF6767] rounded px-2 hover:bg-white hover:text-black hover:border-2 hover:text-lg ease-in duration-100" onClick={handleDelete}>Delete</button>
          <button className="bg-[#FF6767] rounded px-2 hover:bg-white hover:text-black hover:border-2 hover:text-lg ease-in duration-100" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
