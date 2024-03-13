import React from "react";
import { Button, Modal, Box, Typography } from '@mui/material';
import _ from 'lodash';

import DeleteCustomerForm from "../../components/CustomersPage/shared/DeleteCustomerForm";
import DeleteGenreForm from "../../components/GenresPage/shared/DeleteGenreForm";
import DeleteMovieForm from "../../components/MoviesPage/shared/DeleteMovieForm";

function DeleteModal({ open, handleClose, row, title }) {
    const isRowLoaded = _.isObject(row);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '1px solid #000',
        boxShadow: 24,
        padding: 4
    };  

    const handleBackdropClick = (event) => {
        event.stopPropagation();
    };

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                disableEscapeKeyDown
                BackdropProps={{
                    onClick: handleBackdropClick
                }}
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {`Delete ${title}`}
                    </Typography>
                    <br/>
                    {title === 'Customer' &&<DeleteCustomerForm handleClose={handleClose} row={row} />}
                    {title === 'Genre' && <DeleteGenreForm handleClose={handleClose} row={row} />}
                    {title === 'Movie' && <DeleteMovieForm handleClose={handleClose} row={row} />}
                    <Button style={{ position: 'absolute', top: 15, right: 15 }} color='error' variant="outlined" onClick={handleClose}>Close</Button>
                </Box>
            </Modal>
        </div>
    );
}

export default DeleteModal;