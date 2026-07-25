import api from "../api/api";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

function DeleteArtworkDialog({
  open,
  handleClose,
  artwork,
  refreshArtworks,
}) {
  const handleDelete = async () => {
    if (!artwork) return;

    try {
      await api.delete(`/artworks/${artwork.artwork_id}`);

      refreshArtworks();
      handleClose();
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.detail ||
          "Failed to delete artwork."
      );
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
        Delete Artwork
      </DialogTitle>

      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this artwork?
          <br />
          <br />

          <strong>
            Artwork ID:
          </strong>{" "}
          {artwork?.artwork_id}

          <br />

          <strong>
            Title:
          </strong>{" "}
          {artwork?.title || artwork?.name || "-"}

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

export default DeleteArtworkDialog;