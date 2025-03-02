export interface Comment {
  commentId: number;
  nickname: string;
  userId: number;
  content: string;
  date: string;
}

export interface CommentsData {
  commentsCnt: number;
  comments: Comment[];
}
