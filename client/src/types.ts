export interface Post {
  identifier: string;
  title: string;
  slug: string;
  createdAt: string;
  subName: string;
  updatedAt: string;
  body?: string;
  username: string;
  sub?: Sub;
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

export interface Sub {
  createdAt: string;
  updatedAt: string;
  name: string;
  title: string;
  description: string;
  imageUrn: string;
  bannerUrn: string;
  username: string;
  posts: Post[];
  //virtual fields
  imageUrl: string;
  bannerUrl: string;
  postCount?: number;
}

export interface Comment {
  identifier: string;
  body: string;
  username: string;
  createdAt: string;
  updatedAt: string;
  post?: Post;
  //virtual fields
  voteScore: number;
  userVote: number;
}
