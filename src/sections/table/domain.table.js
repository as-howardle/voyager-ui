import ReactDataGrid from "@inovua/reactdatagrid-community";
import "@inovua/reactdatagrid-community/index.css";
import AddIcon from "@mui/icons-material/Add";
import { Box, Button, FormControl, FormControlLabel, FormGroup, Switch } from "@mui/material";
import { Stack } from "@mui/system";
import { useState, useCallback } from "react";
import Router from 'next/router';

const gridStyle = { minHeight: 500 };

const columns = [
  { name: "name", defaultFlex: 1, header: "Domain Name" },
  { name: "template_name", defaultFlex: 1, header: "Template" },
];

const filterValue = [
  { name: "name", operator: "startsWith", type: "string", value: "" },
  { name: "template_name", operator: "startsWith", type: "string", value: "" },
];

export const DomainTable = (props) => {
  // const { data, isLoading } = props;
  const { data } = props;
  const [enableFiltering, setEnableFiltering] = useState(false);

  // const dispatch = useDispatch();
  // const MTADefinitionList = useSelector((state) => state.MTADefinitionList);
  // const { list, isLoading } = MTADefinitionList;

  // const [isOpenModal, setIsOpenModal] = useState(false);

  // const handleCloseModal = () => {
  //   setIsOpenModal(!isOpenModal);
  // };

  // const handleOpenModal = () => {
  //   setIsOpenModal(true);
  // };

  // useEffect(() => {
  //   if (list.length === 0) {
  //     dispatch(listMTADefinition());
  //   }
  // }, [dispatch, list]);

  const onRenderRow = useCallback((rowProps) => {
    const { onClick } = rowProps;
    rowProps.onClick = (event) => {
      // dispatch(setMTADefinitionDetail(rowProps.data));
      Router.push({
        pathname: `/domain/edit`,
        query: {
          id: rowProps.data.id
        }
      });
      if (onClick) {
        onClick(event);
      }
    };
  }, []);

  const handleAddDomain = () => {
    Router.push({
      pathname: `/domain/create`,
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
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleAddDomain}>
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
