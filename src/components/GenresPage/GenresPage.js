import React, { useState, useEffect } from 'react';
import { Button, Menu, MenuItem } from '@mui/material';

import RequestApis from '../../apis/RequestApis';
import Table from '../../utils/Table/Table';
import AddEditModal from '../../utils/Modals/AddEditModal';
import DeleteModal from '../../utils/Modals/DeleteModal';

function GenrePage() {
  const [genresData, setGenresData] = useState(null);
  const [openAddEditModal, setAddEditModalOpen] = useState(false);
  const [openDeleteModal, setDeleteModalOpen] = useState(false);
  const [row, setRow] = useState(null);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleAddEditModalOpen = () => setAddEditModalOpen(true);
  const handleAddEditModalClose = () => setAddEditModalOpen(false);
  const handleDeleteModalOpen = () => setDeleteModalOpen(true);
  const handleDeleteModalClose = () => setDeleteModalOpen(false);
  
  const columns = [
      { field: 'name', headerName: 'Name', width: 500 }
  ];

  useEffect(() => {
    if (!openAddEditModal && !openDeleteModal) {
        RequestApis.getGenres().then((res) => {
            const dataWithIds = res.data.map((row) => ({
              ...row,
              id: row._id,
            }));
            setGenresData(dataWithIds);
          }).catch((err) => {
            setGenresData([]);
            console.log(err);
          });
    }
  }, [openAddEditModal, openDeleteModal]);

  return (
    <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '0 20px 20px 0' }}>
            <h1>Genres</h1>
            <Button variant="contained" onClick={() => {
                handleAddEditModalOpen();
                setRow(null);
            }}>Add Genre</Button>
        </div>
        <AddEditModal
            open={openAddEditModal}
            handleClose={handleAddEditModalClose}
            row={row}
            title="Genre"
        />
        <DeleteModal
            open={openDeleteModal}
            handleClose={handleDeleteModalClose}
            row={row}
            title="Genre"
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
                handleAddEditModalOpen();
                handleMenuClose();
            }}>Edit</MenuItem>
            <MenuItem onClick={() => {
                handleDeleteModalOpen();
                handleMenuClose();
            }}>Delete</MenuItem>
        </Menu>
        <Table 
            data={genresData} 
            columns={columns} 
            handleMenuClick={handleMenuClick} 
            setRow={setRow}
        />
    </div>
  );
}

export default GenrePage;
