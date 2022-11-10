import React from 'react'
import Book from '../Book';
import styles from './BookList.module.css';

const BookList = ({ books }) => {

  return (
    <div className={styles.bookList}>
      <div className={styles.tableHead}>
        <div>Copies</div>
        <div>Book Name</div>
        <div>ISBN</div>
        <div>Price</div>
        <div>Borrow</div>
        <div>Rental Status</div>
      </div>
      {books.map(book => (
        <Book key={book.isbn} book={book} />
      ))}
    </div>
  )
}

export default BookList;
