import React, { useState, useEffect, useRef } from "react";
import { Modal } from "../ui/modal";
import { Button } from "../ui/button";
import { Loader2, X } from "lucide-react";

const contentTypes = ["Audio", "Video", "Image", "Article"];

interface AddContentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    url: string;
    type: string;
    title: string;
    description: string;
    tags: string[];
  }) => Promise<void>;
}

export const AddContentModal: React.FC<AddContentModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [url, setUrl] = useState("");
  const [type, setType] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleAddTag = () => {
    const newTag = tagInput.trim();
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const resetForm = () => {
    setUrl("");
    setType("");
    setTitle("");
    setDescription("");
    setTags([]);
    setTagInput("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage("");
    try {
      await onSubmit({ url, type, title, description, tags });
      setSuccessMessage("Content added successfully!");
      resetForm();

      setTimeout(() => {
        setSuccessMessage("");
        onClose();
      }, 1200);
    } catch (err) {
      console.error("Error adding content:", err);
      setSuccessMessage(" Something went wrong. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={isSubmitting ? () => {} : onClose}
      title="Add New Content"
      description="Provide details about your content below."
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="text-sm font-medium text-gray-700">URL</label>
          <input
            ref={inputRef}
            type="url"
            placeholder="Enter content URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            disabled={isSubmitting}
            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none disabled:opacity-50"
            required
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Content Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            disabled={isSubmitting}
            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none disabled:opacity-50"
            required
          >
            <option value="">Select type</option>
            {contentTypes.map((ct) => (
              <option key={ct} value={ct}>
                {ct}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={isSubmitting}
            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none disabled:opacity-50"
            required
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Description</label>
          <textarea
            placeholder="Short description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={isSubmitting}
            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none resize-none disabled:opacity-50"
            rows={3}
            required
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Tags</label>
          <div className="flex gap-2 mt-1">
            <input
              type="text"
              placeholder="Add a tag"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddTag())}
              disabled={isSubmitting}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none disabled:opacity-50"
            />
            <Button
              type="button"
              onClick={handleAddTag}
              disabled={!tagInput || isSubmitting}
            >
              Add
            </Button>
          </div>

          <div className="flex flex-wrap gap-2 mt-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="flex items-center gap-1 text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-md"
              >
                #{tag}
                {!isSubmitting && (
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="text-indigo-600 hover:text-red-600"
                  >
                    <X size={12} />
                  </button>
                )}
              </span>
            ))}
          </div>
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Adding Content...
            </>
          ) : (
            "Add Content"
          )}
        </Button>

        {successMessage && (
          <p
            className={`text-sm text-center mt-1 ${
              successMessage.startsWith("✅") ? "text-green-600" : "text-red-600"
            }`}
          >
            {successMessage}
          </p>
        )}
      </form>
    </Modal>
  );
};
