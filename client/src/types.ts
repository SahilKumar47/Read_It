export interface Post {
  identifier: string;
  title: string;
  slug: string;
  createAt: string;
  subName: string;
  updatedAt: string;
  body?: string;
  username: string;
  //virtual fields
  url: string;
  voteScore?: number;
  commentCount?: number;
  userVote?: number;
}

export interface User {
  username: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}
