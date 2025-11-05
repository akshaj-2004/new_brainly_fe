import React, { useState } from "react";
import { Button } from "../ui/button";
import { Search, X, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface NavbarProps {
  onAddContentClick: () => void;
  onSearch: (query: string) => void;
  onLogout: () => void; // 👈 added this
}

export const Navbar: React.FC<NavbarProps> = ({
  onAddContentClick,
  onSearch,
  onLogout,
}) => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query.trim());
  };

  const clearSearch = () => {
    setQuery("");
    onSearch("");
  };

  const handleLogout = () => {
    onLogout();
    navigate("/"); // 👈 navigate to landing
  };

  return (
    <header className="flex items-center justify-between gap-4 border-b border-gray-200 bg-white px-6 py-3">
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="relative w-1/3">
        <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Search your Brain..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-lg border border-gray-300 pl-9 pr-8 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {query && (
          <X
            onClick={clearSearch}
            className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 cursor-pointer"
            size={18}
          />
        )}
      </form>

      {/* Buttons */}
      <div className="flex items-center gap-3">
        <Button
          variant="primary"
          size="sm"
          text="Add Content"
          onClick={onAddContentClick}
        />
        <Button
          variant="logout"
          size="sm"
          startIcon={<LogOut size={16} />}
          text="Logout"
          onClick={handleLogout}
        />
      </div>
    </header>
  );
};
