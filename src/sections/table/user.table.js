import ReactDataGrid from "@inovua/reactdatagrid-community";
import "@inovua/reactdatagrid-community/index.css";
import AddIcon from "@mui/icons-material/Add";
import { Box, Button, FormControl, FormControlLabel, FormGroup, Switch } from "@mui/material";
import { Stack } from "@mui/system";
import { useState, useCallback } from "react";
import Router from 'next/router';
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
import { red } from '@mui/material/colors';

const gridStyle = { minHeight: 500 };

const columns = [
  { name: "email", defaultFlex: 1, header: "Email" },
  { name: "full_name", defaultFlex: 1, header: "Full Name" },
  {
    name: 'is_admin',
    header: 'Is Admin',
    render: ({ value }) => {
      return value === 1 ? <DoneIcon color='success' /> : <ClearIcon sx={{ color: red[500] }} />;
    }
  },
  {
    name: 'is_enabled',
    header: 'Is Active',
    render: ({ value }) => {
      return value === 1 ? <DoneIcon color='success' /> : <ClearIcon sx={{ color: red[500] }} />;
    }
  },
];

const filterValue = [
  { name: "email", operator: "startsWith", type: "string", value: "" },
  { name: "full_name", operator: "startsWith", type: "string", value: "" },
];

export const UserTable = (props) => {
  const { data } = props;
  const [enableFiltering, setEnableFiltering] = useState(false);

  const onRenderRow = useCallback((rowProps) => {
    const { onClick } = rowProps;
    rowProps.onClick = (event) => {
      Router.push({
        pathname: `/user/edit`,
        query: {
          id: rowProps.data.id
        }
      });
      if (onClick) {
        onClick(event);
      }
    };
  }, []);

  const handleCreateUser = () => {
    Router.push({
      pathname: `/user/create`,
    });
  };

  return (
    <Box sx={{ minWidth: 800 }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        sx={{
          mb: 2,
        }}
      >
        <FormControl component="fieldset">
          <FormGroup aria-label="position" row>
            <FormControlLabel
              value="start"
              control={
                <Switch
                  color="primary"
                  checked={enableFiltering}
                  onChange={(e) => setEnableFiltering(e.target.checked)}
                />
              }
              label="Filter"
              labelPlacement="start"
              sx={{ ml: 0 }}
            />
          </FormGroup>
        </FormControl>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleCreateUser}>
          Add
        </Button>
      </Stack>
      <ReactDataGrid
        columns={columns}
        dataSource={data}
        style={gridStyle}
        defaultFilterValue={filterValue}
        pagination
        defaultLimit={10}
        enableFiltering={enableFiltering}
        onRenderRow={onRenderRow}
      />
    </Box>
  );
};
