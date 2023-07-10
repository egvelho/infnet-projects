import path from "path";
import * as json from "../json";
import * as commentService from "../comment/comment.service";
import type { Notepad } from "../../../shared/types";

type FindNotepadsParams = {
  limit?: number;
  offset?: number;
  search?: string;
  order_by?: string;
  direction?: string;
};

const notepadModelPath = path.join("data", "notepad.data");
const notepadModelDataPath = path.join(notepadModelPath, "notepads");

export function findNotepadById(id: number) {
  try {
    const notepad = json.readJSON(notepadModelDataPath, `${id}.json`);
    return notepad;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export function findNotepadCommentsById(notepadId: number) {
  const comments = commentService.findComments();
  return comments
    .filter((comment) => comment.notepad_id === notepadId)
    .sort((commentA, commentB) => {
      const createdAtA = Date.parse(commentA.created_at);
      const createdAtB = Date.parse(commentB.created_at);
      return createdAtB - createdAtA;
    });
}

export function findNotepads({
  limit = 10,
  offset = 0,
  search = "",
  order_by = "created_at",
  direction = "desc",
}: FindNotepadsParams = {}) {
  const rawNotepadsFiles = json.listJSON(notepadModelDataPath);
  const notepadsFiles = rawNotepadsFiles.sort((a, b) => {
    const idA = parseInt(a);
    const idB = parseInt(b);
    return idA - idB;
  });

  const notepads: Notepad[] = notepadsFiles.map((file) => {
    return json.readJSON(notepadModelDataPath, file);
  });

  const normalizedSearch = normalizeText(search);

  const searchedNotepads =
    normalizedSearch.length === 0
      ? notepads
      : notepads.filter(({ title, subtitle, content }) => {
          const normalizedTitle = normalizeText(title);
          const normalizedSubtitle = normalizeText(subtitle);
          const normalizedContent = normalizeText(content);
          return (
            normalizedTitle.includes(normalizedSearch) ||
            normalizedSubtitle.includes(normalizedSearch) ||
            normalizedContent.includes(normalizedSearch)
          );
        });

  const sortedNotepads = searchedNotepads.sort((notepadA, notepadB) => {
    if (order_by === "created_at") {
      const createdAtNotepadA = Date.parse(notepadA.created_at);
      const createdAtNotepadB = Date.parse(notepadB.created_at);
      return createdAtNotepadA - createdAtNotepadB;
    } else if (order_by === "title") {
      const titleNotepadA = notepadA.title;
      const titleNotepadB = notepadB.title;
      if (titleNotepadA < titleNotepadB) {
        return -1;
      } else if (titleNotepadB > titleNotepadA) {
        return 1;
      } else {
        return 0;
      }
    } else {
      const idNotepadA = notepadA.id;
      const idNotepadB = notepadB.id;
      return idNotepadA - idNotepadB;
    }
  });

  const directedNotepads =
    direction === "asc" ? sortedNotepads : sortedNotepads.reverse();

  const count = directedNotepads.length;
  const paginatedNotepadsFiles = directedNotepads.slice(offset, limit + offset);

  return {
    count,
    notepads: paginatedNotepadsFiles,
  };
}

export function deleteNotepadById(id: number) {
  let notepad: Notepad;
  try {
    notepad = json.readJSON(notepadModelDataPath, `${id}.json`);
    json.deleteJSON(notepadModelDataPath, `${id}.json`);
  } catch (error) {
    return {
      success: false,
      notepad: null,
    };
  }

  return {
    success: true,
    notepad,
  };
}

export function createNotepad(notepadData: Omit<Notepad, "id" | "created_at">) {
  let notepad: Notepad;
  const notepadsLatestId = json.readJSON(
    notepadModelPath,
    "notepadsLatestId.json"
  );
  const notepadId: number = notepadsLatestId.latestId + 1;
  json.updateJSON([notepadModelPath, "notepadsLatestId.json"], {
    latestId: notepadId,
  });

  try {
    notepad = {
      ...notepadData,
      id: notepadId,
      created_at: new Date().toJSON(),
    };
    json.createJSON([notepadModelDataPath, `${notepadId}.json`], notepad);
  } catch (error) {
    console.log(error);
    return {
      success: false,
      notepad: null,
    };
  }

  return {
    success: true,
    notepad,
  };
}

export function updateNotepadById(id: number, notepadData: Notepad) {
  let notepad: Notepad;
  try {
    json.updateJSON([notepadModelDataPath, `${id}.json`], notepadData);
    notepad = json.readJSON(notepadModelDataPath, `${id}.json`);
  } catch (error) {
    console.log(error);
    return {
      success: false,
      notepad: null,
    };
  }

  return {
    success: true,
    notepad,
  };
}

export function overwriteNotepadById(id: number, notepadData: Notepad) {
  const notepad: Notepad = {
    ...notepadData,
    id,
  };

  try {
    json.overwriteJSON([notepadModelDataPath, `${id}.json`], notepad);
  } catch (error) {
    console.log(error);
    return {
      success: false,
      notepad: null,
    };
  }

  return {
    success: true,
    notepad,
  };
}

function normalizeText(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\n/g, " ")
    .replace(/\s+/g, " ");
}
