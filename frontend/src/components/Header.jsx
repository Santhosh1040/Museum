import { AppBar, Toolbar, Typography, Avatar, Box } from "@mui/material";
import MuseumIcon from "@mui/icons-material/Museum";

function Header() {
  return (
    <AppBar position="static" elevation={1}>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >

        {/* Logo + Title */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <MuseumIcon />

          <Typography
            variant="h6"
            fontWeight="bold"
          >
            Museum Collection Management
          </Typography>
        </Box>


        {/* User */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Avatar
            sx={{
              width: 34,
              height: 34,
            }}
          >
            A
          </Avatar>

          <Typography>
            Admin
          </Typography>

        </Box>

      </Toolbar>
    </AppBar>
  );
}

export default Header;