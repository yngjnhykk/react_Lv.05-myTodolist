import axios from 'axios';

// 모든 user의 정보를 가져오는 api
const getUsers = async () => {
  const response = await axios.get('http://localhost:4000/users');
  return response;
};

// 새로운 user 정보 json-server 에 넣기
const addUser = async (newUser) => {
  await axios.post(`http://localhost:4000/users`, newUser);
};

export { getUsers, addUser };
