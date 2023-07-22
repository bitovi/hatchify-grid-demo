import { Button, Icon, IconButton, TextField } from "@mui/material";

export function FiltersRow({ selected }: { selected: string[] }) {
  return (
    <div
      style={{
        paddingLeft: 15,
        paddingRight: 15,
        alignItems: "center",
        justifyContent: "space-between",
        display: "flex",
      }}
    >
      <div style={{ width: 400 }}>
        <TextField
          placeholder="Search for files"
          variant="outlined"
          fullWidth
          InputProps={{
            startAdornment: (
              <Icon className="material-icons" sx={{ color: "grey" }}>
                search
              </Icon>
            ),
          }}
        />
      </div>
      <div>
        <Button
          variant="contained"
          color="primary"
          startIcon={
            <Icon className="material-icons" sx={{ color: "white" }}>
              add
            </Icon>
          }
          onClick={() => alert(`selected ids: ${selected.join(",")}`)}
        >
          Add File to Claims
        </Button>
        <Button
          variant="outlined"
          color="inherit"
          style={{ color: "grey", marginLeft: 10 }}
          startIcon={
            <Icon className="material-icons" sx={{ color: "grey" }}>
              filter_alt
            </Icon>
          }
          endIcon={
            <Icon className="material-icons" sx={{ color: "grey" }}>
              arrow_drop_down
            </Icon>
          }
        >
          Filter
        </Button>
      </div>
    </div>
  );
}

export function DocumentDate({ value, record, attributeSchema }: any) {
  const date = new Date(value);
  const yyyy = date.getFullYear();
  const mm = ("0" + (date.getMonth() + 1)).slice(-2);
  const dd = ("0" + date.getDate()).slice(-2);
  const hh = (date.getHours() + 24) % 12 || 12;
  const min = date.getMinutes();
  const ampm = date.getHours() >= 12 ? "pm" : "am";
  return (
    <span
      style={{ color: "#818D96" }}
    >{`${yyyy}-${mm}-${dd} ${hh}:${min} ${ampm}`}</span>
  );
}

export function DocumentStatus({ value, record, attributeSchema }: any) {
  return (
    <div
      style={{
        backgroundColor: "#EFF1F1",
        padding: "5px 10px",
        borderRadius: 5,
        display: "inline-flex",
        alignItems: "center",
      }}
    >
      {value}
    </div>
  );
}

export function DocumentActions({ record }: any) {
  return (
    <>
      <IconButton
        className="material-icons"
        sx={{ color: "grey" }}
        onClick={() => console.log(record)}
      >
        download
      </IconButton>
      <IconButton
        className="material-icons"
        sx={{ color: "grey" }}
        onClick={() => console.log(record)}
      >
        visibility
      </IconButton>
    </>
  );
}
