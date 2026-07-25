import {
  Box,
  TextField,
  Button,
  InputAdornment,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

function SearchBar({
  search,
  setSearch,

  placeholder = "Search...",

  addButtonText = "Add",
  importButtonText = "Bulk Import",

  onAdd,
  onImport,

  selectedCount = 0,
  onBulkDelete,
  showBulkImport = true,
}) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: 3,
      }}
    >
      <TextField
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={placeholder}
        variant="outlined"
        size="small"
        sx={{
          width: 420,
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="action" />
            </InputAdornment>
          ),
        }}
      />

      <Box
        sx={{
          display: "flex",
          gap: 2,
        }}
      >
        {selectedCount > 0 && (
          <Button
            variant="contained"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={onBulkDelete}
          >
            Delete ({selectedCount})
          </Button>
        )}

        {showBulkImport && (
          <Button
            variant="outlined"
            startIcon={<UploadFileIcon />}
            onClick={onImport}
          >
            {importButtonText}
          </Button>
        )}

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={onAdd}
        >
          {addButtonText}
        </Button>
      </Box>
    </Box>
  );
}

export default SearchBar;