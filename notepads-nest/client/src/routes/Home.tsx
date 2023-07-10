import { useState, useEffect } from "react";
import { NotepadList } from "../components/NotepadList";
import { Button } from "../components/Button";
import { getNotepads } from "../api/getNotepads";
import type { NotepadItem } from "../types";

const pageSize = 10;

const initialNotepadList = {
  count: 0,
  notepads: [] as NotepadItem[],
  currentPage: 1,
};

const initialNotepadListParams = {
  search: null,
  limit: pageSize,
  offset: 0,
  direction: "asc",
  order_by: "created_at",
};

export function Home() {
  const [notepadList, setNotepadList] = useState(initialNotepadList);
  const [notepadListParams, setNotepadListParams] = useState(
    initialNotepadListParams
  );

  const pageCount = Math.ceil(notepadList.count / pageSize);
  const pageList = Array.from({ length: pageCount }, (_, index) => index + 1);
  const notepads = notepadList.notepads;

  useEffect(() => {
    getNotepads(notepadListParams).then((notepadListData) => {
      setNotepadList({ ...notepadList, ...notepadListData });
    });
  }, [notepadListParams]);

  function onChangePage(currentPage: number) {
    setNotepadListParams({
      ...notepadListParams,
      offset: pageSize * (currentPage - 1),
    });
    setNotepadList({
      ...notepadList,
      currentPage,
    });
  }

  return (
    <div className="bg-white md:bg-transparent md:max-w-screen-md md:mx-auto md:m-8">
      <NotepadList notepads={notepads} />
      <div className="flex flex-row flex-wrap gap-2 justify-center p-2 md:p-0 md:mt-2 md:justify-start">
        {pageList.map((page) => (
          <Button
            key={page}
            onClick={(event) => onChangePage(page)}
            className={
              page === notepadList.currentPage ? "bg-green-700" : undefined
            }
          >
            {page}
          </Button>
        ))}
      </div>
    </div>
  );
}
