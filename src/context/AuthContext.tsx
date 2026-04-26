// frontend/src/context/AuthContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import api from "../services/api-setup";

interface User {
  id: string;
  username: string;
  email: string;
  firstname: string;
  lastname: string;
  role: string;
  roles?: string[];
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  updateUser: (userData: Partial<User>) => void;
  hasRole: (role: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStoredUser();
  }, []);

  const loadStoredUser = async () => {
    const storedUser = localStorage.getItem("@rh:user");
    const token = localStorage.getItem("@rh:token");

    if (storedUser && token) {
      try {
        // Configurar o token no axios para a requisição
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        // Validate token by fetching current user
        const response = await api.get("/users/user");
        console.log("User loaded:", response.data);

        if (response.data && response.data.data) {
          setUser(response.data.data);
        } else if (response.data && response.data.user) {
          setUser(response.data.user);
        } else {
          throw new Error("Invalid user data");
        }
      } catch (error) {
        console.error("Error loading stored user:", error);
        localStorage.removeItem("@rh:token");
        localStorage.removeItem("@rh:user");
        delete api.defaults.headers.common["Authorization"];
        setUser(null);
      }
    }
    setLoading(false);
  };

  const signIn = async (email: string, password: string) => {
    try {
      console.log("Attempting login with:", { email });

      // 1. Fazer login
      const loginResponse = await api.post("/auth/login", { email, password });
      console.log("Login response:", loginResponse.data);

      // Ajustar para a estrutura real da resposta do backend
      const token = loginResponse.data.acess_token;
      const userId = loginResponse.data.userId;
      const username = loginResponse.data.username;
      const userEmail = loginResponse.data.email;
      const role = loginResponse.data.role;

      if (!token) {
        throw new Error("Token não recebido do servidor");
      }

      // Guardar token usando a mesma chave do interceptor
      localStorage.setItem("@rh:token", token);
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      // 2. Buscar dados completos do usuário
      const userResponse = await api.get("/users/user");
      console.log("User data response:", userResponse.data);

      // Ajustar para a estrutura real da resposta
      let userData;
      if (userResponse.data && userResponse.data.data) {
        userData = userResponse.data.data;
      } else if (userResponse.data && userResponse.data.user) {
        userData = userResponse.data.user;
      } else {
        userData = userResponse.data;
      }

      const userInfo: User = {
        id: userId || userData.id,
        username: username || userData.username,
        email: userEmail || userData.email,
        firstname: userData.firstname,
        lastname: userData.lastname,
        role: role,
      };

      localStorage.setItem("@rh:user", JSON.stringify(userInfo));
      setUser(userInfo);

      console.log("Login successful, user:", userInfo);
    } catch (error: any) {
      console.error("SignIn error details:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });

      // Limpar qualquer estado anterior
      localStorage.removeItem("@rh:token");
      localStorage.removeItem("@rh:user");
      delete api.defaults.headers.common["Authorization"];

      // Lançar erro com mensagem amigável
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "Erro ao fazer login. Verifique suas credenciais.";
      throw new Error(errorMessage);
    }
  };

  const signOut = () => {
    localStorage.removeItem("@rh:token");
    localStorage.removeItem("@rh:user");
    delete api.defaults.headers.common["Authorization"];
    setUser(null);
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem("@rh:user", JSON.stringify(updatedUser));
    }
  };

  const hasRole = (role: string): boolean => {
    return user?.roles?.includes(role) || false;
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, signIn, signOut, updateUser, hasRole }}
    >
      {children}
    </AuthContext.Provider>
  );
};
