import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import { Helmet } from "react-helmet";
import { LinkButton } from "../components/LinkButton";
import { Card } from "../components/Card";
import { api } from "../api";

const pageSize = 30;

const initialNotepadsList = {
  count: 0,
  notepads: [],
};
const initialLoading = true;

export function HomeRoute() {
  const [notepadsList, setNotepadsList] = useState(initialNotepadsList);
  const [loading, setLoading] = useState(initialLoading);
  const pageCount = Math.ceil(notepadsList.count / pageSize);
  const pages = new Array(pageCount).fill(null).map((_, index) => index + 1);

  async function loadNotepads() {
    const response = await api.get("/notepads");
    const nextNotepads = response.data;
    setNotepadsList(nextNotepads);
  }

  useEffect(() => {
    loadNotepads();
  }, []);

  useEffect(() => {
    if (notepadsList.notepads.length > 0) {
      setLoading(false);
    }
  }, [notepadsList]);

  return (
    <Card>
      <Helmet>
        <title>Home | Notepads</title>
      </Helmet>
      {loading && (
        <div className="flex justify-center">
          <FaSpinner className="text-4xl animate-spin" />
        </div>
      )}
      {notepadsList.notepads.map((notepad) => {
        return (
          <Link
            to={`/ver-notepad/${notepad.id}`}
            key={notepad.id}
            className="border-b py-2 cursor-pointer block"
          >
            <div className="text-gray-500 mb-2">#{notepad.id}</div>
            <span className="text-sm text-gray-500">
              {new Date(notepad.created_at).toLocaleDateString()}
            </span>
            <h2 className="text-lg font-bold leading-tight pb-1">
              {notepad.title}
            </h2>
            <p>{notepad.subtitle}</p>
          </Link>
        );
      })}
      <div className="flex flex-row gap-2 flex-wrap pt-4">
        {pages.map((page) => (
          <LinkButton key={page} to={`/notepads/${page}`}>
            {page}
          </LinkButton>
        ))}
      </div>
    </Card>
  );
}
