import React, { useState } from 'react';
import {
  Box,
  Typography,
  Tabs,
  Tab,
  TextField,
  Button,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Switch,
  IconButton,
  InputAdornment,
  Chip,
  Grid
} from '@mui/material';
import {
  Add as AddIcon,
  CloudUpload as CloudUploadIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  FileDownload as ExportIcon,
  Refresh as RefreshIcon
} from '@mui/icons-material';

export default function CategoryManagement() {
  const [tabValue, setTabValue] = useState(0);
  const [categoryName, setCategoryName] = useState('New category');
  const [searchTerm, setSearchTerm] = useState('');
  const [categories] = useState([
    { id: 11, name: 'Luxury Minibus', status: true },
    { id: 10, name: 'Crossover', status: true }
  ]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleImageUpload = () => {
    console.log('Upload image clicked');
  };

  const handleAdd = () => {
    console.log('Add category:', categoryName);
  };

  const handleReset = () => {
    setCategoryName('New category');
  };

  const handleEdit = (id) => {
    console.log('Edit category:', id);
  };

  const handleDelete = (id) => {
    console.log('Delete category:', id);
  };

  const handleStatusToggle = (id) => {
    console.log('Toggle status for:', id);
  };

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
        p: 3
      }}
    >
      {/* Add Category Form */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          mb: 4
        }}
      >
        <Card
          sx={{
            width: '100%',
            maxWidth: '1400px', // Increased max-width
            boxShadow: 3,
            borderRadius: 3
          }}
        >
          <CardContent sx={{ p: 4 }}>
            {/* Language Tabs */}
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              sx={{
                mb: 4,
                borderBottom: 1,
                borderColor: 'divider',
                '& .MuiTabs-indicator': {
                  backgroundColor: '#2196f3'
                }
              }}
            >
              <Tab
                label="Default"
                sx={{
                  fontWeight: tabValue === 0 ? 600 : 400,
                  color: tabValue === 0 ? '#2196f3' : 'text.secondary',
                  textTransform: 'none'
                }}
              />
              <Tab
                label="English(EN)"
                sx={{
                  fontWeight: tabValue === 1 ? 600 : 400,
                  color: tabValue === 1 ? '#2196f3' : 'text.secondary',
                  textTransform: 'none'
                }}
              />
              <Tab
                label="Arabic - العربية(AR)"
                sx={{
                  fontWeight: tabValue === 2 ? 600 : 400,
                  color: tabValue === 2 ? '#2196f3' : 'text.secondary',
                  textTransform: 'none'
                }}
              />
            </Tabs>

            <Grid container spacing={4}>
              {/* Left Column - Name Input */}
              <Grid item xs={12} md={7}>
                <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 500 }}>
                  Name (Default) <span style={{ color: '#f44336' }}>*</span>
                </Typography>
                <TextField
                  fullWidth
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  placeholder="New category"
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '&:hover fieldset': { borderColor: '#2196f3' },
                      '&.Mui-focused fieldset': { borderColor: '#2196f3' }
                    }
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton size="small">
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>

              {/* Right Column - Image Upload */}
              <Grid item xs={12} md={5}>
                <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 500 }}>
                  Image <span style={{ color: '#f44336' }}>*</span>{' '}
                  <span style={{ color: '#e91e63', fontSize: '0.875rem' }}>( Ratio 3:2)</span>
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Button
                    variant="outlined"
                    onClick={handleImageUpload}
                    sx={{
                      minHeight: 140, // Increased height
                      minWidth: 240,  // Increased width
                      border: '2px dashed #e0e0e0',
                      borderRadius: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 1,
                      color: 'text.secondary',
                      textTransform: 'none',
                      '&:hover': {
                        borderColor: '#2196f3',
                        backgroundColor: '#e3f2fd',
                        border: '2px dashed #2196f3'
                      }
                    }}
                  >
                    <CloudUploadIcon sx={{ fontSize: 48, color: '#bdbdbd' }} />
                    <Typography variant="body2" color="text.secondary">
                      Upload Image
                    </Typography>
                  </Button>

                  <IconButton
                    sx={{
                      backgroundColor: '#2196f3',
                      color: 'white',
                      width: 48,
                      height: 48,
                      '&:hover': { backgroundColor: '#1976d2' }
                    }}
                  >
                    <RefreshIcon />
                  </IconButton>
                </Box>
              </Grid>
            </Grid>

            {/* Action Buttons */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 4 }}>
              <Button
                variant="outlined"
                onClick={handleReset}
                sx={{
                  px: 4,
                  py: 1.5,
                  textTransform: 'none',
                  borderColor: '#e0e0e0',
                  color: '#666',
                  '&:hover': { borderColor: '#bdbdbd', backgroundColor: '#f5f5f5' }
                }}
              >
                Reset
              </Button>
              <Button
                variant="contained"
                onClick={handleAdd}
                sx={{
                  px: 4,
                  py: 1.5,
                  backgroundColor: '#00695c',
                  textTransform: 'none',
                  '&:hover': { backgroundColor: '#004d40' }
                }}
              >
                Add
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>

      {/* Category List */}
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Card sx={{ width: '100%', maxWidth: '1400px', boxShadow: 3, borderRadius: 3 }}>
          <CardContent sx={{ p: 0 }}>
            {/* List Header */}
            <Box sx={{ p: 3, pb: 2 }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 2,
                  flexWrap: 'wrap',
                  gap: 2
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Typography variant="h6" fontWeight={600}>
                    Category List
                  </Typography>
                  <Chip
                    label="11"
                    size="small"
                    sx={{ backgroundColor: '#e3f2fd', color: '#2196f3', fontWeight: 600 }}
                  />
                </Box>

                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
                  <TextField
                    size="small"
                    placeholder="Search categories"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    sx={{
                      minWidth: 300, // increased width
                      '& .MuiOutlinedInput-root': {
                        '&:hover fieldset': { borderColor: '#2196f3' },
                        '&.Mui-focused fieldset': { borderColor: '#2196f3' }
                      }
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon sx={{ color: '#bdbdbd' }} />
                        </InputAdornment>
                      )
                    }}
                  />
                  <Button
                    variant="outlined"
                    startIcon={<ExportIcon />}
                    sx={{
                      minWidth: 100,
                      textTransform: 'none',
                      borderColor: '#e0e0e0',
                      color: '#2196f3',
                      '&:hover': { borderColor: '#2196f3', backgroundColor: '#e3f2fd' }
                    }}
                  >
                    Export
                  </Button>
                </Box>
              </Box>
            </Box>

            {/* Table */}
            <TableContainer>
              <Table>
                <TableHead sx={{ backgroundColor: '#fafafa' }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600, color: '#666' }}>SI</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#666' }}>Id</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#666' }}>Name</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#666' }}>Status</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#666' }}>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {categories.map((category, index) => (
                    <TableRow
                      key={category.id}
                      sx={{
                        '&:hover': { backgroundColor: '#f9f9f9' },
                        '&:last-child td': { borderBottom: 0 }
                      }}
                    >
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{category.id}</TableCell>
                      <TableCell sx={{ fontWeight: 500 }}>{category.name}</TableCell>
                      <TableCell>
                        <Switch
                          checked={category.status}
                          onChange={() => handleStatusToggle(category.id)}
                          sx={{
                            '& .MuiSwitch-switchBase.Mui-checked': { color: '#2196f3' },
                            '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: '#2196f3' }
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <IconButton
                            size="small"
                            onClick={() => handleEdit(category.id)}
                            sx={{ color: '#2196f3', '&:hover': { backgroundColor: '#e3f2fd' } }}
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => handleDelete(category.id)}
                            sx={{ color: '#f44336', '&:hover': { backgroundColor: '#ffebee' } }}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
