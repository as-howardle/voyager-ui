import { Box, Container, Stack, Typography } from '@mui/material';
import Head from 'next/head';
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { listMTATranport } from '../redux/actions/mta.transport.action';
import { MTATransportTable } from '../sections/customer/mta.transport';
import Notification from '../components/notification';
import { CREATE_MTA_TRANSPORT_RESET } from 'src/redux/constant/mta.transport.constant';
const now = new Date();



const Page = () => {
  const dispatch = useDispatch();
  const mtaTransport = useSelector((state) => state.MTATransport);
  const createMTATransportState = useSelector((state) => state.createMTATransport);
  const { listMTATransport, isLoading } = mtaTransport;
  const { success, error } = createMTATransportState;

  useEffect(() => {
    dispatch(listMTATranport());
  }, [dispatch]);

  return (
    <>
      <Head>
        <title>
          MTA
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
                  MTA
                </Typography>
              </Stack>
            </Stack>
            {/* <CircularProgress /> */}
            {/* {isLoading && <CircularProgress />} */}
            <MTATransportTable data={(listMTATransport ? listMTATransport : [])} isLoading={isLoading} />
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
