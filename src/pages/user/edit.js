import { LoadingButton } from '@mui/lab';
import { Box, Button, Checkbox, Container, Divider, Grid, Stack, TextField, Typography } from '@mui/material';
import Head from 'next/head';
import Router from 'next/router';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import UserAPI from './../../axios/UserAPI';
import { Label } from './../../components/label';

const Page = (props) => {
  const { user } = props;
  const [fullname, setFullName] = useState(user.full_name);
  const [email, setEmail] = useState(user.email);
  const [isAdmin, setIsAdmin] = useState(user.is_admin);
  const [isEnabled, setIsEnabled] = useState(user.is_enabled);
  const [loading, setLoading] = useState(false);


  const handleBack = () => {
    Router.push({
      pathname: `/user`
    });
  };

  const handleEditUser = async (e) => {
    e.preventDefault();
    const data = {
      id: user.id,
      fullname,
      isAdmin,
      isEnabled
    };
    setLoading(true);
    try {
      await UserAPI.updateUser(data)
      setLoading(false);
      toast.success('Update user successfully');
      Router.push({
        pathname: `/user`
      });
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>
          Edit User
        </title>
      </Head>
      <Box
        component='main'
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
                  Edit User
                </Typography>
              </Stack>
            </Stack>
            <Box sx={{ width: '100%' }}>
              <Grid
                container
                spacing={3}
                sx={{
                  minWidth: 1000, minHeight: 250, '& .MuiInputBase-input.Mui-disabled': {
                    WebkitTextFillColor: '#000000'
                  }
                }}
                direction='column'
              >
                <Grid container item spacing={3} direction='row'>
                  <Grid item xs={6}>
                    <Label label='Full Name' required={true} />
                    <TextField
                      fullWidth
                      name='fullname'
                      onChange={(e) => setFullName(e.target.value)}
                      type='text'
                      value={fullname}
                      required
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Label label='Email' required={true} />
                    <TextField
                      fullWidth
                      name='email'
                      onChange={(e) => setEmail(e.target.value)}
                      type='text'
                      value={email}
                      required
                    />
                  </Grid>
                </Grid>
                <Grid container item spacing={3} direction='row'>
                  <Grid item xs={6}>
                    <Box sx={{ pt: 6 }}>
                      <Label label='Is Admin' />
                      <Checkbox checked={isAdmin} onChange={(e) => { setIsAdmin(e.target.checked); }} name='is_admin' />
                    </Box>
                    <Box sx={{ pt: 6 }}>
                      <Label label='Is Active' />
                      <Checkbox checked={isEnabled} onChange={(e) => { setIsEnabled(e.target.checked); }} name='is_active' />
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
            <Divider />
            <Stack
              direction="row"
              justifyContent="flex-end"
              sx={{
                mb: 2,
              }}
            >
              <Button variant='contained' color='error' onClick={handleBack} sx={{ mr: 2 }}>
                Back
              </Button>
              <LoadingButton variant='contained' sx={{ mr: 2 }} onClick={handleEditUser} loading={loading}>
                <span>Update</span>
              </LoadingButton>
            </Stack>
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

export async function getServerSideProps(context) {
  const id = context.query.id;
  const response = await UserAPI.getUserById(id);
  return {
    props: {
      user: response.data[0]
    }
  };
}

export default Page;
