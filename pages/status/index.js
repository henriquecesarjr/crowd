import useSWR from "swr";

async function fetchAPI(key) {
  const response = await fetch(key);
  const responseBody = await response.json();
  return responseBody;
}

export default function StatusPage() {
  return (
    <>
      <h1>Status</h1>
      <UpdatedAt />
      <DatabaseInformations />
    </>
  );
}

function UpdatedAt() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  let updatedAtText = "Carregando...";

  if (!isLoading && data) {
    updatedAtText = new Date(data.updated_at).toLocaleString("pt-BR");
  }

  return <div>Última atualização: {updatedAtText}</div>;
}

function DatabaseInformations() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  let databaseInformations = "Carregando...";

  if (!isLoading && data) {
    databaseInformations = {
      postgresVersion: data.dependencies.database.version,
      maxConnections: data.dependencies.database.max_connections,
      openedConnections: data.dependencies.database.opened_connections,
    };
  }

  return (
    <>
      <h2>Database</h2>
      <hr />
      <div>Versão do postgres: {databaseInformations.postgresVersion}</div>
      <div>
        Número máximo de conexões: {databaseInformations.maxConnections}
      </div>
      <div>Conexões abertas: {databaseInformations.openedConnections}</div>
    </>
  );
}
