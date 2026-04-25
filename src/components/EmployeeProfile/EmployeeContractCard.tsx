// src/components/EmployeeProfile/EmployeeContractCard.tsx
interface Contract {
  id: string;
  dataInicioContrato: string;
  dataFimContrato: string | null;
  diasferias: number;
  horastrabalhodiarias: number;
  diastrabalhosemana: number;
  regimeTrabalho: string;
  funcao: { functionName: string };
  departamento: { departamentName: string };
  categoria: { categoryName: string };
  organizacao: { nomeOrganizacao: string };
  duracao: { nomeDuracao: string };
}

interface EmployeeContractCardProps {
  contract: Contract;
}

export default function EmployeeContractCard({
  contract,
}: EmployeeContractCardProps) {
  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Em vigor";
    return new Date(dateString).toLocaleDateString("pt-BR");
  };

  // Calcular tempo de empresa
  const getTimeInCompany = () => {
    const startDate = new Date(contract.dataInicioContrato);
    const now = new Date();
    const years = now.getFullYear() - startDate.getFullYear();
    const months = now.getMonth() - startDate.getMonth();

    if (months < 0) {
      return `${years - 1} anos e ${12 + months} meses`;
    }
    return `${years} anos e ${months} meses`;
  };

  // Calcular horas semanais
  const weeklyHours =
    contract.horastrabalhodiarias * contract.diastrabalhosemana;

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90 mb-4">
        Dados do Contrato
      </h3>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <p className="text-xs text-gray-500">Data de Admissão</p>
          <p className="text-sm font-medium">
            {formatDate(contract.dataInicioContrato)}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Tempo de empresa: {getTimeInCompany()}
          </p>
        </div>

        <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <p className="text-xs text-gray-500">Data de Término</p>
          <p className="text-sm font-medium">
            {formatDate(contract.dataFimContrato)}
          </p>
        </div>

        <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
          <p className="text-xs text-gray-500">Regime de Trabalho</p>
          <p className="text-sm font-medium">{contract.regimeTrabalho}</p>
          <p className="text-xs text-gray-500 mt-1">
            Tipo: {contract.duracao?.nomeDuracao || "---"}
          </p>
        </div>

        <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
          <p className="text-xs text-gray-500">Carga Horária</p>
          <p className="text-sm font-medium">
            {contract.horastrabalhodiarias}h/dia
          </p>
          <p className="text-xs text-gray-500">
            {contract.diastrabalhosemana} dias/semana ({weeklyHours}h/semana)
          </p>
        </div>

        <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
          <p className="text-xs text-gray-500">Função</p>
          <p className="text-sm font-medium">
            {contract.funcao?.functionName || "---"}
          </p>
        </div>

        <div className="p-3 bg-pink-50 dark:bg-pink-900/20 rounded-lg">
          <p className="text-xs text-gray-500">Departamento</p>
          <p className="text-sm font-medium">
            {contract.departamento?.departamentName || "---"}
          </p>
        </div>

        <div className="p-3 bg-teal-50 dark:bg-teal-900/20 rounded-lg">
          <p className="text-xs text-gray-500">Categoria</p>
          <p className="text-sm font-medium">
            {contract.categoria?.categoryName || "---"}
          </p>
        </div>

        <div className="p-3 bg-cyan-50 dark:bg-cyan-900/20 rounded-lg">
          <p className="text-xs text-gray-500">Organização</p>
          <p className="text-sm font-medium">
            {contract.organizacao?.nomeOrganizacao || "---"}
          </p>
        </div>

        <div className="p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
          <p className="text-xs text-gray-500">Direito a Férias</p>
          <p className="text-sm font-medium">
            {contract.diasferias} dias por ano
          </p>
        </div>
      </div>
    </div>
  );
}
