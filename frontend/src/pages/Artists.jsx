import { useState } from "react";
import { Box, Typography } from "@mui/material";

import SearchBar from "../components/SearchBar";
import ArtistTable from "../components/ArtistTable";
import AddArtistDialog from "../components/AddArtistDialog";
import BulkDeleteDialog from "../components/BulkDeleteDialog";

function Artists() {
  const [search, setSearch] = useState("");

  const [openAddDialog, setOpenAddDialog] = useState(false);

  // Bulk Delete State
  const [selectedArtists, setSelectedArtists] = useState([]);
  const [openBulkDelete, setOpenBulkDelete] = useState(false);

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
        variant="h4"
        fontWeight={700}
        sx={{ mb: 3 }}
      >
        Artists
      </Typography>

      <SearchBar
        search={search}
        setSearch={setSearch}
        placeholder="Search artists..."
        addButtonText="Add Artist"
        importButtonText="Bulk Import"
        onAdd={() => setOpenAddDialog(true)}
        selectedCount={selectedArtists.length}
        onBulkDelete={() => setOpenBulkDelete(true)}
      />

      <ArtistTable
        search={search}
        selectedArtists={selectedArtists}
        setSelectedArtists={setSelectedArtists}
      />

      <AddArtistDialog
        open={openAddDialog}
        handleClose={() => setOpenAddDialog(false)}
        refreshArtists={() => window.location.reload()}
      />

      <BulkDeleteDialog
        open={openBulkDelete}
        handleClose={() => setOpenBulkDelete(false)}
        selectedArtists={selectedArtists}
        clearSelection={() => setSelectedArtists([])}
        refreshArtists={() => window.location.reload()}
      />
    </Box>
  );
}

export default Artists;