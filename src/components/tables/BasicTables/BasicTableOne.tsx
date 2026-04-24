// import { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHeader,
//   TableRow,
// } from "../../ui/table";
// import Badge from "../../ui/badge/Badge";
// // import { UserIcon } from '../../../icons";
// import { PencilIcon } from "@heroicons/react/24/outline";
// // import { PencilIcon } from "@heroicons/react/24/outline";

// // Mantenha sua interface Order (ou adapte conforme os campos reais do banco)
// interface Order {
//   id: number;
//   user: {
//     firstname: string;
//     lastname: string;
//     username: string;
//     email: string;
//     img: string;
//     active: boolean;
//     role: string;
//   };
//   projectName: string;
//   team: { images: string[] };
//   status: string;
//   budget: string;
// }

// export default function BasicTableOne() {
//   const [orders, setOrders] = useState<Order[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         // Ajuste a URL para o endereço do seu backend NestJS
//         const response = await axios.get(
//           "http://localhost:3000/api/v1/nutriscan/users/all",
//         );

//         console.log(response.data);
//         // Seguindo a estrutura do seu findAll(): response.data.data[0].users
//         const apiUsers = response.data.data[0].users;

//         // Mapeamos os dados do banco para o que a tabela espera
//         console.log("api", apiUsers);
//         const mappedData: Order[] = apiUsers.map((u: any) => ({
//           id: u.id,
//           user: {
//             img: u.img || "/images/user/avatar.png", // fallback se não houver imagem
//             firstname: u.firstname || "---",
//             lastname: u.lastname || "---",
//             username: u.username || "----",
//             email: u.email || "----",
//             role: u.role || "Membro",
//           },
//           projectName: u.projectName || "N/A", // Verifique se esses campos existem no banco
//           team: { images: ["/images/user/user-22.jpg"] },
//           budget: u.budget || "0",
//           status: u.active ? "Active" : "Pending", // Exemplo de lógica de status
//         }));

//         setOrders(mappedData);
//       } catch (error) {
//         console.error("Erro ao buscar usuários:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUsers();
//   }, []);

//   if (loading)
//     return <div className="p-5 text-center">Carregando usuários...</div>;

//   return (
//     <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
//       <div className="max-w-full overflow-x-auto">
//         <Table>
//           <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
//             <TableRow>
//               <TableCell
//                 isHeader
//                 className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
//               >
//                 username
//               </TableCell>
//               <TableCell
//                 isHeader
//                 className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
//               >
//                 Primeiro Nome
//               </TableCell>
//               <TableCell
//                 isHeader
//                 className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
//               >
//                 último Nome
//               </TableCell>
//               <TableCell
//                 isHeader
//                 className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
//               >
//                 Email
//               </TableCell>
//               <TableCell
//                 isHeader
//                 className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
//               >
//                 Status
//               </TableCell>

//               <TableCell
//                 isHeader
//                 className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
//               >
//                 Activar/Desativar
//               </TableCell>
//             </TableRow>
//           </TableHeader>

//           <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
//             {orders.map((order) => (
//               <TableRow key={order.id}>
//                 <TableCell className="px-5 py-4 sm:px-6 text-start">
//                   <div className="flex items-center gap-3">
//                     <div className="w-10 h-10 overflow-hidden rounded-full">
//                       <img
//                         width={40}
//                         height={40}
//                         src={order.user.img}
//                         alt={order.user.username}
//                       />
//                     </div>
//                     <div>
//                       <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
//                         {order.user.username}
//                       </span>
//                       <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
//                         {order.user.role}
//                       </span>
//                     </div>
//                   </div>
//                 </TableCell>
//                 <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
//                   {order.user.firstname}
//                 </TableCell>
//                 <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
//                   {order.user.lastname}
//                 </TableCell>
//                 <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
//                   {order.user.email}
//                 </TableCell>

//                 <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
//                   <Badge
//                     size="sm"
//                     color={order.status === "Active" ? "success" : "warning"}
//                   >
//                     {order.status}
//                   </Badge>
//                 </TableCell>
//                 <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 cursor-pointer">
//                   <Badge size="sm">
//                     <PencilIcon className="h-5 w-5" />
//                   </Badge>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";
import Badge from "../../ui/badge/Badge";
import { PencilIcon } from "@heroicons/react/24/outline";
import ConfirmUserStatusModal from "../../ConfirmUserStatusModal/ConfirmUserStatusModal"; // Ajuste o caminho

// Mantenha sua interface Order (ou adapte conforme os campos reais do banco)
interface Order {
  id: string; // Alterado de number para string para bater com o ID do usuário
  user: {
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    img: string;
    active: boolean;
    role: string;
  };
  projectName: string;
  team: { images: string[] };
  status: string;
  budget: string;
}

export default function BasicTableOne() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  // Estado para o modal
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<{
    id: string;
    name: string;
    currentStatus: boolean;
  } | null>(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:3000/api/v1/nutriscan/users/all",
      );

      console.log("API Response:", response.data);

      const apiUsers = response.data.data[0].users;

      const mappedData: Order[] = apiUsers.map((u: any) => ({
        id: u.id,
        user: {
          img: u.img || "/images/user/avatar.png",
          firstname: u.firstname || "---",
          lastname: u.lastname || "---",
          username: u.username || "----",
          email: u.email || "----",
          active: u.active || false,
          role: u.role || "Membro",
        },
        projectName: u.projectName || "N/A",
        team: { images: ["/images/user/user-22.jpg"] },
        budget: u.budget || "0",
        status: u.active ? "Active" : "Inactive",
      }));

      setOrders(mappedData);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEditClick = (user: Order) => {
    setSelectedUser({
      id: user.id,
      name:
        `${user.user.firstname} ${user.user.lastname}`.trim() ||
        user.user.username,
      currentStatus: user.user.active,
    });
    setModalOpen(true);
  };

  const handleStatusUpdateSuccess = () => {
    // Atualiza o status localmente sem recarregar tudo
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === selectedUser?.id
          ? {
              ...order,
              user: {
                ...order.user,
                active: !selectedUser.currentStatus,
              },
              status: !selectedUser.currentStatus ? "Active" : "Inactive",
            }
          : order,
      ),
    );

    // Ou pode recarregar todos os dados
    // fetchUsers();
  };

  if (loading)
    return <div className="p-5 text-center">Carregando usuários...</div>;

  return (
    <>
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <Table>
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Username
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Primeiro Nome
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Último Nome
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Email
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Status
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Activar/Desativar
                </TableCell>
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 overflow-hidden rounded-full">
                        <img
                          width={40}
                          height={40}
                          src={order.user.img}
                          alt={order.user.username}
                          className="h-10 w-10 object-cover"
                        />
                      </div>
                      <div>
                        <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                          {order.user.username}
                        </span>
                        <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                          {order.user.role}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {order.user.firstname}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {order.user.lastname}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {order.user.email}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <Badge
                      size="sm"
                      color={
                        order.status === "Active"
                          ? "success"
                          : order.status === "Inactive"
                            ? "danger"
                            : "warning"
                      }
                    >
                      {order.status === "Active" ? "Ativo" : "Inativo"}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-start">
                    <button
                      onClick={() => handleEditClick(order)}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                      title={`${order.user.active ? "Desativar" : "Ativar"} usuário`}
                    >
                      <PencilIcon className="h-4 w-4" />
                      <span>{order.user.active ? "Desativar" : "Ativar"}</span>
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Modal de Confirmação */}
      {selectedUser && (
        <ConfirmUserStatusModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          userId={selectedUser.id}
          userName={selectedUser.name}
          currentStatus={selectedUser.currentStatus}
          onSuccess={handleStatusUpdateSuccess}
        />
      )}
    </>
  );
}
