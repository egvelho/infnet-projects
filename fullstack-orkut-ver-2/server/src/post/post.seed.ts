import { PostRepository } from "./post.repository";
import { UserRepository } from "../user/user.repository";
import { faker } from "@faker-js/faker";

const defaultLimit = 20;
const minCommentCount = 1;
const commentRange = 4;

const userRepository = new UserRepository();
const postRepository = new PostRepository();

async function postSeed() {
  const users = await userRepository.listUsers();
  const usersIds = users.map((user) => user.id);

  const limit = Number(process.argv[2]) || defaultLimit;
  console.log("Iniciando seeding...");
  console.log(`Vão ser criados ${limit} posts`);
  for (let index = 0; index < limit; index++) {
    const userId = getRandomUserId(usersIds);
    const postData = generatePost(userId);
    const post = await postRepository.createPost(postData);
    console.log(`Criado post de id #${post.id}`);
    await commentSeed(post, usersIds);
  }
  console.log("Seeding realizado com sucesso!");
}

async function commentSeed(post: any, usersIds: number[]) {
  const commentCount =
    minCommentCount + Math.round(Math.random() * commentRange);
  for (let index = 0; index < commentCount; index++) {
    const userId = getRandomUserId(usersIds);
    const comment = generateComment(userId);
    const addedComment = await postRepository.createPostComment(
      post.id,
      comment
    );
    console.log(`Criado comentário de id #${addedComment.id}`);
  }
}

function generatePost(user_id: number) {
  return {
    user_id,
    content: faker.lorem.words(5 + Math.round(Math.random() * 5)),
  };
}

function generateComment(user_id: number) {
  return {
    user_id,
    message: faker.lorem.words(2 + Math.round(Math.random() * 3)),
  };
}

function getRandomUserId(usersId: number[]) {
  return usersId[Math.floor(Math.random() * usersId.length)];
}

postSeed();
