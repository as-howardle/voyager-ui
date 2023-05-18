import ReactDataGrid from '@inovua/reactdatagrid-community';
import '@inovua/reactdatagrid-community/index.css';
import { Box, Button, FormControl, FormControlLabel, FormGroup, Switch } from '@mui/material';
import { Stack } from '@mui/system';
import Router from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDefinitionList } from 'src/redux/actions/deliverability.action';
import { deliverabilityFilterTypes } from '../../validator/filter';
import AddIcon from '@mui/icons-material/Add';
import ListDefinitionModal from '../../modals/list.definition.modal';
import { toast } from 'react-toastify';
import { CREATE_LIST_DEFINITION_RESET } from '../../redux/constant/list.definition.constant';

const gridStyle = { minHeight: 700 };

const columns = [
  { name: 'name', header: 'Name', defaultFlex: 1 },
  {
    name: 'publisher',
    header: 'Publisher',
    render: ({ value }) => {
      if (value) {
        return value.account.name;
      } else {
        return ' ';
      }
    }
  },
  { name: 'from_name', header: 'From Name', defaultFlex: 1 },
  { name: 'from_email', header: 'From Email', defaultFlex: 1 },
  { name: 'replyto_email', header: 'Replyto Email', defaultFlex: 1 },
  { name: 'headers_domain', defaultFlex: 1, header: 'Headers Domain' },
  { name: 'tracking_domain', defaultFlex: 1, header: 'Tracking Domain' },
  { name: 'daily_max_recipients', defaultFlex: 1, header: 'Daily Max Recipients' }
];

const filterValue = [
  { name: 'publisher', operator: 'contains', type: 'publisherFilter', value: '' },
  { name: 'name', operator: 'startsWith', type: 'string', value: '' },
  { name: 'from_name', operator: 'startsWith', type: 'string', value: '' },
  { name: 'from_email', operator: 'startsWith', type: 'string', value: '' },
  { name: 'replyto_email', operator: 'startsWith', type: 'string', value: '' },
  { name: 'headers_domain', operator: 'startsWith', type: 'string', value: '' },
  { name: 'tracking_domain', operator: 'startsWith', type: 'string', value: '' },
  { name: 'daily_max_recipients', operator: 'gte', type: 'number', value: 0 }
];

export const ListDefinitionTable = () => {
  const [enableFiltering, setEnableFiltering] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const dispatch = useDispatch();
  const { list, isLoading } = useSelector((state) => state.listDefinitionDeliverability);
  const { message, success, error } = useSelector((state) => state.createListDefinition);

  const onRenderRow = useCallback((rowProps) => {
    const { onClick } = rowProps;
    rowProps.onClick = (event) => {
      Router.push({
        pathname: `/list_definition/detail`,
        query: {
          id: rowProps.data.id
        }
      });
      if (onClick) {
        onClick(event);
      }
    };
  }, []);

  const handleCloseModal = () => {
    setIsOpenModal(!isOpenModal);
  };

  const handleOpenModal = () => {
    setIsOpenModal(true);
  };

  useEffect(() => {
    if (list.length === 0) {
      dispatch(getDefinitionList());
    }
    if (success) {
      toast.success(message);
      dispatch({ type: CREATE_LIST_DEFINITION_RESET });
      dispatch(getDefinitionList());
    }
    if (error) {
      toast.error(message);
      dispatch({ type: CREATE_LIST_DEFINITION_RESET });
    }
  }, [success, error]);

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
                <Switch
                  color='primary'
                  checked={enableFiltering}
                  onChange={(e) => setEnableFiltering(e.target.checked)}
                />
              }
              label='Filter'
              labelPlacement='start'
              sx={{ ml: 0 }}
            />
          </FormGroup>
        </FormControl>
        <Button variant='contained'
                startIcon={<AddIcon />}
                onClick={handleOpenModal}>
          Add
        </Button>
      </Stack>
      <ListDefinitionModal isOpen={isOpenModal}
                           handleClose={handleCloseModal} />
      <ReactDataGrid
        columns={columns}
        dataSource={list}
        style={gridStyle}
        defaultFilterValue={filterValue}
        pagination
        loading={isLoading}
        defaultLimit={20}
        enableFiltering={enableFiltering}
        onRenderRow={onRenderRow}
        filterTypes={deliverabilityFilterTypes}
      />
    </Box>
  );
};
