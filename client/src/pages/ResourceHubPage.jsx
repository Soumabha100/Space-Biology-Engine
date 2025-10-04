import React, { useEffect, useState } from "react";
import { getResources } from "../services/api";

const ResourceHubPage = () => {
  const [resources, setResources] = useState([]);

  // Fetch resource data from mock API when the page loads
  useEffect(() => {
    getResources().then((data) => {
      console.log("Resources Data:", data); // ✅ check in console
      setResources(data);
    });
  }, []);

  return (
    <div className="p-8 min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <h1 className="text-3xl font-bold mb-8 text-center text-blue-300 drop-shadow-md">
        🚀 NASA Resource Hub
      </h1>

      {resources.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {resources.map((res) => (
            <a
              key={res.id}
              href={res.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 bg-gray-800/80 border border-gray-700 rounded-2xl shadow-lg 
                         hover:shadow-xl hover:bg-gray-700/90 transition-all transform hover:-translate-y-2"
            >
              <h2 className="text-xl font-semibold mb-2 text-blue-400">
                {res.title}
              </h2>
              <p className="text-gray-300 text-sm leading-relaxed">
                {res.description}
              </p>
              <p className="mt-3 text-blue-400 underline hover:text-blue-300">
                Visit Resource →
              </p>
            </a>
          ))}
        </div>
      ) : (
        <p className="text-gray-400 text-center mt-10">
          Loading NASA resources...
        </p>
      )}
    </div>
  );
};

export default ResourceHubPage;
