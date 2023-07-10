import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/Button";
import { TextArea } from "../components/TextArea";
import { LinkButton } from "../components/LinkButton";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { useGlobalStore } from "../useGlobalStore";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-simple-toasts";
import { getPost } from "../api/getPost";
import { deletePost } from "../api/deletePost";
import { getPostComments } from "../api/getPostComments";
import { createComment } from "../api/createComment";
import type { Comment } from "../../../shared/types";

const texts = {
  deleteSuccess: "O post foi deletado com sucesso!",
  deleteFailure: "Houve um erro ao deletar o seu post. :(",
  editButtonLabel: "Editar",
  deleteButtonLabel: "Deletar",
  commentsTitle: "Comentários",
  commentFormMessagePlaceholder: "Digite a mensagem do comentário",
  commentFormSubmitButton: "Enviar",
  commentFormCreateSuccess: "O comentário foi criado com sucesso!",
  commentFormCreateFailure: "Houve um erro ao criar o seu comentário. :(",
};

const emptyCommentForm = {
  message: "",
};

const emptyPost = {
  id: 0,
  message: "",
  created_at: "",
  user_id: 0,
};

function getBreadcrumbs(title: string, id: number) {
  return [
    { title: "Página inicial", link: "/" },
    { title, link: `/publicacoes/${id}` },
  ];
}

export function ViewPost() {
  const params = useParams();
  const navigate = useNavigate();

  const postId = Number(params.id);
  const [post, setPost] = useState(emptyPost);
  const [commentForm, setCommentForm] = useState(emptyCommentForm);
  const [comments, setComments] = useState<Comment[]>([]);

  const user = useGlobalStore((state) => state.user);
  const isAuthenticated = useGlobalStore((state) => state.isAuthenticated);
  const isUserPost = isAuthenticated && user.id === post.user_id;

  useEffect(() => {
    getPost(postId).then((postData) => setPost(postData));
    getPostComments({ post_id: postId }).then((comments) =>
      setComments(comments)
    );
  }, [postId]);

  async function onClickDelete() {
    const response = await deletePost(post.id);
    if (response.success) {
      toast(texts.deleteSuccess);
      navigate("/");
    } else {
      toast(texts.deleteFailure);
    }
  }

  async function onSubmitComment(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const response = await createComment({
      post_id: postId,
      message: commentForm.message,
    });
    if (response.success) {
      toast(texts.commentFormCreateSuccess);
      const comments = await getPostComments({ post_id: postId });
      setComments(comments);
    } else {
      toast(texts.commentFormCreateFailure);
    }
  }

  return (
    <div className="md:max-w-screen-md md:mx-auto my-4 p-2 md:my-8 flex flex-col">
      <div className="bg-white p-4 rounded-lg shadow-lg flex flex-col">
        {/*<Breadcrumbs links={getBreadcrumbs(post.title, post.id)} />*/}
        <span className="text-gray-500 my-2">#{post.id}</span>
        <time className="text-gray-500 text-sm" dateTime={post.created_at}>
          {new Date(post.created_at).toLocaleDateString()}
        </time>
        <p>{post.message}</p>
        <div className="mt-4 flex flex-row gap-2">
          {isUserPost && (
            <Button
              className="bg-red-500 hover:bg-red-600"
              onClick={onClickDelete}
            >
              {texts.deleteButtonLabel}
            </Button>
          )}
          {isUserPost && (
            <LinkButton to={`/publicacoes/editar/${params.id}`}>
              {texts.editButtonLabel}
            </LinkButton>
          )}
        </div>
      </div>
      <div className="mt-4">
        <h2 className="font-bold text-2xl my-2">{texts.commentsTitle}</h2>
        <form
          onSubmit={onSubmitComment}
          noValidate
          className="flex flex-col gap-2 my-4"
        >
          <TextArea
            value={commentForm.message}
            onChange={(message) => setCommentForm({ ...commentForm, message })}
            placeholder={texts.commentFormMessagePlaceholder}
          />
          <Button type="submit" onClick={() => {}} className="self-end">
            {texts.commentFormSubmitButton}
          </Button>
        </form>
        <div className="flex flex-col gap-4">
          {comments.map(
            ({
              id,
              message,
              created_at,
              user_first_name,
              user_id,
              user_last_name,
            }) => (
              <div key={id} className="border border-gray-400 p-4 rounded-xl">
                <Link
                  to={`/usuarios/${user_id}`}
                  className="flex flex-row items-center cursor-pointer gap-2"
                >
                  <img
                    src={`https://picsum.photos/200/200?${user_id}`}
                    className="rounded-full w-10"
                  />
                  <span className="hover:underline font-bold text-blue-500">
                    {user_first_name} {user_last_name}
                  </span>
                </Link>
                <time
                  className="text-gray-500 text-sm"
                  dateTime={post.created_at}
                >
                  {new Date(created_at).toLocaleDateString()}
                </time>
                <p>{message}</p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
