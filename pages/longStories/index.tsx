import React from 'react';
import StoryCard from '../../components/StoryCard';
import styles from './longStories.module.scss';

const LongStories = () => {
  return (
    <div className="w-full mt-[84px] min-h-[calc(100vh-84px)] px-2">
      <div className="flex justify-center py-20">
        <h2 className="text-[50px] font-bold text-white">Truyện dài</h2>
      </div>
      <div className="flex-wrap flex justify-center items-center gap-24 py-10">
        <StoryCard />
        <StoryCard />
        <StoryCard />
        <StoryCard />
        <StoryCard />
      </div>
    </div>
  );
};

export default LongStories;
