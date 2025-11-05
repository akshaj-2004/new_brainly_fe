import React from "react";
import { Music, Video, Image, FileText } from "lucide-react";
import { Logo } from "../logo";

interface SidebarProps {
  activeType: string | null;
  onFilterSelect: (type: string | null) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeType, onFilterSelect }) => {
  const types = [
    { label: "Audio", icon: <Music size={18} /> },
    { label: "Video", icon: <Video size={18} /> },
    { label: "Image", icon: <Image size={18} /> },
    { label: "Article", icon: <FileText size={18} /> },
  ];

  return (
    <aside className="w-64 h-screen border-r border-gray-200 bg-white flex flex-col p-4">
      <button
        onClick={() => onFilterSelect(null)}
        className="flex items-center gap-2 mb-6 px-2 py-1 hover:bg-gray-100 rounded-lg transition"
      >
        <Logo />
      </button>

      <nav className="flex flex-col gap-2">
        {types.map(({ label, icon }) => (
          <button
            key={label}
            onClick={() =>
              onFilterSelect(activeType === label ? null : label)
            }
            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
              activeType === label
                ? "bg-indigo-100 text-indigo-700 font-medium"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            {icon}
            <span>{label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
};
