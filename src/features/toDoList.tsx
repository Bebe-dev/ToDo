import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Button,
} from "@mui/material";
import Tasks from "./task";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "../reducers/taskReducer";
import { RootState } from "../store";



export default function ToDoList() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  const inputRef = useRef(null);

  
  const date = new Date();
  const formattedDate = date.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "short",
  });

  const tasks = useSelector((state:RootState) => state.tasks.tasks)
 

  return (
    <div className="pl-8 pt-4 w-[50%]">
      <div className="flex justify-between">
        <div className="flex gap-2">
          <img src="/images/Pending-task.svg" alt="pending" />
          <p className="text-[#FF6767]">To-Do</p>
        </div>
        <p className="cursor-pointer" onClick={handleClickOpen}>
          <span className="text-[#FF6767] text-xl">+</span> Add task
        </p>
        <Dialog open={open} onClose={handleClose} sx={{ padding: "8px" }}>
          <DialogTitle>Add New Task</DialogTitle>

          <Formik
            initialValues={{ title: "", date: "", description: "" }}
            validationSchema={Yup.object({
              title: Yup.string()
                .max(30, "Must be 30 characters or less")
                .required("Required"),
              date: Yup.string().required("Required"),
              description: Yup.string().required("Required"),
            })}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                //alert(JSON.stringify(values, null, 2));
                const date = values.date
                const title = values.title
                const description = values.description
                dispatch(addTask({id: tasks[tasks.length - 1].id + 1, date, title, description}))               
                setSubmitting(false);
                handleClose();
              }, 400);
            }}
          >
            <Form className="border border-[#A1A3AB]">
              <DialogContent
                sx={{ display: "flex", flexDirection: "column", gap: "8px" }}
              >
                <div className="flex flex-col">
                  <label htmlFor="title">Title</label>
                  <Field
                    name="title"
                    type="text"
                    className="border border-[#A1A3AB] rounded"
                  />
                  <ErrorMessage name="title" />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="date">Date</label>
                  <Field
                    name="date"
                    type="date"
                    ref = {inputRef}
                    className="border border-[#A1A3AB] rounded"
                  />
                  <ErrorMessage name="date" />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="description">Task description</label>
                  <Field
                    name="description"
                    as="textarea"
                    type="text"
                    className="border border-[#A1A3AB] rounded"
                  />
                  <ErrorMessage name="email" />
                </div>
              </DialogContent>

              <DialogActions>
                <button type="submit">Done</button>
                <Button onClick={handleClose}>Go Back</Button>
              </DialogActions>
            </Form>
          </Formik>

        </Dialog>
      </div>

      {/* NEXT LINE */}

      <div className="flex gap-4">
        <p>{formattedDate}</p>
        <p>.Today</p>
      </div>

      {/* TASKS */}
      <Tasks />
    </div>
  );
}
