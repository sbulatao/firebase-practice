import React from 'react';
import logo from './logo.svg';
import './App.css';
import { auth, db } from './firebase/init';
import { collection, addDoc, doc, getDocs, getDoc, query, where, updateDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';

function App() {
  const [user, setUser] = React.useState({});
  const [loading, setLoading] = React.useState(true);

  async function updatePost() {
    const hardcodedId = "fnHDMr1jEoK10eJhI2di";
    const postRef = doc(db, "posts", hardcodedId);
    const post = await getPostById(hardcodedId);
    // console.log(post);

    // const newPost = {
    //   description: "Finish Frontend Simplified",
    //   uid: "1",
    //   title: "Land ahhhhhhhh job"
    // };
    // updateDoc(postRef, newPost);

    const newPost = {
      ...post,
      title: "Land ahhhhhhhhhhhhhhhhhhhhh job"
    };
    console.log(newPost);
    updateDoc(postRef, newPost);
  }

  function createPost() {
    const post = {
      title: "Finish Interview Section",
      description: "Do Frontend Simplified",
      uid: user.uid,
    };
    addDoc(collection(db, "posts"), post) // name of the collection: posts
  }

  async function getAllPost() {
    // const data = await getDocs(collection(db, "posts"));
    // console.log(data.docs);
    const { docs } = await getDocs(collection(db, "posts"));
    // console.log(docs);
    const posts = docs.map(elem => ({ ...elem.data(), id: elem.id }));
    console.log(posts);
  }

  async function getPostById(id) {
    // const hardcodedId = "fnHDMr1jEoK10eJhI2di";
    const postRef = doc(db, "posts", id);
    // console.log(postRef);
    const postSnap = await getDoc(postRef);
    // const post = postSnap.data();
    // console.log(post);
    return postSnap.data();
  }

  async function getPostByUid() {
    const postCollectionRef = await query(
      collection(db, "posts"),
      where("uid", "==", "1")
    );
    const { docs } = await getDocs(postCollectionRef);
    console.log(docs.map(doc => doc.data()));
  }

  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setLoading(false);
      console.log(user);
      // console.log(user.email[0].toUpperCase());
      if (user) {
        setUser(user);
      }
    });
  }, []);

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
      <button onClick={getAllPost}>Get All Posts</button>
      <button onClick={getPostById}>Get Post By Id</button>
      <button onClick={getPostByUid}>Get Post By Uid</button>
      <button onClick={updatePost}>Update Post</button>
    </div>
  );
}

export default App;
