import Navbar from "../components/Navbar";
import WorkoutCard from "../components/WorkoutCard";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    const fetchWorkouts = async () => {
      const token = localStorage.getItem("token");

      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/workouts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setWorkouts(data);
    };

    fetchWorkouts();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100">
      <Navbar />

      <div className="max-w-6xl mx-auto p-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"></div>
        <h1 className="text-3xl font-bold mb-6 text-gray-700">
          Your Workouts 💪
        </h1>

        <Link to="/add-workout" className="bg-blue-600 text-white px-4 py-2 rounded mb-4 inline-block">
          Add Workout
        </Link>

        {workouts.length === 0 ? (
          <p className="text-gray-500">No workouts yet</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workouts.map((w) => (
              <WorkoutCard key={w._id} workout={w} />
            ))}
          </div>
        )}
      </div>
    </div>
    
  );
};

export default Dashboard;
