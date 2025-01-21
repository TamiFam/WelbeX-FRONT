import axios from 'axios';
import React, { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const NavBar = () => {
  const navigate = useNavigate();

  // Проверка токена при загрузке компонента
  useEffect(() => {
    const token = localStorage.getItem('token'); // Получаем токен из localStorage
    if (!token) {
      navigate('/login'); // Перенаправляем на страницу входа, если токен отсутствует
    }
  }, [navigate]);

  const handleLogout = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token'); // Получаем токен из localStorage
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout me!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post('https://welbex-back.onrender.com/logout', {
            token: token,
          })
          .then(() => {
            localStorage.removeItem('token');
            Swal.fire({
              title: "Logged out!",
              text: "Logged out",
              icon: "success",
            });
            navigate('/login');
          })
          .catch((error) => console.log(error));
        console.log('logout');
      }
    });
  };

  return (
    <div className="w-full bg-gray-100 shadow-md">
      <div className="lg:w-[95%] mx-auto sm:px-6 lg:px-6">
        <div className="px-4 py-4 flex items-center justify-between">
         
          <div>
            <h1 className="text-2xl font-bold">Мой блог</h1>
          </div>

         
          <div className="flex items-center">
            <NavLink
              onClick={handleLogout}
              className="text-black hover:text-red-600 cursor-pointer"
            >
              Выйти
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;