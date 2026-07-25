import { useEffect, useState } from "react";
import api from "../api/api";

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  IconButton,
  CircularProgress,
  Box,
  Typography,
  Chip,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonOffIcon from "@mui/icons-material/PersonOff";

import AddArtistDialog from "./AddArtistDialog";
import DeleteArtistDialog from "./DeleteArtistDialog";

function ArtistTable({
  search,
  selectedArtists,
  setSelectedArtists,
}) {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedArtist, setSelectedArtist] = useState(null);

  const [openEditDialog, setOpenEditDialog] = useState(false);

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const fetchArtists = async () => {
    try {

      setLoading(true);

      const response = await api.get("/artists/");

      if (Array.isArray(response.data)) {
        setArtists(response.data);
      } else if (Array.isArray(response.data.artists)) {
        setArtists(response.data.artists);
      } else {
        console.error("Unexpected response format:", response.data);
        setArtists([]);
      }
    } catch (error) {
      console.error("Failed to fetch artists:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArtists();
  }, []);

  const refreshArtists = () => {
    fetchArtists();
  };

  const filteredArtists = artists.filter((artist) => {
    const query = search.toLowerCase();

    return (
      artist.name?.toLowerCase().includes(query) ||
      artist.nationality?.toLowerCase().includes(query)
    );
  });

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 1.5,
          mt: 8,
        }}
      >
        <CircularProgress size={32} thickness={4} />
        <Typography variant="body2" color="text.secondary">
          Loading artists...
        </Typography>
      </Box>
    );
  }

  if (filteredArtists.length === 0) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
          mt: 8,
          color: "text.secondary",
        }}
      >
        <PersonOffIcon sx={{ fontSize: 40, opacity: 0.5 }} />
        <Typography align="center">
          No artists found.
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <TableContainer
        component={Paper}
        elevation={0}
        sx={{
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 2,
        }}
      >
        <Table>

          <TableHead>
            <TableRow
              sx={{
                "& th": {
                  backgroundColor: "grey.50",
                },
              }}
            >
              <TableCell padding="checkbox">
               <Checkbox
  checked={
    filteredArtists.length > 0 &&
    selectedArtists.length === filteredArtists.length
  }
  indeterminate={
    selectedArtists.length > 0 &&
    selectedArtists.length < filteredArtists.length
  }
  onChange={(e) => {
    if (e.target.checked) {
      setSelectedArtists(
        filteredArtists.map((artist) => artist.artist_id)
      );
    } else {
      setSelectedArtists([]);
    }
  }}
/>
              </TableCell>

              <TableCell sx={{ fontWeight: 600 }}>
                ID
              </TableCell>

              <TableCell sx={{ fontWeight: 600 }}>
                Name
              </TableCell>

              <TableCell sx={{ fontWeight: 600 }}>
                Nationality
              </TableCell>

              <TableCell sx={{ fontWeight: 600 }}>
                Gender
              </TableCell>

              <TableCell sx={{ fontWeight: 600 }}>
                Birth
              </TableCell>

              <TableCell
                align="center"
                sx={{ fontWeight: 600 }}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>

            {filteredArtists.map((artist) => (

              <TableRow
                key={artist.artist_id}
                hover
                sx={{
                  "&:last-child td": {
                    borderBottom: 0,
                  },
                }}
              >
               <TableCell padding="checkbox">
  <Checkbox
    checked={selectedArtists.includes(artist.artist_id)}
    onChange={(e) => {
      if (e.target.checked) {
        setSelectedArtists([
          ...selectedArtists,
          artist.artist_id,
        ]);
      } else {
        setSelectedArtists(
          selectedArtists.filter(
            (id) => id !== artist.artist_id
          )
        );
      }
    }}
  />
</TableCell>

                <TableCell>
                  {artist.artist_id}
                </TableCell>

                <TableCell sx={{ fontWeight: 500 }}>
                  {artist.name}
                </TableCell>

                <TableCell>
                  {artist.nationality ? (
                    <Chip
                      label={artist.nationality}
                      size="small"
                      variant="outlined"
                    />
                  ) : (
                    "-"
                  )}
                </TableCell>

                <TableCell>
                  {artist.gender || "-"}
                </TableCell>

                <TableCell>
                  {artist.birth_year || "-"}
                </TableCell>

                <TableCell align="center">
                  <IconButton
                    color="primary"
                    size="small"
                    onClick={() => {

                      setSelectedArtist(artist);

                      setOpenEditDialog(true);

                    }}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>

                  <IconButton
                    color="error"
                    size="small"
                    onClick={() => {

                      setSelectedArtist(artist);

                      setOpenDeleteDialog(true);

                    }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </TableCell>

              </TableRow>

            ))}

          </TableBody>

        </Table>
      </TableContainer>

      <AddArtistDialog
        open={openEditDialog}
        handleClose={() => {

          setOpenEditDialog(false);

          setSelectedArtist(null);

        }}
        artist={selectedArtist}
        refreshArtists={refreshArtists}
      />

      <DeleteArtistDialog
        open={openDeleteDialog}
        handleClose={() => {

          setOpenDeleteDialog(false);

          setSelectedArtist(null);

        }}
        artist={selectedArtist}
        refreshArtists={refreshArtists}
      />
    </>
  );
}

export default ArtistTable;