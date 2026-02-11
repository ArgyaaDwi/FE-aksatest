// "use client";
// import { useEffect, useState } from "react";
// import {
//   Link,
//   useSearchParams,
//   useNavigate,
//   useLocation,
// } from "react-router-dom";
// import { TrashIcon } from "lucide-react";
// import {
//   getEmployees,
//   deleteEmployee,
//   updateEmployee,
// } from "../../api/employee.api";
// import Layout from "../../components/layouts/Layout";
// import ModalSuccess from "../../components/fragment/ModalSuccess";
// import Button from "../../components/form/Button";

// export default function EmployeeIndexPage() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [searchParams, setSearchParams] = useSearchParams();
//   const [notification, setNotification] = useState(null);

//   const page = Number(searchParams.get("page")) || 1;
//   const search = searchParams.get("search") || "";

//   const [items, setItems] = useState([]);
//   const [pagination, setPagination] = useState(null);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         const res = await getEmployees({
//           page,
//           name: search,
//         });
//         console.log(res);
//         setItems(res.data.data.employees);

//         setPagination(res.data.pagination);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [page, search]);

//   useEffect(() => {
//     if (location.state?.success) {
//       setNotification({ message: location.state.message });
//       window.history.replaceState({}, document.title);
//     }
//   }, [location]);

//   const handleSearchChange = (e) => {
//     setSearchParams({
//       page: 1,
//       search: e.target.value,
//     });
//   };

//   const handlePageChange = (page) => {
//     setSearchParams({
//       page,
//       search: search,
//     });
//   };
//   const handleDelete = async (id) => {
//     if (!confirm("Yakin ingin menghapus data ini?")) return;
//     try {
//       await deleteEmployee(id);
//       setItems((prev) => prev.filter((item) => item.id !== id));
//       setNotification({ message: "Data berhasil dihapus" });
//     } catch (e) {
//       console.error(e);
//       alert("Gagal menghapus data");
//     }
//   };

//   return (
//     <Layout>
//       <div className="max-w-full p-4 overflow-hidden">
//         <div className="flex items-center justify-between mb-4">
//           <h1 className="text-xl font-bold text-gray-800 dark:text-white">
//             Data Items
//           </h1>
//           <Button onClick={() => navigate("/employees/create")}>
//             + Tambah Data
//           </Button>
//         </div>
//         {notification && (
//           <ModalSuccess
//             title={notification?.message}
//             onClose={() => setNotification(null)}
//           />
//         )}
//         <div className="mb-4">
//           <input
//             type="text"
//             placeholder="Cari berdasarkan nama atau divisi..."
//             value={search}
//             onChange={handleSearchChange}
//             className="w-full max-w-sm px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
//           />
//         </div>
//         <div className="w-full overflow-x-auto bg-white rounded shadow dark:bg-gray-900">
//           <table className="w-full text-sm border-collapse">
//             <thead>
//               <tr className="text-left border-b dark:border-gray-700">
//                 <th className="p-3 uppercase whitespace-nowrap">No</th>
//                 <th className="p-3 uppercase whitespace-nowrap">Foto</th>
//                 <th className="p-3 uppercase whitespace-nowrap">Nama</th>
//                 <th className="p-3 uppercase whitespace-nowrap">No. Telp</th>
//                 <th className="p-3 uppercase whitespace-nowrap">Divisi</th>
//                 <th className="p-3 uppercase whitespace-nowrap">Jabatan</th>
//                 <th className="p-3 uppercase whitespace-nowrap">Created At</th>
//                 <th className="p-3 uppercase whitespace-nowrap">Aksi</th>
//               </tr>
//             </thead>
//             <tbody>
//               {loading ? (
//                 <tr>
//                   <td colSpan={8} className="p-4 text-center">
//                     Bentar...
//                   </td>
//                 </tr>
//               ) : items.length === 0 ? (
//                 <tr>
//                   <td colSpan={8} className="p-4 text-center text-gray-500">
//                     Data tidak ditemukan
//                   </td>
//                 </tr>
//               ) : (
//                 items.map((item, index) => (
//                   <tr key={item.id} className="border-b">
//                     <td className="p-3">{index + 1}</td>

//                     <td className="p-3">
//                       {item.image_url ? (
//                         <img
//                           src={item.image_url}
//                           alt={item.name}
//                           className="object-cover w-10 h-10 rounded-full"
//                         />
//                       ) : (
//                         <div className="flex items-center justify-center w-10 h-10 text-xs text-gray-500 bg-gray-200 rounded-full">
//                           -
//                         </div>
//                       )}
//                     </td>

//                     <td className="p-3">{item.name}</td>
//                     <td className="p-3">{item.phone}</td>
//                     <td className="p-3">{item.division?.name || "-"}</td>
//                     <td className="p-3">{item.position}</td>
//                     <td className="p-3">
//                       <div className="flex items-center">
//                         {new Date(item.created_at).toLocaleDateString("id-ID", {
//                           day: "numeric",
//                           month: "short",
//                           year: "numeric",
//                         })}
//                       </div>
//                     </td>
//                     <td className="flex items-center gap-4 p-3">
//                       <Link
//                         to={`/employees/edit/${item.id}`}
//                         className="text-blue-600 hover:underline"
//                       >
//                         Edit
//                       </Link>
//                       <Button
//                         variant="danger"
//                         onClick={() => handleDelete(item.id)}
//                       >
//                         <TrashIcon />
//                         Hapus
//                       </Button>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//         {pagination && pagination.last_page > 1 && (
//           <div className="flex gap-2 mt-4">
//             {Array.from({ length: pagination.last_page }, (_, i) => i + 1).map(
//               (p) => (
//                 <button
//                   key={p}
//                   onClick={() => handlePageChange(p)}
//                   className={`px-3 py-1 rounded ${
//                     p === pagination.current_page
//                       ? "bg-blue-600 text-white"
//                       : "border"
//                   }`}
//                 >
//                   {p}
//                 </button>
//               ),
//             )}
//           </div>
//         )}
//       </div>
//     </Layout>
//   );
// }
"use client";
import { useEffect, useState } from "react";
import {
  Link,
  useSearchParams,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { TrashIcon } from "lucide-react";
import { getEmployees, deleteEmployee } from "../../api/employee.api";
import { getDivisions } from "../../api/division.api";
import Layout from "../../components/layouts/Layout";
import ModalSuccess from "../../components/fragment/ModalSuccess";
import Button from "../../components/form/Button";

export default function EmployeeIndexPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const [employees, setEmployees] = useState([]);
  const [divisions, setDivisions] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    if (location.state?.success) {
      setNotification({ message: location.state.message });
      window.history.replaceState({}, document.title);
    }
  }, [location]);

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

  useEffect(() => {
    const fetchEmployees = async () => {
      setLoading(true);
      try {
        const params = {
          name: searchParams.get("name") || "",
          division_id: searchParams.get("division_id") || "",
          per_page: searchParams.get("per_page") || 10,
          page: searchParams.get("page") || 1,
        };

        const res = await getEmployees(params);
        console.log("Response:", res.data);
        console.log("Employees:", res.data.data.employees);
        setEmployees(res.data.data.employees);
        setPagination(res.data.pagination);
      } catch (e) {
        console.error("Gagal load employees", e);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, [searchParams]);
  const handleSearchChange = (e) => {
    setSearchParams((prev) => ({
      ...Object.fromEntries(prev),
      page: 1,
      name: e.target.value,
    }));
  };

  const handleDivisionChange = (e) => {
    setSearchParams((prev) => ({
      ...Object.fromEntries(prev),
      page: 1,
      division_id: e.target.value,
    }));
  };

  const handlePageChange = (newPage) => {
    setSearchParams((prev) => ({
      ...Object.fromEntries(prev),
      page: newPage,
    }));
  };

  const handleDelete = async (id) => {
    if (!confirm("Yakin ingin menghapus data ini?")) return;
    try {
      await deleteEmployee(id);
      setEmployees((prev) => prev.filter((item) => item.id !== id));
      setNotification({ message: "Data berhasil dihapus" });
    } catch (e) {
      console.error(e);
      alert("Gagal menghapus data");
    }
  };
  return (
    <Layout>
      <div className="max-w-full p-4 overflow-hidden">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">
            Data Karyawan
          </h1>
          <Button onClick={() => navigate("/employees/create")}>
            + Tambah Data
          </Button>
        </div>

        {notification && (
          <ModalSuccess
            title={notification?.message}
            onClose={() => setNotification(null)}
          />
        )}

        <div className="flex gap-4 mb-4">
          <input
            type="text"
            placeholder="Cari nama karyawan..."
            value={searchParams.get("name") || ""}
            onChange={handleSearchChange}
            className="px-4 py-2 border rounded dark:bg-gray-800 dark:text-white"
          />
          <select
            value={searchParams.get("division_id") || ""}
            onChange={handleDivisionChange}
            className="px-4 py-2 text-gray-600 border rounded dark:bg-gray-800 dark:text-gray-400"
          >
            <option value="">Semua Divisi</option>
            {divisions.map((div) => (
              <option key={div.id} value={div.id}>
                {div.name}
              </option>
            ))}
          </select>
        </div>
        <div className="w-full overflow-x-auto bg-white rounded shadow dark:bg-gray-900">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="text-left border-b dark:border-gray-700">
                <th className="p-3 uppercase whitespace-nowrap">No</th>
                <th className="p-3 uppercase whitespace-nowrap">Foto</th>
                <th className="p-3 uppercase whitespace-nowrap">Nama</th>
                <th className="p-3 uppercase whitespace-nowrap">No. Telp</th>
                <th className="p-3 uppercase whitespace-nowrap">Divisi</th>
                <th className="p-3 uppercase whitespace-nowrap">Jabatan</th>
                <th className="p-3 uppercase whitespace-nowrap">Created At</th>
                <th className="p-3 uppercase whitespace-nowrap">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={8} className="p-4 text-center">
                    Memuat data...
                  </td>
                </tr>
              ) : employees.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-4 text-center text-gray-500">
                    Data tidak ditemukan
                  </td>
                </tr>
              ) : (
                employees.map((item, index) => {
                  // ✅ Console log di sini (dalam fungsi map)
                  console.log("Item:", item);
                  console.log("Image URL:", item.image_url);

                  return (
                    <tr key={item.id} className="border-b dark:border-gray-700">
                      <td className="p-3">
                        {(pagination.current_page - 1) * pagination.per_page +
                          index +
                          1}
                      </td>

                      <td className="p-3">
                        {item.image_url ? (
                          <img
                            src={item.image_url}
                            alt={item.name}
                            className="object-cover w-10 h-10 rounded-full"
                          />
                        ) : (
                          <div className="flex items-center justify-center w-10 h-10 text-xs text-gray-500 bg-gray-200 rounded-full dark:bg-gray-700">
                            -
                          </div>
                        )}
                      </td>

                      <td className="p-3">{item.name}</td>
                      <td className="p-3">{item.phone}</td>
                      <td className="p-3">{item.division?.name || "-"}</td>
                      <td className="p-3">{item.position}</td>
                      <td className="p-3">
                        {new Date(item.created_at).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>

                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <Link
                            to={`/employees/edit/${item.id}`}
                            className="text-blue-600 hover:underline"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="text-red-600 hover:underline"
                            title="Hapus"
                          >
                            <TrashIcon className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
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
                      : "border dark:border-gray-700"
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
