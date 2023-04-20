import { Box, Container, Stack, Typography } from '@mui/material';
import Head from 'next/head';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { MTAAssignationTable } from './../../sections/table/mta.assignation';
const now = new Date();



const Page = () => {

  return (
    <>
      <Head>
        <title>
          MTA Assignation
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
                  MTA Assignation
                </Typography>
              </Stack>
            </Stack>
            <Box sx={{ width: '100%' }}>
              <MTAAssignationTable />
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
