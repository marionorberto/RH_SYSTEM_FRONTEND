// src/pages/Employees/CreateEmployee.tsx
import { useState } from "react";
import { useNavigate } from "react-router";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import Button from "../../components/ui/button/Button";
import Input from "../../components/form/input/InputField";
import Label from "../../components/form/Label";
import Select from "../../components/form/Select";

// Dados mockados para selects
const mockNationalities = [
  { id: "1", name: "Angolana" },
  { id: "2", name: "Brasileira" },
  { id: "3", name: "Portuguesa" },
];

const mockFunctions = [
  { id: "1", name: "Desenvolvedor Sênior" },
  { id: "2", name: "Analista de RH" },
  { id: "3", name: "Analista Financeiro" },
];

const mockCategories = [
  { id: "1", name: "Categoria A" },
  { id: "2", name: "Categoria B" },
  { id: "3", name: "Categoria C" },
];

const mockBanks = [
  { id: "1", name: "Banco Angolano de Investimentos" },
  { id: "2", name: "Banco de Poupança e Crédito" },
];

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
  const [loading, setLoading] = useState(false);
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

  const handleInputChange = (field: keyof EmployeeFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateSection = (section: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (section === 1) {
      if (!formData.employee_name)
        newErrors.employee_name = "Nome é obrigatório";
      if (!formData.motherName)
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

  const handleNext = () => {
    if (validateSection(currentSection)) {
      setCurrentSection(currentSection + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentSection(currentSection - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      console.log("Funcionário criado:", formData);
      setLoading(false);
      navigate("/employees");
    }, 1500);
  };

  const renderSection = () => {
    switch (currentSection) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
              Informações Pessoais
            </h3>

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
              </div>
              <div>
                <Label required>Gênero</Label>
                <Select
                  options={genderOptions}
                  value={formData.gender}
                  onChange={(value) => handleInputChange("gender", value)}
                  placeholder="Selecione"
                />
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
                  options={mockNationalities.map((n) => ({
                    value: n.id,
                    label: n.name,
                  }))}
                  value={formData.nationalityId}
                  onChange={(value) =>
                    handleInputChange("nationalityId", value)
                  }
                  placeholder="Selecione"
                />
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

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <Label>Função</Label>
                <Select
                  options={mockFunctions.map((f) => ({
                    value: f.id,
                    label: f.name,
                  }))}
                  value={formData.functionId}
                  onChange={(value) => handleInputChange("functionId", value)}
                  placeholder="Selecione"
                />
              </div>
              <div>
                <Label>Categoria</Label>
                <Select
                  options={mockCategories.map((c) => ({
                    value: c.id,
                    label: c.name,
                  }))}
                  value={formData.categoryId}
                  onChange={(value) => handleInputChange("categoryId", value)}
                  placeholder="Selecione"
                />
              </div>
              <div>
                <Label>Banco</Label>
                <Select
                  options={mockBanks.map((b) => ({
                    value: b.id,
                    label: b.name,
                  }))}
                  value={formData.bankId}
                  onChange={(value) => handleInputChange("bankId", value)}
                  placeholder="Selecione"
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
                <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.estado}
                    onChange={(e) =>
                      handleInputChange("estado", e.target.checked)
                    }
                    className="w-4 h-4"
                  />
                  <span className="text-sm">Funcionário Ativo</span>
                </label>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <PageMeta title="Criar Funcionário | Sistema RH" />
      <PageBreadcrumb pageTitle="Criar Funcionário" />

      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex-1 text-center">
                <div
                  className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center text-sm font-medium ${
                    currentSection >= step
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-500 dark:bg-gray-700"
                  }`}
                >
                  {step}
                </div>
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
