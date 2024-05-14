import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Title } from "../components/Title";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { LinkButton } from "../components/LinkButton";
import { Card } from "../components/Card";
import { api } from "../api";

const pageSize = 30;

const initialPostsList = {
  count: 0,
  posts: [],
};

export function PostPageRoute() {
  const params = useParams();
  const offset = (parseInt(params.page) - 1) * pageSize;
  const [postsList, setPostsList] = useState(initialPostsList);
  const pageCount = Math.ceil(postsList.count / pageSize);
  const pages = new Array(pageCount).fill(null).map((_, index) => index + 1);

  async function loadPosts() {
    const response = await api.get(`/posts?limit=${pageSize}&offset=${offset}`);
    const nextPosts = response.data;
    setPostsList(nextPosts);
  }

  useEffect(() => {
    loadPosts();
  }, [params.page]);

  return (
    <Card>
      <Helmet>
        <title>Pagina {params.page} | Posts</title>
      </Helmet>
      <Title>
        Página {params.page} de {pageCount}
      </Title>
      {postsList.posts.map((post) => {
        return (
          <div key={post.id} className="border-b py-2">
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
            <Link
              to={`/ver-publicacao/${post.id}`}
              className="cursor-pointer block"
            >
              <p>{post.content}</p>
            </Link>
          </div>
        );
      })}
      <div className="flex flex-row gap-2 flex-wrap pt-4">
        {pages.map((page) => (
          <LinkButton
            key={page}
            to={`/publicacoes/${page}`}
            className={page === parseInt(params.page) ? "bg-green-700" : ""}
          >
            {page}
          </LinkButton>
        ))}
      </div>
    </Card>
  );
}
