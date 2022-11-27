import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getStoryDetail } from '../../../../server/stories';
import parse from 'html-react-parser';
import { StoryDetail } from '../../../../src/types/story';

const DetailStory = () => {
  const router = useRouter();
  const idDetailStory = router.query.idDetailStory;

  const [detailStory, setDetailStory] = useState<StoryDetail | null>(null);

  useEffect(() => {
    if (!idDetailStory) return;
    const getDetailStory = async () => {
      let detailStory = await getStoryDetail(idDetailStory.toString());
      setDetailStory(detailStory);
    };
    getDetailStory();
  }, [idDetailStory]);

  return (
    <div className="bg-[#F6F6F6] flex justify-center">
      <div className="max-w-[70%] mt-[84px] min-h-[calc(100vh-84px)] px-2 py-[50px] bg-white">
        <h2 className="text-[50px] font-bold text-center">
          {detailStory?.title}
        </h2>
        <div className="text-[20px] px-[20px] text-justify detail-wrapper">
          {parse(detailStory?.bodyHTML || '')}
        </div>
      </div>
    </div>
  );
};

export default DetailStory;
