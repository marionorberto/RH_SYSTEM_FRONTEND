// src/components/EmployeeProfile/EmployeeInfoCard.tsx
import { useState } from "react";

interface Employee {
  id: string;
  employee_name: string;
  fatherName: string;
  motherName: string;
  birthday: string;
  gender: string;
  civilState: string;
  nacionality: { name: string };
  typeDoc1: string;
  docNumber1: string;
  typeDoc2: string;
  docNumber2: string;
  academic_level: string;
  photo: string | null;
  telefone1: string;
  telefone2: string;
  email: string;
  linkedin: string;
  whatsapp: string;
  instagram: string;
  street: string;
  neighbourhood: string;
  houseNumber: string;
  bank: { bank_name: string; code: string };
  numSegsocial: string;
  numContaBanc: string;
  iBanknta: string;
  estado: boolean;
}

interface EmployeeInfoCardProps {
  employee: Employee;
}

export default function EmployeeInfoCard({ employee }: EmployeeInfoCardProps) {
  const [showAllInfo, setShowAllInfo] = useState(false);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR");
  };

  const getGenderText = (gender: string) => {
    return gender === "MASCULINO" ? "Masculino" : "Feminino";
  };

  const getAcademicLevelText = (level: string) => {
    const levels: Record<string, string> = {
      ENSINO_BASE: "Ensino Base",
      ENSINO_MEDIO: "Ensino Médio",
      FREQUENCIA_UNIVERSITARIA: "Frequência Universitária",
      LICENCIADO: "Licenciado",
      MESTRADO: "Mestrado",
      DOUTORAMENTO: "Doutoramento",
    };
    return levels[level] || level;
  };

  const getDocumentTypeText = (type: string) => {
    const types: Record<string, string> = {
      BI: "Bilhete de Identidade",
      PASSAPORTE: "Passaporte",
      CARTAO_RESIDENTE: "Cartão de Residente",
      CARTA_CONDUCAO: "Carta de Condução",
    };
    return types[type] || type;
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-6">
            {/* Avatar */}
            <div className="h-20 w-20 overflow-hidden rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
              {employee.photo ? (
                <img
                  src={employee.photo}
                  alt={employee.employee_name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-white font-bold text-2xl">
                  {getInitials(employee.employee_name)}
                </span>
              )}
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white/90">
                {employee.employee_name}
              </h3>
              <p className="text-sm text-gray-500">{employee.email}</p>
              <div className="flex gap-2 mt-1">
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                  {employee.estado ? "Ativo" : "Inativo"}
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                  ID: {employee.id.substring(0, 8)}...
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <p className="text-xs text-gray-500">Nome do Pai</p>
              <p className="text-sm font-medium">
                {employee.fatherName || "---"}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Nome da Mãe</p>
              <p className="text-sm font-medium">{employee.motherName}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Data de Nascimento</p>
              <p className="text-sm font-medium">
                {formatDate(employee.birthday)}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Gênero</p>
              <p className="text-sm font-medium">
                {getGenderText(employee.gender)}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Estado Civil</p>
              <p className="text-sm font-medium">
                {employee.civilState || "---"}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Nacionalidade</p>
              <p className="text-sm font-medium">
                {employee.nacionality?.name || "---"}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Nível Acadêmico</p>
              <p className="text-sm font-medium">
                {getAcademicLevelText(employee.academic_level)}
              </p>
            </div>
          </div>

          {/* Botão para mostrar mais informações */}
          <button
            onClick={() => setShowAllInfo(!showAllInfo)}
            className="mt-4 text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
          >
            {showAllInfo ? "▲ Menos informações" : "▼ Mais informações"}
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={showAllInfo ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
              />
            </svg>
          </button>

          {/* Informações adicionais */}
          {showAllInfo && (
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <h4 className="text-md font-semibold mb-3">Documentos</h4>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-xs text-gray-500">Documento 1</p>
                  <p className="text-sm font-medium">
                    {getDocumentTypeText(employee.typeDoc1)}:{" "}
                    {employee.docNumber1}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Documento 2</p>
                  <p className="text-sm font-medium">
                    {employee.typeDoc2
                      ? `${getDocumentTypeText(employee.typeDoc2)}: ${employee.docNumber2}`
                      : "---"}
                  </p>
                </div>
              </div>

              <h4 className="text-md font-semibold mt-4 mb-3">Contactos</h4>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-xs text-gray-500">Telefone 1</p>
                  <p className="text-sm font-medium">{employee.telefone1}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Telefone 2</p>
                  <p className="text-sm font-medium">
                    {employee.telefone2 || "---"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">WhatsApp</p>
                  <p className="text-sm font-medium">
                    {employee.whatsapp || "---"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">LinkedIn</p>
                  <p className="text-sm font-medium">
                    {employee.linkedin ? (
                      <a
                        href={employee.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        Ver perfil
                      </a>
                    ) : (
                      "---"
                    )}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Instagram</p>
                  <p className="text-sm font-medium">
                    {employee.instagram || "---"}
                  </p>
                </div>
              </div>

              <h4 className="text-md font-semibold mt-4 mb-3">Endereço</h4>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div>
                  <p className="text-xs text-gray-500">Rua</p>
                  <p className="text-sm font-medium">
                    {employee.street || "---"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Bairro</p>
                  <p className="text-sm font-medium">
                    {employee.neighbourhood || "---"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Número</p>
                  <p className="text-sm font-medium">
                    {employee.houseNumber || "---"}
                  </p>
                </div>
              </div>

              <h4 className="text-md font-semibold mt-4 mb-3">
                Dados Bancários
              </h4>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-xs text-gray-500">Banco</p>
                  <p className="text-sm font-medium">
                    {employee.bank?.bank_name || "---"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Número da Conta</p>
                  <p className="text-sm font-medium">
                    {employee.numContaBanc || "---"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">IBAN</p>
                  <p className="text-sm font-medium">
                    {employee.iBanknta || "---"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Nº Segurança Social</p>
                  <p className="text-sm font-medium">
                    {employee.numSegsocial || "---"}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
