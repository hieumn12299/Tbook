import React, { useState } from 'react';
import ContentEditable from 'react-contenteditable';

const FormComment = () => {
  const [content, setContent] = useState('');
  return (
    <div className="flex flex-row content-between add-comment-section mt-4 mb-4">
      <img
        className="w-12 h-12 border-2 border-gray-300 rounded-full"
        src="https://i.imgur.com/qdiP4DB.jpg"
        referrerPolicy="no-referrer"
      />
      <ContentEditable
        html={content}
        className="flex items-center mx-3 break-all select-text outline-none bg-[#e8e8eb] rounded-[18px] px-[18px] w-[calc(100%-70px)]"
        onChange={(e) => setContent(e.target.value)}
      />
    </div>
  );
};

export default FormComment;
