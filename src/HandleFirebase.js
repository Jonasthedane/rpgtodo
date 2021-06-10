import firebase from "./firebase";
import React, { useState, useEffect, render } from "react";

function HandleFirebase() {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("")
  const [kids, setKids] = useState(0)
  const [id, setId] = useState("")
  
  const ref = firebase.firestore().collection("schools");

  useEffect(() => {
    getSchools();
    // eslint-disable-next-line
  }, []);

  //GET CALL REALTIME
  function getSchools() {
    setLoading(true);
    ref.onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setSchools(items);
      setLoading(false);
    });
  }

  //GET CALL ONCE
  function getSchools2() {
    setLoading(true);
    ref.get().then((item) => {
      const items = item.docs.map((doc) => doc.data());
      setSchools(items);
      setLoading(false);
    });
  }

  function addSchool(newSchool) {
      var friends = [
        {name: 'jonas', age: 23},
        {name: 'jonas2', age: 24}
      ]
      console.log("friends: " + friends)

      var toAdd = {
          name: newSchool.name,
          id: newSchool.id,
          kids: friends,
      }
      ref
        .doc(toAdd.id)
        .set(toAdd)
        .then(() => {
            console.log("item added: ", toAdd)
        })
        .catch((err) => {
            console.log("err", err)
        })
  }

  function deleteSchool(schoolToDelete) {
      //console.log("schoolToDelete", schoolToDelete)
      ref
        .doc(schoolToDelete.id)
        .delete()
        .then(() => {
            console.log("item deleted: ", schoolToDelete)
        })
        .catch((err) => {
            console.log("err", err)
        })
  }

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
        <input type="text" onChange={(e) => {setName(e.target.value)}} value={name}></input>
        <input type="number" onChange={(e) => {setKids(Number(e.target.value))}} value={kids}></input>
        <input type="text" onChange={(e) => {setId(e.target.value)}} value={id}></input>
        <button onClick={() => addSchool({name, kids, id})}>ADD</button>

        <h1>Schools</h1>
        {schools.map((school) => (
        <div key={school.id}>
            <h2>{school.name}</h2>
            <div>Kids: {school.kids.map((kid) => {
                return (<p key={kid.name}>{kid.name}</p>)
            })}</div>
            <button onClick={() => deleteSchool(school)}>delete</button>
        </div>
        ))}
    </div>
  );
}

export default HandleFirebase;
