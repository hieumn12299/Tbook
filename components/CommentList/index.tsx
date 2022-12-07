import React from 'react';
import { auth } from '../../config/firebaseConfig';
import { IComment } from '../../src/types/comment';
import CommentForm from '../CommentForm';
import CommentItem from '../CommentItem';
import FormComment from '../FormComment';

const CommentList = ({
  commentList,
  addComment,
  content,
  onHandleSetContent,
}: {
  commentList: IComment[];
  addComment: (parentId?: string) => void;
  content: string;
  onHandleSetContent: (content: string) => void;
}) => {
  return (
    <section className="relative flex items-center justify-center antialiased py-[100px] px-5">
      <div className="container px-0 mx-auto sm:px-5 bg-white border-b-2 border-r-2 border-gray-200 sm:rounded-lg">
        {auth.currentUser && (
          <FormComment
            addComment={addComment}
            content={content}
            onHandleSetContent={onHandleSetContent}
          />
        )}
        {commentList.map((comment, index) => {
          return <CommentItem key={comment.id} comment={comment} />;
        })}
      </div>
    </section>
  );
};

export default CommentList;
