// src/pages/company-profile/company-profile.tsx
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import CompanyDataCard from "../../components/company-profile/CompanyDataCard";
import CompanyContactCard from "../../components/company-profile/CompanyContactCard";
import CompanyAddressCard from "../../components/company-profile/CompanyAddressCard";
import CompanySocialCard from "../../components/company-profile/CompanySocialCard";
import CompanyLogoCard from "../../components/company-profile/CompanyLogoCard";
import PageMeta from "../../components/common/PageMeta";
import { Toaster } from "react-hot-toast";

export default function CompanyProfile() {
  return (
    <>
      <Toaster position="top-right" />
      <PageMeta
        title="Dados da Empresa | Sistema de Gestão de RH"
        description="Gerencie as informações da sua empresa"
      />
      <PageBreadcrumb pageTitle="Dados da Empresa" />

      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
          Informações da Empresa
        </h3>
        <div className="space-y-6">
          <CompanyLogoCard />
          <CompanyDataCard />
          <CompanyContactCard />
          <CompanyAddressCard />
          <CompanySocialCard />
        </div>
      </div>
    </>
  );
}
