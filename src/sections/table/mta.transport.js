import ReactDataGrid from '@inovua/reactdatagrid-community';
import '@inovua/reactdatagrid-community/index.css';
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import DoneIcon from '@mui/icons-material/Done';
import { Box, Button, FormControl, FormControlLabel, FormGroup, Switch } from '@mui/material';
import { red } from '@mui/material/colors';
import { Stack } from '@mui/system';
import Router from 'next/router';
import { useCallback, useState } from 'react';
import { MTATransportModal } from '../../modals/mta.transport.modal';
import { useDispatch, useSelector } from 'react-redux';

const gridStyle = { minHeight: 500 };

const columns = [
  { name: 'name', defaultFlex: 1, header: 'Name' },
  { name: 'description', defaultFlex: 1, header: 'Description' },
  { name: 'type', defaultFlex: 1, header: 'Type' },
  {
    name: 'is_active',
    defaultWidth: 100,
    header: 'Status',
    render: ({ value }) => {
      return value ? <DoneIcon color='success' /> : <ClearIcon sx={{ color: red[500] }} />;
    }
  },
  { name: 'params', defaultFlex: 1, header: 'Params' }
];

const filterValue = [
  { name: 'name', operator: 'startsWith', type: 'string', value: '' },
  { name: 'description', operator: 'startsWith', type: 'string', value: '' },
  { name: 'type', operator: 'startsWith', type: 'string', value: '' }
];

export const MTATransportTable = (props) => {
  const { data, isLoading } = props;
  const [enableFiltering, setEnableFiltering] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [modalData, setModalData] = useState();
  const [isUpdate, setIsUpdate] = useState(false);

  const dispatch = useDispatch();
  const { success, error, message } = useSelector((state) => state.updateMTATransport);

  const handleCloseModal = () => {
    setIsOpenModal(!isOpenModal);
  };

  const handleOpenModal = () => {
    setIsUpdate(false);
    setIsOpenModal(true);
  };

  const onRenderRow = useCallback((rowProps) => {
    const { onClick } = rowProps;
    rowProps.onClick = (event) => {
      Router.push({
        pathname: `/mta/transport/detail`,
        query: {
          id: rowProps.data.id
        }
      });

      if (onClick) {
        onClick(event);
      }
    };
  }, []);

  return (
    <Box sx={{ minWidth: 800 }}>
      <Stack
        direction='row'
        justifyContent='space-between'
        sx={{
          mb: 2
        }}
      >
        <FormControl component='fieldset'>
          <FormGroup aria-label='position' row>
            <FormControlLabel
              value='start'
              control={
                <Switch color='primary' checked={enableFiltering}
                        onChange={(e) => setEnableFiltering(e.target.checked)} />
              }
              label='Filter'
              labelPlacement='start'
              sx={{ ml: 0 }}
            />
          </FormGroup>
        </FormControl>
        <Button variant='contained' startIcon={<AddIcon />} onClick={handleOpenModal}>
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
        defaultLimit={10}
        enableFiltering={enableFiltering}
        onRenderRow={onRenderRow}
      />
    </Box>
  );
};