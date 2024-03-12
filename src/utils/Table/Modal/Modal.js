import React from "react";
import { Button, Modal, Box, Typography } from '@mui/material';

import AddEditCustomerForm from "../../../components/CustomersPage/AddEditCustomerForm";

function ModalComponent({ open, handleClose, row }) {
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
                        Add Customer
                    </Typography>
                    <br/>
                    <AddEditCustomerForm handleClose={handleClose} row={row} />
                    <Button style={{ position: 'absolute', top: 15, right: 15 }} color='error' variant="outlined" onClick={handleClose}>Close</Button>
                </Box>
            </Modal>
        </div>
    );
}

export default ModalComponent;