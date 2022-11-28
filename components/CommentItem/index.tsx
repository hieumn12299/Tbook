import React from 'react';
import { IComment } from '../../src/types/comment';

const CommentItem = ({ comment }: { comment: IComment }) => {
  return (
    <div className="flex-col w-full py-4 mx-auto bg-white border-b-2 border-r-2 border-gray-200 sm:px-4 sm:py-4 md:px-4 sm:rounded-lg sm:shadow-sm">
      <div className="flex flex-row px-3">
        <img
          className="object-cover w-12 h-12 border-2 border-gray-300 rounded-full"
          alt="Noob master's avatar"
          src="https://images.unsplash.com/photo-1517070208541-6ddc4d3efbcb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&faces=1&faceindex=1&facepad=2.5&w=500&h=500&q=80"
        />
        <div className="flex-col mt-1">
          <div className="flex items-center flex-1 px-4 font-bold leading-tight">
            {comment.name}
            <span className="ml-2 text-xs font-normal text-gray-500">
              {new Date(
                new Date(comment.created_at.seconds * 1000)
              ).toLocaleString()}
            </span>
          </div>
          <div className="flex-1 px-2 ml-2 text-sm font-medium leading-loose text-gray-600">
            {comment.content}
          </div>
        </div>
      </div>
      {/* <div className="flex flex-row pt-1 md-10 md:ml-16 px-3">
        <img
          className="w-12 h-12 border-2 border-gray-300 rounded-full"
          alt="Emily's avatar"
          src="https://images.unsplash.com/photo-1581624657276-5807462d0a3a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&fit=facearea&faces=1&faceindex=1&facepad=2.5&w=500&h=500&q=80"
        />
        <div className="flex-col mt-1">
          <div className="flex items-center flex-1 px-4 font-bold leading-tight">
            Emily
            <span className="ml-2 text-xs font-normal text-gray-500">
              5 days ago
            </span>
          </div>
          <div className="flex-1 px-2 ml-2 text-sm font-medium leading-loose text-gray-600">
            I created it using TailwindCSS
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default CommentItem;
