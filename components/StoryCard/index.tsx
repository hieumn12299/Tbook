import React from 'react';

type IStoryCard = {
  title: string;
  description: string;
  imageUrl: string;
  author: string;
  onHandleClickStoryCard: () => void;
};

const StoryCard = ({
  imageUrl,
  title,
  description,
  author,
  onHandleClickStoryCard,
}: IStoryCard) => {
  return (
    <div
      onClick={onHandleClickStoryCard}
      className="flex flex-col w-60 p-2 bg-white rounded-xl transform transition-all hover:-translate-y-2 duration-300 shadow-lg hover:shadow-2xl cursor-pointer"
    >
      <div className="flex justify-center">
        <img className="h-40 object-cover rounded-xl" src={imageUrl} alt="" />
      </div>
      <div className="p-2 flex flex-col flex-1">
        <h2 className="font-bold text-lg mb-2 text-justify">{title}</h2>
      </div>

      <div className="p-2">
        <p className="text-sm text-gray-600 line-clamp-3">{description}</p>
      </div>

      <div className="m-2">
        <span className="text-white bg-purple-600 px-3 py-1 rounded-md hover:bg-purple-700">
          Author: {author}
        </span>
      </div>
    </div>
  );
};

export default StoryCard;
