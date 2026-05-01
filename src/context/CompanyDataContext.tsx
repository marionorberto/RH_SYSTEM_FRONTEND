// frontend/src/context/CompanyDataContext.tsx
import React, { createContext, ReactNode } from "react";
import { useCompanyData } from "../hooks/useCompanyData";
import { ICompanyData } from "../services/company-data.service";

interface CompanyDataContextType {
  companyData: ICompanyData | null;
  loading: boolean;
  error: string | null;
  fetchCompanyData: () => Promise<void>;
  createCompanyData: (
    data: Partial<ICompanyData>,
  ) => Promise<ICompanyData | null>;
  updateCompanyData: (
    data: Partial<ICompanyData>,
  ) => Promise<ICompanyData | null>;
  updateLogo: (base64Logo: string) => Promise<ICompanyData | null>;
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
}

const CompanyDataContext = createContext<CompanyDataContextType | undefined>(
  undefined,
);

export const CompanyDataProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const companyDataHook = useCompanyData();

  return (
    <CompanyDataContext.Provider value={companyDataHook}>
      {children}
    </CompanyDataContext.Provider>
  );
};

export const useCompanyDataContext = () => {
  const context = React.useContext(CompanyDataContext);
  if (context === undefined) {
    throw new Error(
      "useCompanyDataContext must be used within a CompanyDataProvider",
    );
  }
  return context;
};
