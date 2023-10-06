// hatchify-app/frontend/App.tsx
import { useState } from "react";
import { createTheme } from "@mui/material";
import { v2ToV1 } from "@hatchifyjs/core";
import {
  hatchifyReact,
  MuiProvider,
  createJsonapiClient,
} from "@hatchifyjs/react";
import { Document } from "../schemas/Document";
import {
  DocumentStatus,
  DocumentActions,
  DocumentDate,
  ActionsRow,
} from "./components/DocumentTable";

const backend_url =
  // @ts-expect-error
  import.meta.env.VITE_BACKEND_URL || "http://localhost:3000/api";

export const hatchedReact = hatchifyReact(
  v2ToV1({ Document }),
  createJsonapiClient(backend_url, {
    Document: { endpoint: "documents" },
  })
);

const DocumentList = hatchedReact.components.Document.Collection;
const DocumentColumn = hatchedReact.components.Document.Column;
const DocumentEmptyList = hatchedReact.components.Document.Empty;

const App: React.FC = () => {
  const [selected, setSelected] = useState<{ all: boolean; ids: string[] }>({
    all: false,
    ids: [],
  });

  return (
    <MuiProvider theme={theme}>
      <ActionsRow selected={selected} />
      <DocumentList
        defaultSelected={selected}
        onSelectedChange={(selected) => setSelected(selected)}
      >
        <DocumentColumn
          type="replace"
          field="date"
          renderValue={DocumentDate}
        />
        <DocumentColumn
          type="replace"
          field="status"
          ValueComponent={DocumentStatus}
        />
        <DocumentColumn
          type="append"
          label="Action"
          ValueComponent={DocumentActions}
        />
        <DocumentEmptyList>No records to display</DocumentEmptyList>
      </DocumentList>
    </MuiProvider>
  );
};

export default App;

const theme = createTheme({
  components: {
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: "#F4F6F8",
          "& th": {
            color: "#818D96",
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          padding: "8px",
          "&:nth-of-type(1)": {
            width: 40,
          },
          "&:last-child": {
            textAlign: "right",
          },
        },
      },
    },
  },
});
