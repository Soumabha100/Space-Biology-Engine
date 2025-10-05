import React from "react";

const ResourceHubPage = () => {
  // We've temporarily removed the data fetching since the API has changed.
  // useEffect(() => {
  //   getResources().then((data) => {
  //     console.log("Resources Data:", data);
  //     setResources(data);
  //   });
  // }, []);

  return (
    <div className="p-8 min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4 text-center text-blue-300 drop-shadow-md">
        🚀 NASA Resource Hub
      </h1>
      <p className="text-gray-400 text-center mt-4">
        This section is under construction. <br />
        Resources are now linked to specific items in the Explorer.
      </p>
    </div>
  );
};

export default ResourceHubPage;
