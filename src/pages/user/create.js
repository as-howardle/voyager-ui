import { Box, Container, Stack, Typography, Grid, TextField, Divider, Button, FormControl, FormControlLabel, Checkbox } from '@mui/material';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { setPublisherDetail } from '../../redux/actions/publisher.action';
import { PublisherDetail } from '../../components/detail/publisher.js';
import TemplateAPI from './../../axios/TemplateAPI';
import { CustomSelect } from './../../components/custom.select';
import Router from 'next/router';
import { Label } from './../../components/label';
import DomainAPI from './../../axios/DomainAPI';
import { toast } from 'react-toastify';
import { LoadingButton } from '@mui/lab';
import UserAPI from './../../axios/UserAPI';

const Page = () => {
  const [fullname, setFullName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [isAdmin, setIsAdmin] = useState(false);
  // const [isActive, setIsActive] = useState(true);
  const [loading, setLoading] = useState(false);


  const handleBack = () => {
    Router.push({
      pathname: `/user`
    });
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    const data = {
      email: email,
      password: password,
      fullname: fullname,
      isAdmin: isAdmin
    };
    setLoading(true);
    try {
      await UserAPI.createUser(data);
      setLoading(false);
      toast.success('Create user setting successfully');
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
          Create User
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
                  Create User
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
                    <Label label='Password' required={true} />
                    <TextField
                      fullWidth
                      name='password'
                      onChange={(e) => setPassword(e.target.value)}
                      type='password'
                      value={password}
                      required
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{pt: 6}}>
                      <Label label='Is Admin' />
                      <Checkbox checked={isAdmin} onChange={(e) => { setIsAdmin(e.target.checked); }} name='is_admin' />
                    </Box>

                    {/* <FormControlLabel
                      control={
                        <Checkbox checked={isAdmin} onChange={(e) => { setIsAdmin(e.target.checked); }} name='is_admin' />
                      }
                      label="Is Admin"
                    /> */}
                  </Grid>
                  {/* <Grid item xs={4}>
                    <FormControlLabel
                      control={
                        <Checkbox checked={isActive} onChange={(e) => { setIsActive(e.target.checked); }} name='is_active' />
                      }
                      label="Is Active"
                    />
                  </Grid> */}
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
              <LoadingButton variant='contained' sx={{ mr: 2 }} onClick={handleCreateUser} loading={loading}>
                <span>Create</span>
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

export default Page;
