import { StoryDetail, StoryPost } from '../src/types/story';
import { discussionDetailGql, discussionGql } from './gql';

const API_URL = 'https://api.github.com/graphql';
const GH_ACCESS_TOKEN = process.env.NEXT_PUBLIC_GH_ACCESS_TOKEN;

export async function getStories(categoryId: string): Promise<StoryPost[]> {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      Authorization: `token ${GH_ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query: discussionGql(categoryId) }),
  });
  let res = await response.json();

  const discussions = res.data.repository.discussions.nodes;
  const posts = discussions.map((discussion: any): StoryPost => {
    const {
      title,
      author,
      createdAt,
      lastEditedAt: lastEdited,
      number: id,
      bodyHTML: html,
      bodyText,
      labels,
      url: discussionUrl,
    } = discussion;
    const url = `/story/${id}`;
    const authorUrl = author.url;
    const authorName = author.login;
    const authorAvatar = author.avatarUrl;
    const chapters: string[] = labels.nodes.map((tag: { name: string }) => {
      return tag.name;
    });
    const post = {
      id,
      url,
      discussionUrl,
      title,
      html,
      bodyText,
      chapters,
      createdAt,
      lastEdited,
      author: { url: authorUrl, name: authorName, avatar: authorAvatar },
    };
    return post;
  });
  return posts;
}

export async function getStoryDetail(storyId: string): Promise<StoryDetail> {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      Authorization: `token ${GH_ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query: discussionDetailGql(storyId) }),
  });
  let res = await response.json();
  let discussion = res.data.repository.discussion;
  const {
    author: { url: authorUrl, login: authorName, avatarUrl: authorAvatar },
    createdAt,
    title: title,
    bodyHTML: html,
  } = discussion;
  const detail = {
    author: { url: authorUrl, name: authorName, avatar: authorAvatar },
    createdAt,
    title,
    bodyHTML: html,
  };
  return detail;
}
