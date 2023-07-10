import { useState, useEffect } from "react";
import type { User } from "../../../shared/types";
import { Card } from "../components/Card";
import { PostList } from "../components/PostList";
import { ProfileCard } from "../components/user-page/ProfileCard";
import { FriendsCard } from "../components/user-page/FriendsCard";
import { PersonalityCard } from "../components/user-page/PersonalityCard";
import { CreatePostCard } from "../components/user-page/CreatePostCard";
import { getMyselfFriends } from "../api/getMyselfFriends";
import { getMyselfFeed } from "../api/getMyselfFeed";
import { getMyself } from "../api/getMyself";
import { getMyselfLatestPosts } from "../api/getMyselfLatestPosts";
import type { Friend } from "../../../shared/types";
import type { Post } from "../../../shared/types";

const initialUser: User = {
  id: 0,
  first_name: "",
  last_name: "",
  created_at: "",
  email: "",
  passwd: "",
};

const initialFriendsList = {
  count: 0,
  friends: [] as Friend[],
};

const initialFeedList: Post[] = [];
const initialUserLatestPosts: Post[] = [];

export function ProfilePage() {
  const [user, setUser] = useState(initialUser);
  const [feedList, setFeedList] = useState(initialFeedList);
  const [userLatestPosts, setUserLatestPosts] = useState(
    initialUserLatestPosts
  );
  const [friendsList, setFriendsList] = useState(initialFriendsList);

  const mappedUserLatestPosts = userLatestPosts.map((post) => ({
    ...post,
    user_id: user.id,
    user_first_name: user.first_name,
    user_last_name: user.last_name,
  }));

  async function loadUser() {
    const user = await getMyself();
    setUser(user);
  }

  async function loadFriends() {
    const friendsList = await getMyselfFriends();
    setFriendsList(friendsList);
  }

  async function loadFeed() {
    const feedList = await getMyselfFeed();
    setFeedList(feedList);
  }

  async function loadUserLatestPosts() {
    const userLatestPosts = await getMyselfLatestPosts();
    setUserLatestPosts(userLatestPosts);
  }

  useEffect(() => {
    loadUser();
    loadFriends();
    loadFeed();
    loadUserLatestPosts();
  }, []);

  return (
    <div className="flex flex-col lg:flex-row gap-2 m-2 sm:mx-auto max-w-screen-sm lg:max-w-screen-lg lg:mx-auto">
      <aside className="lg:max-w-[192px]">
        <ProfileCard user={user} />
      </aside>
      <div className="flex-1 flex flex-col gap-2">
        <PersonalityCard user={user} />
        <CreatePostCard onSubmitSuccess={loadUserLatestPosts} />
        <Card>
          <h3 className="font-bold">Minhas publicações</h3>
          <PostList posts={mappedUserLatestPosts} />
        </Card>
        <Card>
          <h3 className="font-bold">Bombando na rede</h3>
          <PostList posts={feedList} />
        </Card>
      </div>
      <div className="lg:max-w-[256px]">
        <FriendsCard count={friendsList.count} friends={friendsList.friends} />
      </div>
    </div>
  );
}
