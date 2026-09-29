import { useSelector } from "react-redux";

function TaskDetailsDrawer() {

  const detailsTask = useSelector(
    (state) => state.tasks.detailsTask
  );

  if (!detailsTask) {
    return null;
  }

  return (
    <div className="task-drawer">

      <h2>Task Details</h2>

      <p>Title: {detailsTask.todo}</p>

      <p>ID: {detailsTask.id}</p>
      <p>User ID: {detailsTask.userId}</p>
      <p>Status: {detailsTask.status}</p>
      <p>Priority: {detailsTask.priority}</p>

      <p>
        Completed: {detailsTask.completed ? "Yes" : "No"}
      </p>

    </div>
  );
}

export default TaskDetailsDrawer;