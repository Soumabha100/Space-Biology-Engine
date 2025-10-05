import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiX,
  FiUsers,
  FiBookOpen,
  FiExternalLink,
  FiTag,
  FiHash,
  FiCopy,
  FiCheck,
  FiShare2,
  FiMessageSquare,
} from "react-icons/fi";
import { useSearch } from "../context/SearchContext";

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: { y: "100vh", opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 120, damping: 20 },
  },
  exit: { y: "100vh", opacity: 0, transition: { duration: 0.3 } },
};

const InspectorPanel = ({ entity, onClose }) => {
  if (!entity) return null;

  const [isIdCopied, setIsIdCopied] = useState(false);
  const [isUrlCopied, setIsUrlCopied] = useState(false);
  const navigate = useNavigate();
  const { setSearchQuery } = useSearch();

  const handleCopy = (text, setCopiedState) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopiedState(true);
        setTimeout(() => setCopiedState(false), 2000);
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };

  const handleTagClick = (tag) => {
    onClose();
    setSearchQuery(tag);
  };

  const handleChatClick = () => {
    navigate(`/chat/${entity.id}`);
  };

  return ReactDOM.createPortal(
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      onClick={onClose}
    >
      <motion.div
        className="relative w-full max-w-4xl max-h-[90vh] bg-card text-card-foreground rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-border"
        variants={modalVariants}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b border-border flex-shrink-0">
          <h2 className="text-2xl font-bold text-foreground truncate pr-12">
            {entity.title || "Details"}
          </h2>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
            aria-label="Close"
          >
            <FiX size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar space-y-8">
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground mb-2 uppercase tracking-wider">
              Abstract
            </h3>
            <p className="text-base leading-relaxed text-foreground/80">
              {entity.abstract || entity.summary || "No abstract available."}
            </p>
          </div>

          {entity.id && (
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wider flex items-center gap-2">
                <FiHash />
                Document ID
              </h3>
              <div className="flex items-center gap-2">
                <p className="text-base text-foreground/80 font-mono bg-muted px-2 py-1 rounded-md inline-block">
                  {entity.id}
                </p>
                <button
                  onClick={() => handleCopy(`#${entity.id}`, setIsIdCopied)}
                  className="p-2 text-muted-foreground hover:text-foreground rounded-md hover:bg-accent transition-colors"
                  aria-label="Copy Document ID"
                >
                  {isIdCopied ? (
                    <FiCheck className="text-green-500" />
                  ) : (
                    <FiCopy />
                  )}
                </button>
              </div>
            </div>
          )}

          {entity.byPeople && entity.byPeople.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wider flex items-center gap-2">
                <FiUsers />
                Authors
              </h3>
              <p className="text-base text-foreground/80">
                {entity.byPeople.join(", ")}
              </p>
            </div>
          )}

          {entity.tags && entity.tags.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wider flex items-center gap-2">
                <FiTag />
                Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {entity.tags.map((tag, index) => (
                  <motion.button
                    key={index}
                    onClick={() => handleTagClick(tag)}
                    className="text-xs font-semibold px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {tag}
                  </motion.button>
                ))}
              </div>
            </div>
          )}

          {entity.url && (
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wider flex items-center gap-2">
                <FiBookOpen />
                Source
              </h3>
              <a
                href={entity.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-base text-primary hover:underline"
              >
                View Publication or Dataset <FiExternalLink size={16} />
              </a>
            </div>
          )}
        </div>

        <div className="flex items-center justify-end gap-4 p-4 border-t border-border bg-background/50 flex-shrink-0">
          <button
            onClick={() => handleCopy(entity.url, setIsUrlCopied)}
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
            disabled={!entity.url}
          >
            {isUrlCopied ? (
              <>
                <FiCheck className="text-green-500" /> Copied!
              </>
            ) : (
              <>
                <FiShare2 /> Share
              </>
            )}
          </button>
          <button
            onClick={handleChatClick}
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-md bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <FiMessageSquare />
            Chat about this document
          </button>
        </div>
      </motion.div>
    </motion.div>,
    document.getElementById("modal-root")
  );
};

export default InspectorPanel;
