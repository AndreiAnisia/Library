import React, { useState } from 'react'
import Renter from '../Renter';
import styles from './Book.module.css';

const Book = ({ book }) => {
  const [availableCopy, setAvailableCopy] = useState(book.copies);
  const [isRented, setIsRented] = useState(false);
  const [renters, setRenters] = useState([]);
  const handleBorrow = () => {
    const name = prompt('Enter borrower name: ');
    setRenters([...renters, { name, id: Date.now(), date: new Date().toLocaleDateString('en-us', { year: "numeric", month: "short", day: "numeric" }) }]);
    setAvailableCopy(prevState => prevState - 1);
    setIsRented(true);
  }

  const handleReturn = (renter) => {
    const maxAllowedPeriod = 14;
    const currentDate = Date.now();
    const timeBorrowed = currentDate - renter.id;
    const daysDue = Math.floor(timeBorrowed / 60000 / 60 / 24);
    if (daysDue > maxAllowedPeriod) {
      const outstandingPay = ((daysDue - maxAllowedPeriod) * +book.price * 0.1) + '';
      alert(`${renter.name} should pay: ${outstandingPay.slice(0, 3)}`);
    }
    setRenters(prevState => [...prevState.filter(rt => rt.id !== renter.id)]);
    setAvailableCopy(prevState => prevState + 1);
  }

  return (
    <div className={styles.book}>
      <div className={styles.bookCopies}>
        {`${availableCopy} / ${book.copies}`}
      </div>
      <div className={styles.bookName}>{book.name}</div>
      <div className={styles.bookIsbn}>{book.isbn}</div>
      <div className={styles.bookPrice}>{book.price}</div>
      <button className={styles.buttonBorrow} onClick={handleBorrow} disabled={!availableCopy}>Borrow</button>
      <div className={styles.renters}>
        {isRented && renters?.map(renter => <Renter key={renter.id} renter={renter} handleReturn={handleReturn} />)}
      </div>
    </div>
  )
}

export default Book;
