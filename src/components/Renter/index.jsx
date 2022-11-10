import React from 'react'

const Renter = ({ renter, handleReturn }) => {
  if (!renter.id) {
    return null
  }

  return (
    <div>
      <div>{renter.name}</div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>{renter.date}</div>
        <button onClick={() => handleReturn(renter)}>Returned</button>
      </div>
    </div>
  )
}

export default Renter;
