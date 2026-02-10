"use client";
import { useEffect, useMemo, useState } from "react";
import {
  Link,
  useSearchParams,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { getAllItems, deleteItem } from "./crud.service";
import { filterItems, paginate } from "./crud.utils";
import Layout from "../../components/layouts/Layout";
import { TrashIcon } from "lucide-react";
import ModalSuccess from "../../components/fragment/ModalSuccess";
import Button from "../../components/form/Button";
const PER_PAGE = 5;
export default function CrudIndexPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [notification, setNotification] = useState(null);

  const pageParam = Number(searchParams.get("page")) || 1;
  const searchParam = searchParams.get("search") || "";

  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(getAllItems());
  }, []);
  useEffect(() => {
    if (location.state?.success) {
      setNotification({ message: location.state.message });
      window.history.replaceState({}, document.title);
    }
  }, [location]);
  const filteredItems = useMemo(() => {
    return filterItems(items, searchParam);
  }, [items, searchParam]);

  const { data: paginatedItems, total } = useMemo(() => {
    return paginate(filteredItems, pageParam, PER_PAGE);
  }, [filteredItems, pageParam]);

  const totalPages = Math.ceil(total / PER_PAGE);

  const handleSearchChange = (e) => {
    setSearchParams({
      page: 1,
      search: e.target.value,
    });
  };

  const handlePageChange = (page) => {
    setSearchParams({
      page,
      search: searchParam,
    });
  };

  const handleDelete = (id) => {
    if (confirm("Yakin ingin menghapus data ini?")) {
      deleteItem(id);
      const updatedItems = getAllItems();
      setItems(updatedItems);
      setNotification({ message: "Data berhasil dihapus" });
    }
  };
  return (
    <Layout>
      <div className="max-w-full p-4 overflow-hidden">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">
            Data Items
          </h1>
          <Button onClick={() => navigate("/items/create")}>
            + Tambah Data
          </Button>
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
            placeholder="Cari nama atau email..."
            value={searchParam}
            onChange={handleSearchChange}
            className="w-full max-w-sm px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
          />
        </div>
        {/* <div className="overflow-x-auto bg-white rounded shadow dark:bg-gray-900"> */}
        <div className="w-full overflow-x-auto bg-white rounded shadow dark:bg-gray-900">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="text-left border-b dark:border-gray-700">
                <th className="p-3 whitespace-nowrap">Nama</th>{" "}
                <th className="p-3 whitespace-nowrap">Email</th>
                <th className="p-3 whitespace-nowrap">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {paginatedItems.length === 0 ? (
                <tr>
                  <td colSpan={3} className="p-4 text-center text-gray-500">
                    Data tidak ditemukan
                  </td>
                </tr>
              ) : (
                paginatedItems.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b last:border-none dark:border-gray-700"
                  >
                    <td className="p-3">{item.name}</td>
                    <td className="p-3">{item.email}</td>
                    <td className="flex items-center gap-4 p-3">
                      <Link
                        to={`/items/${item.id}/edit`}
                        className="text-blue-600 hover:underline"
                      >
                        Edit
                      </Link>
                      <Button
                        variant="danger"
                        onClick={() => handleDelete(item.id)}
                      >
                        <TrashIcon />
                        Hapus
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {totalPages > 1 && (
          // <div className="flex gap-2 mt-4">
          <div className="flex gap-2 mt-4 overflow-x-auto">
            {Array.from({ length: totalPages }).map((_, idx) => {
              const page = idx + 1;
              return (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`rounded px-3 py-1 text-sm flex-shrink-0 ${
                    page === pageParam
                      ? "bg-blue-600 text-white"
                      : "border hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  {page}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </Layout>
  );
}
