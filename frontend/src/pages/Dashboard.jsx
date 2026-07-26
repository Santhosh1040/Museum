import { useEffect, useState } from "react";

import api from "../api/api";

import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";

import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import CollectionsIcon from "@mui/icons-material/Collections";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import CategoryIcon from "@mui/icons-material/Category";

function Dashboard() {
  const [dashboard, setDashboard] = useState({
    total_artists: 0,
    total_artworks: 0,
    total_departments: 0,
    total_classifications: 0,
    recent_artists: [],
    recent_artworks: [],
  });

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const response = await api.get("/dashboard/");
      setDashboard(response.data);
    } catch (error) {
      console.error("Failed to load dashboard", error);
    }
  };

  const stats = [
    {
      title: "Total artists",
      value: dashboard.total_artists,
      icon: PeopleAltIcon,
      color: "#1a73e8",
      bg: "#e8f0fe",
    },
    {
      title: "Total artworks",
      value: dashboard.total_artworks,
      icon: CollectionsIcon,
      color: "#0f9d58",
      bg: "#e6f4ea",
    },
    {
      title: "Departments",
      value: dashboard.total_departments,
      icon: AccountTreeIcon,
      color: "#e8710a",
      bg: "#fef1e0",
    },
    {
      title: "Classifications",
      value: dashboard.total_classifications,
      icon: CategoryIcon,
      color: "#9334e6",
      bg: "#f3e8fd",
    },
  ];

  return (
    <Box
      sx={{
        maxWidth: 1300,
        mx: "auto",
        mt: 5,
        px: 2,
      }}
    >
      <Typography
        variant="h3"
        sx={{
          fontWeight: 700,
          letterSpacing: "-0.5px",
          mb: 0.5,
        }}
      >
        Museum Dashboard
      </Typography>

      <Typography
        variant="body2"
        color="text.secondary"
        mb={4}
      >
        Overview of the collection currently stored in the database.
      </Typography>

      <Grid container spacing={3} mb={5}>
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <Grid
              key={item.title}
              size={{ xs: 12, sm: 6, md: 3 }}
            >
              <Card
                elevation={0}
                sx={{
                  borderRadius: 3,
                  border: "1px solid",
                  borderColor: "divider",
                  transition: "box-shadow 0.2s ease",
                  "&:hover": {
                    boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
                  },
                }}
              >
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      mb: 1.5,
                    }}
                  >
                    <Typography
                      variant="subtitle2"
                      color="text.secondary"
                      fontWeight={500}
                    >
                      {item.title}
                    </Typography>

                    <Box
                      sx={{
                        width: 36,
                        height: 36,
                        borderRadius: 2,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: item.bg,
                      }}
                    >
                      <Icon
                        sx={{
                          fontSize: 20,
                          color: item.color,
                        }}
                      />
                    </Box>
                  </Box>

                  <Typography
                    variant="h4"
                    fontWeight={700}
                  >
                    {item.value.toLocaleString()}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper
            elevation={0}
            sx={{
              p: 2.5,
              borderRadius: 3,
              border: "1px solid",
              borderColor: "divider",
            }}
          >
            <Typography
              variant="h6"
              fontWeight={600}
              mb={2}
            >
              Recent artists
            </Typography>

            <Table size="small">
              <TableHead>
                <TableRow
                  sx={{
                    "& th": {
                      backgroundColor: "grey.50",
                      color: "text.secondary",
                      fontWeight: 600,
                      borderBottom: "none",
                    },
                  }}
                >
                  <TableCell>Artist ID</TableCell>
                  <TableCell>Name</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {dashboard.recent_artists.map((artist) => (
                  <TableRow
                    key={artist.id}
                    hover
                  >
                    <TableCell
                      sx={{
                        color: "text.secondary",
                      }}
                    >
                      {artist.artist_id}
                    </TableCell>

                    <TableCell
                      sx={{
                        fontWeight: 500,
                      }}
                    >
                      {artist.name}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Paper
            elevation={0}
            sx={{
              p: 2.5,
              borderRadius: 3,
              border: "1px solid",
              borderColor: "divider",
            }}
          >
            <Typography
              variant="h6"
              fontWeight={600}
              mb={2}
            >
              Recent artworks
            </Typography>

            <Table size="small">
              <TableHead>
                <TableRow
                  sx={{
                    "& th": {
                      backgroundColor: "grey.50",
                      color: "text.secondary",
                      fontWeight: 600,
                      borderBottom: "none",
                    },
                  }}
                >
                  <TableCell>Artwork ID</TableCell>
                  <TableCell>Title</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {dashboard.recent_artworks.map((artwork) => (
                  <TableRow
                    key={artwork.id}
                    hover
                  >
                    <TableCell
                      sx={{
                        color: "text.secondary",
                      }}
                    >
                      {artwork.artwork_id}
                    </TableCell>

                    <TableCell
                      sx={{
                        fontWeight: 500,
                        maxWidth: 320,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {artwork.title || artwork.name || "-"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Dashboard;