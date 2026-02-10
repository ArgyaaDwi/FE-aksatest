"use client";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../components/layouts/Layout";
import { getItemById, updateItem } from "./crud.service";
import Button from "../../components/form/Button";
import FormField from "../../components/form/FormField";
export default function CrudEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
  });
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const item = getItemById(id);
    if (!item) {
      navigate("/items", { replace: true });
      return;
    }
    setForm({
      name: item.name,
      email: item.email,
    });
    setLoading(false);
  }, [id, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateItem(id, form);
    // navigate("/items");
    navigate("/items", {
      state: { success: true, message: "Data berhasil diperbarui" },
    });
  };

  if (loading) {
    return (
      <>
        <Layout />
        <div className="p-4 text-gray-500">Memuat data...</div>
      </>
    );
  }

  return (
    <Layout>
      <div className="p-4">
        <h1 className="mb-4 text-xl font-bold text-gray-800 dark:text-white">
          Edit Data
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
            <Button type="submit">Simpan Perubahan</Button>
            <Button variant="outline" onClick={() => navigate("/items")}>
              Batal
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
