import React, { useState } from 'react';

const CreatePost = ({ onCreatePost }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null); // Общее поле для файла (фото или видео)
  const [filePreview, setFilePreview] = useState(null); // Превью файла

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    if (file) {
      formData.append('file', file); // Отправляем файл на сервер
    }

    onCreatePost(formData);

    // Сброс формы
    setTitle('');
    setContent('');
    setFile(null);
    setFilePreview(null);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);

      // Создание превью для фото или видео
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Заголовок"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
      <textarea
        placeholder="Содержание"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
      {/* Поле для загрузки файла (фото или видео) */}
      <div>
        <input
          type="file"
          onChange={handleFileChange}
          className="w-full p-2 border rounded"
          accept="image/*, video/*" // Разрешаем загрузку фото и видео
        />
        {/* Превью файла */}
        {filePreview && (
          <div className="mt-2">
            {file.type.startsWith('image') ? (
              // Превью для фото
              <img
                src={filePreview}
                alt="Превью"
                className="w-16 h-12 object-cover rounded"
              />
            ) : file.type.startsWith('video') ? (
              // Превью для видео
              <video controls className="w-full rounded">
                <source src={filePreview} type={file.type} />
                Ваш браузер не поддерживает видео.
              </video>
            ) : null}
          </div>
        )}
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
        Создать пост
      </button>
    </form>
  );
};

export default CreatePost;