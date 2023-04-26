import { Box, Container, Stack, Typography } from "@mui/material";
import Head from "next/head";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { getDefinitionList } from "../../../redux/actions/deliverability.action";
import { getProviderList } from "../../../redux/actions/general.action";
import { listMTADefinition } from "../../../redux/actions/mta.definition.action";
import { getPublisherList } from "../../../redux/actions/publisher.action";
import { DeliverabilityDomainConfigTable } from "./../../../sections/table/deliverability.domain.config";
import { getDeliverabilityDomainConfigList } from "./../../../redux/actions/deliverability.domain.action";
import {
  CREATE_DELIVERABILITY_DOMAIN_RESET,
  UPDATE_DELIVERABILITY_DOMAIN_RESET,
  DELETE_DELIVERABILITY_DOMAIN_RESET,
} from "./../../../redux/constant/deliverability.domain.constant";
import { toast } from "react-toastify";
import { getProviderDomainList } from './../../../redux/actions/general.action';

const Page = () => {
  const dispatch = useDispatch();
  const { list: listDefinition } = useSelector((state) => state.listDefinitionDeliverability);
  const { list: listProvider } = useSelector((state) => state.listProvider);
  const { list: listDefinitionMTA } = useSelector((state) => state.MTADefinitionList);
  const { list: listPublisher } = useSelector((state) => state.listPublisher);

  const {
    success: successCreateDeliverabilityDomainConfig,
    error: errorCreateDeliverabilityDomainConfig,
    message: messageCreateDeliverabilityDomainConfig,
  } = useSelector((state) => state.createDeliverabilityDomainConfig);
  const {
    success: successUpdateDeliverabilityDomainConfig,
    error: errorUpdateDeliverabilityDomainConfig,
    message: messageUpdateDeliverabilityDomainConfig,
  } = useSelector((state) => state.updateDeliverabilityDomainConfig);
  const {
    success: successDeleteDeliverabilityDomainConfig,
    error: errorDeleteDeliverabilityDomainConfig,
    message: messageDeleteDeliverabilityDomainConfig,
  } = useSelector((state) => state.deleteDeliverabilityDomainConfig);

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

    if (successCreateDeliverabilityDomainConfig) {
      toast.success(messageCreateDeliverabilityDomainConfig);
      dispatch(getDeliverabilityDomainConfigList());
      dispatch({ type: CREATE_DELIVERABILITY_DOMAIN_RESET });
    }
    if (errorCreateDeliverabilityDomainConfig) {
      toast.error(messageCreateDeliverabilityDomainConfig);
      dispatch({ type: CREATE_DELIVERABILITY_DOMAIN_RESET });
    }

    if (successUpdateDeliverabilityDomainConfig) {
      toast.success(messageUpdateDeliverabilityDomainConfig);
      dispatch(getDeliverabilityDomainConfigList());
      dispatch({ type: UPDATE_DELIVERABILITY_DOMAIN_RESET });
    }
    if (errorUpdateDeliverabilityDomainConfig) {
      toast.error(messageUpdateDeliverabilityDomainConfig);
      dispatch({ type: UPDATE_DELIVERABILITY_DOMAIN_RESET });
    }

    if (successDeleteDeliverabilityDomainConfig) {
      toast.success(messageDeleteDeliverabilityDomainConfig);
      dispatch(getDeliverabilityDomainConfigList());
      dispatch({ type: DELETE_DELIVERABILITY_DOMAIN_RESET });
    }
    if (errorDeleteDeliverabilityDomainConfig) {
      toast.error(messageDeleteDeliverabilityDomainConfig);
      dispatch({ type: DELETE_DELIVERABILITY_DOMAIN_RESET });
    }
  }, [
    dispatch,
    listDefinition,
    successCreateDeliverabilityDomainConfig,
    errorCreateDeliverabilityDomainConfig,
    successUpdateDeliverabilityDomainConfig,
    errorUpdateDeliverabilityDomainConfig,
    successDeleteDeliverabilityDomainConfig,
    errorDeleteDeliverabilityDomainConfig
  ]);

  return (
    <>
      <Head>
        <title>Deliverability Domain Configs</title>
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
                <Typography variant="h4">Deliverability Domain Configs</Typography>
              </Stack>
            </Stack>
            <Box sx={{ width: "100%" }}>
              <DeliverabilityDomainConfigTable />
            </Box>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
