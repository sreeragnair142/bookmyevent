import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Select, 
  MenuItem, 
  Snackbar,
  Alert
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

function AddProvider() {
  const [open, setOpen] = useState(false);
  const [selectedZone, setSelectedZone] = useState('');
  const [logoPreview, setLogoPreview] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);
  const [tinCertificatePreview, setTinCertificatePreview] = useState(null);
  const [zones, setZones] = useState([]);
  const [error, setError] = useState(null);

  // Fetch zones from API on component mount
  useEffect(() => {
    const fetchZones = async () => {
      try {
        const response = await fetch('/api/zones?isActive=true', {
          headers: {
            'Content-Type': 'application/json',
            // Add authorization header if needed
            // 'Authorization': `Bearer ${yourAuthToken}`
          }
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch zones');
        }
        
        const data = await response.json();
        setZones(data.data.zones || []); // Assuming API returns zones in data.zones
      } catch (err) {
        console.error('Error fetching zones:', err);
        setError('Failed to load zones. Please try again.');
      }
    };

    fetchZones();
  }, []);

  // Handle zone selection
  const handleZoneChange = (event) => {
    setSelectedZone(event.target.value);
  };

  // Handle image upload and preview
  const handleImageUpload = (event, type) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        switch(type) {
          case 'logo':
            setLogoPreview(e.target.result);
            break;
          case 'cover':
            setCoverPreview(e.target.result);
            break;
          case 'tin':
            if (file.type.startsWith('image/')) {
              setTinCertificatePreview(e.target.result);
            } else {
              setTinCertificatePreview(file.name);
            }
            break;
          default:
            break;
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle submit
  const handleSubmit = async () => {
    try {
      // Add your API call logic here
      // Example: await fetch('/api/providers', { method: 'POST', body: formData });
      setOpen(true); // show notification
    } catch (err) {
      console.error('Error submitting form:', err);
      setError('Failed to submit form. Please try again.');
    }
  };

  // Reset form
  const handleReset = () => {
    setSelectedZone('');
    setLogoPreview(null);
    setCoverPreview(null);
    setTinCertificatePreview(null);
    setError(null);
  };

  return (
    <Box sx={{ p: { xs: 2, sm: 3 }, backgroundColor: 'white', width: '100%', overflowY: 'auto' }}>
      {/* Main Heading */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, flexWrap: 'wrap' }}>
        <Typography variant="h4" fontWeight="bold">Add New Store</Typography>
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
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
          {/* Logo Upload */}
          <Box sx={{ border: '1px dashed grey', p: 2, textAlign: 'center', flex: 1 }}>
            <Typography variant="caption">Logo (1:1)</Typography>
            {logoPreview && (
              <Box sx={{ mt: 1, mb: 2 }}>
                <img 
                  src={logoPreview} 
                  alt="Logo Preview" 
                  style={{ 
                    maxWidth: '100%', 
                    maxHeight: '150px', 
                    objectFit: 'contain',
                    border: '1px solid #ddd',
                    borderRadius: '4px'
                  }} 
                />
              </Box>
            )}
            <Button
              variant="outlined"
              component="label"
              startIcon={<CloudUploadIcon />}
              sx={{ mt: 1, width: '100%' }}
            >
              {logoPreview ? 'Change Image' : 'Upload Image'}
              <input 
                type="file" 
                hidden 
                accept="image/*"
                onChange={(e) => handleImageUpload(e, 'logo')}
              />
            </Button>
          </Box>
          
          {/* Cover Upload */}
          <Box sx={{ border: '1px dashed grey', p: 2, textAlign: 'center', flex: 1 }}>
            <Typography variant="caption">Store Cover (2:1)</Typography>
            {coverPreview && (
              <Box sx={{ mt: 1, mb: 2 }}>
                <img 
                  src={coverPreview} 
                  alt="Cover Preview" 
                  style={{ 
                    maxWidth: '100%', 
                    maxHeight: '150px', 
                    objectFit: 'contain',
                    border: '1px solid #ddd',
                    borderRadius: '4px'
                  }} 
                />
              </Box>
            )}
            <Button
              variant="outlined"
              component="label"
              startIcon={<CloudUploadIcon />}
              sx={{ mt: 1, width: '100%' }}
            >
              {coverPreview ? 'Change Image' : 'Upload Image'}
              <input 
                type="file" 
                hidden 
                accept="image/*"
                onChange={(e) => handleImageUpload(e, 'cover')}
              />
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
          sx={{ mb: 2 }}
        />
        <Select
          fullWidth
          variant="outlined"
          displayEmpty
          value={selectedZone}
          onChange={handleZoneChange}
          sx={{ mb: 2 }}
        >
          <MenuItem value="" disabled>
            Select zone
          </MenuItem>
          {zones.map((zone) => (
            <MenuItem key={zone._id} value={zone._id}>
              {zone.name}
            </MenuItem>
          ))}
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
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, mb: 2 }}>
          <TextField fullWidth label="First name" variant="outlined" placeholder="First name" />
          <TextField fullWidth label="Last name" variant="outlined" placeholder="Last name" />
          <TextField fullWidth label="Phone" variant="outlined" placeholder="+1" />
        </Box>
      </Box>

      {/* Account Information Section */}
      <Box sx={{ mt: 3 }}>
        <Typography variant="h4" fontWeight="bold" sx={{ mb: 2 }}>Account Information</Typography>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, mb: 2 }}>
          <TextField fullWidth label="Email" variant="outlined" placeholder="Ex: ex@example.com" />
          <TextField fullWidth label="Password" variant="outlined" type="password" placeholder="8+ characters required" />
          <TextField fullWidth label="Confirm password" variant="outlined" type="password" placeholder="8+ characters required" />
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
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, flexDirection: { xs: 'column', sm: 'row' }, gap: 1 }}>
          <Typography variant="h4">TIN Certificate</Typography>
          <Typography variant="caption" color="textSecondary">
            Pdf, doc, jpg. File size : max 2 MB
          </Typography>
        </Box>
        
        {/* TIN Certificate Preview */}
        {tinCertificatePreview && (
          <Box sx={{ mb: 2, p: 2, border: '1px solid #ddd', borderRadius: '4px' }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>Selected File:</Typography>
            {typeof tinCertificatePreview === 'string' && !tinCertificatePreview.startsWith('data:') ? (
              <Typography variant="body2" color="primary">{tinCertificatePreview}</Typography>
            ) : (
              <img 
                src={tinCertificatePreview} 
                alt="TIN Certificate Preview" 
                style={{ 
                  maxWidth: '100%', 
                  maxHeight: '200px', 
                  objectFit: 'contain',
                  border: '1px solid #ddd',
                  borderRadius: '4px'
                }} 
              />
            )}
          </Box>
        )}
        
        <Box sx={{ border: '1px dashed grey', p: 2, textAlign: 'center', mb: 2 }}>
          <Button
            variant="outlined"
            component="label"
            startIcon={<CloudUploadIcon />}
            sx={{ mt: 1, width: '100%' }}
          >
            {tinCertificatePreview ? 'Change File' : 'Select a file or Drag & Drop here'}
            <input 
              type="file" 
              hidden 
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              onChange={(e) => handleImageUpload(e, 'tin')}
            />
          </Button>
        </Box>

        {/* Action Buttons */}
        <Box sx={{ display: 'flex', justifyContent: { xs: 'center', sm: 'flex-end' }, gap: 2, flexWrap: 'wrap' }}>
          <Button variant="outlined" onClick={handleReset}>Reset</Button>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Box>
      </Box>

      {/* Success Notification */}
      <Snackbar 
        open={open} 
        autoHideDuration={3000} 
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={() => setOpen(false)} severity="success" sx={{ width: '100%' }}>
          Store Added Successfully!
        </Alert>
      </Snackbar>

      {/* Error Notification */}
      {error && (
        <Snackbar 
          open={!!error} 
          autoHideDuration={3000} 
          onClose={() => setError(null)}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert onClose={() => setError(null)} severity="error" sx={{ width: '100%' }}>
            {error}
          </Alert>
        </Snackbar>
      )}
    </Box>
  );
}

export default AddProvider;