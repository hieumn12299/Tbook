import React, { useState } from 'react';
import ContentEditable from 'react-contenteditable';
import { auth } from '../../config/firebaseConfig';

const FormComment = ({
  addComment,
  content,
  onHandleSetContent,
  idComment,
}: {
  idComment?: string;
  addComment?: () => void;
  content?: string;
  onHandleSetContent: (content: string) => void;
}) => {
  return (
    <form className="flex flex-row content-between items-center add-comment-section mt-4 mb-4 px-[12px]">
      <img
        className="w-12 h-12 border-2 border-gray-300 rounded-full"
        src={auth.currentUser?.photoURL || ''}
        referrerPolicy="no-referrer"
      />
      <ContentEditable
        html={content || ''}
        className="flex items-center mx-3 break-all select-text outline-none bg-[#e8e8eb] rounded-[18px] px-[18px] w-[calc(100%-70px)] py-[5px] h-fit"
        onChange={(e) => onHandleSetContent(e.target.value)}
      />
      <button type="button" className="" id="btn-submit" onClick={addComment}>
        Gửi
      </button>
    </form>
  );
};

export default FormComment;
