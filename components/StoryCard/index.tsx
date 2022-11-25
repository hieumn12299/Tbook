import React from 'react';

const StoryCard = () => {
  return (
    <div className="w-60 p-2 bg-white rounded-xl transform transition-all hover:-translate-y-2 duration-300 shadow-lg hover:shadow-2xl cursor-pointer">
      <div className="flex justify-center">
        <img
          className="h-40 object-cover rounded-xl"
          src="https://littleyuung.files.wordpress.com/2022/11/image1-2-3.jpg?w=195"
          alt=""
        />
      </div>
      <div className="p-2">
        <h2 className="font-bold text-lg mb-2 ">Ngày Cáo Dối Lừa</h2>

        <p className="text-sm text-gray-600">
          Simple Yet Beautiful Card Design with TaiwlindCss. Subscribe to our
          Youtube channel for more ...
        </p>
      </div>

      <div className="m-2">
        <span className="text-white bg-purple-600 px-3 py-1 rounded-md hover:bg-purple-700">
          Author: Yuung
        </span>
      </div>
    </div>
  );
};

export default StoryCard;
