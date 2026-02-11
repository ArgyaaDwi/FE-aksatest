"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";
import Layout from "../../components/layouts/Layout";
import { getDivisions } from "../../api/division.api";
import ModalSuccess from "../../components/fragment/ModalSuccess";
import Button from "../../components/form/Button";

export default function DivisionIndexPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [notification, setNotification] = useState(null);

  const page = Number(searchParams.get("page")) || 1;
  const search = searchParams.get("search") || "";

  const [items, setItems] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await getDivisions({
          page,
          name: search,
        });

        setItems(res.data.data.divisions);
        setPagination(res.data.pagination);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, search]);

  useEffect(() => {
    if (location.state?.success) {
      setNotification({ message: location.state.message });
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const handleSearchChange = (e) => {
    setSearchParams({
      page: 1,
      search: e.target.value,
    });
  };

  const handlePageChange = (page) => {
    setSearchParams({
      page,
      search: search,
    });
  };

  return (
    <Layout>
      <div className="max-w-full p-4 overflow-hidden">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">
            Data Divisi
          </h1>
        </div>
        {notification && (
          <ModalSuccess
            title={notification?.message}
            onClose={() => setNotification(null)}
          />
        )}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Cari berdasarkan nama divisi..."
            value={search}
            onChange={handleSearchChange}
            className="w-full max-w-sm px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
          />
        </div>
        <div className="w-full overflow-x-auto bg-white rounded shadow dark:bg-gray-900">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="text-left border-b dark:border-gray-700">
                <th className="p-3 uppercase whitespace-nowrap">No</th>
                <th className="p-3 uppercase whitespace-nowrap">Nama</th>
                <th className="p-3 uppercase whitespace-nowrap">Created At</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={3} className="p-4 text-center">
                    Bentar...
                  </td>
                </tr>
              ) : items.length === 0 ? (
                <tr>
                  <td colSpan={3} className="p-4 text-center text-gray-500">
                    Data tidak ditemukan
                  </td>
                </tr>
              ) : (
                items.map((item, index) => (
                  <tr key={item.id} className="border-b">
                    <td className="p-3">{index + 1}</td>
                    <td className="p-3">{item.name}</td>
                    <td className="p-3">
                      <div className="flex items-center">
                        {new Date(item.created_at).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {pagination && pagination.last_page > 1 && (
          <div className="flex gap-2 mt-4">
            {Array.from({ length: pagination.last_page }, (_, i) => i + 1).map(
              (p) => (
                <button
                  key={p}
                  onClick={() => handlePageChange(p)}
                  className={`px-3 py-1 rounded ${
                    p === pagination.current_page
                      ? "bg-blue-600 text-white"
                      : "border"
                  }`}
                >
                  {p}
                </button>
              ),
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}
