import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, updateTask, setSelectedTask, } from "../redux/taskSlice";

function TaskModal() {

  const dispatch = useDispatch();
  const users = useSelector(
    (state) => state.users.items
  );
  const selectedTask = useSelector(
    (state) => state.tasks.selectedTask
  );

  const [todo, setTodo] = useState("");
  const [userId, setUserId] = useState("");
  const [priority, setPriority] = useState("medium");
  const [status, setStatus] = useState("todo");

  useEffect(() => {
    if (selectedTask)
       {
    setTodo(selectedTask.todo);
    setUserId(selectedTask.userId);
    setPriority(selectedTask.priority);
    setStatus(selectedTask.status);

    }
  }, [selectedTask]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const taskData = {
      todo: todo,
      userId: Number(userId),
      priority: priority,
      status: status,
      completed: status === "completed",
    };

    if (selectedTask) {
  dispatch( updateTask({ id: selectedTask.id , task: taskData, })
      );

      dispatch(setSelectedTask(null));

    } else {

      dispatch(addTask(taskData));

    }

    setTodo("");
    setUserId("");
    setPriority("medium");
    setStatus("todo");

  };

  const handleCancel = () => {
    dispatch(setSelectedTask(null));

    setTodo("");
    setUserId("");
    setPriority("medium");
    setStatus("todo");

  };

  return (
    <form onSubmit={handleSubmit}>

      <h2>
        {selectedTask ? "Edit Task" : "Add Task"}
      </h2>
      <input
   type="text" placeholder="Task title"
   value={todo}
   onChange={(e) => setTodo(e.target.value)}
      />

     <select
    value={userId}
    onChange={(e) => setUserId(e.target.value)}
      >
    <option value="">Assign User</option>
     {users.map((user) => (

     <option key={user.id} value={user.id}>
     {user.firstName} {user.lastName}
       </option>

        ))}
      </select>

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="todo">To Do</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>

      </select>

      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
     <option value="low">Low</option>
   <option value="medium">Medium</option>
   <option value="high">High</option>

      </select>
      <button type="submit">
        {selectedTask ? "Update Task" : "Add Task"}
      </button>

      {selectedTask && (
        <button
          type="button"
          onClick={handleCancel}
        >
       Cancel
   </button>
      )}

    </form>
  );
}
export default TaskModal;