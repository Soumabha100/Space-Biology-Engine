import React from "react";
import { useSearch } from "../context/SearchContext";

const SearchCard = ({ entity }) => {
  const { setSelectedEntity } = useSearch();

  // Fail-safe check: If for any reason the entity is null, render nothing.
  if (!entity) {
    return null;
  }

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
    // **FIX APPLIED HERE:** Replaced all hardcoded colors with theme-aware variables.
    <div
      className="bg-card border border-border p-4 rounded-lg hover:bg-accent cursor-pointer transition-colors duration-200"
      onClick={handleCardClick}
    >
      <h3 className="text-lg font-bold text-foreground truncate" title={title}>
        {title}
      </h3>

      <p className="text-sm text-muted-foreground mt-1">
        Source:{" "}
        <span className="font-semibold text-foreground/80">{source}</span>
      </p>

      {description && (
        <p className="text-muted-foreground mt-2 text-sm">{description}...</p>
      )}

      <div className="flex flex-wrap gap-2 mt-3">
        {entity.tags?.slice(0, 5).map((tag, index) => (
          <span
            key={index}
            className="bg-secondary text-secondary-foreground text-xs font-medium px-2.5 py-0.5 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default SearchCard;
