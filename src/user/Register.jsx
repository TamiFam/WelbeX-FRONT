import React from 'react';
import { IoLocationOutline } from "react-icons/io5";
import { AiOutlineLock, AiOutlineMail, AiOutlinePhone, AiOutlinePicture, AiOutlineUser } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('https://welbex-back.onrender.com/new-user', {
        name: data.name,
        email: data.email,
        password: data.password,
        gender: data.gender,
      });

      if (response.data.success) {
        navigate('/login');
        alert('Registration successful');
      } else {
        alert(response.data.message || 'Registration failed');
      }
    } catch (err) {
      alert(err.response?.data?.message || 'An error occurred');
    }
  };

  const password = watch('password', '');

  return (
    <div className="flex justify-center items-center pt-14 bg-gray-100">
      <div className='bg-white p-8 rounded-lg shadow-md'>
        <h2 className='text-3xl font-bold text-center mb-6'>Пожалуйста, зарегистрируйтесь</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='flex items-center gap-5'>
            <div className='mb-4'>
              <label htmlFor="name" className='block text-gray-700 font-bold mb-2'>
                <AiOutlineUser className='inline-block mr-2 mb-1 text-lg' />
                Имя
              </label>
              <input type="text" placeholder='Enter your name' {...register("name", { required: true })} className='w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring focus-border-blue-200' />
            </div>
            <div className='mb-4'>
              <label htmlFor="email" className='block text-gray-700 font-bold mb-2'>
                <AiOutlineMail className='inline-block mr-2 mb-1 text-lg' />
                Email
              </label>
              <input type="text" placeholder='Enter your email address' {...register("email", { required: true })} className='w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring focus-border-blue-200' />
            </div>
          </div>
          <div className='flex items-center gap-5'>
            <div className='mb-4'>
              <label htmlFor="password" className='block text-gray-700 font-bold mb-2'>
                <AiOutlineLock className='inline-block mr-2 mb-1 text-lg' />
                Пароль
              </label>
              <input type="password" placeholder='Enter password' {...register("password", { required: true })} className='w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring focus-border-blue-200' />
            </div>
            <div className='mb-4'>
              <label htmlFor="confirmPassword" className='block text-gray-700 font-bold mb-2'>
                <AiOutlineLock className='inline-block mr-2 mb-1 text-lg' />
                Подтверждение пароля
              </label>
              <input type="password" placeholder='Confirm your password' {...register("confirmPassword", { required: true, validate: (value) => value === password || "Пароли не совпадают" })} className='w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring focus-border-blue-200' />
            </div>
          </div>
          <div className='mb-4'>
            <label htmlFor="gender" className='block text-gray-700 font-bold mb-2'>
              <AiOutlineUser className='inline-block mr-2 mb-1 text-lg' />
              Пол
            </label>
            <select {...register("gender", { required: true })} className='w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300'>
              <option value="" disabled selected>Выберите пол</option>
              <option value="male">Мужской</option>
              <option value="female">Женский</option>
            </select>
          </div>
          <div className='text-center'>
            <button type='submit' className='px-4 py-2 bg-secondary hover:bg-red-500 text-black rounded-md'>Зарегистрироваться</button>
            {errors.confirmPassword && <div className='text-red-500 text-sm w-full mt-1'><p>Пароли не совпадают</p></div>}
          </div>
        </form>
        <p className='text-center text-sm text-gray-500'>Уже есть аккаунт? <Link className='underline' to="/login">Вход</Link></p>
      </div>
    </div>
  );
};

export default Register;