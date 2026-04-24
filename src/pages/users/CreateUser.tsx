// src/pages/Users/CreateUser.tsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import Button from "../../components/ui/button/Button";
import Input from "../../components/form/input/InputField";
import Label from "../../components/form/Label";
import Select from "../../components/form/Select";
import EmployeeSearchInput from "../../components/users/EmployeeSearchInput";

// Dados mockados para perfis (roles)
const mockRoles = [
  { id: "1", roleName: "ADMIN", descriptionRole: "Administrador do sistema" },
  { id: "2", roleName: "RH", descriptionRole: "Recursos Humanos" },
  { id: "3", roleName: "USER", descriptionRole: "Usuário comum" },
  { id: "4", roleName: "MANAGER", descriptionRole: "Gerente" },
];

// Interface para o formulário
interface CreateUserFormData {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  active: boolean;
  isSuperAdmin: boolean;
  resetPassword: boolean;
  roleIds: string[];
}

export default function CreateUser() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
  const [roles, setRoles] = useState(mockRoles);
  const [formData, setFormData] = useState<CreateUserFormData>({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    active: true,
    isSuperAdmin: false,
    resetPassword: true,
    roleIds: [],
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Auto preencher nome quando funcionário for selecionado
  useEffect(() => {
    if (selectedEmployee) {
      const nameParts = selectedEmployee.nomeFuncionario.split(" ");
      const firstname = nameParts[0] || "";
      const lastname = nameParts.slice(1).join(" ") || "";

      setFormData((prev) => ({
        ...prev,
        firstname,
        lastname,
        // Gerar username automaticamente baseado no nome
        username: generateUsername(selectedEmployee.nomeFuncionario),
        // Gerar email automaticamente
        email: generateEmail(selectedEmployee.nomeFuncionario),
      }));
    }
  }, [selectedEmployee]);

  // Gerar username a partir do nome
  const generateUsername = (fullName: string): string => {
    const nameParts = fullName.toLowerCase().split(" ");
    const firstname = nameParts[0];
    const lastname =
      nameParts.length > 1 ? nameParts[nameParts.length - 1] : "";
    const base = `${firstname}.${lastname}`;
    // Adicionar um número aleatório para evitar duplicatas
    return `${base}${Math.floor(Math.random() * 100)}`;
  };

  // Gerar email a partir do nome
  const generateEmail = (fullName: string): string => {
    const nameParts = fullName.toLowerCase().split(" ");
    const firstname = nameParts[0];
    const lastname =
      nameParts.length > 1 ? nameParts[nameParts.length - 1] : "";
    return `${firstname}.${lastname}@empresa.com`;
  };

  // Validar formulário
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!selectedEmployee) {
      newErrors.employeeId = "Selecione um funcionário";
    }

    if (!formData.firstname) {
      newErrors.firstname = "Nome é obrigatório";
    }

    if (!formData.lastname) {
      newErrors.lastname = "Sobrenome é obrigatório";
    }

    if (!formData.username) {
      newErrors.username = "Nome de usuário é obrigatório";
    } else if (formData.username.length < 3) {
      newErrors.username = "Nome de usuário deve ter no mínimo 3 caracteres";
    }

    if (!formData.email) {
      newErrors.email = "Email é obrigatório";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email inválido";
    }

    if (!formData.password) {
      newErrors.password = "Senha é obrigatória";
    } else if (formData.password.length < 6) {
      newErrors.password = "Senha deve ter no mínimo 6 caracteres";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "As senhas não coincidem";
    }

    if (formData.roleIds.length === 0) {
      newErrors.roleIds = "Selecione pelo menos um perfil";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Salvar usuário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    // Preparar dados para envio (match com a entidade User)
    const userData = {
      firstname: formData.firstname,
      lastname: formData.lastname,
      username: formData.username,
      email: formData.email,
      password: formData.password,
      active: formData.active,
      isSuperAdmin: formData.isSuperAdmin,
      resetPassword: formData.resetPassword,
      employeeId: selectedEmployee?.id,
      roleIds: formData.roleIds,
    };

    console.log("Enviando dados do usuário:", userData);

    // Simula chamada API
    setTimeout(() => {
      setLoading(false);
      // Redirecionar para lista de usuários
      navigate("/users");
    }, 1500);
  };

  // Atualizar campos do formulário
  const handleInputChange = (field: keyof CreateUserFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Limpar erro do campo
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  // Alternar role no array
  const handleRoleToggle = (roleId: string) => {
    setFormData((prev) => {
      const newRoleIds = prev.roleIds.includes(roleId)
        ? prev.roleIds.filter((id) => id !== roleId)
        : [...prev.roleIds, roleId];

      // Limpar erro de roles
      if (errors.roleIds && newRoleIds.length > 0) {
        setErrors((prevErrors) => ({ ...prevErrors, roleIds: "" }));
      }

      return { ...prev, roleIds: newRoleIds };
    });
  };

  return (
    <>
      <PageMeta
        title="Criar Usuário | Sistema de Gestão de RH"
        description="Cadastre um novo usuário no sistema"
      />
      <PageBreadcrumb pageTitle="Criar Usuário" />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Formulário Principal */}
        <div className="lg:col-span-2">
          <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                Informações do Usuário
              </h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Preencha os dados abaixo para criar um novo usuário
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                {/* Busca de Funcionário */}
                <div>
                  <Label required>Funcionário</Label>
                  <EmployeeSearchInput
                    onSelect={setSelectedEmployee}
                    error={errors.employeeId}
                  />
                  {selectedEmployee && (
                    <div className="mt-2 p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <p className="text-sm text-green-700 dark:text-green-400">
                        ✓ Funcionário selecionado:{" "}
                        {selectedEmployee.nomeFuncionario}
                      </p>
                    </div>
                  )}
                </div>

                {/* Nome e Sobrenome */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <Label required>Nome</Label>
                    <Input
                      type="text"
                      value={formData.firstname}
                      onChange={(e) =>
                        handleInputChange("firstname", e.target.value)
                      }
                      placeholder="João"
                      error={!!errors.firstname}
                    />
                    {errors.firstname && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.firstname}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label required>Sobrenome</Label>
                    <Input
                      type="text"
                      value={formData.lastname}
                      onChange={(e) =>
                        handleInputChange("lastname", e.target.value)
                      }
                      placeholder="Silva"
                      error={!!errors.lastname}
                    />
                    {errors.lastname && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.lastname}
                      </p>
                    )}
                  </div>
                </div>

                {/* Nome de Usuário e Email */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <Label required>Nome de Usuário</Label>
                    <Input
                      type="text"
                      value={formData.username}
                      onChange={(e) =>
                        handleInputChange("username", e.target.value)
                      }
                      placeholder="joao.silva"
                      error={!!errors.username}
                    />
                    {errors.username && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.username}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label required>Email</Label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      placeholder="joao.silva@empresa.com"
                      error={!!errors.email}
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Senha e Confirmar Senha */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <Label required>Senha</Label>
                    <Input
                      type="password"
                      value={formData.password}
                      onChange={(e) =>
                        handleInputChange("password", e.target.value)
                      }
                      placeholder="••••••••"
                      error={!!errors.password}
                    />
                    {errors.password && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.password}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label required>Confirmar Senha</Label>
                    <Input
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        handleInputChange("confirmPassword", e.target.value)
                      }
                      placeholder="••••••••"
                      error={!!errors.confirmPassword}
                    />
                    {errors.confirmPassword && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.confirmPassword}
                      </p>
                    )}
                  </div>
                </div>

                {/* Perfis (Roles) - Múltipla escolha */}
                <div>
                  <Label required>Perfis de Acesso</Label>
                  <div className="space-y-2 mt-2">
                    {roles.map((role) => (
                      <label
                        key={role.id}
                        className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800/50"
                      >
                        <input
                          type="checkbox"
                          checked={formData.roleIds.includes(role.id)}
                          onChange={() => handleRoleToggle(role.id)}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <div className="ml-3 flex-1">
                          <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                            {role.roleName}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {role.descriptionRole}
                          </p>
                        </div>
                      </label>
                    ))}
                  </div>
                  {errors.roleIds && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.roleIds}
                    </p>
                  )}
                  <p className="mt-2 text-xs text-gray-500">
                    O usuário pode ter múltiplos perfis. As permissões serão
                    combinadas.
                  </p>
                </div>

                {/* Opções Adicionais */}
                <div className="space-y-3">
                  <Label>Configurações Adicionais</Label>

                  <label className="flex items-center justify-between p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800/50">
                    <div>
                      <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                        Usuário Ativo
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Usuário pode acessar o sistema
                      </p>
                    </div>
                    <div className="relative inline-block w-10 mr-2 align-middle select-none">
                      <input
                        type="checkbox"
                        checked={formData.active}
                        onChange={(e) =>
                          handleInputChange("active", e.target.checked)
                        }
                        className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                      />
                      <label
                        className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer ${
                          formData.active ? "bg-blue-500" : "bg-gray-300"
                        }`}
                      ></label>
                    </div>
                  </label>

                  <label className="flex items-center justify-between p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800/50">
                    <div>
                      <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                        Super Administrador
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Acesso total a todas as funcionalidades
                      </p>
                    </div>
                    <div className="relative inline-block w-10 mr-2 align-middle select-none">
                      <input
                        type="checkbox"
                        checked={formData.isSuperAdmin}
                        onChange={(e) =>
                          handleInputChange("isSuperAdmin", e.target.checked)
                        }
                        className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                      />
                      <label
                        className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer ${
                          formData.isSuperAdmin ? "bg-red-500" : "bg-gray-300"
                        }`}
                      ></label>
                    </div>
                  </label>

                  <label className="flex items-center justify-between p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800/50">
                    <div>
                      <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                        Reset de Senha Obrigatório
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Usuário será obrigado a trocar a senha no primeiro
                        acesso
                      </p>
                    </div>
                    <div className="relative inline-block w-10 mr-2 align-middle select-none">
                      <input
                        type="checkbox"
                        checked={formData.resetPassword}
                        onChange={(e) =>
                          handleInputChange("resetPassword", e.target.checked)
                        }
                        className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                      />
                      <label
                        className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer ${
                          formData.resetPassword
                            ? "bg-yellow-500"
                            : "bg-gray-300"
                        }`}
                      ></label>
                    </div>
                  </label>
                </div>

                {/* Botões */}
                <div className="flex items-center gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <Button
                    type="button"
                    size="md"
                    variant="outline"
                    onClick={() => navigate("/users")}
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    size="md"
                    variant="primary"
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Criando...
                      </div>
                    ) : (
                      "Criar Usuário"
                    )}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Sidebar com informações */}
        <div className="lg:col-span-1">
          {/* Informações sobre Perfis */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
            <h4 className="mb-4 text-md font-semibold text-gray-800 dark:text-white/90">
              Sobre os Perfis
            </h4>
            <div className="space-y-3">
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="text-sm font-medium text-blue-700 dark:text-blue-400">
                  ADMIN
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  Administrador do sistema. Acesso total a todas as
                  funcionalidades.
                </p>
              </div>
              <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <p className="text-sm font-medium text-purple-700 dark:text-purple-400">
                  RH
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  Recursos Humanos. Acesso a módulos de funcionários, folhas e
                  relatórios.
                </p>
              </div>
              <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <p className="text-sm font-medium text-green-700 dark:text-green-400">
                  MANAGER
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  Gerente. Acesso a relatórios da equipe e aprovações.
                </p>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-400">
                  USER
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  Usuário comum. Acesso básico ao sistema.
                </p>
              </div>
            </div>
          </div>

          {/* Dicas */}
          <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
            <h4 className="mb-3 text-md font-semibold text-gray-800 dark:text-white/90">
              Dicas Importantes
            </h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li className="flex items-start gap-2">
                <span className="text-blue-500">•</span>O funcionário deve estar
                ativo no sistema
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500">•</span>A senha deve ter no
                mínimo 6 caracteres
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500">•</span>O email e username devem
                ser únicos
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500">•</span>
                Múltiplos perfis combinam permissões
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500">•</span>
                Super Admin tem prioridade sobre outros perfis
              </li>
            </ul>
          </div>

          {/* Preview dos Dados */}
          {selectedEmployee && (
            <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
              <h4 className="mb-3 text-md font-semibold text-gray-800 dark:text-white/90">
                Preview do Usuário
              </h4>
              <div className="space-y-2 text-sm">
                <p>
                  <span className="text-gray-500">Nome:</span>{" "}
                  <span className="font-medium">
                    {formData.firstname} {formData.lastname}
                  </span>
                </p>
                <p>
                  <span className="text-gray-500">Username:</span>{" "}
                  <span className="font-medium">{formData.username}</span>
                </p>
                <p>
                  <span className="text-gray-500">Email:</span>{" "}
                  <span className="font-medium">{formData.email}</span>
                </p>
                <p>
                  <span className="text-gray-500">Perfis:</span>{" "}
                  <span className="font-medium">
                    {formData.roleIds.length > 0
                      ? roles
                          .filter((r) => formData.roleIds.includes(r.id))
                          .map((r) => r.roleName)
                          .join(", ")
                      : "Nenhum selecionado"}
                  </span>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Estilos para os toggles */}
      <style>{`
        .toggle-checkbox:checked {
          right: 0;
          border-color: transparent;
        }
        .toggle-checkbox:checked + .toggle-label {
          background-color: currentColor;
        }
        .toggle-checkbox {
          right: 0;
          transition: all 0.3s ease;
        }
        .toggle-checkbox:checked {
          right: 1rem;
        }
      `}</style>
    </>
  );
}
