import { Box, Container, Stack, Typography } from "@mui/material";
import Head from "next/head";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { getCountryList, getSaleManagerList } from "./../../redux/actions/general.action";
import { getListDatabase } from "./../../redux/actions/list.definition.action";
import { getPublisherList } from "./../../redux/actions/publisher.action";
// import { PublisherTable } from './../../sections/table/publisher.table';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { toast } from 'react-toastify';
// import { getPublisherList } from '../../redux/actions/publisher.action';
import { toast } from "react-toastify";
import { getDefinitionList } from "src/redux/actions/deliverability.action";
import { UPDATE_LIST_DEFINITION_RESET } from "src/redux/constant/list.definition.constant";
import { ListDefinitionTable } from "./../../sections/table/list.definition.table";

const Page = () => {
  const dispatch = useDispatch();

  const {
    success: updateSuccess,
    error: updateError,
    message: updateMessage,
  } = useSelector((state) => state.updateListDefinition);

  const { list } = useSelector((state) => state.listDatabase);
  const { list: listPublisher } = useSelector((state) => state.listPublisher);
  const { list: listSaleManager } = useSelector((state) => state.listSaleManager);
  const { list: listCountry } = useSelector((state) => state.listCountry);

  useEffect(() => {
    if (list.length <= 0) {
      dispatch(getListDatabase());
    }
    if (listPublisher.length <= 0) {
      dispatch(getPublisherList());
    }
    if (listSaleManager.length <= 0) {
      dispatch(getSaleManagerList());
    }
    if (listCountry.length <= 0) {
      dispatch(getCountryList());
    }

    if (updateSuccess) {
      toast.success(updateMessage);
      dispatch(getDefinitionList());
      dispatch({ type: UPDATE_LIST_DEFINITION_RESET });
    }
    if (updateError) {
      toast.error(updateMessage);
      dispatch({ type: UPDATE_LIST_DEFINITION_RESET });
    }
  }, [list, listPublisher, listSaleManager, listCountry, updateSuccess, updateError]);

  return (
    <>
      <Head>
        <title>List Definition</title>
      </Head>
      <Box
        component="main"
        // sx={{
        //   flexGrow: 1,
        //   py: 8
        // }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4">List Definition</Typography>
              </Stack>
            </Stack>
            <Box sx={{ width: "100%" }}>
              <ListDefinitionTable />
            </Box>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
