import { Box, Container, Stack, Typography } from '@mui/material';
import Head from 'next/head';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { DomainTable } from './../../sections/table/domain.table';
import UserAPI from './../../axios/UserAPI';
import { UserTable } from './../../sections/table/user.table';

const Page = (props) => {
  const { user } = props;
  return (
    <>
      <Head>
        <title>
          Manage Users
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
                  Manage Users
                </Typography>
              </Stack>
            </Stack>
            <Box sx={{ width: '100%' }}>
              <UserTable data={user} />
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

export async function getServerSideProps() {
  const response = await UserAPI.getAllUser();
  return {
    props: {
      user: response.data
    }
  };
}

export default Page;
