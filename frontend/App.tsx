// hatchify-app/frontend/App.tsx
import { useState } from "react";
import { createTheme } from "@mui/material";
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
  FiltersRow,
} from "./components/DocumentTable";

const backend_url =
  // @ts-expect-error
  import.meta.env.VITE_BACKEND_URL || "http://localhost:3000/api";

export const hatchedReact = hatchifyReact(
  // @ts-expect-error
  { Document },
  createJsonapiClient(backend_url, {
    Document: { endpoint: "documents" },
  })
);

const DocumentList = hatchedReact.components.Document.List;
const DocumentExtraColumn = hatchedReact.components.Document.ExtraColumn;
const DocumentColumn = hatchedReact.components.Document.Column;
const DocumentEmptyList = hatchedReact.components.Document.EmptyList;

const App: React.FC = () => {
  const [selected, setSelected] = useState<string[]>([]);

  return (
    <MuiProvider theme={theme}>
      <FiltersRow selected={selected} />
      <DocumentList
        selectable
        onSelectionChange={(selected) => setSelected(selected)}
      >
        <DocumentColumn attribute="name" />
        <DocumentColumn attribute="date" renderValue={DocumentDate} />
        <DocumentColumn attribute="status" ValueComponent={DocumentStatus} />
        <DocumentExtraColumn label="Action" ValueComponent={DocumentActions} />
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
          "&:nth-child(1)": {
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
