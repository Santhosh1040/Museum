import { Tabs, Tab, Box } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const currentTab = () => {
    switch (location.pathname) {
      case "/":
        return 0;
      case "/artists":
        return 1;
      case "/artworks":
        return 2;
      default:
        return 0;
    }
  };

  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        borderBottom: "1px solid #e0e0e0",
        px: 2,
      }}
    >
      <Tabs
        value={currentTab()}
        onChange={(event, newValue) => {
          switch (newValue) {
            case 0:
              navigate("/");
              break;

            case 1:
              navigate("/artists");
              break;

            case 2:
              navigate("/artworks");
              break;

            default:
              break;
          }
        }}
        textColor="primary"
        indicatorColor="primary"
      >
        <Tab label="Dashboard" />
        <Tab label="Artists" />
        <Tab label="Artworks" />
      </Tabs>
    </Box>
  );
}

export default Navbar;