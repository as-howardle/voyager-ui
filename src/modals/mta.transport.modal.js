import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader, Checkbox, Divider, FormControlLabel, Grid, Modal, TextField, MenuItem
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { listMTATransportType, createMTATransport, listMTATranport, updateMTATransport } from './../redux/actions/mta.transport.action';
import { useSelector } from 'react-redux';
import { useEffect, useState } from "react";
import { CREATE_MTA_TRANSPORT_RESET, UPDATE_MTA_TRANSPORT_RESET } from 'src/redux/constant/mta.transport.constant';
import Notification from './../components/notification';
import { toast } from 'react-toastify';

const validationSchema = Yup.object({
  name: Yup
    .string()
    .max(255)
    .required('Name is required'),
  description: Yup
    .string()
    .max(255)
    .required('Description is required'),
  type: Yup
    .string()
    .max(255)
    .required('Type is required'),
  params: Yup
    .string()
    .required('Params is required'),
  is_active: Yup
    .boolean()
});

export const MTATransportModal = (props) => {
  const { isOpen, handleClose, modalData, isUpdate } = props;
  const dispatch = useDispatch();
  const { mtaTransportTypeList } = useSelector((state) => state.MTATransportType);
  const { message, success, error } = useSelector((state) => state.createMTATransport);
  const { message: updateMessage, success: updateSuccess, error: errorUpdate } = useSelector((state) => state.updateMTATransport);

  const formik = useFormik({
    initialValues: {
      name: '', description: '', type: '', params: '', is_active: false
    },
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      if (isUpdate) {
        dispatch(updateMTATransport(values, modalData.data.id));
        handleClose();
      }
      else {
        dispatch(createMTATransport(values));
        handleClose();
      }
    },
  });

  useEffect(() => {
    async function setInitialValues() {
      if (isUpdate) {
        await formik.setValues(modalData.data, false);
      }
      else {
        formik.resetForm();
      }
    }
    setInitialValues();

    if (mtaTransportTypeList.length === 0) {
      dispatch(listMTATransportType());
    }
    if (message !== '' || updateMessage !== '') {
      if (success || updateSuccess) {
        if (success) {
          toast.success('Create successfully');
          dispatch({ type: CREATE_MTA_TRANSPORT_RESET });

        }
        if (updateMessage) {
          toast.success('Update successfully');
          dispatch({ type: UPDATE_MTA_TRANSPORT_RESET });
        }
        dispatch(listMTATranport());
      }
      if (error || errorUpdate) {
        if (error) {
          toast.error('Create failed');
        }
        if (errorUpdate) {
          toast.error('Update failed');
        }
        dispatch({ type: CREATE_MTA_TRANSPORT_RESET });
      }
    }
  }, [dispatch, message, success, isUpdate, modalData, updateMessage, updateSuccess, errorUpdate]);

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >

      <form onSubmit={formik.handleSubmit}>
        <Card variant="outlined" sx={{ minWidth: 500 }}>
          <CardHeader
            title="Create MTA Transport"
          />
          <Divider />
          <CardContent>
            <Grid
              container
              spacing={3}
              sx={{ minWidth: 1000, minHeight: 250 }}
              direction="column"
            >
              <Grid container item spacing={3} direction="row">
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    error={!!(formik.touched.name && formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                    label="Name"
                    name="name"
                    onChange={formik.handleChange}
                    type="text"
                    value={formik.values.name}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    error={!!(formik.touched.description && formik.errors.description)}
                    helperText={formik.touched.description && formik.errors.description}
                    label="Description"
                    name="description"
                    onChange={formik.handleChange}
                    type="text"
                    value={formik.values.description}
                  />
                </Grid>
              </Grid>
              <Grid container item spacing={3} direction="row" >
                <Grid item xs={6}>
                  {mtaTransportTypeList.length > 0 ? (
                    <TextField
                      fullWidth
                      error={!!(formik.touched.type && formik.errors.type)}
                      helperText={formik.touched.type && formik.errors.type}
                      select
                      label="Type"
                      name="type"
                      onChange={formik.handleChange}
                      value={formik.values.type}
                    >
                      {mtaTransportTypeList.map((e) => {
                        return (
                          <MenuItem key={e.id} value={e.name}>
                            {e.name}
                          </MenuItem>
                        );
                      })
                      }
                    </TextField>
                  ) : null}
                </Grid>
                <Grid item xs={6}>
                  <FormControlLabel
                    control={
                      <Checkbox checked={formik.values.is_active} onChange={formik.handleChange} name='is_active' />
                    }
                    label="Is active"
                  />
                </Grid>
              </Grid>
              <Grid item>
                <TextField
                  fullWidth
                  error={!!(formik.touched.params && formik.errors.params)}
                  helperText={formik.touched.params && formik.errors.params}
                  label="Params"
                  name="params"
                  onChange={formik.handleChange}
                  type="text"
                  value={formik.values.params}
                  multiline
                  rows={5}
                />
              </Grid>
            </Grid>
          </CardContent>
          <Divider />
          <CardActions sx={{ justifyContent: 'flex-end' }}>
            <Button variant="contained" type='submit'>
              {isUpdate ? 'Update' : 'Create'}
            </Button>
          </CardActions>
        </Card>
      </form>
    </Modal>
  );
};