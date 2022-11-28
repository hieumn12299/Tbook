import React from 'react';
import { IComment } from '../../src/types/comment';
import CommentForm from '../CommentForm';
import CommentItem from '../CommentItem';

const CommentList = ({ commentList }: { commentList: IComment[] }) => {
  return (
    <section className="relative flex items-center justify-center antialiased py-[100px] px-5">
      <div className="container px-0 mx-auto sm:px-5">
        <CommentForm />
        {commentList.map((comment, index) => {
          return <CommentItem key={index} comment={comment} />;
        })}
      </div>
    </section>
  );
};

export default CommentList;
