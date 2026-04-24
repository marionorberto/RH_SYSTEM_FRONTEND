// src/pages/Configurations/Configurations.tsx
import { useState, useEffect } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import FiscalYearSection from "../../components/Configurations/FiscalYearSection";
import BankSection from "../../components/Configurations/BankSection";
import IrtSection from "../../components/Configurations/IrtSection";
import SocialSecuritySection from "../../components/Configurations/SocialSecuritySection";

export default function CompanyConfig() {
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("fiscal");

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const sections = [
    { id: "fiscal", name: "Ano Fiscal", icon: "📅", color: "blue" },
    { id: "bank", name: "Bancos", icon: "🏦", color: "green" },
    { id: "irt", name: "IRT", icon: "💰", color: "purple" },
    { id: "social", name: "Segurança Social", icon: "🛡️", color: "orange" },
  ];

  if (loading) {
    return (
      <>
        <PageMeta title="Configurações | Sistema RH" />
        <PageBreadcrumb pageTitle="Configurações" />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">
              Carregando configurações...
            </p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <PageMeta
        title="Configurações | Sistema de Gestão de RH"
        description="Configurações do sistema: Ano Fiscal, Bancos, IRT e Segurança Social"
      />
      <PageBreadcrumb pageTitle="Configurações" />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        {/* Sidebar de navegação */}
        <div className="lg:col-span-1">
          <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
            <h3 className="mb-4 text-md font-semibold text-gray-800 dark:text-white/90">
              Configurações
            </h3>
            <nav className="space-y-2">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-all ${
                    activeSection === section.id
                      ? `bg-${section.color}-50 text-${section.color}-700 dark:bg-${section.color}-900/20 dark:text-${section.color}-400 border-l-4 border-${section.color}-500`
                      : "text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800"
                  }`}
                >
                  <span className="text-xl">{section.icon}</span>
                  <span>{section.name}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Conteúdo da seção selecionada */}
        <div className="lg:col-span-3">
          {activeSection === "fiscal" && <FiscalYearSection />}
          {activeSection === "bank" && <BankSection />}
          {activeSection === "irt" && <IrtSection />}
          {activeSection === "social" && <SocialSecuritySection />}
        </div>
      </div>
    </>
  );
}
