// hatchify-app/frontend/App.tsx
import {
  hatchifyReact,
  MuiProvider,
  createJsonapiClient,
} from "@hatchifyjs/react";
const backend_url = import.meta.env.VITE_BACKEND_URL;

export const hatchedReact = hatchifyReact(
  { Document },
  createJsonapiClient(backend_url, {
    Document: { endpoint: "documents" },
  })
);

const DocumentList = hatchedReact.components.Document.List;

const App: React.FC = () => {
  return (
    <MuiProvider>
      <DocumentList />
    </MuiProvider>
  );
};

export default App;
