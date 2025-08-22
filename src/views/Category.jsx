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
  CloudUpload as CloudUploadIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  FileDownload as ExportIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export default function CategoryManagement() {
  const [tabValue, setTabValue] = useState(0);
  const [categoryName, setCategoryName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [categories] = useState([
    { id: 11, name: 'Luxury Minibus', status: true },
    { id: 10, name: 'Crossover', status: true }
  ]);

  const navigate = useNavigate();

  const handleTabChange = (event, newValue) => setTabValue(newValue);
  const handleImageUpload = () => console.log('Upload image clicked');
  const handleAdd = () => console.log('Add category:', categoryName);
  const handleReset = () => setCategoryName('');
  const handleEdit = (id) => navigate(`/edit-category/${id}`);
  const handleDelete = (id) => console.log('Delete category:', id);
  const handleStatusToggle = (id) => console.log('Toggle status for:', id);

  return (
    <Box sx={{ width: '100%', minHeight: '100vh', backgroundColor: '#f5f5f5', p: { xs: 2, sm: 3 } }}>
      
      {/* Add Category Form */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
        <Card sx={{ width: '100%', maxWidth: '1400px', boxShadow: 3, borderRadius: 3 }}>
          <CardContent sx={{ p: { xs: 2, sm: 4 } }}>
            
            {/* Tabs */}
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              variant="scrollable"
              scrollButtons="auto"
              sx={{
                mb: 4,
                borderBottom: 1,
                borderColor: 'divider',
                '& .MuiTabs-indicator': { backgroundColor: '#2196f3' }
              }}
            >
              <Tab label="Default" />
              <Tab label="English(EN)" />
              <Tab label="Arabic - العربية(AR)" />
            </Tabs>

            {/* Name Input */}
            <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 500 }}>
              Name (Default) <span style={{ color: '#f44336' }}>*</span>
            </Typography>
            <TextField
              fullWidth
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="Enter category name"
              variant="outlined"
              sx={{ mb: 4 }}
            />

            {/* Upload Image */}
            <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 500 }}>
              Image <span style={{ color: '#f44336' }}>*</span>{' '}
              <span style={{ color: '#e91e63', fontSize: '0.875rem' }}>( Ratio 3:2)</span>
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: { xs: 'center', sm: 'flex-start' }, mb: 4 }}>
              <Button
                variant="outlined"
                onClick={handleImageUpload}
                sx={{
                  width: { xs: '100%', sm: 240 },
                  height: { xs: 100, sm: 140 },
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
                <CloudUploadIcon sx={{ fontSize: 40, color: '#bdbdbd' }} />
                <Typography variant="body2" color="text.secondary">Upload Image</Typography>
              </Button>
            </Box>

            {/* Action Buttons */}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: { xs: 'center', sm: 'flex-end' }, gap: 2 }}>
              <Button
                variant="outlined"
                onClick={handleReset}
                sx={{
                  px: 4, py: 1.5, textTransform: 'none',
                  borderColor: '#e0e0e0', color: '#666',
                  '&:hover': { borderColor: '#bdbdbd', backgroundColor: '#f5f5f5' }
                }}
              >
                Reset
              </Button>
              <Button
                variant="contained"
                onClick={handleAdd}
                sx={{
                  px: 4, py: 1.5,
                  backgroundColor: '#00695c', textTransform: 'none',
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
          <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
            
            {/* Header */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2, mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="h6" fontWeight={600}>Category List</Typography>
                <Chip label="11" size="small" sx={{ backgroundColor: '#e3f2fd', color: '#2196f3', fontWeight: 600 }} />
              </Box>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'center' }}>
                <TextField
                  size="small"
                  placeholder="Search categories"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  sx={{ minWidth: { xs: '100%', sm: 250, md: 300 } }}
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

            {/* Table */}
            <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
              <Table size="small">
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
                    <TableRow key={category.id} sx={{ '&:hover': { backgroundColor: '#f9f9f9' } }}>
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
                          <IconButton size="small" onClick={() => handleEdit(category.id)} sx={{ color: '#2196f3' }}>
                            <EditIcon fontSize="small" />
                          </IconButton>
                          <IconButton size="small" onClick={() => handleDelete(category.id)} sx={{ color: '#f44336' }}>
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
