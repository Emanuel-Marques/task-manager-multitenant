import { getTenanant } from "@/services/tenant";
import { headers } from "next/headers";
import TaskLists from "./components/task-lists";
export default async function Page() { 
 // Pega o cabeçalho "host" da requisição
  // Isso é útil para saber em qual domínio a aplicação está rodando
  const headersList = await headers();
  const host = headersList.get("host")?.split(":")[0];

  // Verifica se o host foi encontrado
  if (!host) return null;

  const tenant = await getTenanant(host);
  // Verifica se o tenant foi encontrado
  if (!tenant) return null;

  return (
    <div style={{ minHeight: "100vh", backgroundColor: `${tenant?.mainColor}`, color: "#FFF" }}>
      <h1>Página Show</h1>
      <p>HOST: {host}</p>
      <p>Nome do cliente: {tenant?.name}</p>
      <TaskLists tenantId={tenant.id}/>
    </div>
  );
}