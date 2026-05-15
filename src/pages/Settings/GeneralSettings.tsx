// src/pages/Settings/GeneralSettings.tsx
import { useState, useEffect } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import Button from "../../components/ui/button/Button";
import Input from "../../components/form/input/InputField";
import Label from "../../components/form/Label";
import Switch from "../../components/ui/switch/Switch";
import { useAppSettings } from "../../hooks/useAppSettings";
import { useUserSettings } from "../../hooks/useUserSettings";
import { Toaster } from "react-hot-toast";

export default function GeneralSettings() {
  const {
    settings: appSettings,
    loading: appLoading,
    saving: appSaving,
    updateSettings: updateAppSettings,
  } = useAppSettings();

  const {
    settings: userSettings,
    loading: userLoading,
    saving: userSaving,
    updateSettings: updateUserSettings,
  } = useUserSettings();

  const [localAppSettings, setLocalAppSettings] = useState<any>(null);
  const [localUserSettings, setLocalUserSettings] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("notifications");
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (appSettings) {
      setLocalAppSettings(appSettings);
    }
  }, [appSettings]);

  useEffect(() => {
    if (userSettings) {
      setLocalUserSettings(userSettings);
    }
  }, [userSettings]);

  const handleAppChange = (key: string, value: any) => {
    setLocalAppSettings((prev: any) => ({ ...prev, [key]: value }));
  };

  const handleUserChange = (key: string, value: any) => {
    setLocalUserSettings((prev: any) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    // Salvar configurações globais (AppSettings)
    if (localAppSettings) {
      await updateAppSettings(localAppSettings);
    }

    // Salvar configurações do usuário (UserSettings)
    if (localUserSettings) {
      await updateUserSettings(localUserSettings);
    }

    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const tabs = [
    { id: "notifications", name: "Notificações", icon: "📧" },
    { id: "security", name: "Segurança", icon: "🔒" },
    { id: "backup", name: "Backup", icon: "💾" },
    { id: "interface", name: "Interface", icon: "🎨" },
  ];

  const loading = appLoading || userLoading;
  const saving = appSaving || userSaving;

  if (loading) {
    return (
      <>
        <PageMeta title="Configurações Gerais | Sistema RH" />
        <PageBreadcrumb pageTitle="Configurações Gerais" />
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
      <Toaster position="top-right" />
      <PageMeta
        title="Configurações Gerais | Sistema de Gestão de RH"
        description="Configurações gerais da aplicação"
      />
      <PageBreadcrumb pageTitle="Configurações Gerais" />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
            <h3 className="mb-4 text-md font-semibold text-gray-800 dark:text-white/90">
              Configurações
            </h3>
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-all ${
                    activeTab === tab.id
                      ? "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400 border-l-4 border-blue-500"
                      : "text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800"
                  }`}
                >
                  <span className="text-xl">{tab.icon}</span>
                  <span>{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Conteúdo */}
        <div className="lg:col-span-3">
          <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                {tabs.find((t) => t.id === activeTab)?.name}
              </h3>
              {saveSuccess && (
                <div className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-sm">
                  ✓ Configurações salvas com sucesso!
                </div>
              )}
            </div>

            <div className="space-y-6">
              {/* Tab Notificações */}
              {activeTab === "notifications" &&
                localAppSettings &&
                localUserSettings && (
                  <>
                    {/* Preferências do Usuário - Notificações */}
                    <div className="border-b border-gray-200 dark:border-gray-700 pb-4 mb-4">
                      <h4 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-3">
                        Minhas Preferências
                      </h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium">
                              Notificações por Email
                            </p>
                            <p className="text-sm text-gray-500">
                              Receber notificações no meu email
                            </p>
                          </div>
                          <Switch
                            checked={localUserSettings.emailNotifications}
                            onChange={(checked) =>
                              handleUserChange("emailNotifications", checked)
                            }
                          />
                        </div>

                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium">Notificações Push</p>
                            <p className="text-sm text-gray-500">
                              Receber notificações push no navegador
                            </p>
                          </div>
                          <Switch
                            checked={localUserSettings.pushNotifications}
                            onChange={(checked) =>
                              handleUserChange("pushNotifications", checked)
                            }
                          />
                        </div>

                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium">Notificações Desktop</p>
                            <p className="text-sm text-gray-500">
                              Receber notificações do sistema
                            </p>
                          </div>
                          <Switch
                            checked={localUserSettings.desktopNotifications}
                            onChange={(checked) =>
                              handleUserChange("desktopNotifications", checked)
                            }
                          />
                        </div>
                      </div>
                    </div>

                    {/* Configurações Globais de Email */}
                    <div>
                      <h4 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-3">
                        Configurações de Email (Sistema)
                      </h4>
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                          <Label>SMTP Host</Label>
                          <Input
                            value={localAppSettings.emailHost || ""}
                            onChange={(e) =>
                              handleAppChange("emailHost", e.target.value)
                            }
                          />
                        </div>
                        <div>
                          <Label>SMTP Porta</Label>
                          <Input
                            value={localAppSettings.emailPort || ""}
                            onChange={(e) =>
                              handleAppChange("emailPort", e.target.value)
                            }
                          />
                        </div>
                        <div>
                          <Label>Usuário SMTP</Label>
                          <Input
                            value={localAppSettings.emailUser || ""}
                            onChange={(e) =>
                              handleAppChange("emailUser", e.target.value)
                            }
                          />
                        </div>
                        <div>
                          <Label>Senha SMTP</Label>
                          <Input
                            type="password"
                            value={localAppSettings.emailPassword || ""}
                            onChange={(e) =>
                              handleAppChange("emailPassword", e.target.value)
                            }
                            placeholder="••••••••"
                          />
                        </div>
                      </div>
                    </div>
                  </>
                )}

              {/* Tab Segurança */}
              {activeTab === "security" && localAppSettings && (
                <>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <Label>Tempo de Sessão (minutos)</Label>
                      <Input
                        type="number"
                        value={localAppSettings.sessionTimeout}
                        onChange={(e) =>
                          handleAppChange(
                            "sessionTimeout",
                            parseInt(e.target.value),
                          )
                        }
                      />
                    </div>
                    <div>
                      <Label>Máx. Tentativas de Login</Label>
                      <Input
                        type="number"
                        value={localAppSettings.maxLoginAttempts}
                        onChange={(e) =>
                          handleAppChange(
                            "maxLoginAttempts",
                            parseInt(e.target.value),
                          )
                        }
                      />
                    </div>
                    <div>
                      <Label>Expiração de Senha (dias)</Label>
                      <Input
                        type="number"
                        value={localAppSettings.passwordExpiryDays}
                        onChange={(e) =>
                          handleAppChange(
                            "passwordExpiryDays",
                            parseInt(e.target.value),
                          )
                        }
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">
                          Autenticação de Dois Fatores
                        </p>
                        <p className="text-sm text-gray-500">
                          Exigir 2FA para todos os usuários
                        </p>
                      </div>
                      <Switch
                        checked={localAppSettings.twoFactorAuth}
                        onChange={(checked) =>
                          handleAppChange("twoFactorAuth", checked)
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">Exigir Senha Forte</p>
                        <p className="text-sm text-gray-500">
                          Senhas devem conter letras, números e caracteres
                          especiais
                        </p>
                      </div>
                      <Switch
                        checked={localAppSettings.requireStrongPassword}
                        onChange={(checked) =>
                          handleAppChange("requireStrongPassword", checked)
                        }
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Tab Backup */}
              {activeTab === "backup" && localAppSettings && (
                <>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">Backup Automático</p>
                      <p className="text-sm text-gray-500">
                        Realizar backup automático do banco de dados
                      </p>
                    </div>
                    <Switch
                      checked={localAppSettings.autoBackup}
                      onChange={(checked) =>
                        handleAppChange("autoBackup", checked)
                      }
                    />
                  </div>

                  {localAppSettings.autoBackup && (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <Label>Frequência</Label>
                        <select
                          value={localAppSettings.backupFrequency}
                          onChange={(e) =>
                            handleAppChange("backupFrequency", e.target.value)
                          }
                          className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
                        >
                          <option value="daily">Diário</option>
                          <option value="weekly">Semanal</option>
                          <option value="monthly">Mensal</option>
                        </select>
                      </div>
                      <div>
                        <Label>Horário</Label>
                        <Input
                          type="time"
                          value={localAppSettings.backupTime}
                          onChange={(e) =>
                            handleAppChange("backupTime", e.target.value)
                          }
                        />
                      </div>
                      <div>
                        <Label>Retenção (dias)</Label>
                        <Input
                          type="number"
                          value={localAppSettings.backupRetention}
                          onChange={(e) =>
                            handleAppChange(
                              "backupRetention",
                              parseInt(e.target.value),
                            )
                          }
                        />
                      </div>
                    </div>
                  )}

                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Backup Manual</p>
                        <p className="text-sm text-gray-500">
                          Realizar backup imediato do sistema
                        </p>
                      </div>
                      <Button variant="outline">Realizar Backup Agora</Button>
                    </div>
                  </div>
                </>
              )}

              {/* Tab Interface */}
              {activeTab === "interface" && localUserSettings && (
                <>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <Label>Tema</Label>
                      <select
                        value={localUserSettings.theme}
                        onChange={(e) =>
                          handleUserChange("theme", e.target.value)
                        }
                        className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
                      >
                        <option value="light">Claro</option>
                        <option value="dark">Escuro</option>
                        <option value="system">Sistema</option>
                      </select>
                    </div>
                    <div>
                      <Label>Idioma</Label>
                      <select
                        value={localUserSettings.language}
                        onChange={(e) =>
                          handleUserChange("language", e.target.value)
                        }
                        className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
                      >
                        <option value="pt-BR">Português (Brasil)</option>
                        <option value="pt-PT">Português (Portugal)</option>
                        <option value="en-US">English (US)</option>
                        <option value="es">Español</option>
                      </select>
                    </div>
                    <div>
                      <Label>Itens por Página</Label>
                      <select
                        value={localUserSettings.itemsPerPage}
                        onChange={(e) =>
                          handleUserChange(
                            "itemsPerPage",
                            parseInt(e.target.value),
                          )
                        }
                        className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
                      >
                        <option value={10}>10</option>
                        <option value={25}>25</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">Menu Lateral Recolhido</p>
                        <p className="text-sm text-gray-500">
                          Recolher menu lateral por padrão
                        </p>
                      </div>
                      <Switch
                        checked={localUserSettings.sidebarCollapsed}
                        onChange={(checked) =>
                          handleUserChange("sidebarCollapsed", checked)
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">Animações</p>
                        <p className="text-sm text-gray-500">
                          Ativar animações da interface
                        </p>
                      </div>
                      <Switch
                        checked={localUserSettings.animationsEnabled}
                        onChange={(checked) =>
                          handleUserChange("animationsEnabled", checked)
                        }
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Botão Salvar */}
              <div className="flex justify-end pt-4 border-t border-gray-200 dark:border-gray-700">
                <Button
                  variant="primary"
                  onClick={handleSave}
                  disabled={saving}
                >
                  {saving ? "Salvando..." : "Salvar Configurações"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
