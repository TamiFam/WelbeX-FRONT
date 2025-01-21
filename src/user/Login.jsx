import React, { useState } from 'react';
import { MdOutlineAlternateEmail } from "react-icons/md";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loader, setLoader] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoader(true);
  
    const data = new FormData(e.target);
    const formData = Object.fromEntries(data);
  
    try {
      // Отправляем запрос на сервер для входа
      const response = await axios.post('https://welbex-back.onrender.com/api/login', {
        email: formData.email,
        password: formData.password,
      });
  
      // Если успешно, сохраняем токен и перенаправляем пользователя
      if (response.data.success) {
        const { token } = response.data; // Извлекаем токен из ответа
        localStorage.setItem('token', token); // Сохраняем токен в localStorage
        navigate(location.state?.from || '/dashboard'); // Перенаправляем на dashboard
        alert('Вход выполнен успешно');
        console.log(token)
      } else {
        setError(response.data.message || 'Ошибка входа');
      }
    } catch (err) {
      // Обрабатываем ошибки
      setError(err.response?.data?.message || 'Произошла ошибка при входе');
    } finally {
      setLoader(false);
    }
  };
  return (
    <div className='mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8'>
      <h1 className='text-2xl font-bold text-secondary sm:text-3xl text-center'>Логин</h1>
      <div className='mx-auto max-w-lg mb-0 mt-6 rounded-lg shadow-lg sm:p-6 lg:p-8'>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <p className='text-center text-red-400 text-lg font-medium'>Войдите в свой аккаунт</p>
          {/* Email */}
          <div>
            <label htmlFor="email" className='sr-only'>Email</label>
            <div className='relative'>
              <input
                type="email"
                name='email'
                placeholder='Введите email'
                className='w-full border outline-none rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm'
                required
              />
              <span className='absolute inset-y-0 end-0 grid place-content-center px-4'>
                <MdOutlineAlternateEmail className='h-4 w-4 text-gray-400' />
              </span>
            </div>
          </div>
          {/* Password */}
          <div>
            <label htmlFor="password" className='sr-only'>Пароль</label>
            <div className='relative'>
              <input
                type={showPassword ? 'text' : 'password'}
                name='password'
                placeholder='Введите пароль'
                className='w-full border outline-none rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm'
                required
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className='absolute inset-y-0 end-0 grid place-content-center px-4 cursor-pointer'
              >
                {!showPassword ? <FaRegEyeSlash className='h-4 w-4 text-gray-400' /> : <FaRegEye className='h-4 w-4 text-gray-400' />}
              </span>
            </div>
          </div>
          {/* Кнопка входа */}
          <button
            type="submit"
            disabled={loader}
            className='block w-full text-center rounded-lg bg-secondary px-5 py-3 text-sm font-medium text-white hover:bg-secondary-dark'
          >
            {loader ? 'Загрузка...' : 'Войти'}
          </button>
          {/* Сообщение об ошибке */}
          {error && <p className='text-center text-red-500 text-sm'>{error}</p>}
          {/* Ссылка на регистрацию */}
          <p className='text-center text-sm text-gray-500'>
            Нет аккаунта? <Link className='underline' to="/register">Зарегистрироваться</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;