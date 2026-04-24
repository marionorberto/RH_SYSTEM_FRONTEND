import { useAuth } from "../context/AuthContext";

export default function SidebarWidget() {
  const {
    user,
    signOut,
  }: {
    user: {
      id: string;
      username: string;
      firstname: string;
      lastname: string;
      email: string;
    };
  } = useAuth();

  return (
    <div
      className={`
        mx-auto mb-10 w-full max-w-60 rounded-2xl bg-gray-50 px-4 py-5 text-center dark:bg-white/[0.03]`}
    >
      <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">
        #Alerta
      </h3>
      <p className="mb-4 text-gray-500 text-theme-sm dark:text-gray-400">
        Cerifique que salvou tudo, antes de sair!
      </p>
      <a
        href="/signin"
        onClick={signOut}
        className="flex items-center justify-center p-3 font-medium text-white rounded-lg bg-green-500 text-theme-sm hover:bg-green-600"
      >
        Sair
      </a>
    </div>
  );
}
