import { useState } from "react";
import toast from "react-simple-toasts";
import useAxios from "axios-hooks";
import { LinkButton } from "./LinkButton";
import { TextArea } from "./TextArea";
import { Button } from "./Button";
import { PostMessage } from "./PostMessage";
import { axios } from "../axios";

const initialPosts = [];

export function BaseProfilePage({ viewMode, user, loadUser }) {
  const [message, setMessage] = useState("");
  const [{ data: posts = initialPosts }, loadPosts] = useAxios(
    `/posts/${user.id}`
  );

  async function onSubmitMessage(event) {
    event.preventDefault();
    await axios.post("/posts", { message });
    setMessage("");
    loadPosts();
    toast("Publicação enviada com sucesso!");
  }

  async function onRequestFollow() {
    const response = await axios.post(`/follows/${user.id}`);
    await loadUser();
    toast(`Agora você segue @${user.username}!`);
  }

  async function onRequestUnfollow() {
    const response = await axios.delete(`/follows/${user.id}`);
    await loadUser();
    toast(`Você deixou de seguir @${user.username}!`);
  }

  const followUnfollowButton = user.isFollow ? (
    <Button onClick={onRequestUnfollow}>Deixar de seguir</Button>
  ) : (
    <Button onClick={onRequestFollow}>Seguir</Button>
  );

  const followOptions = viewMode && (
    <div className="flex gap-2">
      {followUnfollowButton}
      <LinkButton to={`/seguindo/${user.id}`}>Ver seguidores</LinkButton>
    </div>
  );

  const editProfile = !viewMode && (
    <div className="flex gap-2">
      <LinkButton to="/editar-perfil">Editar perfil</LinkButton>
      <LinkButton to={`/seguindo/${user.id}`}>Seguindo</LinkButton>
    </div>
  );

  const emptyPostsView = posts.length === 0 && (
    <p className="text-lg text-slate-700">
      {user.name} ainda não publicou nada!
    </p>
  );

  const postsTitle = viewMode
    ? `Publicações de ${user.name}`
    : "Minhas publicações";

  const postsView = posts.length > 0 && (
    <>
      <h1 className="text-xl font-bold mb-2">{postsTitle}</h1>
      <div className="flex flex-col gap-2">
        {posts.map((post) => (
          <PostMessage key={post.id} user={user} post={post} />
        ))}
      </div>
    </>
  );

  const editProfileForm = !viewMode && (
    <form
      className="flex flex-col gap-2 mb-8"
      noValidate
      onSubmit={onSubmitMessage}
    >
      <TextArea
        placeholder="No que você está pensando?"
        className="w-full h-20 resize-none"
        maxLength={140}
        value={message}
        onChange={(event) => setMessage(event.target.value)}
      />
      <Button type="submit" className="self-end">
        Publicar
      </Button>
    </form>
  );

  return (
    <div>
      <header className="bg-orange-300">
        <div className="px-4 py-8 flex gap-4 items-center m-auto md:max-w-screen-md">
          <div>
            <img
              src={user.avatar ?? "/anon.png"}
              alt=""
              className="w-[196px] h-[196px] rounded-full bg-slate-100"
            />
          </div>
          <div className="flex flex-col items-start">
            <span className="text-2xl font-bold">
              {user.name} {user.surname}
            </span>
            <span className="mb-4">@{user.username}</span>
            {editProfile}
            {followOptions}
          </div>
        </div>
      </header>
      <section className="p-4 m-auto md:max-w-screen-md">
        {editProfileForm}
        {postsView}
        {emptyPostsView}
      </section>
    </div>
  );
}
