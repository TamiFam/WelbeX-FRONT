import React, { useState } from 'react'
const CreateComment = ({ postId, onAddComment }) => {
    const [text, setText] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();
      onAddComment(postId, text);
      setText('');
    };
  
    return (
      <form onSubmit={handleSubmit} className="mt-4">
        <textarea
          placeholder="Ваш комментарий"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <button type="submit" className="mt-2 bg-green-500 text-white p-2 rounded hover:bg-green-600">
          Добавить комментарий
        </button>
      </form>
    );
  };
  
  export default CreateComment;