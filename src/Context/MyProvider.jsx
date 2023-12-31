import React, { useState } from 'react';
import MyContext from './MyContex';

const MyProvider = ({ children }) => {
  // Define the data/state you want to share
  const [user, setUser] = useState({
    role: "",
    id: ""
  })
  const [buyProduct, setBuyProduct] = useState({
    product: {},
    quantity: 0
  })

  return (
    <MyContext.Provider value={{ user, setUser, buyProduct, setBuyProduct }}>
      {children}
    </MyContext.Provider>
  )
};

export default MyProvider;