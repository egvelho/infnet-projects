import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { PostList } from "../components/PostList";
import { PaginationButtons } from "../components/PaginationButtons";
import { config } from "../config";
import { createUrlParams } from "../createUrlParams";
import { getPosts } from "../api/getPosts";
import type { Post, User } from "../../../shared/types";

const pageSize = config.pageSize;

const initialPostList = {
  count: 0,
  posts: [] as Post[],
};

export function PostsPage() {
  const [postList, setPostList] = useState(initialPostList);
  const params = useParams();
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") || undefined;
  const orderBy = searchParams.get("order_by") || undefined;
  const direction = searchParams.get("direction") || undefined;
  const pageParams = createUrlParams({ search });
  const page = params.page === undefined ? 1 : +params.page;
  const pageCount = Math.ceil(postList.count / pageSize);
  const limit = pageSize;
  const offset = pageSize * (page - 1);

  useEffect(() => {
    getPosts({ limit, offset, search, direction, order_by: orderBy }).then(
      (postList) => setPostList(postList)
    );
  }, [params]);

  return (
    <div className="md:max-w-screen-md md:mx-auto md:m-8 p-3">
      <h2 className="text-2xl font-bold text-center">
        Página {page} da lista de posts
      </h2>
      <p className="text-gray-600 mb-3 text-center">
        {postList.count} resultados encontrados{" "}
        {search && `para a busca de "${search}"`}
      </p>
      <PostList posts={postList.posts} />
      <div className="mt-3">
        <p className="text-sm text-gray-600 mb-1">
          Página {page} de {pageCount} / {postList.count} resultados
        </p>
        <PaginationButtons
          currentPage={page}
          pageCount={pageCount}
          getLink={(page) => {
            if (page === 1) {
              return `/${pageParams}`;
            }
            return `/posts/page/${page}${pageParams}`;
          }}
        />
      </div>
    </div>
  );
}
