

const WorkoutCard = ({ workout }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white p-5 rounded-2xl shadow-md hover:shadow-xl transition"
    >
      <h2 className="text-xl font-bold text-blue-600 mb-2">
        {workout.name}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"></div>
      <p className="text-gray-600">Sets: {workout.sets}</p>
      <p className="text-gray-600">Reps: {workout.reps}</p>

      <span className="inline-block mt-3 text-sm bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
        {workout.difficulty}
      </span>
    </motion.div>
  );
};

export default WorkoutCard;