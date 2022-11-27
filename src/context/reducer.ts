import { StoryDetail, StoryPost } from '../types/story';
import { FETCH_STORIES, SET_DETAIL_STORY } from './constants';

export type IInitialData = {
  stories: StoryPost[] | [];
  storyDetail: StoryDetail | null;
  chaptersList: string[];
};

export const initialData: IInitialData = {
  stories: [],
  storyDetail: null,
  chaptersList: [],
};

function reducer(state: IInitialData, action: any) {
  switch (action.type) {
    case FETCH_STORIES:
      return {
        ...state,
        stories: action.payload,
      };

    case SET_DETAIL_STORY:
      return {
        ...state,
        storyDetail: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
}

export default reducer;
