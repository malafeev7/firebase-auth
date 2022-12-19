import React from 'react'
import Items from './Items'
import { getDatabase, ref, child, get, set } from "firebase/database";
import { uid } from 'uid';
import { getAuth } from "firebase/auth";



const ListItems = () => {
    const [books, setBooks] = React.useState([]);
    const [cartItems, setCartItems] = React.useState([]);

    React.useEffect(() => {
      const dbRef = ref(getDatabase());
    get(child(dbRef, 'books')).then((snapshot) => {
        const snapshotValues = snapshot.val();
      if (snapshot.exists()) {
        Object.values(snapshotValues).map((book) => 
            setBooks((books) => [...books, book])
        )
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
}, []);

const writeToDatabase = (obj) => {
  const dbRef = getDatabase();
  const uidd = uid();
  const auth = getAuth();
  set(ref(dbRef, `/users/${auth.currentUser.uid}`), {
    book: books,
    uidd: uidd
  });
};
    
    return (
        <div>
          {books.map((book, index) => (
            <Items 
             {...book}
              key={index}
              writeToDatabase={writeToDatabase}
               />
          ))}
        </div>
      );
    }

export default ListItems