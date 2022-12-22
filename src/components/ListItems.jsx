import React from "react";
import Items from "./Items";
import Cart from "./Cart";
import { getDatabase, ref, child, get, push, update, remove, set } from "firebase/database";
import { getAuth } from "firebase/auth";
import { uid } from "uid";

const ListItems = () => {
  const [books, setBooks] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);

  const auth = getAuth();
  const dbRef = ref(getDatabase());
  const dbRe = getDatabase();


  React.useEffect(() => {
    get(child(dbRef, "books"))
      .then((snapshot) => {
        const snapshotValues = snapshot.val();
        if (snapshot.exists()) {
          Object.values(snapshotValues).map((book) =>
            setBooks((books) => [...books, book])
          );
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  React.useEffect(() => {
    get(child(dbRef, `/users/${auth.currentUser.uid}/books`))
      .then((snapshot) => {
        const snapshotValues = snapshot.val();
        if (snapshot.exists()) {
          Object.values(snapshotValues).map((book) =>
            setCartItems((books) => [...books, book])
          );
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const writeToDatabase = (bookId) => {
    push(ref(dbRe, `/users/${auth.currentUser.uid}/books`), bookId);
  };

    const deleteToDatabase = (bookId) => {
      get(child(dbRef, `/users/${auth.currentUser.uid}/books`))
      .then((snapshot) => {
        const snapshotValues = snapshot.val();
        if (snapshot.exists()) {
          for (let [key, value] of Object.entries(snapshotValues)) {
           if (value === bookId) {
            remove(ref(dbRe, `/users/${auth.currentUser.uid}/books/${key}`));
           }
          }
          } else {
          console.log("No data available"); 
        }
      })
      .catch((error) => {
        console.error(error);
      });
      // remove(ref(dbRe, `/users/${auth.currentUser.uid}/books`), bookId );

      setCartItems((prev) => prev.filter((item) => item.id !== bookId));
    };

  const favorites = cartItems.map((id) => books.find((book) => book.id === id));

  return (
    <div>
      {books.map((book, index) => (
        <Items {...book} key={index} writeToDatabase={writeToDatabase} />
      ))}
      <div>
        {favorites.map((book, index) => (
          <Cart {...book} key={index} deleteToDatabase={deleteToDatabase}  />
        ))}
      </div>
    </div>
  );
};

export default ListItems;
