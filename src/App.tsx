function App() {
  return (
    <div className="min-h-screen bg-linear-to-br from-yellow-50 via-orange-100 to-yellow-100 flex flex-col items-center py-10">
      <div className="mb-10">
        <h1 className="text-5xl font-extrabold text-orange-600 drop-shadow-lg mb-2 text-center">
          Restaurant Menu Design
        </h1>
        <p className="text-lg text-orange-900 text-center">
          Please select a menu type from the buttons below to explore different
          design options.
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-6">
        <button className="cursor-pointer px-6 py-3 bg-orange-600 text-white rounded-lg shadow-md hover:bg-orange-800 transition duration-300">
          Design 1
        </button>
        <button className="cursor-pointer px-6 py-3 bg-orange-600 text-white rounded-lg shadow-md hover:bg-orange-800 transition duration-300">
          Design 2
        </button>
        <button className="cursor-pointer px-6 py-3 bg-orange-600 text-white rounded-lg shadow-md hover:bg-orange-800 transition duration-300">
          Design 3
        </button>
      </div>
    </div>
  );
}

export default App;
