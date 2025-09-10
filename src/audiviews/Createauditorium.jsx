import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Tabs,
  Tab,
  Card,
  CardContent,
  IconButton,
  Tooltip,
  Stack,
  Radio,
  RadioGroup,
  FormControlLabel,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  useTheme,
  useMediaQuery,
  Switch,
  Snackbar,
  Alert,
} from '@mui/material';
import { CloudUpload as CloudUploadIcon, Settings as SettingsIcon } from '@mui/icons-material';
import { styled } from '@mui/system';

// Helper component for Tab Panels
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

// Styled component for the upload area
const UploadDropArea = styled(Box)(({ theme }) => ({
  border: '2px dashed #e0e0e0',
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(3),
  textAlign: 'center',
  backgroundColor: theme.palette.grey[50],
  cursor: 'pointer',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '150px',
  '&:hover': {
    borderColor: theme.palette.primary.main,
  },
  '& input[type="file"]': {
    display: 'none',
  },
}));

const Createauditorium = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
  // State for General Information
  const [tabValue, setTabValue] = useState(0);
  const [vehicleNameDefault, setVehicleNameDefault] = useState('');
  const [shortDescriptionDefault, setShortDescriptionDefault] = useState('');
  const [vehicleNameEnglish, setVehicleNameEnglish] = useState('');
  const [shortDescriptionEnglish, setShortDescriptionEnglish] = useState('');
  const [vehicleNameArabic, setVehicleNameArabic] = useState('');
  const [shortDescriptionArabic, setShortDescriptionArabic] = useState('');
  const [thumbnailFile, setThumbnailFile] = useState(null);
  // State for Images section
  const [vehicleImages, setVehicleImages] = useState(null);
  // State for Vehicle Information section
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [category, setCategory] = useState('');
  const [type, setType] = useState('');
  const [engineCapacity, setEngineCapacity] = useState('');
  const [enginePower, setEnginePower] = useState('');
  const [seatingCapacity, setSeatingCapacity] = useState('');
  const [airCondition, setAirCondition] = useState('yes');
  const [fuelType, setFuelType] = useState('');
  const [transmissionType, setTransmissionType] = useState('');
  // State for Vehicle Identity section
  const [vinNumber, setVinNumber] = useState('');
  const [licensePlateNumber, setLicensePlateNumber] = useState('');
  const [sameModelMultipleVehicles, setSameModelMultipleVehicles] = useState(false);
  // State for Additional Vehicle Identity section
  const [additionalVinNumber, setAdditionalVinNumber] = useState('');
  const [additionalLicensePlateNumber, setAdditionalLicensePlateNumber] = useState('');
  // State for Pricing & Discounts section
  const [tripType, setTripType] = useState('hourly');
  const [hourlyWisePrice, setHourlyWisePrice] = useState('');
  const [perDayPrice, setPerDayPrice] = useState('');
  const [distanceWisePrice, setDistanceWisePrice] = useState('');
  const [giveDiscount, setGiveDiscount] = useState('');
  const [discountType, setDiscountType] = useState('%');
  // Vehicle document
  const [vehicleDoc, setVehicleDoc] = useState(null);
  // State for toast message
  const [openToast, setOpenToast] = useState(false);
  // State for multiple vehicle images
  const [multipleVehicleImages, setMultipleVehicleImages] = useState(null);

  // Handlers for General Information
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleThumbnailFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setThumbnailFile(file);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDropThumbnail = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      setThumbnailFile(file);
    }
  };

  // Handlers for Vehicle Images
  const handleVehicleImagesChange = (event) => {
    const files = Array.from(event.target.files);
    if (files.length > 0) {
      setVehicleImages(files);
    }
  };

  const handleDropImages = (event) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    if (files.length > 0) {
      setVehicleImages(files);
    }
  };

  // Handlers for vehicle document
  const handleVehicleDocChange = (event) => {
    const files = Array.from(event.target.files);
    if (files.length > 0) {
      setVehicleDoc(files);
    }
  };

  const handleDropDoc = (event) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    if (files.length > 0) {
      setVehicleDoc(files);
    }
  };

  // Handler for multiple vehicle images
  const handleMultipleVehicleImagesChange = (event) => {
    const files = Array.from(event.target.files);
    if (files.length > 0) {
      setMultipleVehicleImages(files);
    }
  };

  const handleDropMultipleImages = (event) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    if (files.length > 0) {
      setMultipleVehicleImages(files);
    }
  };

  const handleReset = () => {
    setVehicleNameDefault('');
    setShortDescriptionDefault('');
    setVehicleNameEnglish('');
    setShortDescriptionEnglish('');
    setVehicleNameArabic('');
    setShortDescriptionArabic('');
    setThumbnailFile(null);
    setVehicleImages(null);
    setVehicleDoc(null);
    setBrand('');
    setModel('');
    setCategory('');
    setType('');
    setEngineCapacity('');
    setEnginePower('');
    setSeatingCapacity('');
    setAirCondition('yes');
    setFuelType('');
    setTransmissionType('');
    setVinNumber('');
    setLicensePlateNumber('');
    setSameModelMultipleVehicles(false);
    setAdditionalVinNumber('');
    setAdditionalLicensePlateNumber('');
    setTripType('hourly');
    setHourlyWisePrice('');
    setPerDayPrice('');
    setDistanceWisePrice('');
    setGiveDiscount('');
    setDiscountType('%');
    setMultipleVehicleImages(null);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Validation
    if (
      !vehicleNameDefault ||
      !brand ||
      !model ||
      !category ||
      !type ||
      !engineCapacity ||
      !enginePower ||
      !seatingCapacity ||
      !fuelType ||
      !transmissionType ||
      !vinNumber ||
      !licensePlateNumber ||
      !tripType ||
      (tripType === 'hourly' && !hourlyWisePrice) ||
      (tripType === 'perDay' && !perDayPrice) ||
      (tripType === 'distanceWise' && !distanceWisePrice)
    ) {
      alert('Please fill all required fields.');
      return;
    }
    if (!thumbnailFile) {
      alert('Please upload a thumbnail image.');
      return;
    }
    if (!vehicleImages || vehicleImages.length === 0) {
      alert('Please upload at least one vehicle image.');
      return;
    }
    if (!vehicleDoc || vehicleDoc.length === 0) {
      alert('Please upload at least one vehicle document.');
      return;
    }
    // Here you would typically send the data to your backend
    console.log({
      vehicleNameDefault,
      shortDescriptionDefault,
      vehicleNameEnglish,
      shortDescriptionEnglish,
      vehicleNameArabic,
      shortDescriptionArabic,
      thumbnailFile,
      vehicleImages,
      vehicleDoc,
      brand,
      model,
      category,
      type,
      engineCapacity,
      enginePower,
      seatingCapacity,
      airCondition,
      fuelType,
      transmissionType,
      vinNumber,
      licensePlateNumber,
      sameModelMultipleVehicles,
      additionalVinNumber,
      additionalLicensePlateNumber,
      tripType,
      hourlyWisePrice,
      perDayPrice,
      distanceWisePrice,
      giveDiscount,
      discountType,
      multipleVehicleImages,
    });
    setOpenToast(true);
  };

  const handleCloseToast = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenToast(false);
  };

  return (
    <Box sx={{ p: isSmallScreen ? 2 : 3, backgroundColor: theme.palette.grey[100], minHeight: '100vh', width: '100%' }}>
      <Box sx={{
        maxWidth: 'lg',
        margin: 'auto',
        backgroundColor: 'white',
        borderRadius: theme.shape.borderRadius,
        boxShadow: theme.shadows[1],
        p: isSmallScreen ? 2 : 3,
        overflowX: 'hidden'
      }}>
        {/* Header Section */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <img src="https://via.placeholder.com/24" alt="Vehicle Icon" style={{ marginRight: 8 }} />
            <Typography variant="h5" component="h1">
              Add New Vehicle
            </Typography>
          </Box>
          <Tooltip title="Settings">
            <IconButton color="primary" sx={{ backgroundColor: 'white', border: `1px solid ${theme.palette.grey[300]}` }}>
              <SettingsIcon />
            </IconButton>
          </Tooltip>
        </Box>
        <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 4 }}>
          Insert the basic information of the vehicle
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          {/* General Information & Vehicle Thumbnail */}
          <Box sx={{ display: 'flex', flexDirection: isSmallScreen ? 'column' : 'row', gap: 3, mb: 4 }}>
            {/* General Information Section */}
            <Card sx={{ flex: isSmallScreen ? 'auto' : 2, p: 2, boxShadow: 'none', border: `1px solid ${theme.palette.grey[200]}` }}>
              <CardContent sx={{ '&:last-child': { pb: 2 } }}>
                <Typography variant="h6" gutterBottom>
                  General Information
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Insert the basic information of the vehicle
                </Typography>
                <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
                  <Tabs value={tabValue} onChange={handleTabChange} aria-label="language tabs">
                    <Tab label="Default" {...a11yProps(0)} />
                    <Tab label="English(EN)" {...a11yProps(1)} />
                    <Tab label="العربية - Arabic (AR)" {...a11yProps(2)} />
                  </Tabs>
                </Box>
                <TabPanel value={tabValue} index={0}>
                  <TextField
                    fullWidth
                    label="Vehicle name (Default)*"
                    variant="outlined"
                    value={vehicleNameDefault}
                    onChange={(e) => setVehicleNameDefault(e.target.value)}
                    placeholder="Type vehicle name"
                    sx={{ mb: 2 }}
                    required
                  />
                  <TextField
                    fullWidth
                    label="Short description (Default)"
                    variant="outlined"
                    multiline
                    rows={4}
                    value={shortDescriptionDefault}
                    onChange={(e) => setShortDescriptionDefault(e.target.value)}
                    placeholder="Type business address"
                  />
                </TabPanel>
                <TabPanel value={tabValue} index={1}>
                  <TextField
                    fullWidth
                    label="Vehicle name (English)"
                    variant="outlined"
                    value={vehicleNameEnglish}
                    onChange={(e) => setVehicleNameEnglish(e.target.value)}
                    placeholder="Type vehicle name in English"
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    fullWidth
                    label="Short description (English)"
                    variant="outlined"
                    multiline
                    rows={4}
                    value={shortDescriptionEnglish}
                    onChange={(e) => setShortDescriptionEnglish(e.target.value)}
                    placeholder="Type short description in English"
                  />
                </TabPanel>
                <TabPanel value={tabValue} index={2}>
                  <TextField
                    fullWidth
                    label="Vehicle name (Arabic)"
                    variant="outlined"
                    value={vehicleNameArabic}
                    onChange={(e) => setVehicleNameArabic(e.target.value)}
                    placeholder="Type vehicle name in Arabic"
                    sx={{ mb: 2 }}
                    dir="rtl"
                    inputProps={{ style: { textAlign: 'right' } }}
                  />
                  <TextField
                    fullWidth
                    label="Short description (Arabic)"
                    variant="outlined"
                    multiline
                    rows={4}
                    value={shortDescriptionArabic}
                    onChange={(e) => setShortDescriptionArabic(e.target.value)}
                    placeholder="Type short description in Arabic"
                    dir="rtl"
                    inputProps={{ style: { textAlign: 'right' } }}
                  />
                </TabPanel>
              </CardContent>
            </Card>
            {/* Vehicle Thumbnail Section */}
            <Card sx={{ flex: isSmallScreen ? 'auto' : 1, p: 2, boxShadow: 'none', border: `1px solid ${theme.palette.grey[200]}` }}>
              <CardContent sx={{ '&:last-child': { pb: 2 } }}>
                <Typography variant="h6" gutterBottom>
                  Vehicle Thumbnail*
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  JPG, JPEG, PNG Less Than 1MB (Ratio 2:1)
                </Typography>
                <UploadDropArea
                  onDragOver={handleDragOver}
                  onDrop={handleDropThumbnail}
                  onClick={() => document.getElementById('thumbnail-upload').click()}
                >
                  {thumbnailFile ? (
                    <Box>
                      <img
                        src={URL.createObjectURL(thumbnailFile)}
                        alt="Thumbnail preview"
                        style={{ maxWidth: '100%', maxHeight: 100, objectFit: 'contain', marginBottom: theme.spacing(1) }}
                      />
                      <Typography variant="body2" color="text.secondary">
                        {thumbnailFile.name}
                      </Typography>
                    </Box>
                  ) : (
                    <Box>
                      <CloudUploadIcon sx={{ fontSize: 40, color: theme.palette.grey[400], mb: 1 }} />
                      <Typography variant="body2" color="primary" sx={{ mb: 0.5, fontWeight: 'medium' }}>
                        Click to upload
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Or drag and drop
                      </Typography>
                    </Box>
                  )}
                  <input
                    type="file"
                    id="thumbnail-upload"
                    hidden
                    accept="image/jpeg,image/png,image/jpg"
                    onChange={handleThumbnailFileChange}
                  />
                </UploadDropArea>
              </CardContent>
            </Card>
          </Box>
          {/* Images Section */}
          {!sameModelMultipleVehicles && (
            <Box sx={{ mb: 4 }}>
              <Card sx={{ p: 2, boxShadow: 'none', border: `1px solid ${theme.palette.grey[200]}` }}>
                <CardContent sx={{ '&:last-child': { pb: 2 } }}>
                  <Typography variant="h6" gutterBottom>
                    Images*
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    JPG, JPEG, PNG Less Than 1MB (Ratio 2:1)
                  </Typography>
                  <UploadDropArea
                    onDragOver={handleDragOver}
                    onDrop={handleDropImages}
                    onClick={() => document.getElementById('images-upload').click()}
                  >
                    {vehicleImages && vehicleImages.length > 0 ? (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center' }}>
                        {vehicleImages.map((file, index) => (
                          <img
                            key={index}
                            src={URL.createObjectURL(file)}
                            alt={`Vehicle image ${index + 1}`}
                            style={{ maxWidth: 80, maxHeight: 80, objectFit: 'cover', borderRadius: theme.shape.borderRadius }}
                          />
                        ))}
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1, width: '100%' }}>
                          {vehicleImages.length} image(s) selected
                        </Typography>
                      </Box>
                    ) : (
                      <Box>
                        <CloudUploadIcon sx={{ fontSize: 40, color: theme.palette.grey[400], mb: 1 }} />
                        <Typography variant="body2" color="primary" sx={{ mb: 0.5, fontWeight: 'medium' }}>
                          Click to upload
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Or drag and drop
                        </Typography>
                      </Box>
                    )}
                    <input
                      type="file"
                      id="images-upload"
                      hidden
                      accept="image/jpeg,image/png,image/jpg"
                      multiple
                      onChange={handleVehicleImagesChange}
                    />
                  </UploadDropArea>
                </CardContent>
              </Card>
            </Box>
          )}
          {/* Vehicle Information Section */}
          <Box sx={{ mb: 4 }}>
            <Card sx={{ p: 2, boxShadow: 'none', border: `1px solid ${theme.palette.grey[200]}` }}>
              <CardContent sx={{ '&:last-child': { pb: 2 } }}>
                <Typography variant="h6" gutterBottom>
                  Vehicle Information
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Insert The Vehicle's General Informations
                </Typography>
                <Box sx={{ display: 'grid', gridTemplateColumns: isSmallScreen ? '1fr' : 'repeat(3, 1fr)', gap: theme.spacing(3) }}>
                  {/* Column 1 */}
                  <Stack spacing={2}>
                    <FormControl fullWidth variant="outlined" required>
                      <InputLabel id="brand-label">Brand*</InputLabel>
                      <Select
                        labelId="brand-label"
                        id="brand-select"
                        value={brand}
                        label="Brand"
                        onChange={(e) => setBrand(e.target.value)}
                      >
                        <MenuItem value="">Select vehicle brand</MenuItem>
                        <MenuItem value="Porsche">Porsche</MenuItem>
                        <MenuItem value="Land Rover">Land Rover</MenuItem>
                        <MenuItem value="Tesla">Tesla</MenuItem>
                        <MenuItem value="Hyundai">Hyundai</MenuItem>
                        <MenuItem value="Nissan">Nissan</MenuItem>
                        <MenuItem value="Ford">Ford</MenuItem>
                        <MenuItem value="Honda">Honda</MenuItem>
                        <MenuItem value="Toyota">Toyota</MenuItem>
                        <MenuItem value="BMW">BMW</MenuItem>
                      </Select>
                    </FormControl>
                    <FormControl fullWidth variant="outlined" required>
                      <InputLabel id="type-label">Type*</InputLabel>
                      <Select
                        labelId="type-label"
                        id="type-select"
                        value={type}
                        label="Type"
                        onChange={(e) => setType(e.target.value)}
                      >
                        <MenuItem value="">Select vehicle type</MenuItem>
                        <MenuItem value="Family">Family</MenuItem>
                        <MenuItem value="Luxury">Luxury</MenuItem>
                        <MenuItem value="Executive">Executive</MenuItem>
                        <MenuItem value="Compact">Compact</MenuItem>
                        <MenuItem value="Affordable">Affordable</MenuItem>
                      </Select>
                    </FormControl>
                    <FormControl fullWidth variant="outlined" required>
                      <TextField
                        id="seating-capacity-input"
                        label="Seating Capacity*"
                        variant="outlined"
                        value={seatingCapacity}
                        onChange={(e) => setSeatingCapacity(e.target.value)}
                        placeholder="Input how many person can seat"
                        type="number"
                      />
                    </FormControl>
                    <FormControl fullWidth variant="outlined" required>
                      <InputLabel id="transmission-type-label">Transmission type*</InputLabel>
                      <Select
                        labelId="transmission-type-label"
                        id="transmission-type-select"
                        value={transmissionType}
                        label="Transmission type"
                        onChange={(e) => setTransmissionType(e.target.value)}
                      >
                        <MenuItem value="">Select vehicle transmission</MenuItem>
                        <MenuItem value="Automatic">Automatic</MenuItem>
                        <MenuItem value="Manual">Manual</MenuItem>
                        <MenuItem value="Continuously Variable">Continuously Variable</MenuItem>
                        <MenuItem value="Dual-Clutch">Dual-Clutch</MenuItem>
                        <MenuItem value="Semi-Automatic">Semi-Automatic</MenuItem>
                      </Select>
                    </FormControl>
                  </Stack>
                  {/* Column 2 */}
                  <Stack spacing={2}>
                    <TextField
                      fullWidth
                      label="Model*"
                      variant="outlined"
                      value={model}
                      onChange={(e) => setModel(e.target.value)}
                      placeholder="Model Name"
                      required
                    />
                    <TextField
                      fullWidth
                      label="Engine Capacity (cc)*"
                      variant="outlined"
                      value={engineCapacity}
                      onChange={(e) => setEngineCapacity(e.target.value)}
                      placeholder="Ex: 450"
                      type="number"
                      required
                    />
                    <FormControl component="fieldset" fullWidth>
                      <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>Air Condition</Typography>
                      <RadioGroup row value={airCondition} onChange={(e) => setAirCondition(e.target.value)}>
                        <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                        <FormControlLabel value="no" control={<Radio />} label="No" />
                      </RadioGroup>
                    </FormControl>
                  </Stack>
                  {/* Column 3 */}
                  <Stack spacing={2}>
                    <FormControl fullWidth variant="outlined" required>
                      <InputLabel id="category-label">Category*</InputLabel>
                      <Select
                        labelId="category-label"
                        id="category-select"
                        value={category}
                        label="Category"
                        onChange={(e) => setCategory(e.target.value)}
                      >
                        <MenuItem value="">Select vehicle category</MenuItem>
                        <MenuItem value="Luxury Minibus">Luxury Minibus</MenuItem>
                        <MenuItem value="Crossover">Crossover</MenuItem>
                        <MenuItem value="Family van">Family van</MenuItem>
                        <MenuItem value="Electric car">Electric car</MenuItem>
                        <MenuItem value="Standard Sedan">Standard Sedan</MenuItem>
                        <MenuItem value="SUV">SUV</MenuItem>
                        <MenuItem value="Luxury Sedan">Luxury Sedan</MenuItem>
                      </Select>
                    </FormControl>
                    <TextField
                      fullWidth
                      label="Engine Power (hp)*"
                      variant="outlined"
                      value={enginePower}
                      onChange={(e) => setEnginePower(e.target.value)}
                      placeholder="Ex: 100"
                      type="number"
                      required
                    />
                    <FormControl fullWidth variant="outlined" required>
                      <InputLabel id="fuel-type-label">Fuel type*</InputLabel>
                      <Select
                        labelId="fuel-type-label"
                        id="fuel-type-select"
                        value={fuelType}
                        label="Fuel type"
                        onChange={(e) => setFuelType(e.target.value)}
                      >
                        <MenuItem value="">Select fuel type</MenuItem>
                        <MenuItem value="Octane">Octane</MenuItem>
                        <MenuItem value="Petrol">Petrol</MenuItem>
                        <MenuItem value="CNG">CNG</MenuItem>
                        <MenuItem value="Diesel">Diesel</MenuItem>
                        <MenuItem value="Electric">Electric</MenuItem>
                      </Select>
                    </FormControl>
                  </Stack>
                </Box>
              </CardContent>
            </Card>
          </Box>
          {/* Vehicle Identity Section */}
          <Box sx={{ mb: 4 }}>
            <Card sx={{ p: 2, boxShadow: 'none', border: `1px solid ${theme.palette.grey[200]}` }}>
              <CardContent sx={{ '&:last-child': { pb: 2 } }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Box>
                    <Typography variant="h6" gutterBottom>
                      Vehicle Identity
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Insert The Vehicle's Unique Informations
                    </Typography>
                  </Box>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={sameModelMultipleVehicles}
                        onChange={(e) => setSameModelMultipleVehicles(e.target.checked)}
                        name="sameModelMultipleVehicles"
                        color="primary"
                      />
                    }
                    label="Same Model Multiple Vehicles"
                    labelPlacement="start"
                  />
                </Box>
                <Box sx={{ display: 'grid', gridTemplateColumns: isSmallScreen ? '1fr' : 'repeat(2, 1fr)', gap: theme.spacing(3) }}>
                  <TextField
                    fullWidth
                    label="VIN Number*"
                    variant="outlined"
                    value={vinNumber}
                    onChange={(e) => setVinNumber(e.target.value)}
                    placeholder="Type your business name"
                    required
                  />
                  <TextField
                    fullWidth
                    label="License Plate Number*"
                    variant="outlined"
                    value={licensePlateNumber}
                    onChange={(e) => setLicensePlateNumber(e.target.value)}
                    placeholder="Type your license plate number"
                    required
                  />
                </Box>
                {sameModelMultipleVehicles && (
                  <Box sx={{ mt: 3 }}>
                    <Typography variant="h6" gutterBottom>
                      Additional Vehicle Identity
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      Insert Additional Vehicle's Unique Informations
                    </Typography>
                    <Box sx={{ display: 'grid', gridTemplateColumns: isSmallScreen ? '1fr' : 'repeat(2, 1fr)', gap: theme.spacing(3) }}>
                      <TextField
                        fullWidth
                        label="Additional VIN Number*"
                        variant="outlined"
                        value={additionalVinNumber}
                        onChange={(e) => setAdditionalVinNumber(e.target.value)}
                        placeholder="Type additional VIN number"
                        required
                      />
                      <TextField
                        fullWidth
                        label="Additional License Plate Number*"
                        variant="outlined"
                        value={additionalLicensePlateNumber}
                        onChange={(e) => setAdditionalLicensePlateNumber(e.target.value)}
                        placeholder="Type additional license plate number"
                        required
                      />
                    </Box>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Box>
          {/* Pricing & Discounts Section */}
          <Box sx={{ mb: 4 }}>
            <Card sx={{ p: 2, boxShadow: 'none', border: `1px solid ${theme.palette.grey[200]}` }}>
              <CardContent sx={{ '&:last-child': { pb: 2 } }}>
                <Typography variant="h6" gutterBottom>
                  Pricing & Discounts
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Insert The Pricing & Discount Informations
                </Typography>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle1" gutterBottom>Trip Type</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Choose the trip type you prefer.
                  </Typography>
                  <Box sx={{ display: 'grid', gridTemplateColumns: isSmallScreen ? '1fr' : 'repeat(3, 1fr)', gap: theme.spacing(2) }}>
                    <Card
                      variant="outlined"
                      sx={{
                        p: 2,
                        cursor: 'pointer',
                        borderColor: tripType === 'hourly' ? theme.palette.primary.main : undefined,
                        borderWidth: tripType === 'hourly' ? 2 : 1,
                      }}
                      onClick={() => setTripType('hourly')}
                    >
                      <FormControlLabel
                        control={<Radio checked={tripType === 'hourly'} onChange={() => setTripType('hourly')} />}
                        label="Hourly"
                        labelPlacement="start"
                        sx={{ m: 0, '.MuiFormControlLabel-label': { ml: 'auto' } }}
                      />
                      <Typography variant="body2" color="text.secondary">
                        Set your hourly rental price.
                      </Typography>
                    </Card>
                    <Card
                      variant="outlined"
                      sx={{
                        p: 2,
                        cursor: 'pointer',
                        borderColor: tripType === 'perDay' ? theme.palette.primary.main : undefined,
                        borderWidth: tripType === 'perDay' ? 2 : 1,
                      }}
                      onClick={() => setTripType('perDay')}
                    >
                      <FormControlLabel
                        control={<Radio checked={tripType === 'perDay'} onChange={() => setTripType('perDay')} />}
                        label="Per Day"
                        labelPlacement="start"
                        sx={{ m: 0, '.MuiFormControlLabel-label': { ml: 'auto' } }}
                      />
                      <Typography variant="body2" color="text.secondary">
                        Set your Per Day rental price.
                      </Typography>
                    </Card>
                    <Card
                      variant="outlined"
                      sx={{
                        p: 2,
                        cursor: 'pointer',
                        borderColor: tripType === 'distanceWise' ? theme.palette.primary.main : undefined,
                        borderWidth: tripType === 'distanceWise' ? 2 : 1,
                      }}
                      onClick={() => setTripType('distanceWise')}
                    >
                      <FormControlLabel
                        control={<Radio checked={tripType === 'distanceWise'} onChange={() => setTripType('distanceWise')} />}
                        label="Distance Wise"
                        labelPlacement="start"
                        sx={{ m: 0, '.MuiFormControlLabel-label': { ml: 'auto' } }}
                      />
                      <Typography variant="body2" color="text.secondary">
                        Set your distance wise rental price.
                      </Typography>
                    </Card>
                  </Box>
                </Box>
                {tripType === 'hourly' && (
                  <Box sx={{ mb: 3 }}>
                    <TextField
                      fullWidth
                      label="Hourly Wise Price ($/per hour)*"
                      variant="outlined"
                      value={hourlyWisePrice}
                      onChange={(e) => setHourlyWisePrice(e.target.value)}
                      placeholder="Ex: 35.25"
                      type="number"
                      inputProps={{ step: "0.01" }}
                      required
                    />
                  </Box>
                )}
                {tripType === 'perDay' && (
                  <Box sx={{ mb: 3 }}>
                    <TextField
                      fullWidth
                      label="Per Day Price ($/per day)*"
                      variant="outlined"
                      value={perDayPrice}
                      onChange={(e) => setPerDayPrice(e.target.value)}
                      placeholder="Ex: 250.00"
                      type="number"
                      inputProps={{ step: "0.01" }}
                      required
                    />
                  </Box>
                )}
                {tripType === 'distanceWise' && (
                  <Box sx={{ mb: 3 }}>
                    <TextField
                      fullWidth
                      label="Distance Wise Price ($/per km)*"
                      variant="outlined"
                      value={distanceWisePrice}
                      onChange={(e) => setDistanceWisePrice(e.target.value)}
                      placeholder="Ex: 1.50"
                      type="number"
                      inputProps={{ step: "0.01" }}
                      required
                    />
                  </Box>
                )}
                <Box>
                  <Typography variant="subtitle1" gutterBottom>Give Discount</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Set a discount that applies to all pricing types—hourly, daily, and distance-based
                  </Typography>
                  <TextField
                    fullWidth
                    label="Discount"
                    variant="outlined"
                    value={giveDiscount}
                    onChange={(e) => setGiveDiscount(e.target.value)}
                    placeholder="Ex: 10"
                    type="number"
                    inputProps={{ step: "any" }}
                    InputProps={{
                      endAdornment: (
                        <FormControl variant="outlined" sx={{ minWidth: 60, ml: 1 }}>
                          <Select
                            value={discountType}
                            onChange={(e) => setDiscountType(e.target.value)}
                            size="small"
                            sx={{
                              '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                              '&.Mui-focused .MuiOutlinedInput-notchedOutline': { border: 'none' },
                              '&:hover .MuiOutlinedInput-notchedOutline': { border: 'none' },
                            }}
                          >
                            <MenuItem value="%">%</MenuItem>
                            <MenuItem value="$">$</MenuItem>
                          </Select>
                        </FormControl>
                      ),
                    }}
                  />
                </Box>
              </CardContent>
            </Card>
          </Box>
          {/* Search Tags Section */}
          <Box sx={{ mb: 4 }}>
            <Card sx={{ p: 2, boxShadow: 'none', border: `1px solid ${theme.palette.grey[200]}` }}>
              <CardContent sx={{ '&:last-child': { pb: 2 } }}>
                <Typography variant="h6" gutterBottom>
                  Search Tags
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Insert The Tags For Appear In User s Search List
                </Typography>
                <TextField
                  fullWidth
                  label="Type and press Enter"
                  variant="outlined"
                  placeholder="Type and press Enter"
                  sx={{ mb: 2 }}
                />
              </CardContent>
            </Card>
          </Box>
          {/* Vehicle Document Section */}
          <Box sx={{ mb: 4 }}>
            <Card sx={{ p: 2, boxShadow: 'none', border: `1px solid ${theme.palette.grey[200]}` }}>
              <CardContent sx={{ '&:last-child': { pb: 2 } }}>
                <Typography variant="h6" gutterBottom>
                  Vehicle Document*
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Upload related documents (PDF, DOC, DOCX). Max size 2MB
                </Typography>
                <UploadDropArea
                  onDragOver={handleDragOver}
                  onDrop={handleDropDoc}
                  onClick={() => document.getElementById('docs-upload').click()}
                >
                  {vehicleDoc && vehicleDoc.length > 0 ? (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, alignItems: 'center' }}>
                      {vehicleDoc.map((file, index) => (
                        <Typography key={index} variant="body2" color="text.primary">
                          📄 {file.name}
                        </Typography>
                      ))}
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        {vehicleDoc.length} document(s) selected
                      </Typography>
                    </Box>
                  ) : (
                    <Box>
                      <CloudUploadIcon sx={{ fontSize: 40, color: theme.palette.grey[400], mb: 1 }} />
                      <Typography variant="body2" color="primary" sx={{ mb: 0.5, fontWeight: 'medium' }}>
                        Click to upload
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Or drag and drop
                      </Typography>
                    </Box>
                  )}
                  <input
                    type="file"
                    id="docs-upload"
                    hidden
                    accept=".pdf,.doc,.docx"
                    multiple
                    onChange={handleVehicleDocChange}
                  />
                </UploadDropArea>
              </CardContent>
            </Card>
          </Box>
          {/* Add a Save Button for demonstration */}
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button
              variant="outlined"
              color="inherit"
              size="large"
              onClick={handleReset}
            >
              Reset
            </Button>
            <Button
              variant="contained"
              type="submit"
              size="large"
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Box>
      {/* Success Toast Message */}
      <Snackbar open={openToast} autoHideDuration={3000} onClose={handleCloseToast} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert onClose={handleCloseToast} severity="success" sx={{ backgroundColor: '#1976d2', color: 'white' }}>
          Vehicle added successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Createauditorium;