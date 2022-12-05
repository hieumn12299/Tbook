import React from 'react';
import { IComment } from '../../src/types/comment';
import CommentForm from '../CommentForm';
import CommentItem from '../CommentItem';

const CommentList = ({
  commentList,
  addComment,
  content,
  onHandleSetContent,
  deleteComment,
}: {
  commentList: IComment[];
  addComment: () => void;
  content: string;
  onHandleSetContent: (content: string) => void;
  deleteComment: (id: string) => void;
}) => {
  return (
    <section className="relative flex items-center justify-center antialiased py-[100px] px-5">
      <div className="container px-0 mx-auto sm:px-5">
        <CommentForm
          addComment={addComment}
          content={content}
          onHandleSetContent={onHandleSetContent}
        />
        {commentList.map((comment, index) => {
          return (
            <CommentItem
              key={comment.id}
              comment={comment}
              deleteComment={deleteComment}
            />
          );
        })}
      </div>
    </section>
  );
};

export default CommentList;
