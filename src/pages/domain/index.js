import { Box, Container, Stack, Typography } from '@mui/material';
import Head from 'next/head';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { DomainTable } from './../../sections/table/domain.table';
import DomainAPI from './../../axios/DomainAPI';

const Page = (props) => {
  const { domain } = props;
  return (
    <>
      <Head>
        <title>
          Domain
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
                  Domain
                </Typography>
              </Stack>
            </Stack>
            <Box sx={{ width: '100%' }}>
              <DomainTable data={domain}/>
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
  const response = await DomainAPI.getAllDomain();
  return {
    props: {
      domain: response.data
    }
  };
}

export default Page;
