// hatchify-app/frontend/App.tsx
import {
  hatchifyReact,
  MuiProvider,
  createJsonapiClient,
} from "@hatchifyjs/react";
import { Document } from "../schemas/Document";
const backend_url = import.meta.env.VITE_BACKEND_URL;
import { Icon } from "@mui/material";

export const hatchedReact = hatchifyReact(
  { Document },
  createJsonapiClient(backend_url, {
    Document: { endpoint: "documents" },
  })
);

const DocumentList = hatchedReact.components.Document.List;
const DocumentExtraColumn = hatchedReact.components.Document.ExtraColumn;
const DocumentEmptyList = hatchedReact.components.Document.EmptyList;

const App: React.FC = () => {
  return (
    <MuiProvider>
      <DocumentList>
        <DocumentEmptyList>
          <div onClick={() => console.log("record")}>
            {"No records to display"}
          </div>
        </DocumentEmptyList>
        <DocumentExtraColumn
          label="Action"
          render={({ record }) => {
            return (
              <div onClick={() => console.log(record)}>
                <Icon className="material-icons" sx={{ color: "grey" }}>
                  visibility
                </Icon>
              </div>
            );
          }}
        />
      </DocumentList>
    </MuiProvider>
  );
};

export default App;
