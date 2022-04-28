import { Check, Delete } from "@mui/icons-material";
import { useState } from "react";

const Task = ({
  task,
  handleDeleteTask,
  handleTaskComplete,
  handleEditTaskTitle,
}) => {
  const [toggle, setToggle] = useState(true);
  const [text, setText] = useState(task.title);

  const toggleInput = () => {
    setToggle(false);
  };

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setToggle(true);
      handleEditTaskTitle(task._id, text);
    }
  };

  return (
    <div className="flex w-full mt-2 mb-2 relative group cursor-pointer">
      <div
        className={`flex-7 text-xl bg-blue-100 hover:bg-blue-200 p-2 rounded-lg ${
          task.isCompleted ? "line-through" : ""
        }`}
      >
        {toggle ? (
          <p onDoubleClick={toggleInput}>{task.title}</p>
        ) : (
          <input
            type="text"
            value={text}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            className="bg-transparent outline-none w-full"
          />
        )}
      </div>
      <div className="hidden group-hover:block">
        <div className="flex justify-between">
          <div className="absolute inset-y-0 right-3 my-auto h-10 w-10 bg-red-500 hover:bg-red-700 flex items-center justify-center rounded-lg text-white duration-200 ease-in-out opacity-25 hover:opacity-100">
            <div
              className="hover:animate-spin"
              onClick={() => handleDeleteTask(task._id)}
            >
              <Delete className="transform scale-125" />
            </div>
          </div>
          <div className="absolute inset-y-0 right-14 my-auto h-10 w-10 bg-green-500 hover:bg-green-700 flex items-center justify-center rounded-lg text-white duration-200 ease-in-out opacity-25 hover:opacity-100">
            <div
              className="hover:animate-pulse"
              onClick={() => handleTaskComplete(task._id)}
            >
              <Check className="transform scale-125" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Task;
