import  axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import CreatePost from './CreatePost';
import CreateComment from './CreateComment';

const Dashboard = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [editingPost, setEditingPost] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      fetchPosts();
    }
  }, [navigate]);

  const fetchPosts = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3000/api/posts', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const postsWithComments = response.data.posts.map((post) => ({
        ...post,
        Comments: post.Comments || [],
      }));

      setPosts(postsWithComments);
    } catch (error) {
      console.error('Ошибка при получении постов:', error);
    }
  };

  const handleCreatePost = async (formData) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:3000/api/posts', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      fetchPosts();
      Swal.fire('Успех!', 'Пост успешно создан.', 'success');
    } catch (error) {
      console.error('Ошибка при создании поста:', error);
      Swal.fire('Ошибка!', 'Не удалось создать пост.', 'error');
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:3000/api/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
      Swal.fire('Успех!', 'Пост успешно удален.', 'success');
    } catch (error) {
      console.error('Ошибка при удалении поста:', error);
      Swal.fire('Ошибка!', 'Не удалось удалить пост.', 'error');
    }
  };

  const handleAddComment = async (postId, text) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `http://localhost:3000/api/posts/${postId}/comments`,
        { text },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setPosts((prevPosts) => {
        const updatedPosts = prevPosts.map((post) =>
          post.id === postId
            ? { ...post, Comments: [...post.Comments, response.data.comment] }
            : post
        );

        return updatedPosts;
      });

      Swal.fire('Успех!', 'Комментарий успешно добавлен.', 'success');
    } catch (error) {
      console.error('Ошибка при добавлении комментария:', error);
      Swal.fire('Ошибка!', 'Не удалось добавить комментарий.', 'error');
    }
  };

  const handleEditPost = (post) => {
    setEditingPost(post);
  };

  const handleUpdatePost = async (e, postId) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `http://localhost:3000/api/posts/${postId}`,
        {
          title: editingPost.title,
          content: editingPost.content,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId ? { ...post, ...response.data.post } : post
        )
      );

      setEditingPost(null);
      Swal.fire('Успех!', 'Пост успешно обновлен.', 'success');
    } catch (error) {
      console.error('Ошибка при обновлении поста:', error);
      Swal.fire('Ошибка!', 'Не удалось обновить пост.', 'error');
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Добро пожаловать в мой блог по программированию</h1>

      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Создать новый пост</h2>
        <CreatePost onCreatePost={handleCreatePost} />
      </div>

      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">Посты</h2>
        {posts.length === 0 ? (
          <p className="text-gray-500 text-center">Постов пока нет.</p>
        ) : (
          posts.map((post) => (
            <PostItem
              key={post.id}
              post={post}
              selectedPostId={selectedPostId}
              setSelectedPostId={setSelectedPostId}
              handleDeletePost={handleDeletePost}
              handleEditPost={handleEditPost}
              handleAddComment={handleAddComment}
            />
          ))
        )}
      </div>

      {editingPost && (
        <EditPostModal
          editingPost={editingPost}
          setEditingPost={setEditingPost}
          handleUpdatePost={handleUpdatePost}
        />
      )}
    </div>
  );
};

const PostItem = ({ post, selectedPostId, setSelectedPostId, handleDeletePost, handleEditPost, handleAddComment }) => (
  <div className="bg-white p-6 rounded-lg shadow-md mb-6 relative">
    <h3 className="text-xl font-bold text-gray-800 mb-2">{post.title}</h3>
    <p className="text-gray-600 mb-4">{post.content}</p>
    {post.image && (
      <img
        src={`http://localhost:3000/${post.image}`}
        alt="Пост"
        className="mt-2 rounded-lg w-full h-64 object-cover"
      />
    )}
    {post.video && (
      <video controls className="mt-2 rounded-lg w-full">
        <source src={`http://localhost:3000/${post.video}`} type="video/mp4" />
        Ваш браузер не поддерживает видео.
      </video>
    )}
    <div className="mt-4 text-sm text-gray-500">
      <p>Автор: {post.User ? post.User.name : 'Неизвестный автор'}</p>
      <p>
        {new Date(post.createdAt).toLocaleString('ru-RU', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          timeZone: 'Europe/Moscow',
        })}
      </p>
    </div>

    <div className="absolute top-6 right-6 flex space-x-4">
      <button
        onClick={() => handleDeletePost(post.id)}
        className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-colors"
      >
        Удалить пост
      </button>
      <button
        onClick={() => handleEditPost(post)}
        className="bg-yellow-500 text-white p-2 rounded-lg hover:bg-yellow-600 transition-colors"
      >
        Редактировать
      </button>
    </div>

    <button
      onClick={() => setSelectedPostId(post.id === selectedPostId ? null : post.id)}
      className="mt-4 text-blue-500 hover:text-blue-700 transition-colors"
    >
      {post.id === selectedPostId ? 'Скрыть комментарии' : 'Показать комментарии'}
    </button>

    {post.id === selectedPostId && (
      <div className="mt-6">
        <h4 className="text-lg font-semibold text-gray-700 mb-4">Комментарии:</h4>
        {Array.isArray(post.Comments) && post.Comments.length === 0 ? (
          <p className="text-gray-500">Комментариев пока нет.</p>
        ) : (
          Array.isArray(post.Comments) &&
          post.Comments.map((comment) => (
            <div key={comment.id} className="mt-3 p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-700 font-semibold">
                @{comment.User ? comment.User.name : 'Неизвестный автор'}
              </p>
              <p className="text-gray-600 mt-1">{comment.text}</p>
            </div>
          ))
        )}

        <CreateComment postId={post.id} onAddComment={handleAddComment} />
      </div>
    )}
  </div>
);

const EditPostModal = ({ editingPost, setEditingPost, handleUpdatePost }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div className="bg-white p-6 rounded-lg w-full max-w-2xl">
      <h2 className="text-2xl font-semibold mb-4">Редактировать пост</h2>
      <form onSubmit={(e) => handleUpdatePost(e, editingPost.id)}>
        <input
          type="text"
          placeholder="Заголовок"
          value={editingPost.title}
          onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
          className="w-full p-2 border rounded mb-4"
          required
        />
        <textarea
          placeholder="Содержание"
          value={editingPost.content}
          onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
          className="w-full p-2 border rounded mb-4"
          required
        />
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => setEditingPost(null)}
            className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
          >
            Отмена
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Сохранить
          </button>
        </div>
      </form>
    </div>
  </div>
);

export default Dashboard;