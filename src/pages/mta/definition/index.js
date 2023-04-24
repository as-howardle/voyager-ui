import { Box, Container, Stack, Typography } from '@mui/material';
import Head from 'next/head';
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { getMTATransportList } from '../../../redux/actions/mta.transport.action';
import { listMTADefinition } from './../../../redux/actions/mta.definition.action';
import { UPDATE_MTA_DEFINITION_RESET } from './../../../redux/constant/mta.definition.constant';
import { MTADefinitionTable } from './../../../sections/table/mta.definition';

const Page = () => {
  const dispatch = useDispatch();
  const mtaTransport = useSelector((state) => state.MTATransport);
  const { listMTATransport } = mtaTransport;

  const {
    message: messageUpdateMTADefinition,
    success: successUpdateMTADefinition,
    error: errorUpdateMTADefinition
  } = useSelector((state) => state.updateMTADefinition);

  useEffect(() => {
    if (listMTATransport.length === 0) {
      dispatch(getMTATransportList());
    }

    if (successUpdateMTADefinition) {
      toast.success(messageUpdateMTADefinition);
      dispatch(listMTADefinition());
      dispatch({ type: UPDATE_MTA_DEFINITION_RESET });
    }
    if (errorUpdateMTADefinition) {
      toast.error(messageUpdateMTADefinition);
      dispatch({ type: UPDATE_MTA_DEFINITION_RESET });
    }

  }, [dispatch, listMTATransport, successUpdateMTADefinition, errorUpdateMTADefinition]);

  return (
    <>
      <Head>
        <title>
          MTA Definition
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
            >
              <Stack spacing={1}>
                <Typography variant="h4">
                  MTA Definition
                </Typography>
              </Stack>
            </Stack>
            <Box sx={{ width: '100%' }}>
              <MTADefinitionTable />
            </Box>

          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
