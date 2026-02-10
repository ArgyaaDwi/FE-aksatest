"use client";
import { useState } from "react";
import { useAuth } from "../features/auth/AuthContext";
import Layout from "../components/layouts/Layout";
import ModalSuccess from "../components/fragment/ModalSuccess";
export default function ProfilePage() {
  const { user, updateProfile } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile({ name });
    setSuccess(true);
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
          <button
            type="submit"
            className="px-4 py-2 text-white transition rounded bg-secondary hover:bg-primary"
          >
            Simpan Perubahan
          </button>
        </form>
      </div>
    </Layout>
  );
}
