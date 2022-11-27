import Router from 'next/router';
import React, { useState } from 'react';
import ModalStoryPreview, {
  IPreviewStoryModal,
} from '../../components/ModalStoryPreview';
import StoryCard from '../../components/StoryCard';
import { getStories } from '../../server/stories';
import { fetchStories } from '../../src/context/actions';
import { useAppStore } from '../../src/context/hooks';
import { StoryPost } from '../../src/types/story';
import { storiesData } from '../../stories';

const LongStories = () => {
  const { state, dispatch } = useAppStore();
  const [selectedStory, setSelectedStory] = useState<IPreviewStoryModal | null>(
    null
  );
  const handleClickStoryCard = (story: IPreviewStoryModal) => {
    // Router.push(`/story/${id}`);
    // let stories: StoryPost[] = await getStories(id);
    // dispatch(fetchStories(stories));
    // console.log(state, stories);
    setSelectedStory(story);
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
    <>
      <ModalStoryPreview
        selectedStory={selectedStory}
        onClose={() => setSelectedStory(null)}
      />
      <div className="w-full mt-[84px] min-h-[calc(100vh-84px)] px-2">
        <div className="flex justify-center py-4 pb-0">
          <h2 className="text-[50px] font-bold text-white">Tiểu thuyết</h2>
        </div>
        <div>
          <div className="flex py-10 flex-row justify-center px-3 flex-wrap">
            {storiesData.stories
              .filter((story) => story.type === '1')
              .map((item) => (
                <StoryCard
                  key={item.id}
                  imageUrl={item.url}
                  title={item.name}
                  description={item.description}
                  author={item.author}
                  status={item.status}
                  onHandleClickStoryCard={() => handleClickStoryCard(item)}
                />
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default LongStories;
