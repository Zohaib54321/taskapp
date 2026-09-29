const API_URL = "https://dummyjson.com/todos";


export const getTasks = async () => {
  const response = await fetch(API_URL);
  const data = await response.json();

  return data.todos;
};


export const getTasksByUser = async (userId) => {
  const response = await fetch(`${API_URL}/user/${userId}`);
  const data = await response.json();

  return data.todos;
};

export const createTask = async (task) => {
  const response = await fetch(`${API_URL}/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });

  return await response.json();
};

export const editTask = async (id, task) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });

  return await response.json();
};

export const removeTask = async (id) => {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  return id;
};