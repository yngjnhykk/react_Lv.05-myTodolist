import axios from 'axios';

// 모든 todo의 정보를 가져오는 api
const getTodos = async () => {
  const response = await axios.get('http://localhost:4000/todos');
  return response;
};

// 새로운 todo 정보 json-server 에 넣기
const addTodo = async (newTodo) => {
  await axios.post(`http://localhost:4000/todos`, newTodo);
};

// todo 정보 수정하기
const patchTodo = async ({ todoId, edit }) => {
  await axios.patch(`http://localhost:4000/todos/${todoId}`, edit);
};

const deleteTodo = async (todoId) => {
  await axios.delete(`http://localhost:4000/todos/${todoId}`);
};

export { getTodos, addTodo, patchTodo, deleteTodo };
