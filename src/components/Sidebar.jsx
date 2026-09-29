import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../redux/userSlice";
import { setSelectedUser, fetchTasksByUser, fetchTasks } from "../redux/taskSlice";


function Sidebar() {
  const dispatch = useDispatch();
  const { items, loading } = useSelector(
    (state) => state.users
  );

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);


  const handleUserClick = (user) =>
     {

    dispatch(setSelectedUser(user.id));

    if (user.id) {
      dispatch(fetchTasksByUser(user.id));
    } else {
      dispatch(fetchTasks());
    }

  };
 
  return (
    <aside>

      <h2>Team Members</h2>
      {loading && <p>Loading users...</p>}

      {items.map((user) => (

        <div 
          key={user.id}
          onClick={() => handleUserClick(user)}
        >
          <img  src={user.image} alt={user.firstName} width="40"
          />
    <p> 
      {user.firstName} {user.lastName}
    </p> 
          <p>{user.email}</p>
          <p>{user.company?.title}</p>
        </div>
      ))}
    </aside>
  );
}

export default Sidebar;