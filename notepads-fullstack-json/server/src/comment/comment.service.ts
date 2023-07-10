import path from "path";
import type { Comment } from "../../../shared/types";
import * as json from "../json";

const commentModelPath = path.join("data", "comment.data");
const commentModelDataPath = path.join(commentModelPath, "comments");

export function findComments() {
  const commentsFiles = json.listJSON(commentModelDataPath);
  const comments: Comment[] = commentsFiles.map((file) => {
    return json.readJSON(commentModelDataPath, file);
  });
  return comments;
}

export function createComment(commentData: Omit<Comment, "id" | "created_at">) {
  let comment: Comment;
  const commentsLatestId = json.readJSON(
    commentModelPath,
    "commentsLatestId.json"
  );
  const commentId: number = commentsLatestId.latestId + 1;

  try {
    json.updateJSON([commentModelPath, "commentsLatestId.json"], {
      latestId: commentId,
    });
    comment = {
      ...commentData,
      id: commentId,
      created_at: new Date().toJSON(),
    };
    json.createJSON([commentModelDataPath, `${commentId}.json`], comment);
  } catch (error) {
    console.log(error);
    return {
      success: false,
      comment: null,
    };
  }

  return {
    success: true,
    comment,
  };
}
