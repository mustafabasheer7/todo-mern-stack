import { Add } from "@mui/icons-material";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import Task from "../components/Task";
import { AuthContext } from "../context/AuthContext";
import toast, { Toaster } from "react-hot-toast";
import {
  addTask,
  deleteOneTask,
  checkTaskComplete,
  deleteAllTasks,
  getAllTasks,
  editSpecificTask,
  logoutRequest,
} from "../apiRequests";
import { WaveLoading } from "react-loadingg";

const Register = () => {
  const [tasks, setTasks] = useState([]);
  const [showSpinner, setShowSpinner] = useState(true);
  const { user, dispatch } = useContext(AuthContext);
  const inputTask = useRef();
  const notifySuccess = (text) => toast.success(text);
  const notifyError = (text) => toast.error(text);

  const handleAddTask = async (e) => {
    e.preventDefault();
    const newTask = {
      title: inputTask.current.value,
      userId: user._id,
    };
    try {
      const addedTask = await addTask(newTask);
      const allTasks = [addedTask.data, ...tasks];
      setTasks(allTasks);
      inputTask.current.value = "";
      notifySuccess("Successfully Added The Task!");
    } catch (error) {
      notifyError("Something went wrong when adding the task :(");
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteOneTask(taskId, user._id);
      const allTasks = [...tasks];
      const filteredTasks = allTasks.filter((t) => t._id !== taskId);
      setTasks(filteredTasks);
      notifySuccess("Successfully Deleted The Task!");
    } catch (error) {
      notifyError("Something went wrong when deleting the task :(");
    }
  };

  const handleTaskComplete = async (taskId) => {
    try {
      await checkTaskComplete(taskId, user._id);
      notifySuccess("Updated!");
      fetchTasks();
    } catch (error) {
      notifyError("Something went wrong when performing this action");
    }
  };

  const handleDeleteAllTasks = async (e) => {
    e.preventDefault();
    if (tasks.length > 0) {
      await deleteAllTasks(user._id);
      setTasks([]);
      notifySuccess("Successfully Deleted All Tasks!");
    } else {
      notifyError("There are no tasks to delete!");
    }
  };

  const handleEditTaskTitle = async (taskId, taskTitle) => {
    try {
      await editSpecificTask(taskId, taskTitle, user._id);
      notifySuccess("Successfully Edited The Task!");
      fetchTasks();
    } catch (error) {
      notifyError("Something went wrong when editing the task :(");
    }
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    logoutRequest(dispatch);
  };

  const fetchTasks = useCallback(async () => {
    try {
      const response = await getAllTasks(user._id);
      const { message, ...allTasks } = response.data;
      setTasks(Object.values(allTasks));
      setShowSpinner((s) => false);
    } catch (error) {
      notifyError("Something went wrong when fetching the tasks :(");
    }
  }, [user._id]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return (
    <div className="relative h-screen w-screen flex justify-center items-center bg-black">
      {/* Using react-hot-toast */}
      <Toaster position="bottom-right" reverseOrder={false} />
      <div className="h-full w-full filter blur bg-main-app bg-cover z-0 bg-center"></div>
      <div className="absolute bg-gray-50 p-8 w-4/5 sm:w-3/5 md:w-2/5 lg:w-2/5 rounded-md shadow-2xl bg-gray-50 flex flex-col">
        {!showSpinner ? (
          <>
            {/* TOP */}
            <div className="flex item-center justify-between">
              <h1 className="text-3xl font-light">
                <span className="font-bold">{user.username}</span>'s List
              </h1>
              <button
                className="border-2 text-lg font-medium bg-white hover:bg-gray-800 hover:text-white hover:border-white p-2 flex items-center justify-center rounded-lg cursor-pointer duration-200 ease-in-out"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
            {/* Add a new todo */}
            <form className="flex text-xl my-6" onSubmit={handleAddTask}>
              <input
                type="text"
                placeholder="Add a new todo"
                className="w-5/6 xl:w-11/12 p-2 outline-none border rounded-lg"
                minLength="3"
                maxLength="200"
                ref={inputTask}
              />
              <button
                className="w-1/6 xl:w-1/12 bg-purple-500 hover:bg-purple-700 flex items-center justify-center ml-2 rounded-lg cursor-pointer text-white duration-200 ease-in-out"
                type="submit"
              >
                <Add className="transform scale-125" />
              </button>
            </form>
            {/* Todo list */}
            <div className="max-h-96 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400 scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
              {tasks.length !== 0 ? (
                tasks.map((task) => (
                  <Task
                    key={task._id}
                    task={task}
                    handleDeleteTask={handleDeleteTask}
                    handleTaskComplete={handleTaskComplete}
                    handleEditTaskTitle={handleEditTaskTitle}
                  />
                ))
              ) : (
                <p>No tasks available</p>
              )}
            </div>
            {/* Delete Tasks */}
            <div className="flex items-center justify-between text-xl mt-4">
              <p>
                You have <span className="font-bold">{tasks.length}</span>{" "}
                pending tasks
              </p>
              <button
                className="bg-purple-500 font-semibold p-2 hover:bg-purple-700 flex items-center justify-center ml-2 rounded-lg cursor-pointer text-white duration-200 ease-in-out"
                onClick={handleDeleteAllTasks}
              >
                Clear All
              </button>
            </div>
          </>
        ) : (
          <div className="my-4">
            <WaveLoading speed={1} color="#a855f7" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Register;
