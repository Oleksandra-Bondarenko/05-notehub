import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { createNote, type CreateNoteParams } from "../../services/noteService";
import type { NoteTag } from "../../types/note";
import css from "./NoteForm.module.css";

interface NoteFormProps {
  onCancel: () => void;
}

interface NoteFormValues {
  title: string;
  content: string;
  tag: NoteTag;
}

const noteTags: NoteTag[] = ["Todo", "Work", "Personal", "Meeting", "Shopping"];

const validationSchema = Yup.object({
  title: Yup.string()
    .min(3, "Title must be at least 3 characters")
    .max(50, "Title must be at most 50 characters")
    .required("Title is required"),

  content: Yup.string().max(500, "Content must be at most 500 characters"),

  tag: Yup.string().oneOf(noteTags, "Invalid tag").required("Tag is required"),
});

const initialValues: NoteFormValues = {
  title: "",
  content: "",
  tag: "Todo",
};

const NoteForm = ({ onCancel }: NoteFormProps) => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: (note: CreateNoteParams) => createNote(note),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notes"],
      });

      onCancel();
    },
  });

  const handleSubmit = (values: NoteFormValues) => {
    createMutation.mutate(values);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor="title">Title</label>

          <Field id="title" type="text" name="title" className={css.input} />

          <ErrorMessage name="title" component="span" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="content">Content</label>

          <Field
            as="textarea"
            id="content"
            name="content"
            rows={8}
            className={css.textarea}
          />

          <ErrorMessage name="content" component="span" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="tag">Tag</label>

          <Field as="select" id="tag" name="tag" className={css.select}>
            {noteTags.map((tag) => (
              <option value={tag} key={tag}>
                {tag}
              </option>
            ))}
          </Field>

          <ErrorMessage name="tag" component="span" className={css.error} />
        </div>

        <div className={css.actions}>
          <button type="button" className={css.cancelButton} onClick={onCancel}>
            Cancel
          </button>

          <button
            type="submit"
            className={css.submitButton}
            disabled={createMutation.isPending}
          >
            {createMutation.isPending ? "Creating..." : "Create note"}
          </button>
        </div>

        {createMutation.isError && (
          <p className={css.error}>Failed to create note. Please try again.</p>
        )}
      </Form>
    </Formik>
  );
};

export default NoteForm;
