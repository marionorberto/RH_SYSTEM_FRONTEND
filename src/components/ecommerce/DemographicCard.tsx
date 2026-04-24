// src/components/ecommerce/DemographicCard.tsx
import { useState } from "react";
import ComponentCard from "../common/ComponentCard";

// Dados mockados
const mockResumoRH = {
  totalFuncionarios: 156,
  genero: {
    masculino: 98,
    feminino: 58,
  },
  faixaEtaria: {
    "18-25": 12,
    "26-35": 68,
    "36-45": 45,
    "46-60": 28,
    "60+": 3,
  },
  tempoCasa: {
    "0-1 ano": 23,
    "1-3 anos": 45,
    "3-5 anos": 38,
    "5-10 anos": 32,
    "10+ anos": 18,
  },
};

export default function DemographicCard() {
  const [data] = useState(mockResumoRH);

  const percentualMasculino =
    (data.genero.masculino / data.totalFuncionarios) * 100;
  const percentualFeminino =
    (data.genero.feminino / data.totalFuncionarios) * 100;

  return (
    <ComponentCard title="Resumo RH">
      <div className="space-y-6">
        {/* Total de Funcionários */}
        <div className="text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Total de Funcionários
          </p>
          <p className="text-3xl font-bold text-gray-800 dark:text-white/90">
            {data.totalFuncionarios}
          </p>
        </div>

        {/* Distribuição por Gênero */}
        <div>
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Distribuição por Gênero
          </p>
          <div className="flex h-4 rounded-full overflow-hidden mb-2">
            <div
              className="bg-blue-500"
              style={{ width: `${percentualMasculino}%` }}
              title={`Masculino: ${percentualMasculino.toFixed(1)}%`}
            />
            <div
              className="bg-pink-500"
              style={{ width: `${percentualFeminino}%` }}
              title={`Feminino: ${percentualFeminino.toFixed(1)}%`}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
            <span>
              👨 Masculino: {data.genero.masculino} (
              {percentualMasculino.toFixed(1)}%)
            </span>
            <span>
              👩 Feminino: {data.genero.feminino} (
              {percentualFeminino.toFixed(1)}%)
            </span>
          </div>
        </div>

        {/* Distribuição por Faixa Etária */}
        <div>
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Distribuição por Idade
          </p>
          <div className="space-y-2">
            {Object.entries(data.faixaEtaria).map(([faixa, quantidade]) => {
              const percentual = (quantidade / data.totalFuncionarios) * 100;
              return (
                <div key={faixa}>
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                    <span>{faixa} anos</span>
                    <span>{quantidade} funcionários</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: `${percentual}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Tempo de Casa */}
        <div>
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Tempo de Casa
          </p>
          <div className="space-y-2">
            {Object.entries(data.tempoCasa).map(([periodo, quantidade]) => {
              const percentual = (quantidade / data.totalFuncionarios) * 100;
              return (
                <div key={periodo}>
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                    <span>{periodo}</span>
                    <span>{quantidade} funcionários</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                    <div
                      className="bg-purple-500 h-2 rounded-full"
                      style={{ width: `${percentual}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Indicadores Rápidos */}
        <div className="grid grid-cols-2 gap-3 pt-2 border-t border-gray-200 dark:border-gray-700">
          <div className="text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Média Salarial
            </p>
            <p className="text-lg font-semibold text-gray-800 dark:text-white/90">
              {new Intl.NumberFormat("pt-AO", {
                style: "currency",
                currency: "AOA",
              }).format(272436)}
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Turnover (Anual)
            </p>
            <p className="text-lg font-semibold text-gray-800 dark:text-white/90">
              8.5%
            </p>
          </div>
        </div>
      </div>
    </ComponentCard>
  );
}
