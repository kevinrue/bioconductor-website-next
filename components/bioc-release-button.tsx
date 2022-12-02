import { useRouter } from "next/router";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Fab from "@mui/material/Fab";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import {
  mapBiocReleaseToString,
  getBiocReleaseLatestVersion,
} from "./bioc-releases";
import { StringLiteral } from "typescript";

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

const fillUrlTemplate = function (templateUrl: string, release: string) {
  return templateUrl.replaceAll("${release}", release);
};

export default function BiocReleaseButton({
  defaultValue,
  options,
  latest,
  templateUrl,
}: {
  defaultValue: string;
  options: string[];
  latest: string;
  templateUrl: string;
}) {
  const router = useRouter();

  const handleChangeBiocRelease = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    // TODO: convert the latest release release version to 'latest'
    // const release = mapBiocReleaseToString(event.target.value, options, latest);
    const href = fillUrlTemplate(templateUrl, event.target.value);
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
