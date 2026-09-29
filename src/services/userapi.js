const API_URL = "https://dummyjson.com/users?";


export const getUsers = async () => {

  const response = await fetch(API_URL);
  const data = await response.json();

  return data.users;

};