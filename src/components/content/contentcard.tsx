import React from "react";
import { Share2, Trash2, Loader2 } from "lucide-react";
import { Card } from "../ui/card";
import { IconButton } from "../ui/icon";
import { Tag } from "../ui/tag";

interface ContentCardProps {
  id: number;
  title: string;
  description?: string;
  tags: string[];
  link: string;
  type: "Audio" | "Video" | "Image" | "Article";
  onDelete: (id: number) => void;
  onShare: (link: string) => void;
  isDeleting?: boolean; 
}

export const ContentCard: React.FC<ContentCardProps> = ({
  id,
  title,
  description,
  tags,
  link,
  type,
  onDelete,
  onShare,
  isDeleting = false,
}) => {
  const typeColors: Record<ContentCardProps["type"], string> = {
    Audio: "bg-blue-100 text-blue-700",
    Video: "bg-yellow-100 text-yellow-700",
    Image: "bg-green-100 text-green-700",
    Article: "bg-red-100 text-red-700",
  };

  return (
    <Card className="p-4 w-72 relative">
      {isDeleting && (
        <div className="absolute inset-0 bg-white/70 backdrop-blur-sm flex items-center justify-center rounded-xl z-10">
          <Loader2 className="animate-spin text-gray-500" size={20} />
        </div>
      )}

      <div className="flex justify-between items-start">
        <div className="flex flex-col gap-1">
          {link ? (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-gray-800 hover:text-indigo-600 transition-colors duration-200"
            >
              {title}
            </a>
          ) : (
            <h3 className="font-semibold text-gray-800">{title}</h3>
          )}

          <span
            className={`text-xs font-medium px-2 py-0.5 rounded-md w-fit ${typeColors[type]}`}
          >
            {type}
          </span>
        </div>

        <div className="flex gap-1">
          <IconButton
            icon={<Share2 size={16} />}
            label="Share"
            onClick={() => onShare(link)}
            disabled={isDeleting} 
          />
          <IconButton
            icon={<Trash2 size={16} />}
            label="Delete"
            onClick={() => onDelete(id)}
            disabled={isDeleting}
          />
        </div>
      </div>

      {description && (
        <p className="text-sm text-gray-600 mt-2 line-clamp-2">{description}</p>
      )}

      <div className="flex flex-wrap gap-2 mt-3">
        {tags.map((tag) => (
          <Tag key={tag} label={tag} />
        ))}
      </div>
    </Card>
  );
};
