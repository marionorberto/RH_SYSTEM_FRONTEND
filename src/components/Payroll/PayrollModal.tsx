// src/components/Payroll/PayrollModal.tsx
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";

interface PayrollModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isProcessing: boolean;
  processingStep: number;
  processingProgress: number;
  employeeCount: number;
  totalGross: number;
  totalDiscounts: number;
  totalNet: number;
  month: string;
  year: number;
  formatCurrency: (value: number) => string;
}

export default function PayrollModal({
  isOpen,
  onClose,
  onConfirm,
  isProcessing,
  processingStep,
  processingProgress,
  employeeCount,
  totalGross,
  totalDiscounts,
  totalNet,
  month,
  year,
  formatCurrency,
}: PayrollModalProps) {
  const getStepText = () => {
    switch (processingStep) {
      case 1:
        return "Verificando dados dos funcionários...";
      case 2:
        return "Calculando salários e descontos...";
      case 3:
        return "Gerando folha de pagamento...";
      case 4:
        return "Finalizando processamento...";
      default:
        return "Processando...";
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={!isProcessing ? onClose : () => {}}
      className="max-w-[600px] m-4"
    >
      <div className="no-scrollbar relative w-full max-w-[600px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
        {!isProcessing ? (
          // Modal de Confirmação
          <>
            <div className="px-2 pr-14">
              <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                Processar Folha de Pagamento
              </h4>
              <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
                Confirme os dados antes de processar a folha de pagamento
              </p>
            </div>

            <div className="px-2 pb-3 space-y-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-gray-500">Mês/Ano:</p>
                    <p className="font-semibold">
                      {month}/{year}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Funcionários:</p>
                    <p className="font-semibold">{employeeCount}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Total Bruto:</p>
                    <p className="font-semibold text-blue-600">
                      {formatCurrency(totalGross)}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Total Descontos:</p>
                    <p className="font-semibold text-red-600">
                      {formatCurrency(totalDiscounts)}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-gray-500">Total Líquido:</p>
                    <p className="text-xl font-bold text-green-600">
                      {formatCurrency(totalNet)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <p className="text-sm text-yellow-800 dark:text-yellow-400">
                  ⚠️ Atenção: Após confirmar, todos os salários serão
                  processados e os recibos serão gerados. Esta ação não pode ser
                  desfeita.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
              <Button size="sm" variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              <Button size="sm" variant="primary" onClick={onConfirm}>
                Confirmar Processamento
              </Button>
            </div>
          </>
        ) : (
          // Modal de Progresso
          <>
            <div className="px-2 pr-14">
              <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                Processando Folha de Pagamento
              </h4>
              <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
                Por favor, aguarde enquanto processamos a folha de pagamento
              </p>
            </div>

            <div className="px-2 pb-3">
              <div className="mb-6">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">{getStepText()}</span>
                  <span className="font-semibold text-blue-600">
                    {processingProgress}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${processingProgress}%` }}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center ${processingStep >= 1 ? "bg-green-500" : "bg-gray-300"}`}
                  >
                    {processingStep > 1 ? (
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    ) : (
                      <span className="text-xs text-white">
                        {processingStep === 1 ? "1" : "✓"}
                      </span>
                    )}
                  </div>
                  <span className="text-sm">
                    Verificando dados dos funcionários
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center ${processingStep >= 2 ? "bg-green-500" : "bg-gray-300"}`}
                  >
                    {processingStep > 2 ? (
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    ) : (
                      <span className="text-xs text-white">
                        {processingStep === 2 ? "2" : "✓"}
                      </span>
                    )}
                  </div>
                  <span className="text-sm">
                    Calculando salários e descontos
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center ${processingStep >= 3 ? "bg-green-500" : "bg-gray-300"}`}
                  >
                    {processingStep > 3 ? (
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    ) : (
                      <span className="text-xs text-white">
                        {processingStep === 3 ? "3" : "✓"}
                      </span>
                    )}
                  </div>
                  <span className="text-sm">Gerando folha de pagamento</span>
                </div>

                <div className="flex items-center gap-3">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center ${processingStep >= 4 ? "bg-green-500" : "bg-gray-300"}`}
                  >
                    {processingStep > 4 ? (
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    ) : (
                      <span className="text-xs text-white">
                        {processingStep === 4 ? "4" : "✓"}
                      </span>
                    )}
                  </div>
                  <span className="text-sm">Finalizando processamento</span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
}
