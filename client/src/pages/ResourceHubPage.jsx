import React from "react";
import { FiExternalLink, FiBookOpen, FiYoutube } from "react-icons/fi";
import { motion } from "framer-motion";

const resources = [
  {
    title: "NASA GeneLab",
    description:
      "A comprehensive database for spaceflight-related omics data, enabling exploration and analysis of biological responses to the space environment.",
    link: "https://genelab.nasa.gov/",
    icon: <FiBookOpen />,
    category: "Database",
  },
  {
    title: "Space Biology - NASA",
    description:
      "Official NASA page for space biology research, featuring news, articles, and information on current and past missions.",
    link: "https://www.nasa.gov/space-science/space-biology/",
    icon: <FiBookOpen />,
    category: "Research Hub",
  },
  {
    title: "Astrobiology at NASA",
    description:
      "Explore the search for life beyond Earth. This resource covers the study of the origin, evolution, and distribution of life in the universe.",
    link: "https://astrobiology.nasa.gov/",
    icon: <FiBookOpen />,
    category: "Research Hub",
  },
  {
    title: "ISS National Lab",
    description:
      "The official website for the International Space Station (ISS) U.S. National Laboratory, detailing research opportunities and projects.",
    link: "https://www.issnationallab.org/",
    icon: <FiBookOpen />,
    category: "Platform",
  },
  {
    title: "SpaceX Missions",
    description:
      "Information on past, present, and future missions from SpaceX, including those contributing to space biology research.",
    link: "https://www.spacex.com/missions/",
    icon: <FiExternalLink />,
    category: "Mission Info",
  },
  {
    title: "ESA Space Biology",
    description:
      "The European Space Agency's hub for space biology, covering research on how life adapts to space.",
    link: "https://www.esa.int/Science_Exploration/Human_and_Robotic_Exploration/Research/Space_Biology",
    icon: <FiBookOpen />,
    category: "Research Hub",
  },
  {
    title: "Veritasium: Life in Space",
    description:
      "An engaging YouTube video explaining the biological challenges and adaptations of living in space.",
    link: "https://www.youtube.com/watch?v=B_z-2pQ2s2U",
    icon: <FiYoutube />,
    category: "Video",
  },
];

const ResourceCard = ({ title, description, link, icon, category }) => (
  <motion.a
    href={link}
    target="_blank"
    rel="noopener noreferrer"
    className="block p-6 bg-card border border-border rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
    whileHover={{ y: -5 }}
  >
    <div className="flex items-start justify-between">
      <div className="flex items-center gap-4">
        <div className="text-primary">
          {React.cloneElement(icon, { size: 24 })}
        </div>
        <h3 className="text-lg font-bold text-card-foreground">{title}</h3>
      </div>
      <span className="text-xs font-semibold px-2 py-1 bg-secondary text-secondary-foreground rounded-full">
        {category}
      </span>
    </div>
    <p className="mt-3 text-muted-foreground">{description}</p>
    <div className="mt-4 flex items-center text-sm text-primary hover:underline">
      Visit Resource <FiExternalLink className="ml-2" />
    </div>
  </motion.a>
);

const ResourceHubPage = () => {
  return (
    // **FIX APPLIED HERE:**
    // Removed hardcoded dark background and text colors.
    // The page now uses theme-aware colors like `bg-background` and `text-foreground`.
    <div className="h-full p-8 overflow-y-auto bg-background text-foreground">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold tracking-tight">
            Resource Hub
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            A curated collection of essential links and resources for space
            biology research.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {resources.map((resource, index) => (
            <ResourceCard key={index} {...resource} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResourceHubPage;
