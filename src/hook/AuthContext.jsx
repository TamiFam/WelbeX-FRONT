// import React, { createContext, useContext, useState } from 'react';
// import axios from 'axios';
// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   const login = async (email, password) => {
//     try {
//       const response = await axios.post('https://welbex-back.onrender.com/api/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email, password }),
//       });

//       if (!response.ok) {
//         throw new Error('Ошибка входа');
//       }

//       const data = await response.json();
//       console.log('Пользователь вошел:', data);

//       setUser({ email });
//     } catch (error) {
//       console.error('Ошибка при входе:', error.message);
//     }
//   };

//   const logout = () => {
//     setUser(null);
//   };

//   const SignUp = async (email, password) => {
//     try {
//       const response = await axios.post('https://welbex-back.onrender.com/api/signup', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email, password }),
//       });

//       if (!response.ok) {
//         throw new Error('Ошибка регистрации');
//       }

//       const data = await response.json();
//       console.log('Пользователь зарегистрирован:', data);

//       setUser({ email });
//     } catch (error) {
//       console.error('Ошибка при регистрации:', error.message);
//     }
//   };

//   const contextValue = { user, login, logout, SignUp };

//   return (
//     <AuthContext.Provider value={contextValue}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);