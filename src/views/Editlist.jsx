import React from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Select, 
  MenuItem 
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

function EditList() {
  return (
    <Box sx={{ p: 3, backgroundColor: 'white', width: '100%' }}>
      {/* Main Heading */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4" fontWeight="bold">Edit Store</Typography>
      </Box>

      <Typography variant="subtitle2" color="textSecondary" sx={{ mb: 2 }}>
        Default English(EN)
      </Typography>
      <TextField
        fullWidth
        label="Name (Default)"
        variant="outlined"
        placeholder="Store name"
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label="Address (Default)"
        variant="outlined"
        placeholder="Store"
        multiline
        rows={4}
        sx={{ mb: 2 }}
      />

      {/* Store Logo & Covers Section */}
      <Box sx={{ mt: 3 }}>
        <Typography variant="h4" sx={{ mb: 2, fontWeight: "bold" }}>
          Store Logo & Covers
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box sx={{ border: '1px dashed grey', p: 2, textAlign: 'center' }}>
            <Typography variant="caption">Logo (1:1)</Typography>
            <Button
              variant="outlined"
              component="label"
              startIcon={<CloudUploadIcon />}
              sx={{ mt: 1 }}
            >
              Upload Image
              <input type="file" hidden />
            </Button>
          </Box>
          <Box sx={{ border: '1px dashed grey', p: 2, textAlign: 'center' }}>
            <Typography variant="caption">Store Cover (2:1)</Typography>
            <Button
              variant="outlined"
              component="label"
              startIcon={<CloudUploadIcon />}
              sx={{ mt: 1 }}
            >
              Upload Image
              <input type="file" hidden />
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Store Information Section */}
      <Box sx={{ mt: 3 }}>
        <Typography variant="h4" fontWeight="bold" sx={{ mb: 2 }}>Store Information</Typography>
        <TextField
          fullWidth
          label="Estimated Delivery Time (Min & Maximum Time)"
          variant="outlined"
          placeholder=""
          sx={{ mb: 2 }}
        />
        <Select
          fullWidth
          variant="outlined"
          displayEmpty
          defaultValue=""
          sx={{ mb: 2 }}
        >
          <MenuItem value="" disabled>
            Select zone
          </MenuItem>
          {/* Add zone options as needed */}
        </Select>
        <TextField
          fullWidth
          label="Latitude"
          variant="outlined"
          placeholder="Ex: -94.22213"
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Longitude"
          variant="outlined"
          placeholder="Ex: 103.344322"
          sx={{ mb: 2 }}
        />
      </Box>

      {/* Owner Information Section */}
      <Box sx={{ mt: 3 }}>
        <Typography variant="h4" fontWeight="bold" sx={{ mb: 2 }}>Owner Information</Typography>
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <TextField
            fullWidth
            label="First name"
            variant="outlined"
            placeholder="First name"
            sx={{ flex: 1 }}
          />
          <TextField
            fullWidth
            label="Last name"
            variant="outlined"
            placeholder="Last name"
            sx={{ flex: 1 }}
          />
          <TextField
            fullWidth
            label="Phone"
            variant="outlined"
            placeholder="+1"
            sx={{ flex: 1 }}
          />
        </Box>
      </Box>

      {/* Account Information Section */}
      <Box sx={{ mt: 3 }}>
        <Typography variant="h4" fontWeight="bold" sx={{ mb: 2 }}>Account Information</Typography>
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            placeholder="Ex: ex@example.com"
            sx={{ flex: 1 }}
          />
          <TextField
            fullWidth
            label="Password"
            variant="outlined"
            placeholder="8+ characters required"
            type="password"
            sx={{ flex: 1 }}
          />
          <TextField
            fullWidth
            label="Confirm password"
            variant="outlined"
            placeholder="8+ characters required"
            type="password"
            sx={{ flex: 1 }}
          />
        </Box>
      </Box>

      {/* Business TIN Section */}
      <Box sx={{ mt: 3 }}>
        <Typography variant="h4" fontWeight="bold" sx={{ mb: 2 }}>Business TIN</Typography>
        <TextField
          fullWidth
          label="Taxpayer Identification Number (TIN) *"
          variant="outlined"
          placeholder="Type Your Taxpayer Identification Number (TIN)"
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Expire Date *"
          variant="outlined"
          placeholder="dd-mm-yyyy"
          sx={{ mb: 2 }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h4">TIN Certificate</Typography>
          <Typography variant="caption" color="textSecondary">
            Pdf, doc, jpg. File size : max 2 MB
          </Typography>
        </Box>
        <Box sx={{ border: '1px dashed grey', p: 2, textAlign: 'center', mb: 2 }}>
          <Button
            variant="outlined"
            component="label"
            startIcon={<CloudUploadIcon />}
            sx={{ mt: 1 }}
          >
            Select a file or Drag & Drop here
            <input type="file" hidden />
          </Button>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Button variant="outlined">Reset</Button>
          <Button variant="contained" color="primary">Submit</Button>
        </Box>
      </Box>
    </Box>
  );
}

export default EditList;
