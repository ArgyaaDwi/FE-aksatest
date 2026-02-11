"use client";
import Layout from "../components/layouts/Layout";
import Card from "../components/fragment/Card";
import CardContainer from "../components/fragment/CardContainer";
import React, { useState, useEffect } from "react";
import { getEmployeeCount, getLatestEmployees } from "../api/employee.api";
import { getDivisionsCount } from "../api/division.api";
import { BriefcaseBusiness, Users, User } from "lucide-react";
export default function DashboardPage() {
  const [employeeTotal, setEmployeeTotal] = useState(0);
  const [latest, setLatest] = useState([]);
  const [divisionTotal, setDivisionTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);

      try {
        const [
          employeeCountResponse,
          divisionCountResponse,
          latestEmployeesResponse,
        ] = await Promise.all([
          getEmployeeCount(),
          getDivisionsCount(),
          getLatestEmployees(),
        ]);

        setEmployeeTotal(employeeCountResponse.data.data.count);
        setDivisionTotal(divisionCountResponse.data.data.count);
        setLatest(latestEmployeesResponse.data.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <Layout>
      <div className="p-4">
        <h1 className="mb-4 text-xl font-bold">Dashboard</h1>
        <div className="grid grid-cols-1 gap-4 mt-2 lg:grid-cols-2">
          <Card
            icon={<BriefcaseBusiness color="gray" />}
            text="Divisi"
            count={loading ? "Bentar..." : divisionTotal}
            color="#2798F5"
            url="/divisions"
          />
          <Card
            icon={<Users color="gray" />}
            text="Karyawan"
            count={loading ? "Bentar..." : employeeTotal}
            color="#4653E3"
            url="/employees"
          />
        </div>
        <p className="mt-4 font-semibold text-black dark:text-white">
          Informasi Umum
        </p>
        <div className="grid grid-cols-1 gap-4 mt-2 lg:grid-cols-1">
          <CardContainer
            title="Karyawan Terbaru"
            subtitle="5 Karyawan yang Baru Terdaftar"
          >
            {loading ? (
              <div className="py-8 text-center text-gray-500">Bentar...</div>
            ) : latest.length === 0 ? (
              <div className="py-8 text-center text-gray-500">
                Tidak ada data karyawan
              </div>
            ) : (
              <div className="w-full overflow-x-auto bg-white rounded shadow dark:bg-gray-900">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr className="text-left border-b dark:border-gray-700">
                      <th className="p-3 uppercase whitespace-nowrap">No</th>
                      <th className="p-3 uppercase whitespace-nowrap">Nama</th>
                      <th className="p-3 uppercase whitespace-nowrap">
                        Posisi
                      </th>
                      <th className="p-3 uppercase whitespace-nowrap">
                        Divisi
                      </th>
                      <th className="p-3 uppercase whitespace-nowrap">
                        Tanggal Bergabung
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {latest.map((employee, index) => (
                      <tr
                        key={employee.id}
                        className="border-b last:border-none dark:border-gray-700"
                      >
                        <td className="p-3">{index + 1}</td>
                        <td className="p-3">
                          <div className="flex items-center">
                            <div>
                              <div className="font-medium ">
                                {employee.name}
                              </div>
                              <div className="text-xs text-gray-400">
                                {employee.phone || "No phone"}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="p-3">{employee.position}</td>
                        <td className="p-3">
                          {employee.division?.name || "No Division"}
                        </td>
                        <td className="p-3">
                          <div className="flex items-center">
                            {new Date(employee.created_at).toLocaleDateString(
                              "id-ID",
                              {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              },
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContainer>
        </div>
      </div>
    </Layout>
  );
}
