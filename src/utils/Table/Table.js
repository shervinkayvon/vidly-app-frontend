import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, LinearProgress } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import './Table.css';

export default function DataTable({ data, columns, handleMenuClick, setRow, sortByRow }) {
    if (!data) {
        return <LinearProgress />;
    }

    const sortedData = [...data].sort((a, b) => {
        const nameA = a[sortByRow].toLowerCase();
        const nameB = b[sortByRow].toLowerCase();
        
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
        return 0;
    });

    const columnsWithButton = [
        ...columns,
        {
            field: 'button',
            headerName: 'Actions',
            sortable: false,
            width: 150,
            renderCell: (params) => (
                <Button onClick={(e) => {
                    setRow(params.row);
                    handleMenuClick(e);
                }}>
                    <MoreVertIcon />
                </Button>
            ),
        },
    ];

    return (
        <div className='table'>
                <DataGrid
                    sx={{
                        '& .MuiDataGrid-columnHeaders': {
                            background: '#cccccc49'
                        },
                        '& .MuiDataGrid-columnHeaderTitle': {
                            fontWeight: 'bold',
                        }
                    }}
                    rows={sortedData}
                    columns={columnsWithButton}
                    initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 25 },
                    },
                    }}
                    pageSizeOptions={[5, 10, 25]}
                    disableRowSelectionOnClick
                />
        </div>
    );
}
