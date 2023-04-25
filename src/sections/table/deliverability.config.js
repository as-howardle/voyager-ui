import ReactDataGrid from '@inovua/reactdatagrid-community';
import '@inovua/reactdatagrid-community/index.css';
import AddIcon from '@mui/icons-material/Add';
import { Box, Button, FormControl, FormControlLabel, FormGroup, Switch } from '@mui/material';
import { Stack } from '@mui/system';
import { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDeliverabilityConfigList } from '../../redux/actions/deliverability.action';
import { deliverabilityFilterTypes } from '../../validator/filter';
import { DeliverabilityConfigModal } from '../../modals/deliverability.config.modal.js';
import Router from 'next/router';

const gridStyle = { minHeight: 500 };

const columns = [
  {
    name: 'list_definition',
    defaultFlex: 1,
    header: 'List definition',
    render: ({ value }) => {
      if (value) {
        return value.name;
      } else {
        return ' ';
      }
    }
  },
  {
    name: 'publisher',
    defaultFlex: 1,
    header: 'Publisher',
    render: ({ value }) => {
      if (value) {
        return value.account.name;
      } else {
        return ' ';
      }
    }
  },
  {
    id: 'mta_definition',
    name: 'mta_definition',
    defaultFlex: 1,
    header: 'MTA Definition',
    render: ({ value }) => {
      return value.name;
    }
  },
  {
    id: 'mta_transport',
    name: 'mta_definition',
    defaultFlex: 1,
    header: 'MTA Transport',
    render: ({ value }) => {
      return value.mta_transport.name;
    }
  },
  { name: 'recipient_status', header: 'Recipient status', defaultFlex: 1 },
  {
    name: 'provider_group',
    defaultFlex: 1,
    header: 'Provider group',
    render: ({ value }) => {
      if (value) {
        return value.name;
      } else {
        return ' ';
      }
    }
  },
  { name: 'weight', header: 'Weight', defaultWidth: 100 },
  { name: 'scope', header: 'Scope', defaultWidth: 100 }
];

const filterValue = [
  { name: 'list_definition', operator: 'contains', type: 'listDefinitionFilter', value: '' },
  { name: 'publisher', operator: 'contains', type: 'publisherFilter', value: '' },
  { name: 'mta_definition', operator: 'contains', type: 'mtaDefinitionFilter', value: '' }
];

export const DeliverabilityConfigTable = () => {

  const dispatch = useDispatch();
  const { list, isLoading } = useSelector((state) => state.listDeliverability);

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
      dispatch(getDeliverabilityConfigList());
    }
  }, [dispatch, list]);

  const onRenderRow = useCallback((rowProps) => {
    const { onClick } = rowProps;
    rowProps.onClick = (event) => {
      Router.push({
        pathname: `/deliverability/config/detail`,
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
      <DeliverabilityConfigModal isOpen={isOpenModal} handleClose={handleCloseModal} />
      <ReactDataGrid
        columns={columns}
        dataSource={list}
        style={gridStyle}
        defaultFilterValue={filterValue}
        pagination
        loading={isLoading}
        defaultLimit={10}
        enableFiltering={enableFiltering}
        filterTypes={deliverabilityFilterTypes}
        onRenderRow={onRenderRow}
      />
    </Box>
  );
};