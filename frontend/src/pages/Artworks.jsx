import { useEffect, useState } from "react";
import { Box } from "@mui/material";

import api from "../api/api";

import SearchBar from "../components/SearchBar";
import ArtworkTable from "../components/ArtworkTable";
import AddArtworkDialog from "../components/AddArtworkDialog";
import EditArtworkDialog from "../components/EditArtworkDialog";
import DeleteArtworkDialog from "../components/DeleteArtworkDialog";

function Artworks() {
  const [artworks, setArtworks] = useState([]);
  const [search, setSearch] = useState("");

  const [selectedArtwork, setSelectedArtwork] = useState(null);

  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const fetchArtworks = async () => {
    try {
      const response = await api.get("/artworks");
      setArtworks(response.data);
    } catch (error) {
      console.error("Error fetching artworks:", error);
    }
  };

  useEffect(() => {
    fetchArtworks();
  }, []);

  return (
    <Box p={3}>
      <SearchBar
        search={search}
        setSearch={setSearch}
        onAddArtist={() => setOpenAdd(true)}
      />

      <ArtworkTable
        artworks={artworks}
        search={search}
        onEdit={(artwork) => {
          setSelectedArtwork(artwork);
          setOpenEdit(true);
        }}
        onDelete={(artwork) => {
          setSelectedArtwork(artwork);
          setOpenDelete(true);
        }}
      />

      <AddArtworkDialog
        open={openAdd}
        handleClose={() => setOpenAdd(false)}
        refreshArtworks={fetchArtworks}
      />

      <EditArtworkDialog
        open={openEdit}
        handleClose={() => setOpenEdit(false)}
        artwork={selectedArtwork}
        refreshArtworks={fetchArtworks}
      />

      <DeleteArtworkDialog
        open={openDelete}
        handleClose={() => setOpenDelete(false)}
        artwork={selectedArtwork}
        refreshArtworks={fetchArtworks}
      />
    </Box>
  );
}

export default Artworks;