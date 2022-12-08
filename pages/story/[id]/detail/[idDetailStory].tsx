import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useState } from 'react';
import { getStoryDetail } from '../../../../server/stories';
import parse from 'html-react-parser';
import { StoryDetail } from '../../../../src/types/story';
import CommentList from '../../../../components/CommentList';
import {
  collection,
  query,
  where,
  getDocs,
  getFirestore,
  orderBy,
  setDoc,
  doc,
  addDoc,
  onSnapshot,
  deleteDoc,
} from 'firebase/firestore';
import { IComment } from '../../../../src/types/comment';
import { auth } from '../../../../config/firebaseConfig';
import { Analytics } from '@vercel/analytics/react';

type TNestedArray = (items: IComment[], parrent_id?: string) => IComment[];

const toNestArray: TNestedArray = (items, parent_id) =>
  items.reduce((nestedArray: IComment[], item: IComment) => {
    if ((item.parent_id || parent_id) && item.parent_id !== parent_id) {
      return nestedArray;
    }
    const childrenArray = toNestArray(items, item.id).sort((x, y) => {
      return x.created_at.seconds + y.created_at.seconds;
    });
    return [
      ...nestedArray,
      childrenArray.length ? { ...item, child_comments: childrenArray } : item,
    ];
  }, []);

const db = getFirestore();

const DetailStory = () => {
  const router = useRouter();
  const idChapter = router.query.idDetailStory;

  const idStory = router.query.id;

  const [detailStory, setDetailStory] = useState<StoryDetail | null>(null);

  const [commentList, setCommentList] = useState<IComment[]>([]);

  const [content, setContent] = useState('');

  const handleSetContent = (content: string) => {
    setContent(content);
  };

  useEffect(() => {
    if (!idChapter) return;
    const getDetailStory = async () => {
      let detailStory = await getStoryDetail(idChapter.toString());
      setDetailStory(detailStory);
    };
    getDetailStory();
  }, [idChapter]);

  const q = useMemo(() => {
    return query(
      collection(db, 'comments'),
      where('id_chapter', '==', idChapter || ''),
      where('id_story', '==', idStory || ''),
      orderBy('created_at', 'desc')
    );
  }, [idChapter]);

  onSnapshot(q, (querySnapshot) => {
    const listComment: IComment[] = [];

    querySnapshot.forEach((doc) => {
      listComment.push({
        id: doc.id,
        ...doc.data(),
      } as IComment);
    });

    setCommentList(toNestArray(listComment));
  });

  const addComment = async () => {
    if (!idStory || !idChapter || !content.trim().length) return;
    await addDoc(collection(db, 'comments'), {
      created_at: new Date(),
      name: auth.currentUser?.displayName,
      id_chapter: idChapter,
      id_story: idStory,
      parent_id: null,
      content: content,
      img: auth.currentUser?.photoURL,
      uid: auth.currentUser?.uid,
    }).then(() => {
      setContent('');
    });
  };

  return (
    <div className="bg-[#F6F6F6] flex justify-center">
      <div className="flex flex-col justify-center max-w-[900px]">
        <div className=" mt-[84px] min-h-[calc(100vh-84px)] px-2 py-[50px] bg-white">
          <h2 className="text-[50px] font-bold text-center">
            {detailStory?.title}
          </h2>
          <div className="text-[20px] px-[20px] text-justify detail-wrapper">
            {parse(detailStory?.bodyHTML || '')}
          </div>
        </div>
        <CommentList
          commentList={commentList}
          addComment={addComment}
          content={content}
          onHandleSetContent={handleSetContent}
        />
      </div>
      <Analytics
        beforeSend={(event) => {
          if (!idChapter) return null;
          const url = new URL(event.url);
          url.searchParams.delete(idChapter.toString());
          return {
            ...event,
            url: url.toString(),
          };
        }}
      />
    </div>
  );
};

export default DetailStory;
