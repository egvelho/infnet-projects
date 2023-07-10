import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { NotepadList } from "../components/NotepadList";
import { PaginationButtons } from "../components/PaginationButtons";
import { getNotepads } from "../api/getNotepads";
import type { Notepad } from "../../../shared/types";
import { asyncDebounce } from "../asyncDebounce";
import { config } from "../config";
import { createUrlParams } from "../createUrlParams";

const texts = {
  searchPlaceholder: "Pesquisar notepads...",
};

const pageSize = config.pageSize;
const debouncedGetNotepads = asyncDebounce(getNotepads, 1000);

const initialNotepadList = {
  count: 0,
  notepads: [] as Notepad[],
};

export function Home() {
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get("search") || undefined;
  const [search, setSearch] = useState(initialSearch ?? "");
  const [orderBy, setOrderBy] = useState("created_at");
  const [direction, setDirection] = useState("desc");
  const [notepadList, setNotepadList] = useState(initialNotepadList);
  const pageCount = Math.ceil(notepadList.count / pageSize);
  const pageParams = createUrlParams({ search, direction, order_by: orderBy });
  const getNotepadsParams = {
    offset: 0,
    limit: pageSize,
    search: search.length > 0 ? search : undefined,
    direction,
    order_by: orderBy,
  };

  useEffect(() => {
    debouncedGetNotepads(getNotepadsParams).then(setNotepadList);
  }, [direction, orderBy, search]);

  return (
    <div className="md:max-w-screen-md md:mx-auto md:m-8 m-3">
      <div className="mb-3 flex flex-row items-center gap-2 py-2 px-4 rounded-3xl border bg-white">
        <FaSearch />
        <input
          className="outline-none flex-1 bg-transparent"
          type="search"
          value={search}
          placeholder={texts.searchPlaceholder}
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>
      <div className="flex flex-row gap-2 mb-3">
        <select
          value={orderBy}
          className="bg-white py-2 px-4 border rounded-md flex-1"
          onChange={(event) => setOrderBy(event.target.value)}
        >
          <option value="id">ID</option>
          <option value="title">Título</option>
          <option value="created_at">Data de criação</option>
        </select>
        <select
          value={direction}
          onChange={(event) => setDirection(event.target.value)}
          className="bg-white py-2 px-4 border rounded-md min-w-[128px] md:min-w-[256px]"
        >
          <option value="asc">Asc</option>
          <option value="desc">Desc</option>
        </select>
      </div>
      <NotepadList notepads={notepadList.notepads} />
      <div className="mt-3">
        <PaginationButtons
          currentPage={1}
          pageCount={pageCount}
          getLink={(page) => {
            if (page === 1) {
              return "/";
            }
            return `/notepads/page/${page}${pageParams}`;
          }}
        />
      </div>
    </div>
  );
}
