import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

const Progress = () => {
  const [progress, setProgress] = useState([]);
  const [weight, setWeight] = useState("");
  const [calories, setCalories] = useState("");
  const [steps, setSteps] = useState("");

  const token = localStorage.getItem("token");

  const addProgress = async () => {
    await fetch(`${import.meta.env.VITE_API_URL}/api/progress`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ weight, calories, steps }),
    });
  };

  useEffect(() => {
    const fetchProgress = async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/progress`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setProgress(data);
    };

    fetchProgress();
  }, []);

  return (
    <>
      <Navbar />
      <div className="p-10">
        <h2>Add Progress</h2>
        <input placeholder="Weight" onChange={(e)=>setWeight(e.target.value)} />
        <input placeholder="Calories" onChange={(e)=>setCalories(e.target.value)} />
        <input placeholder="Steps" onChange={(e)=>setSteps(e.target.value)} />
        <button onClick={addProgress}>Add</button>

        <h2 className="mt-10">Progress History</h2>
        {progress.map((p) => (
          <div key={p._id}>
            <p>Weight: {p.weight}</p>
            <p>Calories: {p.calories}</p>
            <p>Steps: {p.steps}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Progress;