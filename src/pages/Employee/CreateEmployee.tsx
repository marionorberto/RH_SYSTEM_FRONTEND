// src/pages/Employees/CreateEmployee.tsx
import { useState } from "react";
import { useNavigate } from "react-router";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import Button from "../../components/ui/button/Button";
import Input from "../../components/form/input/InputField";
import Label from "../../components/form/Label";
import Select from "../../components/form/Select";
import { useEmployees } from "../../hooks/useEmployees";
import { useFormData } from "../../hooks/useFormData";
import { Toaster } from "react-hot-toast";

const genderOptions = [
  { value: "MASCULINO", label: "Masculino" },
  { value: "FEMININO", label: "Feminino" },
];

const civilStateOptions = [
  { value: "SOLTEIRO(A)", label: "Solteiro(a)" },
  { value: "CASADO(A)", label: "Casado(a)" },
  { value: "VIÚVO(A)", label: "Viúvo(a)" },
];

const documentTypeOptions = [
  { value: "BI", label: "Bilhete de Identidade" },
  { value: "PASSAPORTE", label: "Passaporte" },
  { value: "CARTAO_RESIDENTE", label: "Cartão de Residente" },
  { value: "CARTA_CONDUCAO", label: "Carta de Condução" },
];

const academicLevelOptions = [
  { value: "ENSINO_BASE", label: "Ensino Base" },
  { value: "ENSINO_MEDIO", label: "Ensino Médio" },
  { value: "FREQUENCIA_UNIVERSITARIA", label: "Frequência Universitária" },
  { value: "LICENCIADO", label: "Licenciado" },
  { value: "MESTRADO", label: "Mestrado" },
  { value: "DOUTORAMENTO", label: "Doutoramento" },
];

interface EmployeeFormData {
  employee_name: string;
  fatherName: string;
  motherName: string;
  birthday: string;
  gender: string;
  civilState: string;
  nationalityId: string;
  typeDoc1: string;
  docNumber1: string;
  typeDoc2: string;
  docNumber2: string;
  academic_level: string;
  telefone1: string;
  telefone2: string;
  email: string;
  linkedin: string;
  whatsapp: string;
  instagram: string;
  street: string;
  neighbourhood: string;
  houseNumber: string;
  functionId: string;
  categoryId: string;
  bankId: string;
  numSegsocial: string;
  numContaBanc: string;
  iBanknta: string;
  estado: boolean;
}

export default function CreateEmployee() {
  const navigate = useNavigate();
  const { createEmployee, loading: submitLoading } = useEmployees();
  const {
    functions,
    banks,
    categories,
    nationalities,
    loading: formDataLoading,
  } = useFormData();
  const [currentSection, setCurrentSection] = useState(1);
  const [formData, setFormData] = useState<EmployeeFormData>({
    employee_name: "",
    fatherName: "",
    motherName: "",
    birthday: "",
    gender: "",
    civilState: "",
    nationalityId: "",
    typeDoc1: "",
    docNumber1: "",
    typeDoc2: "",
    docNumber2: "",
    academic_level: "",
    telefone1: "",
    telefone2: "",
    email: "",
    linkedin: "",
    whatsapp: "",
    instagram: "",
    street: "",
    neighbourhood: "",
    houseNumber: "",
    functionId: "",
    categoryId: "",
    bankId: "",
    numSegsocial: "",
    numContaBanc: "",
    iBanknta: "",
    estado: true,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: keyof EmployeeFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateSection = (section: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (section === 1) {
      if (!formData.employee_name.trim())
        newErrors.employee_name = "Nome é obrigatório";
      if (!formData.motherName.trim())
        newErrors.motherName = "Nome da mãe é obrigatório";
      if (!formData.birthday)
        newErrors.birthday = "Data de nascimento é obrigatória";
      if (!formData.gender) newErrors.gender = "Gênero é obrigatório";
      if (!formData.nationalityId)
        newErrors.nationalityId = "Nacionalidade é obrigatória";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
    }
    if (validateSection(currentSection)) {
      setCurrentSection(currentSection + 1);
      setErrors({});
    }
  };

  const handlePrevious = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
    }
    setCurrentSection(currentSection - 1);
    setErrors({});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateSection(4)) {
      return;
    }

    setIsSubmitting(true);

    const employeeData = {
      ...formData,
      fatherName: formData.fatherName || null,
      civilState: formData.civilState || null,
      typeDoc1: formData.typeDoc1 || null,
      docNumber1: formData.docNumber1 || null,
      typeDoc2: formData.typeDoc2 || null,
      docNumber2: formData.docNumber2 || null,
      academic_level: formData.academic_level || null,
      telefone2: formData.telefone2 || null,
      linkedin: formData.linkedin || null,
      whatsapp: formData.whatsapp || null,
      instagram: formData.instagram || null,
      street: formData.street || null,
      neighbourhood: formData.neighbourhood || null,
      houseNumber: formData.houseNumber || null,
      functionId: formData.functionId || null,
      categoryId: formData.categoryId || null,
      bankId: formData.bankId || null,
      numSegsocial: formData.numSegsocial || null,
      numContaBanc: formData.numContaBanc || null,
      iBanknta: formData.iBanknta || null,
    };

    const result = await createEmployee(employeeData);
    setIsSubmitting(false);

    if (result) {
      navigate("/employees");
    }
  };

  const renderSection = () => {
    switch (currentSection) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
              Informações Pessoais
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Preencha os dados pessoais do funcionário. Campos com * são
              obrigatórios.
            </p>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <Label required>Nome Completo</Label>
                <Input
                  value={formData.employee_name}
                  onChange={(e) =>
                    handleInputChange("employee_name", e.target.value)
                  }
                  placeholder="Digite o nome completo"
                  error={!!errors.employee_name}
                />
                {errors.employee_name && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.employee_name}
                  </p>
                )}
              </div>
              <div>
                <Label>Nome do Pai</Label>
                <Input
                  value={formData.fatherName}
                  onChange={(e) =>
                    handleInputChange("fatherName", e.target.value)
                  }
                  placeholder="Digite o nome do pai"
                />
              </div>
              <div>
                <Label required>Nome da Mãe</Label>
                <Input
                  value={formData.motherName}
                  onChange={(e) =>
                    handleInputChange("motherName", e.target.value)
                  }
                  placeholder="Digite o nome da mãe"
                  error={!!errors.motherName}
                />
                {errors.motherName && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.motherName}
                  </p>
                )}
              </div>
              <div>
                <Label required>Data de Nascimento</Label>
                <Input
                  type="date"
                  value={formData.birthday}
                  onChange={(e) =>
                    handleInputChange("birthday", e.target.value)
                  }
                  error={!!errors.birthday}
                />
                {errors.birthday && (
                  <p className="mt-1 text-sm text-red-600">{errors.birthday}</p>
                )}
              </div>
              <div>
                <Label required>Gênero</Label>
                <Select
                  options={genderOptions}
                  value={formData.gender}
                  onChange={(value) => handleInputChange("gender", value)}
                  placeholder="Selecione"
                />
                {errors.gender && (
                  <p className="mt-1 text-sm text-red-600">{errors.gender}</p>
                )}
              </div>
              <div>
                <Label>Estado Civil</Label>
                <Select
                  options={civilStateOptions}
                  value={formData.civilState}
                  onChange={(value) => handleInputChange("civilState", value)}
                  placeholder="Selecione"
                />
              </div>
              <div>
                <Label required>Nacionalidade</Label>
                <Select
                  options={nationalities.map((n) => ({
                    value: n.id,
                    label: n.nomeNacionalidade,
                  }))}
                  value={formData.nationalityId}
                  onChange={(value) =>
                    handleInputChange("nationalityId", value)
                  }
                  placeholder="Selecione"
                  disabled={formDataLoading}
                />
                {errors.nationalityId && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.nationalityId}
                  </p>
                )}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
              Documentos e Endereço
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Informações documentais e de endereço (opcionais).
            </p>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <Label>Tipo de Documento 1</Label>
                <Select
                  options={documentTypeOptions}
                  value={formData.typeDoc1}
                  onChange={(value) => handleInputChange("typeDoc1", value)}
                  placeholder="Selecione"
                />
              </div>
              <div>
                <Label>Número do Documento 1</Label>
                <Input
                  value={formData.docNumber1}
                  onChange={(e) =>
                    handleInputChange("docNumber1", e.target.value)
                  }
                  placeholder="Digite o número"
                />
              </div>
              <div>
                <Label>Tipo de Documento 2</Label>
                <Select
                  options={documentTypeOptions}
                  value={formData.typeDoc2}
                  onChange={(value) => handleInputChange("typeDoc2", value)}
                  placeholder="Selecione"
                />
              </div>
              <div>
                <Label>Número do Documento 2</Label>
                <Input
                  value={formData.docNumber2}
                  onChange={(e) =>
                    handleInputChange("docNumber2", e.target.value)
                  }
                  placeholder="Digite o número"
                />
              </div>
              <div>
                <Label>Nível Acadêmico</Label>
                <Select
                  options={academicLevelOptions}
                  value={formData.academic_level}
                  onChange={(value) =>
                    handleInputChange("academic_level", value)
                  }
                  placeholder="Selecione"
                />
              </div>
              <div className="sm:col-span-2">
                <Label>Endereço - Rua</Label>
                <Input
                  value={formData.street}
                  onChange={(e) => handleInputChange("street", e.target.value)}
                  placeholder="Digite a rua"
                />
              </div>
              <div>
                <Label>Bairro</Label>
                <Input
                  value={formData.neighbourhood}
                  onChange={(e) =>
                    handleInputChange("neighbourhood", e.target.value)
                  }
                  placeholder="Digite o bairro"
                />
              </div>
              <div>
                <Label>Número da Casa</Label>
                <Input
                  value={formData.houseNumber}
                  onChange={(e) =>
                    handleInputChange("houseNumber", e.target.value)
                  }
                  placeholder="Digite o número"
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
              Contactos e Redes Sociais
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Informações de contacto do funcionário.
            </p>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <Label>Telefone 1</Label>
                <Input
                  value={formData.telefone1}
                  onChange={(e) =>
                    handleInputChange("telefone1", e.target.value)
                  }
                  placeholder="+244 923 456 789"
                />
              </div>
              <div>
                <Label>Telefone 2</Label>
                <Input
                  value={formData.telefone2}
                  onChange={(e) =>
                    handleInputChange("telefone2", e.target.value)
                  }
                  placeholder="+244 923 456 788"
                />
              </div>
              <div>
                <Label>Email</Label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="email@empresa.com"
                />
              </div>
              <div>
                <Label>WhatsApp</Label>
                <Input
                  value={formData.whatsapp}
                  onChange={(e) =>
                    handleInputChange("whatsapp", e.target.value)
                  }
                  placeholder="+244 923 456 787"
                />
              </div>
              <div>
                <Label>LinkedIn</Label>
                <Input
                  value={formData.linkedin}
                  onChange={(e) =>
                    handleInputChange("linkedin", e.target.value)
                  }
                  placeholder="https://linkedin.com/in/usuario"
                />
              </div>
              <div>
                <Label>Instagram</Label>
                <Input
                  value={formData.instagram}
                  onChange={(e) =>
                    handleInputChange("instagram", e.target.value)
                  }
                  placeholder="@usuario"
                />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
              Informações Profissionais e Bancárias
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Dados contratuais e bancários do funcionário.
            </p>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <Label>Função</Label>
                <Select
                  options={functions.map((f) => ({
                    value: f.id,
                    label: f.functionName,
                  }))}
                  value={formData.functionId}
                  onChange={(value) => handleInputChange("functionId", value)}
                  placeholder="Selecione"
                  disabled={formDataLoading}
                />
              </div>
              <div>
                <Label>Categoria</Label>
                <Select
                  options={categories.map((c) => ({
                    value: c.id,
                    label: c.categoryName,
                  }))}
                  value={formData.categoryId}
                  onChange={(value) => handleInputChange("categoryId", value)}
                  placeholder="Selecione"
                  disabled={formDataLoading}
                />
              </div>
              <div>
                <Label>Banco</Label>
                <Select
                  options={banks.map((b) => ({
                    value: b.id,
                    label: `${b.bank_name} (${b.sigla})`,
                  }))}
                  value={formData.bankId}
                  onChange={(value) => handleInputChange("bankId", value)}
                  placeholder="Selecione"
                  disabled={formDataLoading}
                />
              </div>
              <div>
                <Label>Número de Segurança Social</Label>
                <Input
                  value={formData.numSegsocial}
                  onChange={(e) =>
                    handleInputChange("numSegsocial", e.target.value)
                  }
                  placeholder="Digite o número"
                />
              </div>
              <div>
                <Label>Número da Conta Bancária</Label>
                <Input
                  value={formData.numContaBanc}
                  onChange={(e) =>
                    handleInputChange("numContaBanc", e.target.value)
                  }
                  placeholder="Digite o número da conta"
                />
              </div>
              <div>
                <Label>IBAN</Label>
                <Input
                  value={formData.iBanknta}
                  onChange={(e) =>
                    handleInputChange("iBanknta", e.target.value)
                  }
                  placeholder="Digite o IBAN"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <input
                    type="checkbox"
                    checked={formData.estado}
                    onChange={(e) =>
                      handleInputChange("estado", e.target.checked)
                    }
                    className="w-4 h-4 text-blue-600 rounded"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Funcionário Ativo
                  </span>
                </label>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const loading = isSubmitting || submitLoading || formDataLoading;

  if (formDataLoading && currentSection === 1) {
    return (
      <>
        <PageMeta title="Criar Funcionário | Sistema RH" />
        <PageBreadcrumb pageTitle="Criar Funcionário" />
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Carregando dados do formulário...</p>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Toaster position="top-right" />
      <PageMeta title="Criar Funcionário | Sistema RH" />
      <PageBreadcrumb pageTitle="Criar Funcionário" />

      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex-1 text-center">
                <button
                  type="button"
                  onClick={() => {
                    if (step < currentSection) {
                      setCurrentSection(step);
                    }
                  }}
                  className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                    currentSection >= step
                      ? "bg-blue-600 text-white cursor-pointer hover:bg-blue-700"
                      : "bg-gray-200 text-gray-500 dark:bg-gray-700 cursor-not-allowed"
                  }`}
                  disabled={step > currentSection}
                >
                  {step}
                </button>
                <p className="mt-2 text-xs text-gray-500">
                  {step === 1 && "Pessoal"}
                  {step === 2 && "Documentos"}
                  {step === 3 && "Contactos"}
                  {step === 4 && "Profissional"}
                </p>
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {renderSection()}

          <div className="flex items-center justify-between gap-3 pt-6 mt-6 border-t border-gray-200 dark:border-gray-700">
            <Button
              type="button"
              size="md"
              variant="outline"
              onClick={() => navigate("/employees")}
              disabled={loading}
            >
              Cancelar
            </Button>
            <div className="flex gap-3">
              {currentSection > 1 && (
                <Button
                  type="button"
                  size="md"
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={loading}
                >
                  Anterior
                </Button>
              )}
              {currentSection < 4 ? (
                <Button
                  type="button"
                  size="md"
                  variant="primary"
                  onClick={handleNext}
                  disabled={loading}
                >
                  Próximo
                </Button>
              ) : (
                <Button
                  type="submit"
                  size="md"
                  variant="primary"
                  disabled={loading}
                >
                  {loading ? "Salvando..." : "Salvar Funcionário"}
                </Button>
              )}
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
