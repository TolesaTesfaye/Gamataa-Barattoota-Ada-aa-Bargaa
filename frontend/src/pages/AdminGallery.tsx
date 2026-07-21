import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../services/api";
import { useAuthStore } from "../store/authStore";

interface Album {
  _id: string;
  title: string;
  description: string;
  category: string;
  images: { url: string; caption: string }[];
  createdAt: string;
}

export default function AdminGallery() {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [showUpload, setShowUpload] = useState<string | null>(null);
  const [albumForm, setAlbumForm] = useState({
    title: "",
    description: "",
    category: "general",
  });
  const [caption, setCaption] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (user?.role !== "superadmin" && user?.role !== "admin") {
      navigate("/");
      return;
    }
    fetchAlbums();
  }, []);

  const fetchAlbums = async () => {
    try {
      const response = await apiClient.get("/gallery");
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
      setSuccess("Album created!");
      setAlbumForm({ title: "", description: "", category: "general" });
      setShowCreate(false);
      fetchAlbums();
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to create album");
    } finally {
      setSaving(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUploadImage = async (albumId: string) => {
    if (!selectedFile) return;
    setSaving(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append("photo", selectedFile);
      formData.append("caption", caption);

      await apiClient.post(`/gallery/${albumId}/images`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setSuccess("Image uploaded!");
      setSelectedFile(null);
      setCaption("");
      setShowUpload(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      fetchAlbums();
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to upload image");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteAlbum = async (id: string) => {
    if (!window.confirm("Delete this album and all its images?")) return;
    try {
      await apiClient.delete(`/gallery/${id}`);
      setAlbums((prev) => prev.filter((a) => a._id !== id));
      setSuccess("Album deleted.");
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to delete album");
    }
  };

  if (loading) {
    return <div className="text-center py-12">Loading gallery...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold text-primary">Gallery Management</h1>
        <button
          onClick={() => setShowCreate(!showCreate)}
          className="bg-primary text-white px-4 py-2 rounded hover:bg-secondary transition"
        >
          {showCreate ? "Cancel" : "New Album"}
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          {success}
        </div>
      )}

      {showCreate && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-bold text-primary mb-4">Create Album</h3>
          <form onSubmit={handleCreateAlbum} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Title
              </label>
              <input
                type="text"
                value={albumForm.title}
                onChange={(e) =>
                  setAlbumForm({ ...albumForm, title: e.target.value })
                }
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Description
              </label>
              <textarea
                value={albumForm.description}
                onChange={(e) =>
                  setAlbumForm({
                    ...albumForm,
                    description: e.target.value,
                  })
                }
                rows={3}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Category
              </label>
              <input
                type="text"
                value={albumForm.category}
                onChange={(e) =>
                  setAlbumForm({ ...albumForm, category: e.target.value })
                }
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <button
              type="submit"
              disabled={saving}
              className="bg-primary text-white px-6 py-2 rounded hover:bg-secondary transition disabled:opacity-50"
            >
              {saving ? "Creating..." : "Create Album"}
            </button>
          </form>
        </div>
      )}

      {albums.length === 0 ? (
        <p className="text-gray-600">No albums yet.</p>
      ) : (
        <div className="space-y-6">
          {albums.map((album) => (
            <div key={album._id} className="bg-white p-6 rounded-lg shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-primary">
                    {album.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{album.description}</p>
                  <span className="text-gray-500 text-xs capitalize">
                    {album.category} &middot; {album.images.length} images
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      setShowUpload(showUpload === album._id ? null : album._id)
                    }
                    className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600"
                  >
                    Add Photos
                  </button>
                  <button
                    onClick={() => handleDeleteAlbum(album._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>

              {showUpload === album._id && (
                <div className="mb-6 p-4 bg-gray-50 rounded">
                  <h4 className="font-semibold mb-3">Upload Photo</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-gray-600 text-sm mb-1">
                        Select a photo from your computer
                      </label>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-secondary"
                      />
                      {selectedFile && (
                        <p className="text-xs text-gray-500 mt-1">
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
                      className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <button
                      onClick={() => handleUploadImage(album._id)}
                      disabled={saving || !selectedFile}
                      className="bg-primary text-white px-4 py-2 rounded hover:bg-secondary transition disabled:opacity-50"
                    >
                      {saving ? "Uploading..." : "Upload Photo"}
                    </button>
                  </div>
                </div>
              )}

              {album.images.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {album.images.map((img, idx) => (
                    <div key={idx} className="relative group">
                      <img
                        src={img.url}
                        alt={img.caption || album.title}
                        className="w-full h-32 object-cover rounded"
                      />
                      {img.caption && (
                        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 rounded-b">
                          {img.caption}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 text-sm text-center py-4">
                  No images yet. Click "Add Photos" to upload.
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
