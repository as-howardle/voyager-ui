
import ReactDataGrid from '@inovua/reactdatagrid-community';
import '@inovua/reactdatagrid-community/index.css';
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import DoneIcon from '@mui/icons-material/Done';
import { Box, Button, FormControl, FormControlLabel, FormGroup, Switch } from '@mui/material';
import { red } from '@mui/material/colors';
import { Stack } from '@mui/system';
import { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MTADefinitionModal } from './../../modals/mta.definition.modal';
import { listMTADefinition, setMTADefinitionDetail } from './../../redux/actions/mta.definition.action';
import Router from 'next/router';

const gridStyle = { minHeight: 500 };

const columns = [
  { name: 'name', defaultFlex: 1, header: 'Name' },
  { name: 'description', defaultFlex: 1, header: 'Description' },
  {
    name: 'mta_transport',
    defaultFlex: 1,
    header: 'MTA Transport',
    render: ({ value }) => {
      return value.name;
    }
  },
  {
    name: 'is_active',
    defaultWidth: 100,
    header: 'Status',
    render: ({ value }) => {
      return value ? <DoneIcon color='success' /> : <ClearIcon sx={{ color: red[500] }} />;
    }
  },
  { name: 'parameters', defaultFlex: 1, header: 'Params' },
  { name: 'max_recipients_per_day', defaultFlex: 1, header: 'Max recipients per day' },
];

const filterValue = [
  { name: 'name', operator: 'startsWith', type: 'string', value: '' },
  { name: 'description', operator: 'startsWith', type: 'string', value: '' },
];

export const MTADefinitionTable = (props) => {
  // const { data, isLoading } = props;

  const dispatch = useDispatch();
  const MTADefinitionList = useSelector((state) => state.MTADefinitionList);
  const { list, isLoading } = MTADefinitionList;

  const [enableFiltering, setEnableFiltering] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleCloseModal = () => {
    setIsOpenModal(!isOpenModal);
  };

  const handleOpenModal = () => {
    setIsOpenModal(true);
  };

  useEffect(() => {
    if (list.length === 0) {
      dispatch(listMTADefinition());
    }
  }, [dispatch, list]);

  const onRenderRow = useCallback((rowProps) => {
    const { onClick } = rowProps;
    rowProps.onClick = (event) => {
      dispatch(setMTADefinitionDetail(rowProps.data));
      Router.push({
        pathname: `/mta/detail`,
        query: {
          // data: JSON.stringify(rowProps.data),
          type: 'definition'
        }
      });
      // setModalData(rowProps);
      // setIsUpdate(true);
      // setIsOpenModal(true);
      if (onClick) {
        onClick(event);
      }
    };
  }, []);

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
                <Switch color="primary" checked={enableFiltering} onChange={(e) => setEnableFiltering(e.target.checked)} />
              }
              label="Filter"
              labelPlacement="start"
              sx={{ ml: 0 }}
            />
          </FormGroup>
        </FormControl>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpenModal}>
          Add
        </Button>
      </Stack>
      <MTADefinitionModal isOpen={isOpenModal} handleClose={handleCloseModal} />
      <ReactDataGrid
        columns={columns}
        dataSource={list}
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