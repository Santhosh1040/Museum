import api from "../api/api";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

function BulkDeleteDialog({
  open,
  handleClose,
  selectedArtists,
  refreshArtists,
  clearSelection,
}) {
  const handleBulkDelete = async () => {
    if (!selectedArtists || selectedArtists.length === 0) return;

    try {
      await api.delete("/artists/bulk-delete", {
        data: {
          artist_ids: selectedArtists,
        },
      });

      clearSelection();
      handleClose();
      refreshArtists();
    } catch (error) {
      console.error(error);

      const message =
        error.response?.data?.detail ||
        "Failed to delete selected artists.";

      alert(message);
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
        Delete Selected Artists
      </DialogTitle>

      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete{" "}
          <strong>{selectedArtists.length}</strong>{" "}
          selected artist
          {selectedArtists.length !== 1 ? "s" : ""}?
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
          onClick={handleBulkDelete}
          disabled={selectedArtists.length === 0}
        >
          Delete All
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default BulkDeleteDialog;