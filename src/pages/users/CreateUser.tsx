// frontend/src/pages/Users/CreateUser.tsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import Button from "../../components/ui/button/Button";
import Input from "../../components/form/input/InputField";
import Label from "../../components/form/Label";
import EmployeeSearchInput from "../../components/users/EmployeeSearchInput";
import { useUsers } from "../../hooks/useUsers";
import { useRoles } from "../../hooks/useRoles";
import { Toaster } from "react-hot-toast";

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
  employeeId: string;
}

export default function CreateUser() {
  const navigate = useNavigate();
  const { createUser, loading: userLoading } = useUsers();
  const { roles, loading: rolesLoading } = useRoles();
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
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
    employeeId: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loading = userLoading || rolesLoading;

  // Auto preencher nome quando funcionário for selecionado
  useEffect(() => {
    if (selectedEmployee) {
      const nameParts = selectedEmployee.employee_name.split(" ");
      const firstname = nameParts[0] || "";
      const lastname = nameParts.slice(1).join(" ") || "";

      setFormData((prev) => ({
        ...prev,
        firstname,
        lastname,
        username: generateUsername(selectedEmployee.employee_name),
        email:
          selectedEmployee.email ||
          generateEmail(selectedEmployee.employee_name),
        employeeId: selectedEmployee.id,
      }));
    }
  }, [selectedEmployee]);

  const generateUsername = (fullName: string): string => {
    const nameParts = fullName.toLowerCase().split(" ");
    const firstname = nameParts[0];
    const lastname =
      nameParts.length > 1 ? nameParts[nameParts.length - 1] : "";
    const base = `${firstname}.${lastname}`;
    return `${base}${Math.floor(Math.random() * 100)}`;
  };

  const generateEmail = (fullName: string): string => {
    const nameParts = fullName.toLowerCase().split(" ");
    const firstname = nameParts[0];
    const lastname =
      nameParts.length > 1 ? nameParts[nameParts.length - 1] : "";
    return `${firstname}.${lastname}@empresa.com`;
  };

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    const userData = {
      firstname: formData.firstname,
      lastname: formData.lastname,
      username: formData.username,
      email: formData.email,
      password: formData.password,
      active: formData.active,
      isSuperAdmin: formData.isSuperAdmin,
      employeeId: formData.employeeId,
      roleIds: formData.roleIds,
    };

    const result = await createUser(userData);

    setIsSubmitting(false);

    if (result) {
      navigate("/users");
    }
  };

  const handleInputChange = (field: keyof CreateUserFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleRoleToggle = (roleId: string) => {
    setFormData((prev) => {
      const newRoleIds = prev.roleIds.includes(roleId)
        ? prev.roleIds.filter((id) => id !== roleId)
        : [...prev.roleIds, roleId];

      if (errors.roleIds && newRoleIds.length > 0) {
        setErrors((prevErrors) => ({ ...prevErrors, roleIds: "" }));
      }

      return { ...prev, roleIds: newRoleIds };
    });
  };

  if (loading) {
    return (
      <>
        <PageMeta title="Criar Usuário | Sistema RH" />
        <PageBreadcrumb pageTitle="Criar Usuário" />
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </>
    );
  }

  return (
    <>
      <Toaster position="top-right" />
      <PageMeta
        title="Criar Usuário | Sistema de Gestão de RH"
        description="Cadastre um novo usuário no sistema"
      />
      <PageBreadcrumb pageTitle="Criar Usuário" />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
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
                  <p className="mt-1 text-xs text-gray-500">
                    Apenas funcionários que ainda não possuem usuário são
                    exibidos
                  </p>
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
                      disabled={!selectedEmployee}
                    />
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
                      disabled={!selectedEmployee}
                    />
                  </div>
                </div>

                {/* Username e Email */}
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
                  </div>
                </div>

                {/* Senha */}
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
                  </div>
                </div>

                {/* Perfis (Roles) */}
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
                            {role.roleName === "admin" && "Administrador"}
                            {role.roleName === "rh" && "Recursos Humanos"}
                            {role.roleName === "funcionario" && "Funcionário"}
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
                    <input
                      type="checkbox"
                      checked={formData.active}
                      onChange={(e) =>
                        handleInputChange("active", e.target.checked)
                      }
                      className="w-4 h-4 text-blue-600 rounded"
                    />
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
                    <input
                      type="checkbox"
                      checked={formData.isSuperAdmin}
                      onChange={(e) =>
                        handleInputChange("isSuperAdmin", e.target.checked)
                      }
                      className="w-4 h-4 text-red-600 rounded"
                    />
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
                    <input
                      type="checkbox"
                      checked={formData.resetPassword}
                      onChange={(e) =>
                        handleInputChange("resetPassword", e.target.checked)
                      }
                      className="w-4 h-4 text-yellow-600 rounded"
                    />
                  </label>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <Button
                    type="button"
                    size="md"
                    variant="outline"
                    onClick={() => navigate("/users")}
                    disabled={isSubmitting}
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    size="md"
                    variant="primary"
                    disabled={isSubmitting || !selectedEmployee}
                  >
                    {isSubmitting ? "Criando..." : "Criar Usuário"}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
            <h4 className="mb-4 text-md font-semibold text-gray-800 dark:text-white/90">
              Sobre os Perfis
            </h4>
            <div className="space-y-3">
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="text-sm font-medium text-blue-700 dark:text-blue-400">
                  Administrador
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  Acesso total a todas as funcionalidades do sistema.
                </p>
              </div>
              <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <p className="text-sm font-medium text-purple-700 dark:text-purple-400">
                  RH
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  Acesso a módulos de funcionários, folhas de pagamento e
                  relatórios.
                </p>
              </div>
              <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <p className="text-sm font-medium text-green-700 dark:text-green-400">
                  Funcionário
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  Acesso restrito a dados pessoais e funcionalidades básicas.
                </p>
              </div>
            </div>
          </div>

          {selectedEmployee && (
            <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
              <h4 className="mb-3 text-md font-semibold text-gray-800 dark:text-white/90">
                Funcionário Selecionado
              </h4>
              <div className="space-y-2 text-sm">
                <p>
                  <span className="text-gray-500">Nome:</span>{" "}
                  {selectedEmployee.employee_name}
                </p>
                <p>
                  <span className="text-gray-500">Email:</span>{" "}
                  {selectedEmployee.email || "---"}
                </p>
                <p>
                  <span className="text-gray-500">Função:</span>{" "}
                  {selectedEmployee.function?.functionName || "---"}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
