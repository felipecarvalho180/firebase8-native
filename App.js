import React, { useState, useEffect } from "react";
import firebase from "./src/firebaseConfig";
import SignIn from "./src/screens/SignIn";
import SignUp from "./src/screens/SignUp";

export default function firebaseapp() {
  const [name, setName] = useState("Carregando...");
  const [users, setUsers] = useState([]);

  async function getUsers() {
    await firebase
      .database()
      .ref("/users")
      .on("value", (snapshot) => {
        setUsers([]);

        snapshot.forEach((childItem) => {
          const data = {
            key: childItem.key,
            ...childItem.val(),
          };
          setUsers((state) => [...state, data]);
        });
      });
  }

  async function getUser() {
    // await firebase
    //   .database()
    //   .ref("/users/1/name")
    //   .once("value", (snapshot) => setName(snapshot.val()));

    await firebase
      .database()
      .ref("/users/-N7OSYlUdBT8eJIw6dHK")
      .on("value", (snapshot) => setName(snapshot.val().name));
  }

  async function createUser() {
    await firebase.database().ref("/users").push({
      name: "Thainá",
      age: 23,
    });
  }

  async function updateUser() {
    await firebase.database().ref("/users/-N7OSVo3_SoYjYMbxAux").update({
      name: "Luna",
      age: 5,
    });
  }

  async function removeUser() {
    await firebase.database().ref("/users/-N7OSVo3_SoYjYMbxAux").remove();
  }

  return <SignUp />;
  // return <SignIn />;
}
