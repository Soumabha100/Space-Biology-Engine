import React from "react";
import { useSearch } from "../context/SearchContext";

const SearchCard = ({ entity }) => {
  const { setSelectedEntity } = useSearch();

  // Fail-safe check: If for any reason the entity is null, render nothing.
  if (!entity) {
    return null;
  }

  // 1. Use `entity.title` for the heading.
  // 2. Use `entity.abstract` or `entity.summary` for the description.
  // 3. Use the first author from `entity.byPeople` as the source.

  const title = entity.title || "Untitled Study";
  const description = (entity.abstract || entity.summary || "").substring(
    0,
    150
  );
  const source =
    entity.byPeople && entity.byPeople.length > 0 ? entity.byPeople[0] : "N/A";

  const handleCardClick = () => {
    setSelectedEntity(entity);
  };

  return (
    <div
      className="bg-gray-800 border border-gray-700 p-4 rounded-lg hover:bg-gray-700 cursor-pointer transition-colors duration-200"
      onClick={handleCardClick}
    >
      <h3 className="text-lg font-bold text-cyan-400 truncate" title={title}>
        {title}
      </h3>

      <p className="text-sm text-gray-400 mt-1">
        Source: <span className="font-semibold text-gray-300">{source}</span>
      </p>

      {description && (
        <p className="text-gray-300 mt-2 text-sm">{description}...</p>
      )}

      <div className="flex flex-wrap gap-2 mt-3">
        {entity.tags?.slice(0, 5).map((tag, index) => (
          <span
            key={index}
            className="bg-gray-700 text-cyan-300 text-xs font-medium px-2.5 py-0.5 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default SearchCard;
