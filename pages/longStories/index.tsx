import Router from 'next/router';
import React from 'react';
import StoryCard from '../../components/StoryCard';
import { getStories } from '../../server/stories';
import { fetchStories } from '../../src/context/actions';
import { useAppStore } from '../../src/context/hooks';
import { StoryPost } from '../../src/types/story';
import { storiesData } from '../../stories';

const LongStories = () => {
  const { state, dispatch } = useAppStore();
  const handleClickStoryCard = async (id: string) => {
    Router.push(`/story/${id}`);
    // let stories: StoryPost[] = await getStories(id);
    // dispatch(fetchStories(stories));
    // console.log(state, stories);
  };

  // React.useEffect(() => {
  //   let chapters: string[] = [];

  //   for (const story of state.stories) {
  //     for (const chapter of story.chapters) {
  //       if (!chapters.includes(chapter)) {
  //         chapters.push(chapter);
  //       }
  //     }
  //   }
  // }, []);
  return (
    <div className="w-full mt-[84px] min-h-[calc(100vh-84px)] px-2">
      <div className="flex justify-center py-20">
        <h2 className="text-[50px] font-bold text-white">Tiểu thuyết</h2>
      </div>
      <div className="mx-auto">
        <div className="flex py-10 gap-24 flex-col sm:flex-row justify-center mx-4 md:mx-0 lg:-mx-2 flex-wrap">
          {storiesData.stories
            .filter((story) => story.type === '1')
            .map((item) => (
              <StoryCard
                key={item.id}
                imageUrl={item.url}
                title={item.name}
                description={item.description}
                author={item.author}
                onHandleClickStoryCard={() => handleClickStoryCard(item.id)}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default LongStories;
