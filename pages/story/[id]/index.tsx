import Router, { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getStories } from '../../../server/stories';
import { fetchStories, setStoryDetail } from '../../../src/context/actions';
import { useAppStore } from '../../../src/context/hooks';
import { StoryPost } from '../../../src/types/story';
import { storiesData } from '../../../stories';
import parse from 'html-react-parser';

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

  const handleSelectedDetailStory = (idDetailStory: string) => {
    Router.push(`/story/${id}/detail/${idDetailStory}`);
  };

  return (
    <div className="w-full mt-[84px] min-h-[calc(100vh-84px)] pb-[100px]">
      <div
        className="modal-content animate border-0"
        aria-label="Full screen modal"
      >
        <div className="story-preview-wrapper">
          <div className="cover w-3/12">
            <img
              src={
                storiesData.stories.filter((story) => story.id === id)[0]
                  ?.url || ''
              }
              alt=""
              className="h-100"
            />
          </div>
          <div className="story-info w-9/12 flex">
            <div className="meta-header">
              <div className="title-wrapper">
                <div className="title text-3xl w-fit h-auto py-[10px]">
                  {storiesData.stories.filter((story) => story.id === id)[0]
                    ?.name || ''}
                </div>
              </div>
              <div className="icon-bar " aria-hidden="true">
                <div className="icon-parts">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#222222"
                    strokeWidth="2"
                    aria-hidden="true"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="icon"
                  >
                    <g>
                      <line x1="8" y1="6" x2="21" y2="6"></line>
                      <line x1="8" y1="12" x2="21" y2="12"></line>
                      <line x1="8" y1="18" x2="21" y2="18"></line>
                      <line x1="3" y1="6" x2="3" y2="6"></line>
                      <line x1="3" y1="12" x2="3" y2="12"></line>
                      <line x1="3" y1="18" x2="3" y2="18"></line>
                    </g>
                  </svg>
                  <span className="inline-block ml-[5px]">{`${
                    state.stories ? state.stories.length : '0'
                  } chương`}</span>
                </div>
                <div className="completed">
                  <div className="tag-item text-white bg-purple-600 px-3 py-1 rounded-md hover:bg-purple-700">
                    {storiesData.stories.filter((story) => story.id === id)[0]
                      ?.status || ''}
                  </div>
                </div>
              </div>
            </div>
            <div className="description flex-grow text-justify mt-5 h-[130px] max-h-[250px] overflow-auto w-full">
              <div className="detail-wrapper">
                {parse(state.stories[0]?.html || '')}
              </div>
            </div>
            <div className="buttons-wrapper">
              <button className="read btn-primary">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="2"
                  aria-hidden="true"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="open-book"
                >
                  <g>
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                  </g>
                </svg>
                <span className="read-btn-text">Bắt đầu đọc</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-[30px] bg-white shadow-[0_4px_8px_rgba(18,18,18,0.12)] radius-[8px] mx-[40px] px-[12px] py-[24px]">
        <h2 className="text-5xl text-center font-bold py-[30px]">Mục lục</h2>
        {state.stories.map((story) => (
          <div key={story.id} className="flex py-2">
            <span
              onClick={() =>
                handleSelectedDetailStory(story.id?.toString() || '')
              }
              className="text-2xl hover:underline cursor-pointer"
            >{`🌸 ${story.chapters[0]}: ${story.title}`}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default story;
