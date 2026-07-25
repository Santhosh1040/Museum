import { useEffect, useState } from "react";

import api from "../api/api";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  TextField,
} from "@mui/material";

const initialForm = {
  artwork_id: "",
  artist_id: "",
  title: "",
  name: "",
  date: "",
  medium: "",
  dimensions: "",
  acquisition_date: "",
  credit: "",
  catalogue: "",
  department: "",
  classification: "",
  object_number: "",
  diameter_cm: "",
  circumference_cm: "",
  height_cm: "",
  length_cm: "",
  width_cm: "",
  depth_cm: "",
  weight_kg: "",
  duration_s: "",
};

function EditArtworkDialog({
  open,
  handleClose,
 artwork,
  refreshArtworks,
}) {
  const [formData, setFormData] = useState(initialForm);

  useEffect(() => {
    if (artwork) {
      setFormData({
        artwork_id: artwork.artwork_id ?? "",
        artist_id: artwork.artist_id ?? "",
        title: artwork.title ?? "",
        name: artwork.name ?? "",
        date: artwork.date ?? "",
        medium: artwork.medium ?? "",
        dimensions: artwork.dimensions ?? "",
        acquisition_date: artwork.acquisition_date ?? "",
        credit: artwork.credit ?? "",
        catalogue: artwork.catalogue ?? "",
        department: artwork.department ?? "",
        classification: artwork.classification ?? "",
        object_number: artwork.object_number ?? "",
        diameter_cm: artwork.diameter_cm ?? "",
        circumference_cm: artwork.circumference_cm ?? "",
        height_cm: artwork.height_cm ?? "",
        length_cm: artwork.length_cm ?? "",
        width_cm: artwork.width_cm ?? "",
        depth_cm: artwork.depth_cm ?? "",
        weight_kg: artwork.weight_kg ?? "",
        duration_s: artwork.duration_s ?? "",
      });
    }
  }, [artwork]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        ...formData,
        artwork_id: Number(formData.artwork_id),
        artist_id: Number(formData.artist_id),

        diameter_cm:
          formData.diameter_cm === ""
            ? null
            : Number(formData.diameter_cm),

        circumference_cm:
          formData.circumference_cm === ""
            ? null
            : Number(formData.circumference_cm),

        height_cm:
          formData.height_cm === ""
            ? null
            : Number(formData.height_cm),

        length_cm:
          formData.length_cm === ""
            ? null
            : Number(formData.length_cm),

        width_cm:
          formData.width_cm === ""
            ? null
            : Number(formData.width_cm),

        depth_cm:
          formData.depth_cm === ""
            ? null
            : Number(formData.depth_cm),

        weight_kg:
          formData.weight_kg === ""
            ? null
            : Number(formData.weight_kg),

        duration_s:
          formData.duration_s === ""
            ? null
            : Number(formData.duration_s),
      };

      await api.put(
        `/artworks/${artwork.artwork_id}`,
        payload
      );

      refreshArtworks();
      handleClose();
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.detail ||
          "Failed to update artwork."
      );
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle>Edit Artwork</DialogTitle>

      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Artwork ID"
              name="artwork_id"
              value={formData.artwork_id}
              onChange={handleChange}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Artist ID"
              name="artist_id"
              value={formData.artist_id}
              onChange={handleChange}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Date"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Medium"
              name="medium"
              value={formData.medium}
              onChange={handleChange}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              label="Dimensions"
              name="dimensions"
              value={formData.dimensions}
              onChange={handleChange}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Acquisition Date"
              name="acquisition_date"
              value={formData.acquisition_date}
              onChange={handleChange}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Credit"
              name="credit"
              value={formData.credit}
              onChange={handleChange}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              fullWidth
              label="Catalogue"
              name="catalogue"
              value={formData.catalogue}
              onChange={handleChange}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              fullWidth
              label="Department"
              name="department"
              value={formData.department}
              onChange={handleChange}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              fullWidth
              label="Classification"
              name="classification"
              value={formData.classification}
              onChange={handleChange}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              label="Object Number"
              name="object_number"
              value={formData.object_number}
              onChange={handleChange}
            />
          </Grid>

          {[
            ["diameter_cm", "Diameter (cm)"],
            ["circumference_cm", "Circumference (cm)"],
            ["height_cm", "Height (cm)"],
            ["length_cm", "Length (cm)"],
            ["width_cm", "Width (cm)"],
            ["depth_cm", "Depth (cm)"],
            ["weight_kg", "Weight (kg)"],
            ["duration_s", "Duration (s)"],
          ].map(([field, label]) => (
            <Grid key={field} size={{ xs: 12, md: 3 }}>
              <TextField
                fullWidth
                label={label}
                name={field}
                value={formData[field]}
                onChange={handleChange}
              />
            </Grid>
          ))}
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={handleSubmit}
        >
          Update Artwork
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditArtworkDialog;