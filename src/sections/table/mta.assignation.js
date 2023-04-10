
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
import { listMTADefinition } from './../../redux/actions/mta.definition.action';
import { listMTAAssignation, setMTAAssignationDetail } from './../../redux/actions/mta.assignation.action';
import { useMemo } from 'react';
import Router from 'next/router';

const gridStyle = { minHeight: 500 };

const columns = [
  { name: 'mta_transport_name', defaultFlex: 1, header: 'MTA Transport name' },
  { name: 'mta_transport_params', defaultFlex: 1, header: 'MTA Transport params' },
  { name: 'mta_definition_name', defaultFlex: 1, header: 'MTA Definition name' },
  { name: 'mta_definition_params', defaultFlex: 1, header: 'MTA Definition params' },
  { name: 'list_definition_name', defaultFlex: 1, header: 'List name' },
  { name: 'publisher_name', defaultFlex: 1, header: 'Publisher name' },
];

const filterValue = [
  { name: 'mta_transport_name', operator: 'startsWith', type: 'string', value: '' },
  { name: 'mta_definition_name', operator: 'startsWith', type: 'string', value: '' },
  { name: 'list_definition_name', operator: 'startsWith', type: 'string', value: '' },
  { name: 'publisher_name', operator: 'startsWith', type: 'string', value: '' },
];

const listToDataTable = (list) => {
  let arr = [];
  list.forEach(l => {
    if (l.deliverability_configs.length > 0 || l.deliverability_domain_configs.length > 0) {
      l.deliverability_configs.forEach(x => {
        arr.push({
          id: x.id,
          mta_transport_id: l.mta_transport.id,
          mta_transport_name: l.mta_transport.name,
          mta_transport_params: l.mta_transport.params,
          mta_definition_id: l.id,
          mta_definition_name: l.name,
          mta_definition_params: l.parameters,
          list_definition_id: x.list_definition ? x.list_definition.id : '',
          list_definition_name: x.list_definition ? x.list_definition.name : '',
          publisher_id: x.publisher ? x.publisher.id : '',
          publisher_name: x.publisher ? x.publisher.account.name : '',
        });
      });
      l.deliverability_domain_configs.forEach(x => {
        arr.push({
          id: x.id,
          mta_transport_id: l.mta_transport.id,
          mta_transport_name: l.mta_transport.name,
          mta_transport_params: l.mta_transport.params,
          mta_definition_id: l.id,
          mta_definition_name: l.name,
          mta_definition_params: l.parameters,
          list_definition_id: x.list_definition ? x.list_definition.id : '',
          list_definition_name: x.list_definition ? x.list_definition.name : '',
          publisher_id: x.publisher ? x.publisher.id : '',
          publisher_name: x.publisher ? x.publisher.account.name : '',
        });
      });
    }
    else {
      arr.push({
        id: '',
        mta_transport_id: l.mta_transport.id,
        mta_transport_name: l.mta_transport.name,
        mta_transport_params: l.mta_transport.params,
        mta_definition_id: l.id,
        mta_definition_name: l.name,
        mta_definition_params: l.parameters,
        list_definition_id: '',
        list_definition_name: '',
        publisher_id: '',
        publisher_name: ''
      });
    }
  });
  return arr;
};

export const MTAAssignationTable = () => {
  const dispatch = useDispatch();
  const MTADefinitionList = useSelector((state) => state.MTAAssignationList);
  const { list, isLoading } = MTADefinitionList;

  const [enableFiltering, setEnableFiltering] = useState(false);

  const redirectToDetail = (data) => {
    Router.push({
      pathname: `/mta/detail`,
      query: {
        type: 'assignation'
      }
    });
  };

  const onRenderRow = useCallback((rowProps) => {
    const { onClick } = rowProps;
    rowProps.onClick = (event) => {
      dispatch(setMTAAssignationDetail(rowProps.data));
      redirectToDetail(rowProps.data);
      if (onClick) {
        onClick(event);
      }
    };
  }, []);


  useEffect(() => {
    if (list.length === 0) {
      dispatch(listMTAAssignation());
    }
  }, [dispatch, list]);

  const dataTable = useMemo(() => listToDataTable(list), [list]);

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
      </Stack>
      <ReactDataGrid
        columns={columns}
        dataSource={dataTable}
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