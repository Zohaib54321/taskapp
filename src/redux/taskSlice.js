import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  getTasks,
  getTasksByUser,
  createTask,
  editTask,
  removeTask,
} from "../services/taskApi";

export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async () => await getTasks()
);

export const fetchTasksByUser = createAsyncThunk(
  "tasks/fetchTasksByUser",
  async (userId) => await getTasksByUser(userId)
);

export const addTask = createAsyncThunk(
  "tasks/addTask",
  async (task) => {

    const data = await createTask(task);

    return {
      ...data,
      ...task,
       id: Date.now(),
      status: task.status,
      priority: task.priority,
      completed: task.status === "completed",
    };

  }
);

export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  
  async ({ id, task }) => {

    const data = await editTask(id, task);

    return {...data, ...task, id: id,};
  }
);

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (id) => await removeTask(id)
);

const taskSlice = createSlice({

  name: "tasks",

  initialState: {
  items: [],
  selectedTask: null,
  detailsTask: null,
  selectedUser: null,
  drawerOpen: false,

  filters: {
    status: "all",
    priority: "all",
    assignedUser: "all",
    search: "",
  },

  loading: false,
  error: "",
},

  reducers: {
    setSelectedTask: (state, action) => {
      state.selectedTask = action.payload;
    },

    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },

    setStatus: (state, action) => {
      const { id, status } = action.payload;
      const task = state.items.find(
        (item) => item.id === id
      );

      if (task) {
        task.status = status;
      }
    },
    setAssignee: (state, action) => {
      const { id, userId } = action.payload;

      const task = state.items.find(
        (item) => item.id === id
      );
      if (task) {
        task.userId = userId;
      }

    },

setDetailsTask: (state, action) => {
  state.detailsTask = action.payload;
},

setDrawerOpen: (state, action) => {
  state.drawerOpen = action.payload;
},

    setFilter: (state, action) => {
      const { field, value } = action.payload;
      state.filters[field] = value;

    },
    clearFilters: (state) => {

 state.filters = {
     status: "all",
    priority: "all",
    assignedUser: "all",
    search: "",
      };
    },

  },
  extraReducers: (builder) => {

    builder

      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = "";
      })

      .addCase(fetchTasks.fulfilled, (state, action) => {

        state.loading = false;

        state.items = action.payload.map((task) => ({
          ...task,
      status: task.completed ? "completed" : "todo", priority: "medium",
        }));

      })

      .addCase(fetchTasks.rejected, (state) => {

        state.loading = false;
        state.error = "Unable to load tasks.";

      })


      .addCase(fetchTasksByUser.fulfilled, (state, action) => {

        state.items = action.payload.map((task) => ({
          ...task,
          status: task.completed ? "completed" : "todo",
          priority: "medium",
        }));

      })

      .addCase(addTask.fulfilled, (state, action) => {

        state.items.unshift({
          ...action.payload,
          status: action.payload.status || "todo",
          priority: action.payload.priority || "medium",
        });

      })


      .addCase(updateTask.fulfilled, (state, action) => {

        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );

        if (index !== -1) {

          state.items[index] = {
            ...state.items[index],
            ...action.payload,
          };
        }

      })


      .addCase(deleteTask.fulfilled, (state, action) => {

        state.items = state.items.filter(
          (item) => item.id !== action.payload
        );
      });

  },

});

export const {
  setSelectedTask,
  setSelectedUser,
  setDetailsTask,
  setDrawerOpen,
  setStatus,
  setAssignee,
  setFilter,
  clearFilters,
} = taskSlice.actions;

export default taskSlice.reducer;