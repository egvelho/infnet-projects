import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { NotepadList } from "../components/NotepadList";
import { PaginationButtons } from "../components/PaginationButtons";
import { config } from "../config";
import { createUrlParams } from "../createUrlParams";
import { getNotepads } from "../api/getNotepads";
import type { Notepad } from "../../../shared/types";

const pageSize = config.pageSize;

const initialNotepadList = {
  count: 0,
  notepads: [] as Notepad[],
};

export function NotepadsPage() {
  const [notepadList, setNotepadList] = useState(initialNotepadList);
  const params = useParams();
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") || undefined;
  const orderBy = searchParams.get("order_by") || undefined;
  const direction = searchParams.get("direction") || undefined;
  const pageParams = createUrlParams({ search });
  const page = params.page === undefined ? 1 : +params.page;
  const pageCount = Math.ceil(notepadList.count / pageSize);
  const limit = pageSize;
  const offset = pageSize * (page - 1);

  useEffect(() => {
    getNotepads({ limit, offset, search, direction, order_by: orderBy }).then(
      (notepadList) => setNotepadList(notepadList)
    );
  }, [params]);

  return (
    <div className="md:max-w-screen-md md:mx-auto md:m-8 p-3">
      <h2 className="text-2xl font-bold text-center">
        Página {page} da lista de notepads
      </h2>
      <p className="text-gray-600 mb-3 text-center">
        {notepadList.count} resultados encontrados{" "}
        {search && `para a busca de "${search}"`}
      </p>
      <NotepadList notepads={notepadList.notepads} />
      <div className="mt-3">
        <p className="text-sm text-gray-600 mb-1">
          Página {page} de {pageCount} / {notepadList.count} resultados
        </p>
        <PaginationButtons
          currentPage={page}
          pageCount={pageCount}
          getLink={(page) => {
            if (page === 1) {
              return `/${pageParams}`;
            }
            return `/notepads/page/${page}${pageParams}`;
          }}
        />
      </div>
    </div>
  );
}
