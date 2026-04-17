import Navbar from "../components/Navbar";
import DietCard from "../components/DietCard";
import { useEffect, useState } from "react";


const Diet = () => {
  const [diets, setDiets] = useState([]);

  useEffect(() => {
    const fetchDiets = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/diet`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        setDiets(data);
      } catch (error) {
        console.log(error);
      }
    };
    const DietCard = ({ meal }) => {
  return (
        <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white p-5 rounded-2xl shadow-md hover:shadow-xl transition"
    >
      <h2 className="text-xl font-bold text-green-600 mb-2">
        {meal.name}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"></div>
      <p className="text-gray-600">Calories: {meal.calories}</p>
      <p className="text-gray-600">Protein: {meal.protein}g</p>
      <p className="text-gray-600">Carbs: {meal.carbs}g</p>
    </motion.div>
  );
};

    fetchDiets();
  }, []);

  return (
    <>
      <Navbar />
      <div className="grid md:grid-cols-2 gap-6 p-10">
        {diets.map((meal) => (
          <DietCard key={meal._id} meal={meal} />
        ))}
      </div>
    </>
  );
};

export default Diet;
