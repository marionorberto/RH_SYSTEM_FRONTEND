// src/components/CompanyProfile/CompanySocialCard.tsx
import { useModal } from "../../hooks/useModal";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import { useEffect, useState } from "react";

interface ICompanySocial {
  linkedin: string;
  instagram: string;
  whatsapp: string;
}

// Dados mockados
const mockSocialData: ICompanySocial = {
  linkedin: "https://linkedin.com/company/minhaempresa",
  instagram: "https://instagram.com/minhaempresa",
  whatsapp: "+244 923 456 789",
};

export default function CompanySocialCard() {
  const { isOpen, openModal, closeModal } = useModal();
  const [socialData, setSocialData] = useState<ICompanySocial | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<ICompanySocial | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSocialData(mockSocialData);
      setFormData(mockSocialData);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleInputChange = (field: keyof ICompanySocial, value: string) => {
    setFormData((prev) => (prev ? { ...prev, [field]: value } : null));
  };

  const handleSave = () => {
    console.log("Salvando redes sociais...", formData);
    setSocialData(formData);
    closeModal();
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
              Redes Sociais
            </h4>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  LinkedIn
                </p>
                <a
                  href={socialData?.linkedin || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
                >
                  {socialData?.linkedin ?? "---"}
                </a>
              </div>

              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Instagram
                </p>
                <a
                  href={socialData?.instagram || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-pink-600 hover:underline dark:text-pink-400"
                >
                  {socialData?.instagram ?? "---"}
                </a>
              </div>

              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  WhatsApp
                </p>
                <a
                  href={`https://wa.me/${socialData?.whatsapp?.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-green-600 hover:underline dark:text-green-400"
                >
                  {socialData?.whatsapp ?? "---"}
                </a>
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
              Editar Redes Sociais
            </h4>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
              Atualize os links das redes sociais da empresa
            </p>
          </div>
          <form className="flex flex-col">
            <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3">
              <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                <div className="col-span-2">
                  <Label>LinkedIn</Label>
                  <Input
                    type="url"
                    value={formData?.linkedin || ""}
                    onChange={(e) =>
                      handleInputChange("linkedin", e.target.value)
                    }
                    placeholder="https://linkedin.com/company/empresa"
                  />
                </div>

                <div className="col-span-2">
                  <Label>Instagram</Label>
                  <Input
                    type="url"
                    value={formData?.instagram || ""}
                    onChange={(e) =>
                      handleInputChange("instagram", e.target.value)
                    }
                    placeholder="https://instagram.com/empresa"
                  />
                </div>

                <div className="col-span-2">
                  <Label>WhatsApp</Label>
                  <Input
                    type="tel"
                    value={formData?.whatsapp || ""}
                    onChange={(e) =>
                      handleInputChange("whatsapp", e.target.value)
                    }
                    placeholder="+244 923 456 789"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Número com código do país e DDD
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
              <Button size="sm" variant="outline" onClick={closeModal}>
                Cancelar
              </Button>
              <Button size="sm" onClick={handleSave}>
                Salvar Alterações
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}
