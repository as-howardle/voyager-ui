import { Box } from '@mui/material';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { ListDefinitionDetail } from './../../components/detail/list.definition.detail';
import { setListDefinitionDetail } from './../../redux/actions/list.definition.action';

const Page = () => {

  const router = useRouter();
  const id = router.query.id;

  const dispatch = useDispatch();
  const { def, isLoading } = useSelector((state) => state.listDefinitionDetail);
  // const { list } = useSelector((state) => state.listDatabase);
  // const { list: listPublisher } = useSelector((state) => state.listPublisher);
  // const { list: listSaleManager } = useSelector((state) => state.listSaleManager);
  // const { list: listCountry } = useSelector((state) => state.listCountry);

  useEffect(() => {
    if (id) {
      dispatch(setListDefinitionDetail(id));
    }
    // if (list.length <= 0) {
    //   dispatch(getListDatabase());
    // }
    // if (listPublisher.length <= 0) {
    //   dispatch(getPublisherList());
    // }
    // if (listSaleManager.length <= 0) {
    //   dispatch(getSaleManagerList());
    // }
    // if (listCountry.length <= 0) {
    //   dispatch(getCountryList());
    // }
  }, [id]);

  return (
    <>
      <Head>
        <title>
          List Definition Detail
        </title>
      </Head>
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          py: 2
        }}
      >
        <ListDefinitionDetail def={def} isLoading={isLoading} />
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
