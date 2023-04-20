import { Box, Container, Stack, Typography } from '@mui/material';
import Head from 'next/head';
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { UPDATE_MTA_TRANSPORT_RESET } from 'src/redux/constant/mta.transport.constant';
import { getMTATransportList } from '../../redux/actions/mta.transport.action';
import { MTATransportTable } from '../../sections/table/mta.transport';

const Page = () => {
  const dispatch = useDispatch();
  const mtaTransport = useSelector((state) => state.MTATransport);
  const { listMTATransport, isLoading } = mtaTransport;

  const {
    success: successUpdateMTATransport,
    error: errorUpdateMTATransport,
    message: messageUpdateMTATransport
  } = useSelector((state) => state.updateMTATransport);

  useEffect(() => {
    if (listMTATransport.length === 0) {
      dispatch(getMTATransportList());
    }

    if (successUpdateMTATransport) {
      toast.success(messageUpdateMTATransport);
      dispatch(getMTATransportList());
      dispatch({ type: UPDATE_MTA_TRANSPORT_RESET });
    }
    if (errorUpdateMTATransport) {
      toast.error(messageUpdateMTATransport);
      dispatch({ type: UPDATE_MTA_TRANSPORT_RESET });
    }
  }, [dispatch, listMTATransport, successUpdateMTATransport, errorUpdateMTATransport]);

  return (
    <>
      <Head>
        <title>
          MTA Transport
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
                  MTA Transport
                </Typography>
              </Stack>
            </Stack>
            <Box sx={{ width: '100%' }}>
              <MTATransportTable data={(listMTATransport ? listMTATransport : [])} isLoading={isLoading} />
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
