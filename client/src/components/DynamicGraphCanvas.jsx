import React, { Suspense } from "react";

// Use React.lazy to dynamically import the GraphCanvas component
const GraphCanvas = React.lazy(() => import("./GraphCanvas"));

const DynamicGraphCanvas = (props) => {
  return (
    // Suspense provides a loading fallback while the component is being loaded
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-full w-full bg-background text-text">
          Loading Knowledge Graph...
        </div>
      }
    >
      <GraphCanvas {...props} />
    </Suspense>
  );
};

export default DynamicGraphCanvas;
