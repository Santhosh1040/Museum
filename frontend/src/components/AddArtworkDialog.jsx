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

function AddArtworkDialog({
  open,
  handleClose,
  refreshArtworks,
}) {
  const [formData, setFormData] = useState(initialForm);

  useEffect(() => {
    if (open) {
      setFormData(initialForm);
    }
  }, [open]);

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

        diameter_cm: formData.diameter_cm === "" ? null : Number(formData.diameter_cm),
        circumference_cm: formData.circumference_cm === "" ? null : Number(formData.circumference_cm),
        height_cm: formData.height_cm === "" ? null : Number(formData.height_cm),
        length_cm: formData.length_cm === "" ? null : Number(formData.length_cm),
        width_cm: formData.width_cm === "" ? null : Number(formData.width_cm),
        depth_cm: formData.depth_cm === "" ? null : Number(formData.depth_cm),
        weight_kg: formData.weight_kg === "" ? null : Number(formData.weight_kg),
        duration_s: formData.duration_s === "" ? null : Number(formData.duration_s),
      };

      await api.post("/artworks", payload);

      refreshArtworks();
      handleClose();
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.detail || "Failed to add artwork.");
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle>Add Artwork</DialogTitle>

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

          <Grid size={{ xs: 12, md: 3 }}>
            <TextField
              fullWidth
              label="Diameter (cm)"
              name="diameter_cm"
              value={formData.diameter_cm}
              onChange={handleChange}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 3 }}>
            <TextField
              fullWidth
              label="Circumference (cm)"
              name="circumference_cm"
              value={formData.circumference_cm}
              onChange={handleChange}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 3 }}>
            <TextField
              fullWidth
              label="Height (cm)"
              name="height_cm"
              value={formData.height_cm}
              onChange={handleChange}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 3 }}>
            <TextField
              fullWidth
              label="Length (cm)"
              name="length_cm"
              value={formData.length_cm}
              onChange={handleChange}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 3 }}>
            <TextField
              fullWidth
              label="Width (cm)"
              name="width_cm"
              value={formData.width_cm}
              onChange={handleChange}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 3 }}>
            <TextField
              fullWidth
              label="Depth (cm)"
              name="depth_cm"
              value={formData.depth_cm}
              onChange={handleChange}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 3 }}>
            <TextField
              fullWidth
              label="Weight (kg)"
              name="weight_kg"
              value={formData.weight_kg}
              onChange={handleChange}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 3 }}>
            <TextField
              fullWidth
              label="Duration (s)"
              name="duration_s"
              value={formData.duration_s}
              onChange={handleChange}
            />
          </Grid>
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
          Add Artwork
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddArtworkDialog;