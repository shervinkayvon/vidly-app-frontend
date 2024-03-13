import React, { useState, useEffect } from 'react';
import { Button, Menu, MenuItem } from '@mui/material';

import RequestApis from '../../apis/RequestApis';
import Table from '../../utils/Table/Table';
import AddEditModal from '../../utils/Modals/AddEditModal';
import DeleteModal from '../../utils/Modals/DeleteModal';

function MoviesPage() {
  const [moviesData, setMoviesData] = useState(null);
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
    { field: 'title', headerName: 'Title', width: 250 },
    { 
      field: 'genre', 
      headerName: 'Genre', 
      width: 200,
      valueGetter: (params) => params.row.genre.name 
    },
    { field: 'numberInStock', headerName: 'Number In Stock', width: 150 },
    { field: 'dailyRentalRate', headerName: 'Daily Rental Rate', width: 150 }
];

  useEffect(() => {
    if (!openAddEditModal && !openDeleteModal) {
        RequestApis.getMovies().then((res) => {
            const dataWithIds = res.data.map((row) => ({
              ...row,
              id: row._id,
            }));
            setMoviesData(dataWithIds);
          }).catch((err) => {
            setMoviesData([]);
            console.log(err);
          });
    }
  }, [openAddEditModal, openDeleteModal]);

  return (
    <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '0 20px 20px 0' }}>
            <h1>Movies</h1>
            <Button variant="contained" onClick={() => {
                handleAddEditModalOpen();
                setRow(null);
            }}>Add Movie</Button>
        </div>
        <AddEditModal
            open={openAddEditModal}
            handleClose={handleAddEditModalClose}
            row={row}
            title="Movie"
        />
        <DeleteModal
            open={openDeleteModal}
            handleClose={handleDeleteModalClose}
            row={row}
            title="Movie"
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
            data={moviesData} 
            columns={columns} 
            handleMenuClick={handleMenuClick} 
            setRow={setRow}
            sortByRow="title"
        />
    </div>
  );
}

export default MoviesPage;
