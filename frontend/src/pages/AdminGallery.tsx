import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../services/api";
import { useAuthStore } from "../store/authStore";

interface ImageItem {
  _id: string;
  url: string;
  caption: string;
}

interface Album {
  _id: string;
  title: string;
  description: string;
  category: string;
  type: string;
  isPublic: boolean;
  images: ImageItem[];
  createdAt: string;
  coverImage: string;
}

const CATEGORIES = ["event", "general", "achievement", "other"];

export default function AdminGallery() {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [showUpload, setShowUpload] = useState<string | null>(null);
  const [editingAlbum, setEditingAlbum] = useState<string | null>(null);
  const [albumForm, setAlbumForm] = useState({
    title: "",
    description: "",
    category: "general",
    isPublic: true,
  });
  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
    category: "general",
    isPublic: true,
  });
  const [caption, setCaption] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [bulkCaptions, setBulkCaptions] = useState("");
  const [saving, setSaving] = useState(false);
  const [uploadMode, setUploadMode] = useState<"file" | "url" | "bulk">("file");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const bulkFileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (user?.role !== "superadmin" && user?.role !== "admin") {
      navigate("/");
      return;
    }
    fetchAlbums();
  }, []);

  const fetchAlbums = async () => {
    try {
      const response = await apiClient.get("/gallery/admin");
      setAlbums(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch albums");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAlbum = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(null);
    try {
      await apiClient.post("/gallery", albumForm);
      setSuccess("Album created successfully!");
      setAlbumForm({
        title: "",
        description: "",
        category: "general",
        isPublic: true,
      });
      setShowCreate(false);
      fetchAlbums();
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to create album");
    } finally {
      setSaving(false);
    }
  };

  const startEditing = (album: Album) => {
    setEditingAlbum(album._id);
    setEditForm({
      title: album.title,
      description: album.description,
      category: album.category,
      isPublic: album.isPublic,
    });
  };

  const handleEditAlbum = async (albumId: string) => {
    setSaving(true);
    setError(null);
    setSuccess(null);
    try {
      await apiClient.patch(`/gallery/${albumId}`, editForm);
      setSuccess("Album updated successfully!");
      setEditingAlbum(null);
      fetchAlbums();
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to update album");
    } finally {
      setSaving(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleBulkFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFiles(Array.from(e.target.files));
    }
  };

  const handleUploadImage = async (albumId: string) => {
    if (uploadMode === "file" && !selectedFile) return;
    if (uploadMode === "url" && !imageUrl) return;
    setSaving(true);
    setError(null);
    try {
      if (uploadMode === "file" && selectedFile) {
        const formData = new FormData();
        formData.append("photo", selectedFile);
        formData.append("caption", caption);
        await apiClient.post(`/gallery/${albumId}/images`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else if (uploadMode === "url" && imageUrl) {
        await apiClient.post(`/gallery/${albumId}/images`, {
          url: imageUrl,
          caption,
        });
      }
      setSuccess("Image added successfully!");
      setSelectedFile(null);
      setImageUrl("");
      setCaption("");
      setShowUpload(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      fetchAlbums();
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to add image");
    } finally {
      setSaving(false);
    }
  };

  const handleBulkUpload = async (albumId: string) => {
    if (selectedFiles.length === 0) return;
    setSaving(true);
    setError(null);
    try {
      const formData = new FormData();
      selectedFiles.forEach((file) => formData.append("photos", file));
      const captionsArr = bulkCaptions
        .split("\n")
        .filter((c) => c.trim())
        .map((c) => c.trim());
      formData.append("captions", JSON.stringify(captionsArr));
      await apiClient.post(`/gallery/${albumId}/images/bulk`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setSuccess(`${selectedFiles.length} image(s) uploaded successfully!`);
      setSelectedFiles([]);
      setBulkCaptions("");
      setShowUpload(null);
      if (bulkFileInputRef.current) bulkFileInputRef.current.value = "";
      fetchAlbums();
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to upload images");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteImage = async (albumId: string, imageId: string) => {
    if (!window.confirm("Delete this image permanently?")) return;
    try {
      await apiClient.delete(`/gallery/${albumId}/images/${imageId}`);
      setSuccess("Image deleted.");
      fetchAlbums();
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to delete image");
    }
  };

  const handleDeleteAlbum = async (id: string) => {
    if (
      !window.confirm(
        "Delete this album and ALL its images? This cannot be undone.",
      )
    )
      return;
    try {
      await apiClient.delete(`/gallery/${id}`);
      setAlbums((prev) => prev.filter((a) => a._id !== id));
      setSuccess("Album deleted.");
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to delete album");
    }
  };

  const togglePublic = async (album: Album) => {
    try {
      await apiClient.patch(`/gallery/${album._id}`, {
        isPublic: !album.isPublic,
      });
      setSuccess(
        album.isPublic ? "Album set to private" : "Album set to public",
      );
      fetchAlbums();
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to toggle visibility");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold text-primary">Gallery Management</h1>
        <button
          onClick={() => {
            setShowCreate(!showCreate);
            setEditingAlbum(null);
          }}
          className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-secondary transition flex items-center gap-2"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={showCreate ? "M6 18L18 6M6 6l12 12" : "M12 4v16m8-8H4"}
            />
          </svg>
          {showCreate ? "Cancel" : "New Album"}
        </button>
      </div>

      {error && (
        <div className="bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-500/30 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg flex items-center gap-2">
          <svg
            className="w-5 h-5 shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{error}</span>
        </div>
      )}
      {success && (
        <div className="bg-green-100 dark:bg-green-900/30 border border-green-400 dark:border-green-500/30 text-green-700 dark:text-green-400 px-4 py-3 rounded-lg flex items-center gap-2">
          <svg
            className="w-5 h-5 shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{success}</span>
        </div>
      )}

      {/* Create Album Form */}
      {showCreate && (
        <div className="bg-white dark:bg-dark-card p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
          <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
            Create New Album
          </h3>
          <form onSubmit={handleCreateAlbum} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  value={albumForm.title}
                  onChange={(e) =>
                    setAlbumForm({ ...albumForm, title: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  required
                  placeholder="e.g. Annual Conference 2025"
                />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                  Category
                </label>
                <select
                  value={albumForm.category}
                  onChange={(e) =>
                    setAlbumForm({ ...albumForm, category: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat} className="capitalize">
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                Description
              </label>
              <textarea
                value={albumForm.description}
                onChange={(e) =>
                  setAlbumForm({ ...albumForm, description: e.target.value })
                }
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                placeholder="Brief description of this album..."
              />
            </div>
            <label className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
              <input
                type="checkbox"
                checked={albumForm.isPublic}
                onChange={(e) =>
                  setAlbumForm({ ...albumForm, isPublic: e.target.checked })
                }
                className="w-4 h-4 text-primary rounded focus:ring-primary"
              />
              <span className="font-medium">
                Make this album publicly visible
              </span>
            </label>
            <button
              type="submit"
              disabled={saving || !albumForm.title.trim()}
              className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-secondary transition disabled:opacity-50"
            >
              {saving ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Creating...
                </span>
              ) : (
                "Create Album"
              )}
            </button>
          </form>
        </div>
      )}

      {/* Albums List */}
      {albums.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-500 dark:text-gray-400">
          <svg
            className="w-20 h-20 mb-4 text-gray-300 dark:text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <p className="text-xl font-medium">No albums yet</p>
          <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
            Click "New Album" to create your first album
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {albums.map((album) => (
            <div
              key={album._id}
              className="bg-white dark:bg-dark-card p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700"
            >
              {/* Album Header */}
              <div className="flex flex-col lg:flex-row justify-between items-start gap-4 mb-4">
                <div className="flex-1 w-full">
                  {editingAlbum === album._id ? (
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={editForm.title}
                        onChange={(e) =>
                          setEditForm({ ...editForm, title: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-lg font-bold bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                        placeholder="Album title"
                      />
                      <textarea
                        value={editForm.description}
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            description: e.target.value,
                          })
                        }
                        rows={2}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                        placeholder="Album description"
                      />
                      <div className="flex flex-wrap items-center gap-4">
                        <select
                          value={editForm.category}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              category: e.target.value,
                            })
                          }
                          className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                        >
                          {CATEGORIES.map((cat) => (
                            <option
                              key={cat}
                              value={cat}
                              className="capitalize"
                            >
                              {cat.charAt(0).toUpperCase() + cat.slice(1)}
                            </option>
                          ))}
                        </select>
                        <label className="flex items-center gap-2 text-sm cursor-pointer text-gray-700 dark:text-gray-300">
                          <input
                            type="checkbox"
                            checked={editForm.isPublic}
                            onChange={(e) =>
                              setEditForm({
                                ...editForm,
                                isPublic: e.target.checked,
                              })
                            }
                            className="w-4 h-4 text-primary rounded"
                          />
                          <span className="font-medium">Public</span>
                        </label>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditAlbum(album._id)}
                          disabled={saving || !editForm.title.trim()}
                          className="bg-primary text-white px-4 py-1.5 rounded-lg text-sm hover:bg-secondary transition disabled:opacity-50"
                        >
                          {saving ? "Saving..." : "Save"}
                        </button>
                        <button
                          onClick={() => setEditingAlbum(null)}
                          className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-1.5 rounded-lg text-sm hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <h3 className="text-2xl font-bold text-primary">
                        {album.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                        {album.description}
                      </p>
                      <div className="flex flex-wrap items-center gap-3 mt-2 text-sm">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${album.isPublic ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400" : "bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400"}`}
                        >
                          {album.isPublic ? "Public" : "Private"}
                        </span>
                        <span className="capitalize bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-2.5 py-0.5 rounded-full text-xs font-medium">
                          {album.category}
                        </span>
                        <span className="text-gray-500 dark:text-gray-400">
                          {album.images.length} image
                          {album.images.length !== 1 ? "s" : ""}
                        </span>
                        <span className="text-gray-400 dark:text-gray-500">
                          {new Date(album.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </>
                  )}
                </div>
                {editingAlbum !== album._id && (
                  <div className="flex flex-wrap gap-2 shrink-0">
                    <button
                      onClick={() => {
                        setShowUpload(
                          showUpload === album._id ? null : album._id,
                        );
                        setUploadMode("file");
                      }}
                      className={`px-3 py-1.5 rounded-lg text-sm transition ${showUpload === album._id ? "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 border border-red-300 dark:border-red-500/30" : "bg-green-500 text-white hover:bg-green-600"}`}
                    >
                      {showUpload === album._id ? "Close Upload" : "Add Photos"}
                    </button>
                    <button
                      onClick={() => startEditing(album)}
                      className="bg-blue-500 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-blue-600 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => togglePublic(album)}
                      className={`px-3 py-1.5 rounded-lg text-sm transition ${album.isPublic ? "bg-yellow-500 text-white hover:bg-yellow-600" : "bg-gray-500 text-white hover:bg-gray-600"}`}
                    >
                      {album.isPublic ? "Make Private" : "Make Public"}
                    </button>
                    <button
                      onClick={() => handleDeleteAlbum(album._id)}
                      className="bg-red-500 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>

              {/* Upload Section */}
              {showUpload === album._id && (
                <div className="mb-6 p-5 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700">
                  {/* Upload Mode Tabs */}
                  <div className="flex gap-2 mb-4">
                    {(["file", "url", "bulk"] as const).map((mode) => (
                      <button
                        key={mode}
                        onClick={() => setUploadMode(mode)}
                        className={`px-4 py-1.5 rounded-lg text-sm font-medium transition ${
                          uploadMode === mode
                            ? "bg-primary text-white"
                            : "bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600"
                        }`}
                      >
                        {mode === "file"
                          ? "Single Photo"
                          : mode === "url"
                            ? "Image URL"
                            : "Bulk Upload"}
                      </button>
                    ))}
                  </div>

                  {/* Single File Upload */}
                  {uploadMode === "file" && (
                    <div className="space-y-3">
                      <div>
                        <label className="block text-gray-600 dark:text-gray-400 text-sm mb-1 font-medium">
                          Select a photo
                        </label>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-secondary"
                        />
                        {selectedFile && (
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            Selected: {selectedFile.name} (
                            {(selectedFile.size / 1024).toFixed(1)} KB)
                          </p>
                        )}
                      </div>
                      <input
                        type="text"
                        placeholder="Caption (optional)"
                        value={caption}
                        onChange={(e) => setCaption(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                      />
                      <button
                        onClick={() => handleUploadImage(album._id)}
                        disabled={saving || !selectedFile}
                        className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary transition disabled:opacity-50"
                      >
                        {saving ? "Uploading..." : "Upload Photo"}
                      </button>
                    </div>
                  )}

                  {/* URL Upload */}
                  {uploadMode === "url" && (
                    <div className="space-y-3">
                      <input
                        type="url"
                        placeholder="Image URL (https://...)"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                      />
                      <input
                        type="text"
                        placeholder="Caption (optional)"
                        value={caption}
                        onChange={(e) => setCaption(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                      />
                      <button
                        onClick={() => handleUploadImage(album._id)}
                        disabled={saving || !imageUrl}
                        className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary transition disabled:opacity-50"
                      >
                        {saving ? "Adding..." : "Add Image from URL"}
                      </button>
                    </div>
                  )}

                  {/* Bulk Upload */}
                  {uploadMode === "bulk" && (
                    <div className="space-y-3">
                      <div>
                        <label className="block text-gray-600 dark:text-gray-400 text-sm mb-1 font-medium">
                          Select multiple photos
                        </label>
                        <input
                          ref={bulkFileInputRef}
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={handleBulkFileChange}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-secondary"
                        />
                        {selectedFiles.length > 0 && (
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            {selectedFiles.length} file(s) selected
                          </p>
                        )}
                      </div>
                      <textarea
                        placeholder="Captions (one per line, matching the order of selected files)"
                        value={bulkCaptions}
                        onChange={(e) => setBulkCaptions(e.target.value)}
                        rows={3}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                      />
                      <button
                        onClick={() => handleBulkUpload(album._id)}
                        disabled={saving || selectedFiles.length === 0}
                        className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary transition disabled:opacity-50"
                      >
                        {saving
                          ? "Uploading..."
                          : `Upload ${selectedFiles.length} Photo(s)`}
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Images Grid */}
              {album.images.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                  {album.images.map((img) => (
                    <div
                      key={img._id}
                      className="relative group rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
                    >
                      <img
                        src={img.url}
                        alt={img.caption || album.title}
                        className="w-full aspect-square object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Crect fill='%23333' width='100' height='100'/%3E%3Ctext x='50' y='55' text-anchor='middle' font-size='10' fill='%23888'%3ENo Image%3C/text%3E%3C/svg%3E";
                        }}
                      />
                      {img.caption && (
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent text-white text-xs p-2 pt-6">
                          {img.caption}
                        </div>
                      )}
                      <button
                        onClick={() => handleDeleteImage(album._id, img._id)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 shadow-lg"
                        title="Delete image"
                      >
                        <svg
                          className="w-3.5 h-3.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-dashed border-gray-300 dark:border-gray-700">
                  <svg
                    className="w-10 h-10 mx-auto text-gray-300 dark:text-gray-600 mb-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <p className="text-gray-400 text-sm">
                    No images yet. Click "Add Photos" to upload.
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
