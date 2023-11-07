// hatchify-app/frontend/App.tsx
import { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material";
import {
  hatchifyReact,
  createJsonapiClient,
  HatchifyProvider,
} from "@hatchifyjs/react";
import schemas from "../schemas/schemas";
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
  createJsonapiClient(backend_url, schemas)
);

const DocumentList = hatchedReact.components.Document.Collection;
const DocumentColumn = hatchedReact.components.Document.Column;
const DocumentEmptyList = hatchedReact.components.Document.Empty;

// hatchedReact.model.Document.findAll({}).then(([documents]) => {
//   documents[0].status
// })

// hatchedReact.model.Document.createOne({
//   attributes: {
//     status: "Pending"
//   }
// });

const App: React.FC = () => {
  const [selected, setSelected] = useState<{ all: boolean; ids: string[] }>({
    all: false,
    ids: [],
  });

  return (
    <ThemeProvider theme={theme}>
      <HatchifyProvider>
        <ActionsRow selected={selected} />
        <DocumentList
          defaultSelected={selected}
          onSelectedChange={(selected) => setSelected(selected)}
        >
          <DocumentColumn
            type="replace"
            field="dueDate"
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
      </HatchifyProvider>
    </ThemeProvider>
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
