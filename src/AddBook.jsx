import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

const formValidationSchema = yup.object({
  title: yup.string().required(),
  author: yup.string().required(),
  ISBN: yup
    .string()
    .required()
    .matches(/^[0-9]{3}-[0-9]{10}$/, "Invalid ISBN format"),
  publicationDate: yup.date().required("MM/DD/YYYY"),
  edition: yup.string().required(),
  publisher: yup.string().required(),
  genre: yup.string().required(),
});

export const AddBook = () => {
  const navigate = useNavigate();
  const { handleSubmit, handleChange, handleBlur, values, errors, touched } =
    useFormik({
      initialValues: {
        title: "",
        author: "",
        ISBN: "",
        publicationDate: "",
        edition: "",
        publisher: "",
        genre: "",
      },
      validationSchema: formValidationSchema,
      onSubmit: (newbook) => {
        newBook(newbook);
      },
    });
  const newBook = async (newbook) => {
    await fetch("https://63f0a0595b7cf4107e237b04.mockapi.io/book", {
      method: "POST",
      body: JSON.stringify(newbook),
      headers: { "Content-Type": "application/json" },
    });

    navigate("/books");
  };
  return (
    <div>
      <form className="book-submit" onSubmit={handleSubmit}>
        <h3>Add Available Books Only!!!</h3>
        <TextField
          name="title"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.title}
          label="Name"
          variant="outlined"
          error={touched.title && errors.title}
          helperText={touched.title && errors.title ? errors.title : null}
        />

        <TextField
          name="author"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.author}
          label="Author"
          variant="outlined"
          error={touched.author && errors.author}
          helperText={touched.author && errors.author ? errors.author : null}
        />
        <TextField
          name="ISBN"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.ISBN}
          label="ISBN"
          variant="outlined"
          error={touched.ISBN && errors.ISBN}
          helperText={touched.ISBN && errors.ISBN ? errors.ISBN : null}
        />
        <TextField
          name="publicationDate"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.publicationDate}
          label="Publication Date"
          variant="outlined"
          error={touched.publicationDate && errors.publicationDate}
          helperText={
            touched.publicationDate && errors.publicationDate
              ? errors.publicationDate
              : null
          }
        />
        <TextField
          name="edition"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.edition}
          label="Edition"
          variant="outlined"
          error={touched.edition && errors.edition}
          helperText={touched.edition && errors.edition ? errors.edition : null}
        />
        <TextField
          name="publisher"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.publisher}
          label="Publisher"
          variant="outlined"
          error={touched.publisher && errors.publisher}
          helperText={
            touched.publisher && errors.publisher ? errors.publisher : null
          }
        />
        <TextField
          name="genre"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.genre}
          label="Genre"
          variant="outlined"
          error={touched.genre && errors.genre}
          helperText={touched.genre && errors.genre ? errors.genre : null}
        />
        <Button variant="contained" type="submit">
          Add Book
        </Button>
      </form>
    </div>
  );
};
