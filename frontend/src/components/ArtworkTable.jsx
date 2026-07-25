import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function ArtworkTable({
  artworks,
  search,
  onEdit,
  onDelete,
}) {
  const filteredArtworks = artworks.filter((artwork) => {
    const searchTerm = search.toLowerCase();

    return (
      artwork.artwork_id?.toString().includes(searchTerm) ||
      artwork.title?.toLowerCase().includes(searchTerm) ||
      artwork.name?.toLowerCase().includes(searchTerm) ||
      artwork.artist_id?.toString().includes(searchTerm) ||
      artwork.medium?.toLowerCase().includes(searchTerm) ||
      artwork.department?.toLowerCase().includes(searchTerm) ||
      artwork.classification?.toLowerCase().includes(searchTerm)
    );
  });

  return (
    <TableContainer
      component={Paper}
      sx={{ mt: 2 }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <strong>Artwork ID</strong>
            </TableCell>

            <TableCell>
              <strong>Title</strong>
            </TableCell>

            <TableCell>
              <strong>Artist ID</strong>
            </TableCell>

            <TableCell>
              <strong>Medium</strong>
            </TableCell>

            <TableCell>
              <strong>Date</strong>
            </TableCell>

            <TableCell>
              <strong>Department</strong>
            </TableCell>

            <TableCell align="center">
              <strong>Actions</strong>
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {filteredArtworks.map((artwork) => (
            <TableRow key={artwork.id}>
              <TableCell>{artwork.artwork_id}</TableCell>

              <TableCell>
                {artwork.title || artwork.name || "-"}
              </TableCell>

              <TableCell>{artwork.artist_id}</TableCell>

              <TableCell>{artwork.medium || "-"}</TableCell>

              <TableCell>{artwork.date || "-"}</TableCell>

              <TableCell>{artwork.department || "-"}</TableCell>

              <TableCell align="center">
                <IconButton
                  color="primary"
                  onClick={() => onEdit(artwork)}
                >
                  <EditIcon />
                </IconButton>

                <IconButton
                  color="error"
                  onClick={() => onDelete(artwork)}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}

          {filteredArtworks.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={7}
                align="center"
              >
                No artworks found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ArtworkTable;