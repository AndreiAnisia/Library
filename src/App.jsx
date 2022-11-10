import { useState } from 'react'
import './App.css'
import BookList from './components/BookList';


function App() {
  const [book, setBook] = useState({ name: '', isbn: '', price: '', copies: 1 });
  const [allBooks, setAllBooks] = useState([]);
  const [alert, setAlert] = useState(false);
  const numbersReg = /^-?\d*\.?\d*$/;

  const handleAddBook = (e) => {
    e.preventDefault();
    setAllBooks(prevState => [...prevState, book]);
    setBook({ name: '', isbn: '', price: '', copies: 1 });
  };

  const handleInput = (e) => {
    const value = e.target.name;
    if (value === 'name') {
      setBook(prevState => ({ ...prevState, name: e.target.value }));
    }
    if (value === 'isbn') {
      if (e.target.value.match(numbersReg)) {
        setBook(prevState => ({ ...prevState, isbn: e.target.value }));
        setAlert(false);
      } else {
        setAlert(true);
      }
    }
    if (value === 'price') {
      if (e.target.value.match(numbersReg)) {
        setBook(prevState => ({ ...prevState, price: e.target.value }));
        setAlert(false);
      } else {
        setAlert(true);
      }
    }
    if (value === 'copies') {
      if (e.target.value.match(numbersReg)) {
        setBook(prevState => ({ ...prevState, copies: e.target.value }));
        setAlert(false);
        if (!+e.target.value) {
          setAlert(true);
        }
      }
    }
  }

  const isDisabled = alert || !book.name || !book.isbn || !book.price || !book.copies;

  return (
    <div className="App">
      <div className='main'>
        <h1 className='title'>Library</h1>
        <div className="buttons">
          <form onSubmit={handleAddBook} className='form'>
            <input name='name' placeholder='Name' value={book.name} onChange={handleInput} />
            <input name='isbn' placeholder='ISBN' value={book.isbn} onChange={handleInput} maxLength='9' />
            <input name='price' placeholder='Price' value={book.price} onChange={handleInput} maxLength='4' />
            <input name='copies' placeholder='Number of Copies' value={book.copies} onChange={handleInput} maxLength='1' />
            {alert && <span>Invalid Values</span>}
            <button disabled={isDisabled}>Add a book</button>
          </form>
        </div>
        <BookList books={allBooks} setAllBooks={setAllBooks} />
      </div>
    </div>
  )
}

export default App
