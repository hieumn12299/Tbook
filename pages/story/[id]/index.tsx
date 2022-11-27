import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getStories } from '../../../server/stories';
import { fetchStories, setStoryDetail } from '../../../src/context/actions';
import { useAppStore } from '../../../src/context/hooks';
import { StoryPost } from '../../../src/types/story';

const story = () => {
  const { state, dispatch } = useAppStore();
  const [chapterList, setChapterList] = useState<string[]>([]);
  const [selectedChapter, setSelectedChapter] = useState<string>('');
  const router = useRouter();

  const id = router.query.id;

  useEffect(() => {
    if (!id) return;
    const fetchChapter = async () => {
      let stories: StoryPost[] = await getStories(id as string);
      dispatch(fetchStories(stories));
      let chapters: string[] = [];
      for (const story of stories) {
        for (const chapter of story.chapters) {
          if (!chapters.includes(chapter)) {
            chapters.push(`${chapter}: ${story.title}`);
          }
        }
      }
      setChapterList(chapters);
    };
    fetchChapter().catch(console.error);
  }, [id]);

  useEffect(() => {
    const detailStory = state.stories.filter(
      (chapter) =>
        `${chapter.chapters[0]}: ${chapter.title}` === selectedChapter
    )[0];
    // dispatch(setStoryDetail(detailStory));
  }, [state.stories, selectedChapter]);

  return (
    <div className="w-full mt-[84px] min-h-[calc(100vh-84px)] px-2 py-[100px]">
      {chapterList.map((chapter) => (
        <div key={chapter} className="flex justify-center py-6">
          <span
            onClick={() => setSelectedChapter(chapter)}
            className="text-2xl hover:underline cursor-pointer"
          >{`🌸 ${chapter}`}</span>
        </div>
      ))}
    </div>
  );
};

export default story;
