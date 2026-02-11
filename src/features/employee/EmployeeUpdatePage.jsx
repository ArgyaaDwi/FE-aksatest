"use client";
import { useState, useEffect } from "react";
import { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../components/layouts/Layout";
import { updateEmployee, getEmployee } from "../../api/employee.api";
import { getDivisions } from "../../api/division.api";
import Button from "../../components/form/Button";
import FormField from "../../components/form/FormField";
export default function EmployeeUpdatePage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const fileRef = useRef(null);

  const [divisions, setDivisions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [removeImage, setRemoveImage] = useState(false);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const res = await getEmployee(id);
        const emp =
          res?.data?.data?.employees ||
          res?.data?.data?.employee ||
          res?.data?.data;

        if (!emp) return;

        setForm({
          name: emp.name,
          phone: emp.phone,
          division_id: String(emp.division_id),
          position: emp.position,
        });

        if (emp.image_url) {
          setImagePreview(emp.image_url);
        }
      } catch (e) {
        console.error("Gagal load employee", e);
      }
    };

    fetchEmployee();
  }, [id]);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    division_id: "",
    position: "",
  });
  useEffect(() => {
    const fetchDivisions = async () => {
      try {
        const res = await getDivisions();
        setDivisions(res.data.data.divisions || res.data);
      } catch (e) {
        console.error("Gagal load divisions", e);
      }
    };

    fetchDivisions();
  }, []);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }
    setRemoveImage(false);

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleRemoveImage = () => {
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }
    setImageFile(null);
    setImagePreview(null);

    if (fileRef.current) {
      fileRef.current.value = "";
    }
    setRemoveImage(true);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.division_id) {
      alert("Pilih divisi dulu ya");
      return;
    }
    try {
      setLoading(true);

      const payload = new FormData();
      payload.append("_method", "PUT");
      payload.append("name", form.name);
      payload.append("phone", form.phone);
      //   payload.append("division_id", Number(form.division_id));
      payload.append("division_id", form.division_id);

      payload.append("position", form.position);

      if (imageFile) {
        payload.append("image", imageFile);
      }
      payload.append("remove_image", removeImage ? 1 : 0);

      await updateEmployee(id, payload);

      navigate("/employees", {
        state: { success: true, message: "Data berhasil diperbarui" },
      });
    } catch (e) {
      console.error("Error lengkap:", e.response?.data || e);
      const msg = e?.response?.data?.message || "Gagal memperbarui data";
      alert(msg);
    } finally {
      setLoading(false);
    }
  };
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
            required
          />

          <FormField
            label="No. HP"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
          />
          <div>
            <label className="block mb-1 text-sm font-medium">
              Divisi <span className="text-red-500">*</span>
            </label>
            <select
              name="division_id"
              value={form.division_id}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-400 rounded dark:bg-gray-800"
              required
            >
              <option value="">Pilih Divisi</option>
              {divisions.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>
          <FormField
            label="Jabatan"
            name="position"
            value={form.position}
            onChange={handleChange}
            required
          />
          <div>
            <label className="block mb-1 text-sm font-medium">
              Foto (Opsional)
            </label>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-3 py-2 border border-gray-400 rounded dark:bg-gray-800"
            />

            {imagePreview && (
              <div className="relative inline-block mt-2">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="object-cover w-24 h-24 border rounded"
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute flex items-center justify-center w-6 h-6 text-white bg-red-500 rounded-full -top-2 -right-2 hover:bg-red-600"
                  title="Hapus foto"
                >
                  ✕
                </button>
              </div>
            )}
          </div>

          <div className="flex gap-2">
            <Button type="submit" disabled={loading}>
              {loading ? "Menyimpan..." : "Simpan"}
            </Button>
            <Button variant="outline" onClick={() => navigate("/employees")}>
              Batal
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
