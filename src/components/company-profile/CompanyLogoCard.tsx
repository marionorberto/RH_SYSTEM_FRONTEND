// src/components/CompanyProfile/CompanyLogoCard.tsx
import { useModal } from "../../hooks/useModal";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
// import Label from "../form/Label";
import { useEffect, useState, useRef } from "react";

interface ICompanyData {
  id: string;
  companyName: string;
  companyNIF: string;
  logotipo64: string | null;
  [key: string]: any;
}

// Dados mockados
const mockCompanyData: ICompanyData = {
  id: "1",
  companyName: "Minha Empresa Ltda",
  companyNIF: "123456789",
  logotipo64: null,
  tickectModel: "Modelo Padrão",
  smtpEmail: "contato@minhaempresa.com",
  smtpPassword: "",
  SocialSecurityPassword: "",
  corporativeEmail: "rh@minhaempresa.com",
  linkedin: "https://linkedin.com/company/minhaempresa",
  whatsapp: "+244 923 456 789",
  instagram: "https://instagram.com/minhaempresa",
  phone1: "+244 222 123 456",
  phone2: "+244 923 456 789",
  street: "Rua 1",
  neighbourhood: "Centro",
  houseNumber: "10",
  fax: "+244 222 123 457",
  postalCode: "1234-567",
  note: "Empresa de tecnologia",
};

export default function CompanyLogoCard() {
  const { isOpen, openModal, closeModal } = useModal();
  const [companyData, setCompanyData] = useState<ICompanyData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedLogo, setSelectedLogo] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Simula carregamento de dados
    const timer = setTimeout(() => {
      setCompanyData(mockCompanyData);
      setSelectedLogo(mockCompanyData.logotipo64);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedLogo(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    console.log("Salvando logotipo...", selectedLogo);
    closeModal();
  };

  if (loading) {
    return (
      <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="w-32 h-32 bg-gray-200 rounded-full"></div>
          <div className="h-4 bg-gray-200 rounded w-32"></div>
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
              Logotipo da Empresa
            </h4>

            <div className="flex flex-col items-center gap-6 sm:flex-row">
              <div className="w-32 h-32 overflow-hidden border border-gray-200 rounded-full dark:border-gray-800 bg-gray-50 flex items-center justify-center">
                {selectedLogo ? (
                  <img
                    src={selectedLogo}
                    alt="Company Logo"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <svg
                    className="w-16 h-16 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                )}
              </div>

              <div className="text-center sm:text-left">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Formatos suportados: PNG, JPG, JPEG (máx. 2MB)
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Tamanho recomendado: 200x200px
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
            Alterar Logotipo
          </button>
        </div>
      </div>

      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[500px] m-4">
        <div className="no-scrollbar relative w-full max-w-[500px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Logotipo da Empresa
            </h4>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
              Faça upload do logotipo da sua empresa
            </p>
          </div>
          <form className="flex flex-col">
            <div className="px-2 pb-3">
              <div className="flex flex-col items-center gap-6">
                <div className="w-40 h-40 overflow-hidden border border-gray-200 rounded-full dark:border-gray-800 bg-gray-50 flex items-center justify-center">
                  {selectedLogo ? (
                    <img
                      src={selectedLogo}
                      alt="Company Logo Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <svg
                      className="w-20 h-20 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  )}
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleLogoChange}
                  className="hidden"
                />

                <Button
                  size="md"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                >
                  Selecionar Imagem
                </Button>
              </div>
            </div>
            <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
              <Button size="sm" variant="outline" onClick={closeModal}>
                Cancelar
              </Button>
              <Button size="sm" onClick={handleSave}>
                Salvar
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}
