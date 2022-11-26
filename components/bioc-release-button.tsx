import path from "path";
import { useRouter } from "next/router";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Fab from "@mui/material/Fab";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

const bioc_releases = ["3.15", "3.16"];

const FabTheme = createTheme({
  components: {
    // Name of the component
    MuiFab: {
      styleOverrides: {
        // Name of the slot (see <https://mui.com/material-ui/api/fab/#css>)
        root: {
          // Keep floating action button in the bottom right corner while scrolling
          position: "fixed",
          bottom: "25px",
          right: "25px",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        // Name of the slot (see <https://mui.com/material-ui/api/text-field/#css>)
        root: {
          // Add margin on the left of the selectable TextField
          margin: "0 0 0 5px",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        // Name of the slot (see <https://mui.com/material-ui/api/input-base/#css>)
        root: {
          // Color of the text of the selected option
          color: "white",
        },
      },
    },
  },
});

export default function BiocReleaseButton({ defaultValue, options }) {
  const router = useRouter();

  const handleChangeBiocRelease = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const href = `${path.dirname(router.asPath)}/${event.target.value}`;
    router.push(href);
  };

  return (
    <ThemeProvider theme={FabTheme}>
      <Fab color="primary" variant="extended" sx={{ color: "white" }}>
        Release:{" "}
        <TextField
          id="select-release"
          variant="standard"
          select
          defaultValue={defaultValue}
          onChange={handleChangeBiocRelease}
          // helperText="Please select your currency"
        >
          {options.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
      </Fab>
    </ThemeProvider>
  );
}
