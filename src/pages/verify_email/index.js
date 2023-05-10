import { Box, Container, Stack, Typography } from '@mui/material';
import Head from 'next/head';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
// import { PublisherTable } from './../../sections/table/publisher.table';
// import { toast } from 'react-toastify';
// import { getPublisherList } from '../../redux/actions/publisher.action';
import { VerifyEmailTable } from './../../sections/table/verify.email.table';

const Page = () => {

  return (
    <>
      <Head>
        <title>Verify Email</title>
      </Head>
      <Box
        component='main'
        // sx={{
        //   flexGrow: 1,
        //   py: 8
        // }}
      >
        <Container maxWidth='xl'>
          <Stack spacing={3}>
            <Stack direction='row' justifyContent='space-between' spacing={4}>
              <Stack spacing={1}>
                <Typography variant='h4'>Verify Email</Typography>
              </Stack>
            </Stack>
            <Box sx={{ width: '100%' }}>
              <VerifyEmailTable />
            </Box>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
