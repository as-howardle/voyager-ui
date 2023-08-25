import ReactDataGrid from "@inovua/reactdatagrid-community";
import "@inovua/reactdatagrid-community/index.css";
import AddIcon from "@mui/icons-material/Add";
import { Box, Button, FormControl, FormControlLabel, FormGroup, Switch } from "@mui/material";
import { Stack } from "@mui/system";
import { useState, useCallback } from "react";
import Router from 'next/router';

const gridStyle = { minHeight: 500 };

const columns = [
  { name: "name", defaultFlex: 1, header: "Name" },
];

const filterValue = [
  { name: "name", operator: "startsWith", type: "string", value: "" },
];

export const TemplateTable = (props) => {
  const { data } = props;
  const [enableFiltering, setEnableFiltering] = useState(false);


  const onRenderRow = useCallback((rowProps) => {
    const { onClick } = rowProps;
    rowProps.onClick = (event) => {
      Router.push({
        pathname: `/template/edit`,
        query: {
          id: rowProps.data.id
        }
      });
      if (onClick) {
        onClick(event);
      }
    };
  }, []);

  const handleAddTemplate = () => {
    Router.push({
      pathname: `/template/create`,
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
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleAddTemplate}>
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
