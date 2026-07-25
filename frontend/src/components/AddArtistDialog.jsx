import { useState, useEffect } from "react";
import api from "../api/api";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack,
} from "@mui/material";

function AddArtistDialog({
  open,
  handleClose,
  refreshArtists,
  artist = null,
}) {
  const isEdit = artist !== null;

  const [formData, setFormData] = useState({
    artist_id: "",
    name: "",
    nationality: "",
    gender: "",
    birth_year: "",
    death_year: "",
  });

  useEffect(() => {
    if (artist) {
      setFormData({
        artist_id: artist.artist_id,
        name: artist.name || "",
        nationality: artist.nationality || "",
        gender: artist.gender || "",
        birth_year: artist.birth_year || "",
        death_year: artist.death_year || "",
      });
    } else {
      setFormData({
        artist_id: "",
        name: "",
        nationality: "",
        gender: "",
        birth_year: "",
        death_year: "",
      });
    }
  }, [artist, open]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    const payload = {
      artist_id: Number(formData.artist_id),
      name: formData.name,
      nationality: formData.nationality || null,
      gender: formData.gender || null,
      birth_year: formData.birth_year
        ? Number(formData.birth_year)
        : null,
      death_year: formData.death_year
        ? Number(formData.death_year)
        : null,
    };

    try {
      if (isEdit) {
        await api.put(`/artists/${artist.artist_id}`, {
          name: payload.name,
          nationality: payload.nationality,
          gender: payload.gender,
          birth_year: payload.birth_year,
          death_year: payload.death_year,
        });
      } else {
        await api.post("/artists/", payload);
      }

      handleClose();
      refreshArtists();

      setFormData({
        artist_id: "",
        name: "",
        nationality: "",
        gender: "",
        birth_year: "",
        death_year: "",
      });

    } catch (err) {
      console.error(err);
      alert(isEdit ? "Failed to update artist." : "Failed to add artist.");
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>
        {isEdit ? "Edit Artist" : "Add Artist"}
      </DialogTitle>

      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>

          <TextField
            label="Artist ID"
            name="artist_id"
            value={formData.artist_id}
            onChange={handleChange}
            disabled={isEdit}
            fullWidth
          />

          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            label="Nationality"
            name="nationality"
            value={formData.nationality}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            label="Gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            label="Birth Year"
            name="birth_year"
            type="number"
            value={formData.birth_year}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            label="Death Year"
            name="death_year"
            type="number"
            value={formData.death_year}
            onChange={handleChange}
            fullWidth
          />

        </Stack>
      </DialogContent>

      <DialogActions>

        <Button onClick={handleClose}>
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={handleSubmit}
        >
          {isEdit ? "Update Artist" : "Save Artist"}
        </Button>

      </DialogActions>
    </Dialog>
  );
}

export default AddArtistDialog;