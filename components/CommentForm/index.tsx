import React from 'react';

const CommentForm = ({
  addComment,
  content,
  onHandleSetContent,
}: {
  addComment: () => void;
  content: string;
  onHandleSetContent: (content: string) => void;
}) => {
  return (
    <form className="mb-6">
      <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200">
        <textarea
          id="comment"
          rows={6}
          className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none"
          placeholder="Write a comment..."
          value={content}
          onChange={(e) => onHandleSetContent(e.target.value)}
        ></textarea>
      </div>
      <div className="text-right">
        <button
          type="button"
          className="inline-flex items-center py-2.5 px-4 text-xs font-bold text-center text-[#7a5179] bg-[#f1deee] rounded-lg focus:ring-4 focus:ring-primary-200"
          onClick={addComment}
        >
          Post comment
        </button>
      </div>
    </form>
  );
};

export default CommentForm;
