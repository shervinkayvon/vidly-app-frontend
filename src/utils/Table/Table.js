import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, LinearProgress } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import './Table.css';

export default function DataTable({ data, columns, handleMenuClick, setRow }) {
    if (!data) {
        return <LinearProgress />;
    }

    const sortedData = [...data].sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        
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
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                    }}
                    pageSizeOptions={[5, 10, 25]}
                    disableRowSelectionOnClick
                />
        </div>
    );
}
