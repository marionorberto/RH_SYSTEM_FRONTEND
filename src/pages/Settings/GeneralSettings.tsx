// src/pages/Settings/GeneralSettings.tsx
import { useState, useEffect } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import Button from "../../components/ui/button/Button";
import Input from "../../components/form/input/InputField";
import Label from "../../components/form/Label";
import Switch from "../../components/ui/switch/Switch";

// Dados mockados
const mockSettings = {
  // Configurações Gerais
  companyName: "Sistema RH Empresarial",
  companyLogo: null,
  companyEmail: "contato@rhsistema.com",
  companyPhone: "+244 923 456 789",
  timezone: "Africa/Luanda",
  dateFormat: "DD/MM/YYYY",
  language: "pt-BR",

  // Configurações de Notificação
  emailNotifications: true,
  emailHost: "smtp.gmail.com",
  emailPort: "587",
  emailUser: "noreply@rhsistema.com",
  emailPassword: "********",
  emailSecure: true,

  // Configurações de Segurança
  sessionTimeout: 30,
  maxLoginAttempts: 5,
  passwordExpiryDays: 90,
  twoFactorAuth: false,
  requireStrongPassword: true,

  // Configurações de Backup
  autoBackup: true,
  backupFrequency: "daily",
  backupTime: "02:00",
  backupRetention: 30,

  // Configurações de Interface
  theme: "light",
  sidebarCollapsed: false,
  animationsEnabled: true,
  itemsPerPage: 10,
};

export default function GeneralSettings() {
  const [settings, setSettings] = useState(mockSettings);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("general");
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleInputChange = (key: string, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 1000);
  };

  const tabs = [
    { id: "general", name: "Gerais", icon: "⚙️" },
    { id: "notifications", name: "Notificações", icon: "📧" },
    { id: "security", name: "Segurança", icon: "🔒" },
    { id: "backup", name: "Backup", icon: "💾" },
    { id: "interface", name: "Interface", icon: "🎨" },
  ];

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
              {/* Tab Geral */}
              {activeTab === "general" && (
                <>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <Label>Nome da Empresa</Label>
                      <Input
                        value={settings.companyName}
                        onChange={(e) =>
                          handleInputChange("companyName", e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <Label>Email da Empresa</Label>
                      <Input
                        type="email"
                        value={settings.companyEmail}
                        onChange={(e) =>
                          handleInputChange("companyEmail", e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <Label>Telefone</Label>
                      <Input
                        value={settings.companyPhone}
                        onChange={(e) =>
                          handleInputChange("companyPhone", e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <Label>Fuso Horário</Label>
                      <select
                        value={settings.timezone}
                        onChange={(e) =>
                          handleInputChange("timezone", e.target.value)
                        }
                        className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
                      >
                        <option value="Africa/Luanda">Africa/Luanda</option>
                        <option value="Africa/Lagos">Africa/Lagos</option>
                        <option value="America/Sao_Paulo">
                          America/Sao_Paulo
                        </option>
                        <option value="Europe/Lisbon">Europe/Lisbon</option>
                      </select>
                    </div>
                    <div>
                      <Label>Formato de Data</Label>
                      <select
                        value={settings.dateFormat}
                        onChange={(e) =>
                          handleInputChange("dateFormat", e.target.value)
                        }
                        className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
                      >
                        <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                        <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                        <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                      </select>
                    </div>
                    <div>
                      <Label>Idioma</Label>
                      <select
                        value={settings.language}
                        onChange={(e) =>
                          handleInputChange("language", e.target.value)
                        }
                        className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
                      >
                        <option value="pt-BR">Português (BR)</option>
                        <option value="pt-PT">Português (PT)</option>
                        <option value="en-US">English (US)</option>
                        <option value="es-ES">Español</option>
                      </select>
                    </div>
                  </div>
                </>
              )}

              {/* Tab Notificações */}
              {activeTab === "notifications" && (
                <>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">Notificações por Email</p>
                      <p className="text-sm text-gray-500">
                        Enviar notificações via email para os usuários
                      </p>
                    </div>
                    <Switch
                      checked={settings.emailNotifications}
                      onChange={(checked) =>
                        handleInputChange("emailNotifications", checked)
                      }
                    />
                  </div>

                  {settings.emailNotifications && (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <Label>SMTP Host</Label>
                        <Input
                          value={settings.emailHost}
                          onChange={(e) =>
                            handleInputChange("emailHost", e.target.value)
                          }
                        />
                      </div>
                      <div>
                        <Label>SMTP Porta</Label>
                        <Input
                          value={settings.emailPort}
                          onChange={(e) =>
                            handleInputChange("emailPort", e.target.value)
                          }
                        />
                      </div>
                      <div>
                        <Label>Usuário SMTP</Label>
                        <Input
                          value={settings.emailUser}
                          onChange={(e) =>
                            handleInputChange("emailUser", e.target.value)
                          }
                        />
                      </div>
                      <div>
                        <Label>Senha SMTP</Label>
                        <Input
                          type="password"
                          value={settings.emailPassword}
                          onChange={(e) =>
                            handleInputChange("emailPassword", e.target.value)
                          }
                        />
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* Tab Segurança */}
              {activeTab === "security" && (
                <>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <Label>Tempo de Sessão (minutos)</Label>
                      <Input
                        type="number"
                        value={settings.sessionTimeout}
                        onChange={(e) =>
                          handleInputChange(
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
                        value={settings.maxLoginAttempts}
                        onChange={(e) =>
                          handleInputChange(
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
                        value={settings.passwordExpiryDays}
                        onChange={(e) =>
                          handleInputChange(
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
                        checked={settings.twoFactorAuth}
                        onChange={(checked) =>
                          handleInputChange("twoFactorAuth", checked)
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
                        checked={settings.requireStrongPassword}
                        onChange={(checked) =>
                          handleInputChange("requireStrongPassword", checked)
                        }
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Tab Backup */}
              {activeTab === "backup" && (
                <>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">Backup Automático</p>
                      <p className="text-sm text-gray-500">
                        Realizar backup automático do banco de dados
                      </p>
                    </div>
                    <Switch
                      checked={settings.autoBackup}
                      onChange={(checked) =>
                        handleInputChange("autoBackup", checked)
                      }
                    />
                  </div>

                  {settings.autoBackup && (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <Label>Frequência</Label>
                        <select
                          value={settings.backupFrequency}
                          onChange={(e) =>
                            handleInputChange("backupFrequency", e.target.value)
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
                          value={settings.backupTime}
                          onChange={(e) =>
                            handleInputChange("backupTime", e.target.value)
                          }
                        />
                      </div>
                      <div>
                        <Label>Retenção (dias)</Label>
                        <Input
                          type="number"
                          value={settings.backupRetention}
                          onChange={(e) =>
                            handleInputChange(
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
              {activeTab === "interface" && (
                <>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <Label>Tema</Label>
                      <select
                        value={settings.theme}
                        onChange={(e) =>
                          handleInputChange("theme", e.target.value)
                        }
                        className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
                      >
                        <option value="light">Claro</option>
                        <option value="dark">Escuro</option>
                        <option value="system">Sistema</option>
                      </select>
                    </div>
                    <div>
                      <Label>Itens por Página</Label>
                      <select
                        value={settings.itemsPerPage}
                        onChange={(e) =>
                          handleInputChange(
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
                        checked={settings.sidebarCollapsed}
                        onChange={(checked) =>
                          handleInputChange("sidebarCollapsed", checked)
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
                        checked={settings.animationsEnabled}
                        onChange={(checked) =>
                          handleInputChange("animationsEnabled", checked)
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
