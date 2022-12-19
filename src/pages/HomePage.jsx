import { React } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "hooks/useAuth";
import ListItems from "components/ListItems";

const HomePage = () => {
  const { pending, isSignedIn, user, getAuth } = useAuth();

  const logOut = () => {
    getAuth().signOut();
  };

  if (pending) {
    return <h1>waiting...</h1>;
  }
  if (!isSignedIn) {
    return (
      <div>
        <Navigate to="/login" />
      </div>
    );
  }
  return (
    <div>
      <h1>Welcome {user.email}</h1>
      <button onClick={() => logOut()}>Log out from</button>
      <ListItems />
    </div>
  );
};

export default HomePage;
