import { StoryDetail, StoryPost } from '../types/story';
import { FETCH_STORIES, SET_DETAIL_STORY } from './constants';
import { IInitialData } from './reducer';

export const fetchStories = (payload: StoryPost[]) => ({
  type: FETCH_STORIES,
  payload,
});

export const setStoryDetail = (payload: StoryDetail) => ({
  type: SET_DETAIL_STORY,
  payload,
});
