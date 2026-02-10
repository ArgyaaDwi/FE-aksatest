import Layout from "../components/layouts/Layout";
import Card from "../components/fragment/Card";
import CardContainer from "../components/fragment/CardContainer";

import { BriefcaseBusiness, Users } from "lucide-react";
export default function DashboardPage() {
  return (
    <Layout>
      <div className="p-4">
        <h1 className="mb-4 text-xl font-bold">Dashboard</h1>
        <div className="grid grid-cols-1 gap-4 mt-2 lg:grid-cols-2">
          <Card
            icon={<BriefcaseBusiness color="gray" />}
            text="Divisi"
            count="244"
            color="#7EF350"
            url="/admin/proposal"
          />
          <Card
            icon={<Users color="gray" />}
            text="Karyawan"
            count="244"
            color="#7EF350"
            url="/admin/proposal"
          />
        </div>
        <p className="mt-4 font-semibold text-black dark:text-white">
          Informasi Umum
        </p>
        <div className="grid grid-cols-1 gap-4 mt-2 lg:grid-cols-1">
          <CardContainer
            title="Karyawan Terbaru"
            subtitle="Top 5  Kelas yang Baru Terdaftar"
          >
            <table></table>
          </CardContainer>
        </div>
      </div>
    </Layout>
  );
}
