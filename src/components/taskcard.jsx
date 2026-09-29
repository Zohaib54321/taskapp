import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setStatus,
  deleteTask,
  setSelectedTask,
  setDetailsTask,
  setDrawerOpen,
} from "../redux/taskSlice";

const TaskCard = ({ task, onClick }) => {

  const dispatch = useDispatch();

  const users = useSelector(
    (state) => state.users.items
  );

  const assignee =
    users.find(
      (user) => Number(user.id) === Number(task.userId)
    ) || task.user;

  const handleStartTask = (e) => {

    e.stopPropagation();

    dispatch(
      setStatus({
        id: task.id,
        status: "in-progress",
      })
    );

  };

  const handleCompleteTask = (e) => {

    e.stopPropagation();

    dispatch(
      setStatus({
        id: task.id,
        status: "completed",
      })
    );

  };

  const handleMoveBack = (e) => {

    e.stopPropagation();

    dispatch(
      setStatus({
        id: task.id,
        status:
          task.status === "completed"
            ? "in-progress"
            : "todo",
      })
    );

  };

  const handleDelete = (e) => {
    e.stopPropagation();

    if (
      window.confirm(
        "Are you sure you want to delete this task?"
      )
    ) {
      dispatch(deleteTask(task.id));
    }

  };

  const handleEdit = (e) => {

    e.stopPropagation();
    dispatch(setSelectedTask(task));
    window.scrollTo({
    top: 0,
    behavior: "smooth",
  });

  };

  const handleDetails = (e) => {

    e.stopPropagation();

    dispatch(setDetailsTask(task));
    dispatch(setDrawerOpen(true));

  };

  return (
    <div
      className="task-card"
      onClick={onClick}
    >

      <div className="task-card-header">

        <span className={`task-status ${task.status}`}>
          {task.status === "in-progress"
            ? "In Progress"
            : task.status === "completed"
            ? "Completed"
            : "To Do"}
        </span>

        <span className="task-id">
          {task.userId
            ? `User #${task.userId}`
            : `Task #${task.id}`}
        </span>

      </div>

      <h3>{task.todo}</h3>

      {assignee && (
        <div className="task-user">

          <span>
            {assignee.firstName} {assignee.lastName}
          </span>

        </div>
      )}

      <div className="task-actions">

        {task.status === "todo" && (
          <button onClick={handleStartTask}>
            Start Task
          </button>
        )}

        {task.status === "in-progress" && (
          <>
            <button onClick={handleCompleteTask}>
               mark completed
            </button>

            <button onClick={handleMoveBack}>
              Move back </button>
          </>
        )}

        {task.status === "completed" && (
          <button onClick={handleMoveBack}>
            Move Back
          </button>
        )}

    <button onClick={handleDetails}>
  View Details
     </button>

   <button onClick={handleEdit}>
            Edit
        </button>

        <button onClick={handleDelete}>
     Delete
        </button>

    </div>
    </div>
  );
};

export default TaskCard;