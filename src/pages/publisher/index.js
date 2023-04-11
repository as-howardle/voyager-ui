import Head from 'next/head';
import { Box, Container, Stack, Typography } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { PublisherTable } from './../../sections/table/publisher.table';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { getPublisherList } from '../../redux/actions/publisher.action';
import { CREATE_PUBLISHER_RESET } from '../../redux/constant/publisher.constant';

const Page = () => {
  const dispatch = useDispatch();
  const createReducer = useSelector((state) => state.createPublisher);
  const {
    message: createMessage,
    success: createSuccess,
    error: createError
  } = createReducer;

  useEffect(() => {
    if (createSuccess) {
      toast.success(createMessage);
      dispatch(getPublisherList());
      dispatch({ type: CREATE_PUBLISHER_RESET });
    }

    if (createError) {
      toast.error(createMessage);
      dispatch({ type: CREATE_PUBLISHER_RESET });
    }
  }, [createSuccess, createError, createMessage, dispatch]);

  return (
    <>
      <Head>
        <title>
          Publisher
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
          <Stack spacing={3}>
            <Stack
              direction='row'
              justifyContent='space-between'
              spacing={4}
            >
              <Stack spacing={1}>
                <Typography variant='h4'>
                  Publisher
                </Typography>
              </Stack>
            </Stack>
            <Box sx={{ width: '100%' }}>
              <PublisherTable />
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