import firebase from "./firebase";
import React, { useState, useEffect } from "react";

function App() {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(false);

  const ref = firebase.firestore().collection("schools");

  console.log("peek", ref);

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
  useEffect(() => {
    getSchools();
    // eslint-disable-next-line
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  console.log(schools);

  return (
    <div>
      <h1>Schools</h1>
      {schools.map((school) => (
        <div key={school.id}>
          <h2>{school.name}</h2>
          <p>Kids: {school.kids}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
