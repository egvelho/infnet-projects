import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { getUser } from "../api/getUser";
import type { User } from "../../../shared/types";
import { Card } from "../components/Card";
import { PostList } from "../components/PostList";
import { ProfileCard } from "../components/user-page/ProfileCard";
import { FriendsCard } from "../components/user-page/FriendsCard";
import { PersonalityCard } from "../components/user-page/PersonalityCard";
import { getUserLatestFriends } from "../api/getUserLatestFriends";
import { getUserFriendsLatestPosts } from "../api/getUserFriendsLatestPosts";
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

const initialFriendsPostsList: Post[] = [];

export function UserPage() {
  const params = useParams();
  const userId = +(params.id ?? 0);
  const [user, setUser] = useState(initialUser);
  const [friendsPostsList, setFriendsPostsList] = useState(
    initialFriendsPostsList
  );
  const [friendsList, setFriendsList] = useState(initialFriendsList);

  async function loadUser() {
    const user = await getUser(userId);
    setUser(user);
  }

  async function loadFriends() {
    const friendsList = await getUserLatestFriends(userId);
    setFriendsList(friendsList);
  }

  async function loadFriendsPosts() {
    const friendsPostsList = await getUserFriendsLatestPosts(userId);
    setFriendsPostsList(friendsPostsList);
  }

  useEffect(() => {
    loadUser();
    loadFriends();
    loadFriendsPosts();
  }, [userId]);

  return (
    <div className="flex flex-col lg:flex-row gap-2 m-2 sm:mx-auto max-w-screen-sm lg:max-w-screen-lg lg:mx-auto">
      <aside className="lg:max-w-[192px]">
        <ProfileCard user={user} />
      </aside>
      <div className="flex-1 flex flex-col gap-2">
        <PersonalityCard user={user} />
        <Card>
          <h3 className="font-bold">Bombando na rede</h3>
          <PostList posts={friendsPostsList} />
        </Card>
      </div>
      <div className="lg:max-w-[256px]">
        <FriendsCard count={friendsList.count} friends={friendsList.friends} />
      </div>
    </div>
  );
}
