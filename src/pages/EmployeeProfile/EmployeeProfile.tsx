// src/pages/EmployeeProfile/EmployeeProfile.tsx
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import EmployeeInfoCard from "../../components/EmployeeProfile/EmployeeInfoCard";
import EmployeeContractCard from "../../components/EmployeeProfile/EmployeeContractCard";
import VacationTable from "../../components/EmployeeProfile/VacationTable";
import RequestVacationModal from "../../components/EmployeeProfile/RequestVacationModal";
import Button from "../../components/ui/button/Button";

// Dados mockados do funcionário logado
const mockEmployee = {
  id: "1",
  employee_name: "João Silva",
  fatherName: "Antonio Silva",
  motherName: "Maria Silva",
  birthday: "1990-05-15",
  gender: "MASCULINO",
  civilState: "CASADO(A)",
  nacionality: { name: "Angolana" },
  typeDoc1: "BI",
  docNumber1: "001234567LA042",
  typeDoc2: "PASSAPORTE",
  docNumber2: "A1234567",
  academic_level: "LICENCIADO",
  photo: null,
  telefone1: "+244 923 456 789",
  telefone2: "+244 923 456 788",
  email: "joao.silva@empresa.com",
  linkedin: "https://linkedin.com/in/joaosilva",
  whatsapp: "+244 923 456 789",
  instagram: "@joaosilva",
  street: "Rua 15 de Maio",
  neighbourhood: "Centro",
  houseNumber: "10",
  bank: {
    bank_name: "Banco Angolano de Investimentos",
    code: "001",
  },
  numSegsocial: "123456789",
  numContaBanc: "000123456789",
  iBanknta: "AO0600012345678901234567890",
  estado: true,
  createdAt: "2023-01-15T08:00:00Z",
};

// Dados mockados do contrato (ProfissionalData)
const mockContract = {
  id: "1",
  dataInicioContrato: "2023-01-15",
  dataFimContrato: null,
  diasferias: 22,
  horastrabalhodiarias: 8,
  diastrabalhosemana: 5,
  regimeTrabalho: "A tempo completo",
  funcao: { functionName: "Desenvolvedor Sênior" },
  departamento: { departamentName: "Tecnologia" },
  categoria: { categoryName: "Categoria A" },
  organizacao: { nomeOrganizacao: "Minha Empresa Ltda" },
  duracao: { nomeDuracao: "Contrato Indeterminado" },
};

// Dados mockados das férias
const mockVacations = [
  {
    id: "1",
    dateStart: "2024-06-01",
    dateEnd: "2024-06-15",
    days: 15,
    vacationType: "ANUAL",
    state: "APROVADO",
    observation: "Férias anuais",
    createdAt: "2024-01-15T10:00:00Z",
    approvalDate: "2024-01-20T14:30:00Z",
  },
  {
    id: "2",
    dateStart: "2024-12-20",
    dateEnd: "2025-01-05",
    days: 17,
    vacationType: "ANUAL",
    state: "PENDENTE",
    observation: "Férias de fim de ano",
    createdAt: "2024-11-01T09:00:00Z",
    approvalDate: null,
  },
  {
    id: "3",
    dateStart: "2023-12-01",
    dateEnd: "2023-12-15",
    days: 15,
    vacationType: "ANUAL",
    state: "APROVADO",
    observation: "Férias de Natal",
    createdAt: "2023-10-10T11:00:00Z",
    approvalDate: "2023-10-15T16:00:00Z",
  },
];

export default function EmployeeProfile() {
  const { id } = useParams();
  const [employee, setEmployee] = useState(mockEmployee);
  const [contract, setContract] = useState(mockContract);
  const [vacations, setVacations] = useState(mockVacations);
  const [loading, setLoading] = useState(true);
  const [showRequestModal, setShowRequestModal] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleRequestVacation = (vacationData: any) => {
    const newVacation = {
      id: (vacations.length + 1).toString(),
      ...vacationData,
      state: "PENDENTE",
      createdAt: new Date().toISOString(),
      approvalDate: null,
    };
    setVacations([newVacation, ...vacations]);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR");
  };

  const usedVacationDays = vacations
    .filter((v) => v.state === "APROVADO")
    .reduce((sum, v) => sum + v.days, 0);

  const pendingVacationDays = vacations
    .filter((v) => v.state === "PENDENTE")
    .reduce((sum, v) => sum + v.days, 0);

  const availableVacationDays = contract.diasferias - usedVacationDays;

  if (loading) {
    return (
      <>
        <PageMeta title="Perfil do Funcionário | Sistema RH" />
        <PageBreadcrumb pageTitle="Perfil do Funcionário" />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">
              Carregando perfil...
            </p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <PageMeta
        title="Perfil do Funcionário | Sistema de Gestão de RH"
        description="Informações pessoais, contrato e férias"
      />
      <PageBreadcrumb pageTitle="Perfil do Funcionário" />

      <div className="space-y-6">
        {/* Cards de Resumo de Férias */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
          <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03]">
            <p className="text-sm text-gray-500">Dias de Férias (Ano)</p>
            <p className="text-2xl font-bold text-blue-600">
              {contract.diasferias}
            </p>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03]">
            <p className="text-sm text-gray-500">Dias Utilizados</p>
            <p className="text-2xl font-bold text-yellow-600">
              {usedVacationDays}
            </p>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03]">
            <p className="text-sm text-gray-500">Dias Pendentes</p>
            <p className="text-2xl font-bold text-orange-600">
              {pendingVacationDays}
            </p>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03]">
            <p className="text-sm text-gray-500">Dias Disponíveis</p>
            <p className="text-2xl font-bold text-green-600">
              {availableVacationDays}
            </p>
          </div>
        </div>

        {/* Dados Pessoais */}
        <EmployeeInfoCard employee={employee} />

        {/* Dados do Contrato */}
        <EmployeeContractCard contract={contract} />

        {/* Histórico de Férias */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
          <div className="flex flex-col gap-4 mb-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                Histórico de Férias
              </h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Solicitações de férias e seus status
              </p>
            </div>
            <Button
              size="sm"
              variant="primary"
              onClick={() => setShowRequestModal(true)}
              className="flex items-center gap-2"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Solicitar Férias
            </Button>
          </div>

          <VacationTable vacations={vacations} formatDate={formatDate} />
        </div>

        {/* Modal de Solicitação de Férias */}
        <RequestVacationModal
          isOpen={showRequestModal}
          onClose={() => setShowRequestModal(false)}
          onConfirm={handleRequestVacation}
          availableDays={availableVacationDays}
        />
      </div>
    </>
  );
}
