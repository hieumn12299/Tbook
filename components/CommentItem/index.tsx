import React, { memo, useState } from 'react';
import { IComment } from '../../src/types/comment';
import { auth } from '../../config/firebaseConfig';
import { BsThreeDots } from 'react-icons/bs';
import useClickOutSide from '../../src/hooks/useClickOutSide';
import useGetElementCoords from '../../src/hooks/useGetElementCoords';
import Popover from '../Popover.tsx';
import FormComment from '../FormComment';
import { useRouter } from 'next/router';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getFirestore,
  updateDoc,
} from 'firebase/firestore';
import ContentEditable from 'react-contenteditable';

const db = getFirestore();

const CommentItem = ({ comment }: { comment: IComment }) => {
  const [isShowSettings, setIsShowSettings] = useState<boolean>(false);
  const [selectedComment, setSelectedComment] = useState<IComment | null>(null);
  const [updateCommentId, setUpdateCommentId] = useState('');
  const { nodeRef } = useClickOutSide(() => setIsShowSettings(false));
  const { coords, elmRef, handleGetElementCoords } = useGetElementCoords();
  const handleToggleSettings = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    setIsShowSettings((s) => !s);
    handleGetElementCoords(e);
  };
  const router = useRouter();
  const idChapter = router.query.idDetailStory;

  const idStory = router.query.id;
  const [content, setContent] = useState('');
  const [tempContent, setTempContent] = useState('');
  const [displayReply, setDisplayReply] = useState(false);

  const handleSetContent = (content: string) => {
    setContent(content);
  };

  const handleSetTempContent = (value: string) => {
    setTempContent(value);
  };

  const handleSetUpdateCommentId = (value: string) => {
    setUpdateCommentId(value);
  };

  const deleteComment = async (id: string) => {
    await deleteDoc(doc(db, 'comments', id)).then(() => {
      setDisplayReply(false);
      setIsShowSettings(false);
      setSelectedComment(null);
    });
  };

  const addReplyComment = async () => {
    if (!idStory || !idChapter || !content.trim().length) return;
    await addDoc(collection(db, 'comments'), {
      created_at: new Date(),
      name: auth.currentUser?.displayName,
      id_chapter: idChapter,
      id_story: idStory,
      parent_id: comment.id,
      content: content,
      img: auth.currentUser?.photoURL,
      uid: auth.currentUser?.uid,
    }).then(() => {
      setContent('');
      setDisplayReply(false);
      setIsShowSettings(false);
      setSelectedComment(null);
    });
  };

  const updateComment = async () => {
    if (!tempContent.trim().length || !selectedComment) return;
    await updateDoc(doc(db, 'comments', selectedComment.id), {
      content: tempContent,
    }).then(() => {
      setContent('');
      setTempContent('');
      setDisplayReply(false);
      setIsShowSettings(false);
      setSelectedComment(null);
      setUpdateCommentId('');
    });
  };

  return (
    <div className="flex-col w-full py-4 mx-auto sm:px-4 sm:py-4 md:px-4 sm:rounded-lg sm:shadow-sm">
      {isShowSettings && (
        <Popover
          coords={coords}
          position="right"
          className="bg-white rounded-2xl shadow w-[230px] py-6 px-5"
        >
          <SettingsContentMemo
            onHandleDeleteComment={() => {
              selectedComment && deleteComment(selectedComment.id);
              setSelectedComment(null);
            }}
            handleSetUpdateCommentId={handleSetUpdateCommentId}
            selectedComment={selectedComment}
            handleSetTempContent={handleSetTempContent}
          />
        </Popover>
      )}
      <div className="flex flex-row px-3 relative">
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
            <div ref={selectedComment?.id === comment.id ? nodeRef : undefined}>
              {auth.currentUser?.uid === comment.uid && (
                <div
                  onClick={(e) => {
                    handleToggleSettings(e);
                    setSelectedComment(comment);
                  }}
                  className="cursor-pointer"
                  ref={selectedComment?.id === comment.id ? elmRef : undefined}
                >
                  <BsThreeDots className="w-[20px] h-[20px]" />
                </div>
              )}
            </div>
          </div>
          {updateCommentId && updateCommentId === comment.id ? (
            <>
              <form className="flex flex-row content-between items-center add-comment-section my-1 px-[12px]">
                <ContentEditable
                  html={tempContent || ''}
                  className="flex flex-1 items-center mx-3 break-all select-text outline-none bg-[#e8e8eb] rounded-[18px] px-[18px] w-[calc(100%-70px)] py-[5px] h-fit"
                  onChange={(e) => {
                    setTempContent(e.target.value);
                  }}
                />
                <button
                  type="button"
                  className=""
                  id="btn-submit"
                  onClick={updateComment}
                >
                  Gửi
                </button>
              </form>
              <span
                className="ml-[40px] hover:underline text-[#b2b4b8] font-bold cursor-pointer"
                onClick={() => {
                  setUpdateCommentId('');
                  setSelectedComment(null);
                  setTempContent('');
                }}
              >
                Hủy bỏ
              </span>
            </>
          ) : (
            <>
              <div className="flex-1 px-2 ml-2 text-sm font-medium leading-loose text-gray-600 break-words">
                {comment.content}
              </div>
              <span
                className="px-4 hover:underline text-[#b2b4b8] font-bold cursor-pointer"
                onClick={() => setDisplayReply(!displayReply)}
              >
                Phản hồi
              </span>
            </>
          )}
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
                <div
                  ref={
                    selectedComment?.id === child_comment.id
                      ? nodeRef
                      : undefined
                  }
                >
                  {auth.currentUser?.uid === child_comment.uid && (
                    <div
                      onClick={(e) => {
                        handleToggleSettings(e);
                        setSelectedComment(child_comment);
                      }}
                      className="cursor-pointer"
                      ref={
                        selectedComment?.id === child_comment.id
                          ? elmRef
                          : undefined
                      }
                    >
                      <BsThreeDots className="w-[20px] h-[20px]" />
                    </div>
                  )}
                </div>
              </div>
              {updateCommentId && updateCommentId === child_comment.id ? (
                <>
                  <form className="flex flex-row content-between items-center add-comment-section my-1 px-[12px]">
                    <ContentEditable
                      html={tempContent || ''}
                      className="flex flex-1 items-center mx-3 break-all select-text outline-none bg-[#e8e8eb] rounded-[18px] px-[18px] w-[calc(100%-70px)] py-[5px] h-fit"
                      onChange={(e) => {
                        setTempContent(e.target.value);
                      }}
                    />
                    <button
                      type="button"
                      className=""
                      id="btn-submit"
                      onClick={updateComment}
                    >
                      Gửi
                    </button>
                  </form>
                  <span
                    className="ml-[40px] hover:underline text-[#b2b4b8] font-bold cursor-pointer"
                    onClick={() => {
                      setUpdateCommentId('');
                      setSelectedComment(null);
                      setTempContent('');
                    }}
                  >
                    Hủy bỏ
                  </span>
                </>
              ) : (
                <>
                  <div className="flex-1 px-2 ml-2 text-sm font-medium leading-loose text-gray-600 break-words">
                    {child_comment.content}
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      {displayReply && (
        <FormComment
          content={content}
          onHandleSetContent={handleSetContent}
          addComment={addReplyComment}
        />
      )}
    </div>
  );
};

const SettingsContentMemo = memo(SettingsContent);
function SettingsContent({
  onHandleDeleteComment,
  handleSetUpdateCommentId,
  selectedComment,
  handleSetTempContent,
}: {
  onHandleDeleteComment: () => void;
  handleSetUpdateCommentId: (value: string) => void;
  selectedComment: IComment | null;
  handleSetTempContent: (value: string) => void;
}) {
  return (
    <>
      <div className="flex flex-col gap-5">
        <span
          className="font-medium text-gray-700 inline-block hover:text-blue-500 cursor-pointer"
          onClick={() => {
            handleSetUpdateCommentId(selectedComment?.id || '');
            handleSetTempContent(selectedComment?.content || '');
          }}
        >
          Chỉnh sửa
        </span>
        <span
          className="font-medium text-gray-700 inline-block hover:text-red-500 cursor-pointer"
          onClick={() => {
            onHandleDeleteComment();
          }}
        >
          Xóa
        </span>
      </div>
    </>
  );
}

export default CommentItem;
