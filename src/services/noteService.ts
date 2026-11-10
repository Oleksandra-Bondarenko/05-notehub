import axios from "axios";
import type { Note, NoteTag } from "../types/note";

const TOKEN = import.meta.env.VITE_NOTEHUB_TOKEN;

const API = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
});

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface CreateNoteParams {
  title: string;
  content: string;
  tag: NoteTag;
}

export const fetchNotes = async (
  search: string,
  page: number,
): Promise<FetchNotesResponse> => {
  const { data } = await API.get<FetchNotesResponse>("/notes", {
    params: {
      search,
      page,
      perPage: 12,
    },
  });

  return data;
};

export const createNote = async (note: CreateNoteParams): Promise<Note> => {
  const { data } = await API.post<Note>("/notes", note);

  return data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const { data } = await API.delete<Note>(`/notes/${id}`);

  return data;
};
