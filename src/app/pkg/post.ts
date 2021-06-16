export interface User {
  id: string;
  login: string;
  password: string;
}

export interface Post {
  votes?: User[];
  score?: number;
  id?: string;
  text: string;
  title: string;
  category: string;
  author?: User;
  comments?: Comment[];
  created?: string;
}

export interface Category {
  name: string;
  description: string;
}

export interface Comment {
  id?: string;
  author?: User;
  body: string;
  created?: string;
}
