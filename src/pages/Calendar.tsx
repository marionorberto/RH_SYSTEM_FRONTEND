import ComponentCard from "../components/common/ComponentCard";
import PageBreadcrumb from "../components/common/PageBreadCrumb";
import PageMeta from "../components/common/PageMeta";
import BasicTableOne from "../components/tables/BasicTables/BasicTableOne";

export default function Calendar() {
  return (
    <>
      <PageMeta
        title="React.js Basic Tables Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Usuários" />
      <div className="space-y-6">
        <ComponentCard title="Usuários Cadastrados na app">
          <BasicTableOne />
        </ComponentCard>
      </div>
    </>
  );
}
