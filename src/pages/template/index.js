import { Box, Container, Stack, Typography } from '@mui/material';
import Head from 'next/head';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import TemplateAPI from './../../axios/TemplateAPI';
import { TemplateTable } from './../../sections/table/template.table';

const Page = (props) => {
  const { template } = props;
  return (
    <>
      <Head>
        <title>
          Template
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
                  Template
                </Typography>
              </Stack>
            </Stack>
            <Box sx={{ width: '100%' }}>
              <TemplateTable data={template} />
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
  const response = await TemplateAPI.getAllTemplate();
  return {
    props: {
      template: response.data
    }
  };
}

export default Page;
