import ReactDataGrid from '@inovua/reactdatagrid-community';
import '@inovua/reactdatagrid-community/index.css';
import { Box, Button, FormControl, FormControlLabel, FormGroup, Input, Switch, SvgIcon } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Stack } from '@mui/system';
import { useState } from 'react';
import { MTATransportModal } from './../../modals/mta.transport.modal';

const gridStyle = { minHeight: 600 };

const columns = [
  { name: 'name', defaultFlex: 1, header: 'Name' },
  { name: 'description', defaultFlex: 1, header: 'Description' },
  { name: 'type', defaultFlex: 1, header: 'Type' },
  { name: 'is_active', defaultFlex: 1, header: 'Status' },
  { name: 'params', defaultFlex: 1, header: 'Params' },
  {
    id: 'options',
    defaultFlex: 1,
    header: 'Options',
    render: ({ data }) =>
      <Button onClick={() => { console.log(data.id); }}>
        Edit
      </Button>
  },
];

const filterValue = [
  { name: 'name', operator: 'startsWith', type: 'string', value: '' },
  { name: 'description', operator: 'startsWith', type: 'string', value: '' },
  { name: 'type', operator: 'startsWith', type: 'string', value: '' },
];

export const MTATransportTable = (props) => {
  const { data, isLoading } = props;
  const [enableFiltering, setEnableFiltering] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleCloseModal = () => {
    setIsOpenModal(!isOpenModal);
  };

  return (
    <Box sx={{ minWidth: 800 }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        sx={{
          mb: 2
        }}
      >
        <FormControl component="fieldset">
          <FormGroup aria-label="position" row>
            <FormControlLabel
              value="start"
              control={
                <Switch color="primary" checked={enableFiltering} onChange={(e) => setEnableFiltering(event.target.checked)} />
              }
              label="Filter"
              labelPlacement="start"
              sx={{ ml: 0 }}
            />
          </FormGroup>
        </FormControl>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => setIsOpenModal(true)}>
          Add
        </Button>
      </Stack>
      <MTATransportModal isOpen={isOpenModal} handleClose={handleCloseModal} />
      <ReactDataGrid
        columns={columns}
        dataSource={data}
        style={gridStyle}
        defaultFilterValue={filterValue}
        pagination
        loading={isLoading}
        defaultLimit={20}
        enableFiltering={enableFiltering}
      />
    </Box>
  );
};