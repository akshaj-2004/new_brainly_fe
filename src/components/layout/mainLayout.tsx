import React, { ReactNode, useEffect, useState, useCallback } from "react";
import { Sidebar } from "./sidebar";
import { Navbar } from "./navbar";
import { AddContentModal } from "../content/addContentModel";
import { ContentCard } from "../content/contentcard";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;


interface MainLayoutProps {
  children?: ReactNode;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>; 
}

interface ContentItem {
  id: number;
  title: string;
  description: string;
  tags: string[];
  link: string;
  type: "Audio" | "Video" | "Image" | "Article";
}

export const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  setIsAuthenticated,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contents, setContents] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState<ContentItem[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [deletingIds, setDeletingIds] = useState<number[]>([]);

  const fetchContents = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const res = await fetch(`${BACKEND_URL}api/v1/content`, {
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch contents");

      const data = await res.json();
      const normalized = (data.data || []).map((item: any) => ({
        id: item.id,
        title: item.title,
        description: item.description,
        type: item.type,
        link: item.link?.hash || "",
        tags: item.tags?.map((t: any) => t.title) || [],
      }));

      setContents(normalized);
    } catch (err) {
      console.error("Error fetching contents:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchContents();
  }, [fetchContents]);

  const handleSearch = async (query: string) => {
    if (!query) {
      setIsSearching(false);
      setSearchResults([]);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      setIsSearching(true);
      setLoading(true);

      const res = await fetch(`${BACKEND_URL}api/v1/search`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
        body: JSON.stringify({ query }),
      });

      if (!res.ok) throw new Error("Search failed");

      const data = await res.json();

      const results = (data.results || []).slice(0, 3).map((item: any) => ({
        id: item.id,
        title: item.title,
        description: item.description,
        type: item.type,
        link: item.link?.hash || "",
        tags: item.tags?.map((t: any) => t.title) || [],
      }));

      setSearchResults(results);
    } catch (err) {
      console.error("Search error:", err);
    } finally {
      setLoading(false);
    }
  };

  const visibleContents = isSearching
    ? searchResults
    : filterType
    ? contents.filter((c) => c.type === filterType)
    : contents;

  const handleAddContent = async (data: any) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const res = await fetch(`${BACKEND_URL}api/v1/content`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
        body: JSON.stringify({
          title: data.title,
          description: data.description,
          tags: data.tags,
          link: data.url,
          type: data.type,
        }),
      });

      if (!res.ok) throw new Error("Failed to save content");

      alert("Content added successfully!");
      setLoading(true);
      await fetchContents();
      setIsModalOpen(false);
    } catch (err) {
      console.error("Error saving content:", err);
      alert("Something went wrong while saving the content!");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this content?")) return;

    setDeletingIds((prev) => [...prev, id]);
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const res = await fetch(`${BACKEND_URL}api/v1/content/${id}`, {
        method: "DELETE",
        headers: { authorization: token },
      });

      if (!res.ok) throw new Error("Failed to delete content");

      setContents((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      console.error("Error deleting content:", err);
      alert("Failed to delete content!");
    } finally {
      setDeletingIds((prev) => prev.filter((x) => x !== id));
    }
  };

  const handleShare = async (link: string) => {
    try {
      await navigator.clipboard.writeText(link);
      alert("Link copied to clipboard!");
    } catch (err) {
      console.error("Clipboard error:", err);
      alert("Failed to copy link!");
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeType={filterType} onFilterSelect={setFilterType} />

      <div className="flex-1 flex flex-col">
        <Navbar
          onAddContentClick={() => setIsModalOpen(true)}
          onSearch={handleSearch}
          onLogout={() => {
            localStorage.removeItem("token");
            setIsAuthenticated(false);
          }}
        />

        <main className="p-6 overflow-y-auto">
          {loading ? (
            <p className="text-gray-600 text-center">Loading contents...</p>
          ) : visibleContents.length === 0 ? (
            <p className="text-gray-500 text-center">
              {isSearching
                ? "No matching results found."
                : filterType
                ? `No ${filterType.toLowerCase()} content available.`
                : "No content yet. Add one!"}
            </p>
          ) : (
            <>
              {isSearching && (
                <h2 className="text-lg font-semibold mb-4">
                  Search Results ({visibleContents.length})
                </h2>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {visibleContents.map((item) => (
                  <ContentCard
                    key={String(item.id)}
                    id={item.id}
                    title={item.title}
                    description={item.description}
                    tags={item.tags}
                    link={item.link}
                    type={item.type}
                    onDelete={handleDelete}
                    onShare={handleShare}
                    isDeleting={deletingIds.includes(item.id)}
                  />
                ))}
              </div>
            </>
          )}
          {children}
        </main>
      </div>

      <AddContentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddContent}
      />
    </div>
  );
};
