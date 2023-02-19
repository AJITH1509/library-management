import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BookDetails } from "./BookDetails";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export const BooksList = () => {
  const navigate = useNavigate();
  const [book, setBook] = useState([]);

  const getBooks = () => {
    fetch("https://63f0a0595b7cf4107e237b04.mockapi.io/book")
      .then((response) => response.json())
      .then((data) => setBook(data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getBooks();
  }, []);

  const deleteBook = async (id) => {
    await fetch(`https://63f0a0595b7cf4107e237b04.mockapi.io/book/${id}`, {
      method: "DELETE",
    });
    getBooks();
  };

  return (
    <div>
      <h2 className="books-head">Available Books in Library</h2>
      <div className="booklist-container">
        {book.map((data) => (
          <BookDetails
            data={data}
            key={data.id}
            deleteIcon={
              <IconButton
                onClick={() => deleteBook(data.id)}
                aria-label="delete"
                color="error"
              >
                <DeleteIcon />
              </IconButton>
            }
            editIcon={
              <IconButton
                onClick={() => navigate(`/books/edit/${data.id}`)}
                aria-label="edit"
                color="secondary"
              >
                <EditIcon />
              </IconButton>
            }
          />
        ))}
      </div>
    </div>
  );
};
