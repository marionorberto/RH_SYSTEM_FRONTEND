// frontend/src/components/company-profile/CompanyContactCard.tsx
import { useModal } from "../../hooks/useModal";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import { useEffect, useState } from "react";
import { useCompanyData } from "../../hooks/useCompanyData";
import toast from "react-hot-toast";

export default function CompanyContactCard() {
  const { isOpen, openModal, closeModal } = useModal();
  const { companyData, loading, updateCompanyData } = useCompanyData();
  const [formData, setFormData] = useState<Partial<any>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (companyData) {
      setFormData({
        phone1: companyData.phone1 || "",
        phone2: companyData.phone2 || "",
        fax: companyData.fax || "",
        corporativeEmail: companyData.corporativeEmail || "",
        smtpEmail: companyData.smtpEmail || "",
        smtpPassword: companyData.smtpPassword || "",
      });
    }
  }, [companyData]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    const result = await updateCompanyData(formData);
    setIsSaving(false);

    if (result) {
      toast.success("Contactos atualizados com sucesso!");
      closeModal();
    } else {
      toast.error("Erro ao atualizar contactos");
    }
  };

  if (loading) {
    return (
      <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 rounded w-1/4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex-1">
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
              Contactos
            </h4>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Telefone Principal
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {companyData?.phone1 ?? "---"}
                </p>
              </div>

              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Telefone Secundário
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {companyData?.phone2 ?? "---"}
                </p>
              </div>

              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Fax
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {companyData?.fax ?? "---"}
                </p>
              </div>

              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Email Corporativo
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {companyData?.corporativeEmail ?? "---"}
                </p>
              </div>

              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  SMTP Email
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {companyData?.smtpEmail ?? "---"}
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={openModal}
            className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
          >
            <svg
              className="fill-current"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M15.0911 2.78206C14.2125 1.90338 12.7878 1.90338 11.9092 2.78206L4.57524 10.116C4.26682 10.4244 4.0547 10.8158 3.96468 11.2426L3.31231 14.3352C3.25997 14.5833 3.33653 14.841 3.51583 15.0203C3.69512 15.1996 3.95286 15.2761 4.20096 15.2238L7.29355 14.5714C7.72031 14.4814 8.11172 14.2693 8.42013 13.9609L15.7541 6.62695C16.6327 5.74827 16.6327 4.32365 15.7541 3.44497L15.0911 2.78206ZM12.9698 3.84272C13.2627 3.54982 13.7376 3.54982 14.0305 3.84272L14.6934 4.50563C14.9863 4.79852 14.9863 5.2734 14.6934 5.56629L14.044 6.21573L12.3204 4.49215L12.9698 3.84272ZM11.2597 5.55281L5.6359 11.1766C5.53309 11.2794 5.46238 11.4099 5.43238 11.5522L5.01758 13.5185L6.98394 13.1037C7.1262 13.0737 7.25666 13.003 7.35947 12.9002L12.9833 7.27639L11.2597 5.55281Z"
                fill=""
              />
            </svg>
            Editar
          </button>
        </div>
      </div>

      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Editar Contactos
            </h4>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
              Atualize as informações de contacto da empresa
            </p>
          </div>
          <form className="flex flex-col">
            <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3">
              <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                <div className="col-span-2 lg:col-span-1">
                  <Label>Telefone Principal</Label>
                  <Input
                    type="tel"
                    value={formData?.phone1 || ""}
                    onChange={(e) =>
                      handleInputChange("phone1", e.target.value)
                    }
                    placeholder="+244 222 123 456"
                  />
                </div>

                <div className="col-span-2 lg:col-span-1">
                  <Label>Telefone Secundário</Label>
                  <Input
                    type="tel"
                    value={formData?.phone2 || ""}
                    onChange={(e) =>
                      handleInputChange("phone2", e.target.value)
                    }
                    placeholder="+244 923 456 788"
                  />
                </div>

                <div className="col-span-2 lg:col-span-1">
                  <Label>Fax</Label>
                  <Input
                    type="tel"
                    value={formData?.fax || ""}
                    onChange={(e) => handleInputChange("fax", e.target.value)}
                    placeholder="+244 222 123 457"
                  />
                </div>

                <div className="col-span-2 lg:col-span-1">
                  <Label>Email Corporativo</Label>
                  <Input
                    type="email"
                    value={formData?.corporativeEmail || ""}
                    onChange={(e) =>
                      handleInputChange("corporativeEmail", e.target.value)
                    }
                    placeholder="geral@empresa.com"
                  />
                </div>

                <div className="col-span-2 lg:col-span-1">
                  <Label>SMTP Email</Label>
                  <Input
                    type="email"
                    value={formData?.smtpEmail || ""}
                    onChange={(e) =>
                      handleInputChange("smtpEmail", e.target.value)
                    }
                    placeholder="noreply@empresa.com"
                  />
                </div>

                <div className="col-span-2 lg:col-span-1">
                  <Label>SMTP Password</Label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      value={formData?.smtpPassword || ""}
                      onChange={(e) =>
                        handleInputChange("smtpPassword", e.target.value)
                      }
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 flex items-center pr-3"
                    >
                      {showPassword ? (
                        <svg
                          className="w-5 h-5 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="w-5 h-5 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
              <Button
                size="sm"
                variant="outline"
                onClick={closeModal}
                disabled={isSaving}
              >
                Cancelar
              </Button>
              <Button size="sm" onClick={handleSave} disabled={isSaving}>
                {isSaving ? "Salvando..." : "Salvar Alterações"}
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}
