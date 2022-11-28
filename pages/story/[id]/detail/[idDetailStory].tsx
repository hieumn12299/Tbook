import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
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
} from 'firebase/firestore';
import { IComment } from '../../../../src/types/comment';

const DetailStory = () => {
  const router = useRouter();
  const idDetailStory = router.query.idDetailStory;

  const [detailStory, setDetailStory] = useState<StoryDetail | null>(null);

  const [commentList, setCommentList] = useState<IComment[]>([]);

  const db = getFirestore();

  useEffect(() => {
    if (!idDetailStory) return;
    const getDetailStory = async () => {
      let detailStory = await getStoryDetail(idDetailStory.toString());
      setDetailStory(detailStory);
    };
    getDetailStory();
  }, [idDetailStory]);

  useEffect(() => {
    if (!idDetailStory) return;
    const q = query(
      collection(db, 'comments'),
      where('id_chapter', '==', idDetailStory),
      orderBy('created_at', 'desc')
    );
    const fetchComment = async () => {
      const querySnapshot = await getDocs(q);
      const listComment: IComment[] = [];

      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        listComment.push(doc.data() as IComment);
      });
      setCommentList(listComment);
    };
    fetchComment();
  }, [idDetailStory]);

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
        <CommentList commentList={commentList} />
      </div>
    </div>
  );
};

export default DetailStory;
