import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';

const now = new Date();

const Page = () => (
  <>
    <Head>
      <title>
        Voyager
      </title>
    </Head>
    <Box
      component='main'
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth='xl'>
        <h1>Welcome to Voyager!</h1>
      </Container>
    </Box>
  </>
);

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
