"use client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/layouts/Layout";
import { createItem } from "./crud.service";
import Button from "../../components/form/Button";
import FormField from "../../components/form/FormField";
export default function CrudCreatePage() {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createItem(form);
      navigate("/items");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="p-4">
        <h1 className="mb-4 text-xl font-bold text-gray-800 dark:text-white">
          Tambah Data
        </h1>
        <form
          onSubmit={handleSubmit}
          className="p-6 space-y-4 bg-white rounded shadow dark:bg-gray-900"
        >
          <FormField
            label="Nama"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Masukkan nama"
            required
          />
          <FormField
            label="Email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Masukkan email"
            required
          />
          <div className="flex gap-2">
            <Button type="submit" disabled={loading}>
              {loading ? "Menyimpan..." : "Simpan"}
            </Button>
            <Button variant="outline" onClick={() => navigate("/items")}>
              Batal
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
