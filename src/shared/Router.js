import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from '../pages/Main/Main';
import Login from '../pages/Login/Login';
import Join from '../pages/Join/Join';
import AddTodo from '../pages/AddTodo/AddTodo';
import DetailTodo from '../pages/DetailTodo/DetailTodo';
import EditTodo from '../pages/EditTodo/EditTodo';
import Todos from '../pages/Todos/Todos';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Main />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/join' element={<Join />}></Route>
        <Route path='/addTodo' element={<AddTodo />}></Route>
        <Route path='/detailTodo' element={<DetailTodo />}></Route>
        <Route path='/editTodo' element={<EditTodo />}></Route>
        <Route path='/todos' element={<Todos />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
