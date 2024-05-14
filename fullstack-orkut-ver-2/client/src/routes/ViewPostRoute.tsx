import { useEffect, useState } from "react";
import toast from "react-simple-toasts";
import { Helmet } from "react-helmet";
import { api } from "../api";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useGlobalStore } from "../useGlobalStore";
import { Card } from "../components/Card";
import { Title } from "../components/Title";
import { Button } from "../components/Button";
import { LinkButton } from "../components/LinkButton";
import { Breadcrumbs } from "../components/Breadcrumbs";

const texts = {
  commentsTitle: "Comentários",
  commentsSendButton: "Enviar",
};

const initialPost = {
  id: 0,
  content: "",
  created_at: "",
  user_id: 0,
  users: {
    id: 0,
    avatar: "/default-avatar.png",
    first_name: "",
    last_name: "",
  },
};

const initialComments = [];
const initialComment = "";

export function ViewPostRoute() {
  const isAuthorized = useGlobalStore((state) => state.isAuthorized);
  const user = useGlobalStore((state) => state.user);
  const params = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(initialPost);
  const [comments, setComments] = useState(initialComments);
  const [comment, setComment] = useState(initialComment);

  async function loadPost() {
    const response = await api.get(`/posts/${params.id}`);
    const nextPost = response.data;
    setPost(nextPost);
  }

  async function deletePost() {
    const response = await api.delete(`/posts/${params.id}`);
    if (response.data.id) {
      toast(`A publicação #${post.id} foi deletada com sucesso!`);
      navigate("/");
    } else {
      toast("Houve um erro ao deletar a publicação");
    }
  }

  async function loadComments() {
    const response = await api.get(`/posts/${params.id}/comments`);
    const comments = response.data;
    setComments(comments);
  }

  async function createComment() {
    const response = await api.post(`/posts/${params.id}/comments`, {
      message: comment,
    });
  }

  async function onCommentSubmit(event) {
    event.preventDefault();
    await createComment();
    await loadComments();
  }

  useEffect(() => {
    loadPost();
    loadComments();
  }, [params.id]);

  const pageTitle = `Ver publicação #${post.id}`;

  return (
    <>
      <Card>
        <Helmet>
          <title>{pageTitle}</title>
        </Helmet>
        <Breadcrumbs
          links={[
            { href: "/", label: "Home" },
            {
              href: `/ver-publicacao/${params.id}`,
              label: `Ver publicação #${params.id}`,
            },
          ]}
        />
        {isAuthorized && user.id === post.user_id && (
          <div className="flex gap-2">
            <Button
              className="bg-red-500 hover:bg-red-700"
              onClick={deletePost}
            >
              Deletar
            </Button>
            <LinkButton
              className="bg-amber-500 hover:bg-amber-700"
              to={`/editar-publicacao/${params.id}`}
            >
              Editar
            </LinkButton>
          </div>
        )}
        <div className="flex items-center gap-2">
          <Link to={`/perfil/${post.user_id}`}>
            <img
              src={post.users.avatar}
              alt={`Foto de ${post.users.first_name} ${post.users.last_name}`}
              className="w-[48px] h-[48px] rounded-full"
            />
          </Link>
          <div className="flex flex-col">
            <Link
              to={`/perfil/${post.user_id}`}
              className="text-blue-600 hover:text-blue-800 hover:underline font-bold"
            >
              {post.users.first_name} {post.users.last_name}
            </Link>
            <span className="text-sm text-gray-500">
              {new Date(post.created_at).toLocaleDateString()}
            </span>
          </div>
        </div>
        <p>{post.content}</p>
      </Card>
      <Card>
        <Title>{texts.commentsTitle}</Title>
        {isAuthorized && (
          <form onSubmit={onCommentSubmit} className="mt-2">
            <textarea
              placeholder="Digite o seu comentário"
              rows={3}
              className={`rounded-lg px-2 py-1 border focus:border-green-500 outline-none resize-none w-full`}
              value={comment}
              onChange={(event) => setComment(event.target.value)}
            />
            <div className="flex justify-end mt-2">
              <Button type="submit">{texts.commentsSendButton}</Button>
            </div>
          </form>
        )}
        {!isAuthorized && (
          <div className="my-4">
            <p>
              Para comentar, você deve{" "}
              <Link
                to="/entrar"
                className="text-blue-600 hover:text-blue-800 hover:underline font-bold"
              >
                entrar
              </Link>{" "}
              ou{" "}
              <Link
                to="/criar-conta"
                className="text-blue-600 hover:text-blue-800 hover:underline font-bold"
              >
                criar uma conta
              </Link>
              .
            </p>
          </div>
        )}
        <div>
          {comments.map((comment) => (
            <div key={comment.id} className="border-b py-2">
              <div className="flex items-center gap-2">
                <Link to={`/perfil/${comment.user_id}`}>
                  <img
                    src={comment.users.avatar}
                    alt={`Foto de ${comment.users.first_name} ${comment.users.last_name}`}
                    className="w-[48px] h-[48px] rounded-full"
                  />
                </Link>
                <div className="flex flex-col">
                  <Link
                    to={`/perfil/${comment.user_id}`}
                    className="text-blue-600 hover:text-blue-800 hover:underline font-bold"
                  >
                    {comment.users.first_name} {comment.users.last_name}
                  </Link>
                  <span className="text-sm text-gray-500">
                    {new Date(post.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <p>{post.content}</p>
            </div>
          ))}
        </div>
      </Card>
    </>
  );
}
