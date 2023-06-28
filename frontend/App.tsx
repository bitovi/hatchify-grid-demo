// hatchify-app/frontend/App.tsx
import {
  hatchifyReact,
  MuiProvider,
  createJsonapiClient,
} from "@hatchifyjs/react";
import { Document } from "../schemas/Document";

export const hatchedReact = hatchifyReact(
  { Document },
  createJsonapiClient("http://hatchify-grid-demo.bitovi-sandbox.com:3000/api", {
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
