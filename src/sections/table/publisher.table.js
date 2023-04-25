import ReactDataGrid from '@inovua/reactdatagrid-community';
import '@inovua/reactdatagrid-community/index.css';
import AddIcon from '@mui/icons-material/Add';
import { Box, Button, FormControl, FormControlLabel, FormGroup, Switch } from '@mui/material';
import { Stack } from '@mui/system';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPublisherList } from './../../redux/actions/publisher.action';
import DateFilter from '@inovua/reactdatagrid-community/DateFilter';
import moment from 'moment';
import { PublisherModal } from '../../modals/publisher.modal.js';
import Router from 'next/router';

const gridStyle = { minHeight: 500 };

const columns = [
  { name: 'account_name', defaultFlex: 1, header: 'Account name' },
  { name: 'approved_proveniences', defaultFlex: 1, header: 'Approved proveniences' },
  { name: 'revenue_share', defaultFlex: 1, header: 'Revenue share' },
  {
    name: 'status',
    defaultWidth: 100,
    header: 'Status'
  },
  {
    name: 'created_at',
    defaultFlex: 1,
    header: 'Created at',
    filterEditor: DateFilter,
    filterEditorProps: (props, { index }) => {
      return {
        dateFormat: 'MM-DD-YYYY',
        cancelButton: false,
        highlightWeekends: false
      };
    },
    render: ({ value, cellProps }) => {
      return moment(value).format('MM-DD-YYYY');
    }
  }
];

const filterValue = [
  { name: 'account_name', operator: 'startsWith', type: 'string', value: '' },
  { name: 'approved_proveniences', operator: 'startsWith', type: 'string', value: '' },
  { name: 'revenue_share', operator: 'gte', type: 'number', value: 0 },
  { name: 'created_at', operator: 'before', type: 'date', value: '' }
];

export const PublisherTable = () => {
  window.moment = moment;

  const [enableFiltering, setEnableFiltering] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const dispatch = useDispatch();
  const { list, isLoading } = useSelector((state) => state.listPublisher);

  const handleCloseModal = () => {
    setIsOpenModal(!isOpenModal);
  };

  const handleOpenModal = () => {
    setIsOpenModal(true);
  };

  const onRenderRow = useCallback((rowProps) => {
    const { onClick } = rowProps;
    rowProps.onClick = (event) => {
      Router.push({
        pathname: `/publisher/detail`,
        query: {
          id: rowProps.data.id
        }
      });
      if (onClick) {
        onClick(event);
      }
    };
  }, []);

  useEffect(() => {
    if (list.length === 0) {
      dispatch(getPublisherList());
    }
  }, [list]);

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
      <PublisherModal isOpen={isOpenModal} handleClose={handleCloseModal} />
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