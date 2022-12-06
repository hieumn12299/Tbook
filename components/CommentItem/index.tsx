import React, { memo, useState } from 'react';
import { IComment } from '../../src/types/comment';
import { TiDelete } from 'react-icons/ti';
import { auth } from '../../config/firebaseConfig';
import { BsThreeDots } from 'react-icons/bs';
import useClickOutSide from '../../src/hooks/useClickOutSide';
import useGetElementCoords from '../../src/hooks/useGetElementCoords';
import Popover from '../Popover.tsx';
import FormComment from '../FormComment';

const CommentItem = ({
  comment,
  deleteComment,
}: {
  comment: IComment;
  deleteComment: (id: string) => void;
}) => {
  const [isShowSettings, setIsShowSettings] = useState<boolean>(false);
  const [selectedCommentId, setSelectedCommentId] = useState('');
  const { nodeRef } = useClickOutSide(() => setIsShowSettings(false));
  const { coords, elmRef, handleGetElementCoords } = useGetElementCoords();
  const handleToggleSettings = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    setIsShowSettings((s) => !s);
    handleGetElementCoords(e);
  };

  return (
    <div className="flex-col w-full py-4 mx-auto bg-white border-b-2 border-r-2 border-gray-200 sm:px-4 sm:py-4 md:px-4 sm:rounded-lg sm:shadow-sm">
      <div className="flex flex-row px-3 relative" ref={nodeRef}>
        <img
          className="object-cover w-12 h-12 border-2 border-gray-300 rounded-full"
          alt="Noob master's avatar"
          src={comment.img}
          referrerPolicy="no-referrer"
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
            {auth.currentUser?.uid === comment.uid && (
              <div
                onClick={(e) => {
                  handleToggleSettings(e);
                  setSelectedCommentId(comment.id);
                }}
                className="cursor-pointer"
                ref={elmRef}
              >
                <BsThreeDots className="w-[20px] h-[20px]" />
              </div>
            )}
            {isShowSettings && (
              <Popover
                coords={coords}
                position="right"
                className="bg-white rounded-2xl shadow w-[230px] py-6 px-5"
              >
                <SettingsContentMemo
                  onHandleDeleteComment={() => {
                    selectedCommentId && deleteComment(selectedCommentId);
                    setSelectedCommentId('');
                  }}
                />
              </Popover>
            )}
          </div>
          <div className="flex-1 px-2 ml-2 text-sm font-medium leading-loose text-gray-600 break-words">
            {comment.content}
          </div>
        </div>
      </div>
      <FormComment />
      {!!comment.child_comments?.length &&
        comment.child_comments.map((child_comment) => (
          <div
            key={child_comment.id}
            className="flex flex-row mt-4 md-10 md:ml-16 px-3 border-t-2 py-2"
          >
            <img
              className="w-12 h-12 border-2 border-gray-300 rounded-full"
              alt="Emily's avatar"
              src={child_comment.img}
              referrerPolicy="no-referrer"
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

                {auth.currentUser?.uid === child_comment.uid && (
                  <button onClick={() => deleteComment(child_comment.id)}>
                    <TiDelete className="w-[20px] h-[20px]" color="red" />
                  </button>
                )}
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

const SettingsContentMemo = memo(SettingsContent);
function SettingsContent({
  onHandleDeleteComment,
}: {
  onHandleDeleteComment: () => void;
}) {
  return (
    <>
      <div className="flex flex-col gap-5">
        <span className="font-medium text-gray-700 inline-block hover:text-blue-500 cursor-pointer">
          Chỉnh sửa
        </span>
        <span
          className="font-medium text-gray-700 inline-block hover:text-red-500 cursor-pointer"
          onClick={onHandleDeleteComment}
        >
          Xóa
        </span>
      </div>
    </>
  );
}

export default CommentItem;
