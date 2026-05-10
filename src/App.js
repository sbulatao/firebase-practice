import React from 'react';
import logo from './logo.svg';
import './App.css';
import { auth, db } from './firebase/init';
import { collection, addDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';

function App() {
  const [user, setUser] = React.useState({});
  const [loading, setLoading] = React.useState(true);

  function createPost() {
    const post = {
      title: "Land a full-time job",
      description: "Finish Frontend Simplified",
    };
    addDoc(collection(db, "posts"), post) // name of the collection: posts
  }

  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setLoading(false);
      console.log(user);
      // console.log(user.email[0].toUpperCase());
      if (user) {
        setUser(user);
      }
    })
  }, [])

  function register(){
    // console.log('register');
    createUserWithEmailAndPassword(auth, 'email@email.com', 'password')
    .then((user) => {
      console.log(user);
    })
    .catch((error) => {
      console.log(error);
    })
  }

  function login(){
    signInWithEmailAndPassword(auth, 'email@email.com', 'password')
    .then((user) => {
      console.log(user);
      setUser(user);
    })
    .catch((error) => {
      console.log(error.message);
    })
  }

  function logout(){
    signOut(auth);
    setUser({});
  }

  return (
    <div className="App">
      <button onClick={register}>Register</button>
      <button onClick={login}>Login</button>
      <button onClick={logout}>Logout</button>
      {loading ? 'loading...': user.email}
      <button onClick={createPost}>Create Post</button>
      
    </div>
  );
}

export default App;
