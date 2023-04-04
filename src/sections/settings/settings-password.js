
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Stack,
  TextField
} from '@mui/material';
import { useAuth } from 'src/hooks/use-auth';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Notification from 'src/components/notification';


export const SettingsPassword = () => {
  const { error, success, changePassword } = useAuth();


  return (
    <Formik
      initialValues={{ oldPassword: '', newPassword: '' }}
      validationSchema={Yup.object({
        oldPassword: Yup
          .string()
          .max(255)
          .required('Password is required'),
        newPassword: Yup
          .string()
          .max(255)
          .required('Password is required')
      })}
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(true);
        try {
          await changePassword(values.oldPassword, values.newPassword);
        } catch (e) {
        }
        setSubmitting(false);
      }}
    >
      {formik => (
        <Form>
          <Card>
            {success && <Notification type="success">Change password successfully</Notification>}
            {error && <Notification type="error">{error}</Notification>}
            <CardHeader
              subheader="Change password"
              title="Password"
            />
            <Divider />
            <CardContent>
              <Stack
                spacing={3}
                sx={{ maxWidth: 400 }}
              >
                <TextField
                  fullWidth
                  label="Old password"
                  name="oldPassword"
                  onChange={formik.handleChange}
                  type="password"
                  value={formik.values.oldPassword}
                />
                <TextField
                  fullWidth
                  label="New password"
                  name="newPassword"
                  onChange={formik.handleChange}
                  type="password"
                  value={formik.values.newPassword}
                />
              </Stack>
            </CardContent>
            <Divider />
            <CardActions sx={{ justifyContent: 'flex-end' }}>
              <Button variant="contained" type='submit'>
                Update
              </Button>
            </CardActions>
          </Card>
        </Form>
      )}
    </Formik>
  );
};
