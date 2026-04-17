import { useState } from "react";
import Navbar from "../components/Navbar";

const AddWorkout = () => {
  const [name, setName] = useState("");
  const [reps, setReps] = useState("");
  const [sets, setSets] = useState("");
  const [difficulty, setDifficulty] = useState("");

  const handleAddWorkout = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/workouts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        reps: parseInt(reps),
        sets: parseInt(sets),
        difficulty,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Workout Added");
      window.location.href = "/dashboard";
    } else {
      alert(data.message || "Failed to add workout");
    }
  };

  return (
    <>
      <Navbar />
      <div className="p-10">
        <input placeholder="Workout Name" onChange={(e)=>setName(e.target.value)} />
        <input placeholder="Reps" onChange={(e)=>setReps(e.target.value)} />
        <input placeholder="Sets" onChange={(e)=>setSets(e.target.value)} />
        <input placeholder="Difficulty" onChange={(e)=>setDifficulty(e.target.value)} />

        <button onClick={handleAddWorkout}>Add Workout</button>
      </div>
    </>
  );
};

export default AddWorkout;