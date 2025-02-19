"use client";

import { useState, useEffect, useTransition } from "react";
import Link from "next/link";
import { useModal } from "@/hooks/useModal";
import Translation from "@/types/translation";

const SearchIcon = () => (
  <svg
    className="h-5 w-5 text-gray-400"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
);

const SearchBox = ({ translation }: { translation: Translation }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const modalState = useModal();

  const handleInputClick = () => {
    if (!modalState.isOpen) {
      modalState.handleOpen({
        title: translation.search,
        content: (
          <SearchModalContent
            initialSearchTerm={searchTerm}
            onSearch={handleSearch}
            onClose={() => modalState.onClose()}
            placeholder={translation.search}
            translation={translation}
          />
        ),
      });
    }
  };

  const handleSearch = async (value: string) => {
    setSearchTerm(value);

    startTransition(async () => {
      if (value) {
        try {
          const response = await fetch(`/api/search?q=${encodeURIComponent(value)}`, {
            cache: "force-cache",
            next: { revalidate: 3600 },
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();
          if (data.error) {
            throw new Error(data.error);
          }

          setSearchResults(data.results || []);
          setError(null);
        } catch (err) {
          setError(err instanceof Error ? err.message : "An error occurred");
          setSearchResults([]);
        }
      } else {
        setSearchResults([]);
        setError(null);
      }
    });
  };

  const handleModalClose = () => {
    modalState.onClose();
    setSearchTerm("");
  };

  useEffect(() => {
    if (!modalState.isOpen) {
      setSearchTerm("");
    }
  }, [modalState.isOpen]);

  return (
    <>
      <div className="relative me-2">
        <input
          className="w-full md:w-64 rounded-lg border border-slate-300 py-2 pl-10 pr-4 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200 placeholder-gray-500 bg-white shadow-sm"
          type="search"
          name="search"
          placeholder={translation.search}
          value={searchTerm}
          onClick={handleInputClick}
          onChange={(e) => setSearchTerm(e.target.value)}
          aria-label="Search"
          autoComplete="off"
          autoSave="off"
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <SearchIcon />
        </div>
      </div>
    </>
  );
};

const SearchModalContent = ({
  initialSearchTerm,
  onSearch,
  onClose,
  placeholder,
  translation,
}: {
  initialSearchTerm: string;
  onSearch: (value: string) => void;
  onClose: () => void;
  placeholder: string;
  translation: Translation;
}) => {
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Initial search when modal opens
    if (initialSearchTerm) {
      handleSearch(initialSearchTerm);
    }
  }, [initialSearchTerm]);

  const handleSearch = async (value: string) => {
    setSearchTerm(value);
    startTransition(async () => {
      if (value) {
        try {
          const response = await fetch(`/api/search?q=${encodeURIComponent(value)}`, {
            cache: "force-cache",
            next: { revalidate: 3600 },
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();
          if (data.error) {
            throw new Error(data.error);
          }

          setSearchResults(data.results || []);
          setError(null);
        } catch (err) {
          setError(err instanceof Error ? err.message : "An error occurred");
          setSearchResults([]);
        }
      } else {
        setSearchResults([]);
        setError(null);
      }
    });
  };

  return (
    <div className="p-4">
      <div className="relative mb-4">
        <input
          className="w-full rounded-lg border border-slate-300 py-2 pl-10 pr-4 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200 placeholder-gray-500 bg-white shadow-sm"
          type="search"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder={placeholder}
          autoFocus
          autoComplete="off"
          autoSave="off"
          aria-label="Search in modal"
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <SearchIcon />
        </div>
      </div>
      {searchTerm !== '' && (
        <p className="text-lg mb-2">
          {translation.search_results}
        </p>
      )}
      {isPending && (
        <p className="text-gray-500">
          {translation.loading}
        </p>
      )}
      {error && (
        <p className="text-red-500">{error}</p>
      )}
      {searchResults.length > 0 ? (
        <ul className="space-y-2">
          {searchResults.map((post) => (
            <li key={post.id} className="p-2 hover:bg-gray-100 rounded cursor-pointer">
              <Link href={post.uri} className="text-blue-600 hover:underline">
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
      ) : !isPending && !error && searchTerm ? (
        <p className="text-gray-500">{translation.no_result}</p>
      ) : null}
    </div>
  );
};

export default SearchBox;