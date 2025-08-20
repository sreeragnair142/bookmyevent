import React from 'react';
import { 
  Box, 
  Tabs, 
  Tab, 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableRow, 
  Typography, 
  TextField 
} from '@mui/material';

function NewProvider() {
  const [tabValue, setTabValue] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ p: 3, backgroundColor: 'white' }}>
      {/* Tabs for Pending Stores and Denied Stores */}
      <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 2 }}>
        <Tab label="Pending Stores" />
        <Tab label="Denied Stores" />
      </Tabs>

      {/* Stores List and Search */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h6">Stores List {tabValue === 0 ? '0' : '0'}</Typography>
        <TextField
          variant="outlined"
          placeholder="Ex : Search Store Name"
          size="small"
          sx={{ width: 200 }}
        />
      </Box>

      {/* Table */}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>S1</TableCell>
            <TableCell>Store Information</TableCell>
            <TableCell>Module</TableCell>
            <TableCell>Owner Information</TableCell>
            <TableCell>Zone</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* No Data Found */}
          <TableRow>
            <TableCell colSpan={7} align="center">
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {/* You can replace this with an actual image or icon */}
                <Typography variant="h6">No Data Found</Typography>
              </Box>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Box>
  );
}

export default NewProvider;