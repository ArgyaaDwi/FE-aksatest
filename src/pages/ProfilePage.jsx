"use client";
import { useState } from "react";
import { useAuth } from "../features/auth/AuthContext";
import Layout from "../components/layouts/Layout";
import ModalSuccess from "../components/fragment/ModalSuccess";
import Button from "../components/form/Button";
export default function ProfilePage() {
  const [loading, setLoading] = useState(false);
  const { user, updateProfile } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await updateProfile({ name });
      setSuccess(true);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Layout>
      <div className="p-4">
        <h1 className="mb-4 text-xl font-bold text-gray-800 dark:text-white">
          Halaman Edit Profile
        </h1>
        {success && (
          <ModalSuccess
            title="Profil berhasil diperbarui"
            onClose={() => setSuccess(false)}
          />
        )}
        <form
          onSubmit={handleSubmit}
          className="p-6 space-y-4 bg-white rounded shadow dark:bg-gray-900"
        >
          <div>
            <label className="block mb-1 text-sm text-gray-600 dark:text-gray-300">
              Nama Lengkap <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-400 rounded focus:outline-none focus:ring focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
              required
            />
          </div>
          <Button type="submit" disabled={loading}>
            {loading ? "Menyimpan..." : "Simpan Perubahan"}
          </Button>
        </form>
      </div>
    </Layout>
  );
}
