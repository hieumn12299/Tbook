import React from 'react';
import { IComment } from '../../src/types/comment';
import { TiDelete } from 'react-icons/ti';

const CommentItem = ({
  comment,
  deleteComment,
}: {
  comment: IComment;
  deleteComment: (id: string) => void;
}) => {
  return (
    <div className="flex-col w-full py-4 mx-auto bg-white border-b-2 border-r-2 border-gray-200 sm:px-4 sm:py-4 md:px-4 sm:rounded-lg sm:shadow-sm">
      <div className="flex flex-row px-3">
        <img
          className="object-cover w-12 h-12 border-2 border-gray-300 rounded-full"
          alt="Noob master's avatar"
          src="https://images.unsplash.com/photo-1517070208541-6ddc4d3efbcb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&faces=1&faceindex=1&facepad=2.5&w=500&h=500&q=80"
        />
        <div className="mt-1 flex-col w-full">
          <div className="flex-1 px-4 font-bold leading-tight w-full flex justify-between">
            <div className="flex items-center">
              {comment.name}
              <span className="ml-2 text-xs font-normal text-gray-500">
                {new Date(
                  new Date(comment.created_at.seconds * 1000)
                ).toLocaleString()}
              </span>
            </div>

            <button
              onClick={() => {
                deleteComment(comment.id);
              }}
            >
              <TiDelete className="w-[20px] h-[20px]" color="red" />
            </button>
          </div>
          <div className="flex-1 px-2 ml-2 text-sm font-medium leading-loose text-gray-600 break-words">
            {comment.content}
          </div>
        </div>
      </div>
      {!!comment.child_comments?.length &&
        comment.child_comments.map((child_comment) => (
          <div
            key={child_comment.id}
            className="flex flex-row mt-4 md-10 md:ml-16 px-3 border-t-2 py-2"
          >
            <img
              className="w-12 h-12 border-2 border-gray-300 rounded-full"
              alt="Emily's avatar"
              src="https://images.unsplash.com/photo-1581624657276-5807462d0a3a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&fit=facearea&faces=1&faceindex=1&facepad=2.5&w=500&h=500&q=80"
            />
            <div className="mt-1 flex-col w-full">
              <div className="flex-1 px-4 font-bold leading-tight w-full flex justify-between">
                <div className="flex items-center">
                  {child_comment.name}
                  <span className="ml-2 text-xs font-normal text-gray-500">
                    {new Date(
                      new Date(child_comment.created_at.seconds * 1000)
                    ).toLocaleString()}
                  </span>
                </div>

                <button onClick={() => deleteComment(child_comment.id)}>
                  <TiDelete className="w-[20px] h-[20px]" color="red" />
                </button>
              </div>
              <div className="flex-1 px-2 ml-2 text-sm font-medium leading-loose text-gray-600 break-words">
                {child_comment.content}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default CommentItem;
