import { UserRepository } from "../user/user.repository";

const minFriendsCount = 1;
const friendsRange = 4;

async function seedFriend() {
  const userRepository = new UserRepository();

  console.log("Iniciando seeding...");
  const users = await userRepository.listUsers();
  const usersId = users.map((user) => user.id);
  let friendships: Array<{ userA: number; userB: number }> = []; // { userA: 1, userB: 2 }

  for (const id of usersId) {
    const friendsCount =
      minFriendsCount + Math.round(Math.random() * friendsRange);

    for (let index = 0; index < friendsCount; index++) {
      let randomId: number;
      do {
        randomId = usersId[Math.floor(Math.random() * usersId.length)];
      } while (
        randomId === id ||
        friendships.some(
          (friend) =>
            (friend.userA === id && friend.userB === randomId) ||
            (friend.userA === randomId && friend.userB === id)
        )
      );

      friendships.push({
        userA: id,
        userB: randomId,
      });
    }
  }

  for (const { userA, userB } of friendships) {
    await userRepository.addFriend(userA, userB);
    console.log(`Usuário #${userA} adicionou #${userB}`);
  }

  console.log("Seeding realizado com sucesso!");
}

seedFriend();
