import React from 'react';

type IStoryCard = {
  title: string;
  description: string;
  imageUrl: string;
  author: string;
  onHandleClickStoryCard: () => void;
  status: string;
};

const StoryCard = ({
  imageUrl,
  title,
  description,
  author,
  onHandleClickStoryCard,
  status,
}: IStoryCard) => {
  return (
    <div
      onClick={onHandleClickStoryCard}
      className="mx-3 flex flex-col mb-[20px] w-[40%] md:w-[30%] lg:w-[15%] p-2 bg-white rounded-xl transform transition-all hover:-translate-y-2 duration-300 shadow-lg hover:shadow-2xl cursor-pointer"
    >
      <img className="object-cover rounded-xl" src={imageUrl} alt="" />
      <div className="p-2">
        <h2 className="font-bold text-[15px] md:text-lg leading-[1.3]">
          {title}
        </h2>
      </div>
      <div className="m-2 my-0 text-right">
        <span className="text-white bg-purple-600 px-3 py-1 rounded-md hover:bg-purple-700">
          {status}
        </span>
      </div>
    </div>
  );
};

export default StoryCard;
