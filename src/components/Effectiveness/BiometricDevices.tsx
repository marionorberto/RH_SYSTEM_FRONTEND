// src/components/Effectiveness/BiometricDevices.tsx
import Badge from "../ui/badge/Badge";

interface Device {
  id: string;
  name: string;
  status: string;
  lastSync: string;
  totalRegisters: number;
}

interface BiometricDevicesProps {
  devices: Device[];
}

export default function BiometricDevices({ devices }: BiometricDevicesProps) {
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return "---";
    }
  };

  const getStatusBadge = (status: string) => {
    return status === "online" ? (
      <Badge color="success">Online</Badge>
    ) : (
      <Badge color="danger">Offline</Badge>
    );
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="flex flex-col gap-4 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Dispositivos Biométricos
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Status e sincronização dos equipamentos
          </p>
        </div>
        <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Sincronizar Todos
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {devices.map((device) => (
          <div
            key={device.id}
            className="p-4 border border-gray-200 rounded-xl dark:border-gray-700 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 3v2m6-2v2M9 19v2m6-2v2M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-gray-800 dark:text-white/90">
                    {device.name}
                  </p>
                  {getStatusBadge(device.status)}
                </div>
              </div>
              <button className="text-gray-400 hover:text-gray-600">
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
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              </button>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Última sincronização:</span>
                <span className="text-gray-800 dark:text-white/90">
                  {formatDate(device.lastSync)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Total de registos:</span>
                <span className="font-semibold text-gray-800 dark:text-white/90">
                  {device.totalRegisters.toLocaleString()}
                </span>
              </div>
            </div>
            <button className="mt-3 w-full py-2 text-sm text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors dark:text-blue-400 dark:border-blue-400 dark:hover:bg-blue-900/20">
              Ver Detalhes
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
