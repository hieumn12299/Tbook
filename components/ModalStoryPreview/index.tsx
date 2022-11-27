import Router, { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getStories } from '../../server/stories';
import { fetchStories } from '../../src/context/actions';
import { useAppStore } from '../../src/context/hooks';
import { StoryPost } from '../../src/types/story';
import parse from 'html-react-parser';

export type IPreviewStoryModal = {
  id: string;
  type: string;
  name: string;
  url: string;
  author: string;
  status: string;
  description: string;
};

const ModalStoryPreview = ({
  selectedStory,
  onClose,
}: {
  selectedStory: IPreviewStoryModal | null;
  onClose?: () => void;
}) => {
  const router = useRouter();
  const [display, setDisplay] = useState(false);

  const [currentStoryList, setCurrentStoryList] = useState<StoryPost[] | null>(
    null
  );

  useEffect(() => {
    setDisplay(!!selectedStory);
    if (!selectedStory) return;
    const fetchStoryList = async () => {
      let stories: StoryPost[] = await getStories(
        selectedStory.id?.toString() as string
      );
      setCurrentStoryList(stories);
    };
    fetchStoryList().catch(console.error);
  }, [selectedStory]);

  return (
    <>
      {display && (
        <div className="wp-modal modal-container modal-story-preview">
          <div className="modal-content animate" aria-label="Full screen modal">
            <div className="story-preview-wrapper">
              <div className="cover">
                <img src={selectedStory?.url} alt="" />
              </div>
              <button className="close" onClick={onClose}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#222222"
                  strokeWidth="2"
                  aria-hidden="true"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className=""
                >
                  <g>
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </g>
                </svg>
              </button>
              <div className="story-info">
                <div className="meta-header">
                  <div className="title-wrapper">
                    <div className="title">{selectedStory?.name}</div>
                  </div>
                  <div className="icon-bar" aria-hidden="true">
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
                      <span className="inline-block ml-[5px]">{`${currentStoryList?.length} chương`}</span>
                    </div>
                    <div className="completed">
                      <div className="tag-item text-white bg-purple-600 px-3 py-1 rounded-md hover:bg-purple-700">
                        {selectedStory?.status}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="buttons-wrapper">
                  <button
                    className="read btn-primary"
                    onClick={() =>
                      router.push(
                        `/story/${selectedStory?.id}/detail/${
                          currentStoryList && currentStoryList[1].id
                        }`
                      )
                    }
                  >
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
                <div className="description">
                  <div className="detail-wrapper">
                    {parse(
                      currentStoryList ? currentStoryList[0].html || '' : ''
                    )}
                  </div>
                </div>
                <div className="more-details-wrapper">
                  <button
                    className="more-details"
                    onClick={() => Router.push(`/story/${selectedStory?.id}`)}
                  >
                    Thêm Chi Tiết
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#222222"
                      strokeWidth="2"
                      aria-hidden="true"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className=""
                    >
                      <g>
                        <polyline points="9 18 15 12 9 6"></polyline>
                      </g>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalStoryPreview;
