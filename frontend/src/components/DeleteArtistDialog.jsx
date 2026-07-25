import api from "../api/api";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

function DeleteArtistDialog({
  open,
  handleClose,
  artist,
  refreshArtists,
}) {
  const handleDelete = async () => {
    if (!artist) return;

    try {
      await api.delete(`/artists/${artist.artist_id}`);

      handleClose();
      refreshArtists();
    } catch (error) {
      console.error(error);
      alert("Failed to delete artist.");
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle>
        Delete Artist
      </DialogTitle>

      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete{" "}
          <strong>{artist?.name}</strong>?
          <br />
          <br />
          This action cannot be undone.
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>
          Cancel
        </Button>

        <Button
          color="error"
          variant="contained"
          onClick={handleDelete}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteArtistDialog;