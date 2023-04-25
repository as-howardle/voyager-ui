import { Box, Container, Stack, Typography } from "@mui/material";
import Head from "next/head";
import { toast } from "react-toastify";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { DeliverabilityConfigTable } from "../../../sections/table/deliverability.config.js";
import { useEffect } from "react";
import {
  getDefinitionList,
  getDeliverabilityConfigList,
} from "../../../redux/actions/deliverability.action";
import { useDispatch, useSelector } from "react-redux";
import { getPublisherList } from "../../../redux/actions/publisher.action";
import { listMTADefinition } from "../../../redux/actions/mta.definition.action";
import { getProviderList } from "../../../redux/actions/general.action";
import {
  CREATE_DELIVERABILITY_RESET,
  DELETE_DELIVERABILITY_RESET,
  UPDATE_DELIVERABILITY_RESET,
} from "../../../redux/constant/deliverability.constant";

const Page = () => {
  const dispatch = useDispatch();
  const { list: listDefinition } = useSelector((state) => state.listDefinitionDeliverability);
  const { list: listProvider } = useSelector((state) => state.listProvider);
  const { list: listDefinitionMTA } = useSelector((state) => state.MTADefinitionList);
  const { list: listPublisher } = useSelector((state) => state.listPublisher);

  const {
    success: successCreateDeliverabilityConfig,
    error: errorCreateDeliverabilityConfig,
    message: messageCreateDeliverabilityConfig,
  } = useSelector((state) => state.createDeliverabilityConfig);
  const {
    success: successUpdateDeliverabilityConfig,
    error: errorUpdateDeliverabilityConfig,
    message: messageUpdateDeliverabilityConfig,
  } = useSelector((state) => state.updateDeliverabilityConfig);
  const {
    success: successDeleteDeliverabilityConfig,
    error: errorDeleteDeliverabilityConfig,
    message: messageDeleteDeliverabilityConfig,
  } = useSelector((state) => state.deleteDeliverabilityConfig);

  useEffect(() => {
    if (listDefinition.length === 0) {
      dispatch(getDefinitionList());
    }
    if (listProvider.length === 0) {
      dispatch(getProviderList());
    }
    if (listDefinitionMTA.length === 0) {
      dispatch(listMTADefinition());
    }
    if (listPublisher.length === 0) {
      dispatch(getPublisherList());
    }

    if (successCreateDeliverabilityConfig) {
      toast.success(messageCreateDeliverabilityConfig);
      dispatch(getDeliverabilityConfigList());
      dispatch({ type: CREATE_DELIVERABILITY_RESET });
    }
    if (errorCreateDeliverabilityConfig) {
      toast.error(messageCreateDeliverabilityConfig);
      dispatch({ type: CREATE_DELIVERABILITY_RESET });
    }

    if (successUpdateDeliverabilityConfig) {
      toast.success(messageUpdateDeliverabilityConfig);
      dispatch(getDeliverabilityConfigList());
      dispatch({ type: UPDATE_DELIVERABILITY_RESET });
    }
    if (errorUpdateDeliverabilityConfig) {
      toast.error(messageUpdateDeliverabilityConfig);
      dispatch({ type: UPDATE_DELIVERABILITY_RESET });
    }

    if (successDeleteDeliverabilityConfig) {
      toast.success(messageDeleteDeliverabilityConfig);
      dispatch(getDeliverabilityConfigList());
      dispatch({ type: DELETE_DELIVERABILITY_RESET });
    }
    if (errorDeleteDeliverabilityConfig) {
      toast.error(messageDeleteDeliverabilityConfig);
      dispatch({ type: DELETE_DELIVERABILITY_RESET });
    }
  }, [
    dispatch,
    listDefinition,
    successCreateDeliverabilityConfig,
    errorCreateDeliverabilityConfig,
    successUpdateDeliverabilityConfig,
    errorUpdateDeliverabilityConfig,
    successDeleteDeliverabilityConfig,
    errorDeleteDeliverabilityConfig
  ]);

  return (
    <>
      <Head>
        <title>Deliverability Configs</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4">Deliverability Configs</Typography>
              </Stack>
            </Stack>
            <Box sx={{ width: "100%" }}>
              <DeliverabilityConfigTable />
            </Box>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
