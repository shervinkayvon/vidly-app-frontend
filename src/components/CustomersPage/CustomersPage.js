import React, { useState, useEffect } from 'react';
import { Button, Menu, MenuItem } from '@mui/material';

import RequestApis from '../../apis/RequestApis';
import Table from '../../utils/Table/Table';
import Modal from '../../utils/Table/Modal/Modal';

function CustomersPage() {
  const [customersData, setCustomersData] = useState(null);
  const [open, setOpen] = useState(false);
  const [row, setRow] = useState(null);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  const columns = [
      { field: 'name', headerName: 'Name', width: 200 },
      { field: 'phone', headerName: 'Phone', width: 150 },
      { field: 'isGold', headerName: 'Is Gold', width: 150 }
  ];

  useEffect(() => {
    if (!open) {
        RequestApis.getCustomers().then((res) => {
            const dataWithIds = res.data.map((row) => ({
              ...row,
              id: row._id,
            }));
            setCustomersData(dataWithIds);
          }).catch((err) => {
            setCustomersData([]);
            console.log(err);
          });
    }
  }, [open]);

  return (
    <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '0 20px 20px 0' }}>
            <h1>Customers</h1>
            <Button variant="contained" onClick={handleOpen}>Add Customer</Button>
        </div>
        <Modal
            open={open}
            handleClose={handleClose}
            row={row}
        />
        <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={openMenu}
            onClose={handleMenuClose}
            MenuListProps={{
            'aria-labelledby': 'basic-button',
            }}
        >
            <MenuItem onClick={() => {
                setOpen(true);
                handleMenuClose();
            }}>Edit</MenuItem>
            <MenuItem onClick={() => {
                // setOpen(true);
                handleMenuClose();
            }}>Delete</MenuItem>
            <MenuItem onClick={handleMenuClose}>Delete</MenuItem>
        </Menu>
        <Table 
            data={customersData} 
            columns={columns} 
            handleMenuClick={handleMenuClick} 
            setRow={setRow}
        />
    </div>
  );
}

export default CustomersPage;
