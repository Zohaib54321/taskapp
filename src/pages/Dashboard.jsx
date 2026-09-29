import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import TaskModal from "../components/TaskModal";

import {
  fetchTasks,
  setFilter,
  clearFilters
} from "../redux/taskSlice";
import TaskColumn from "../components/TaskColumn";
import TaskDetailsDrawer from "../components/TaskDetailsDrawer";


function Dashboard() {

  const dispatch = useDispatch();

  const { items, loading, error, filters } = useSelector(
    (state) => state.tasks
  );

  const users = useSelector(
    (state) => state.users.items
  );

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleSearch = (e) => {

    dispatch(
      setFilter({
        field: "search",
        value: e.target.value,
     })
    );
  };

  const filteredTasks = items.filter((task) => {
    const matchesSearch = task.todo.toLowerCase().includes(
      filters.search.toLowerCase()
    );


    const matchesStatus =
   filters.status === "all" || task.status === filters.status;

    const matchesPriority =
     filters.priority === "all" ||
      task.priority === filters.priority;

    const matchesUser =
      filters.assignedUser === "all" ||
     task.userId === Number(filters.assignedUser);

    return (
      matchesSearch &&
      matchesStatus &&
      matchesPriority &&
      matchesUser
    );

  });


  const totalTasks = filteredTasks.length;

const todoCount = filteredTasks.filter(
  (task) => task.status === "todo"
).length;

  const inProgressCount = filteredTasks.filter(
  (task) => task.status === "in-progress"
  ).length;

  const completedCount = filteredTasks.filter(
    (task) => task.status === "completed"
     ).length;

  const todoTasks = filteredTasks.filter(
    (task) => task.status === "todo"
  );

     const inProgressTasks = filteredTasks.filter(
    (task) => task.status === "in-progress"
  );

  const completedTasks = filteredTasks.filter(
    (task) => task.status === "completed"
  );

  return (
    <div>
      <Navbar />

      <div className="dashboard">
   <Sidebar />

   <main>
  <h1>Task Management Dashboard </h1>

   <TaskModal />

   <TaskDetailsDrawer />

<div className="task-stats">

  <div>
    <h3>Total Tasks</h3>
    <p>{totalTasks}</p>
  </div>

  <div>
    <h3>To Do</h3>
    <p>{todoCount}</p>
  </div>

  <div>
    <h3>In Progress</h3>
    <p>{inProgressCount}
    </p>
  </div>

  <div>
    <h3>Completed</h3>
    <p>{completedCount}</p>
  </div>

</div>



    <input
       type="text"  placeholder="Search tasks..."
      value={filters.search}
      onChange={handleSearch}
          />

  <select
      value={filters.status}
      onChange={(e) =>
      dispatch(
      setFilter({ field: "status",
        value: e.target.value,
         })
           )
            }
          >
   <option value="all">All Status</option>
   <option value="todo">To Do</option>
     <option value="in-progress">In Progress</option>
     <option value="completed"> Completed 
     </option>
   </select>

      <select
     value={filters.priority}
      onChange={(e) =>
  dispatch(setFilter({ field: "priority", value: e.target.value, })
         )}
          >
    <option value="all">All Priority</option>
    <option value="low">Low</option>
    <option value="medium">Medium</option>

    <option value="high">High
    </option>

        </select>

       <select
    value={filters.assignedUser}
     onChange={(e) =>
      dispatch(
      setFilter({
      field: "assignedUser",
      value: e.target.value,
      })
        )
       }
          >
       <option value="all">All Users</option>
       {users.map((user) => (
         <option
          key={user.id}
          value={user.id}
           >
        {user.firstName} {user.lastName}
        </option>
           ))}
        </select>
          <button
           onClick={() => dispatch(clearFilters())}
          >
     Clear Filters
          </button>

          {loading && <p>Loading tasks...</p>}

          {error && <p>{error}</p>}

          <div className="task-columns">

            <TaskColumn
              title="To Do"
              tasks={todoTasks}
            />
            <TaskColumn
              title="In Progress"
              tasks={inProgressTasks}
            />
            <TaskColumn
              title="Completed"
              tasks={completedTasks}
            />

      </div>
       </main>
      </div>
    </div>
  );
}

export default Dashboard;