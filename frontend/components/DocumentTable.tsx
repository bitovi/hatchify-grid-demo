import { Button, Icon, IconButton } from "@mui/material";

export function ActionsRow({ selected }: { selected: string[] }) {
  return (
    <div
      style={{
        paddingLeft: 15,
        paddingRight: 15,
        alignItems: "center",
        justifyContent: "flex-end",
        display: "flex",
      }}
    >
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
  const min = `${date.getMinutes() > 9 ? "" : 0}${date.getMinutes()}`;
  const ampm = date.getHours() >= 12 ? "pm" : "am";
  return (
    <span
      style={{ color: "#818D96" }}
    >{`${yyyy}-${mm}-${dd} ${hh}:${min} ${ampm}`}</span>
  );
}

export function DocumentStatus({ value, record, attributeSchema }: any) {
  return (
    value && (
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
    )
  );
}

export function DocumentActions({ record }: any) {
  return (
    <>
      <IconButton
        className="material-icons"
        sx={{ color: "grey" }}
        onClick={() => alert(`Download clicked on ${record.name}`)}
      >
        download
      </IconButton>
      <IconButton
        className="material-icons"
        sx={{ color: "grey" }}
        onClick={() => alert(`View clicked on ${record.name}`)}
      >
        visibility
      </IconButton>
    </>
  );
}
