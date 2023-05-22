import * as React from 'react';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { toast } from 'react-toastify';
import CreateNewRecord from './steps/create_new_record';
import AddDomainToPostfix from './steps/add_domain_to_postfix';
import { useDispatch, useSelector } from 'react-redux';
import {
  ADD_DKIM_TO_MAILERQ_RESET,
  ADD_DOMAIN_TO_LIST_DEFINITION_RESET,
  ADD_DOMAIN_TO_POSTFIX_RESET,
  CREATE_NEW_RECORD_RESET
} from '../../redux/constant/setup.domain.constant';
import { StepButton } from '@mui/material';
import AddDomainToMailerQ from './steps/add_dkim_to_mailerq';
import AddNewDomainToListDefinition from './steps/add_domain_to_list_definition';
import Head from 'next/head';

const steps = [
  'Create new records for domain',
  'Add domain to postfix server',
  'Add domain to MailerQ',
  'Add new domain to list definition'
];

const Page = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const dispatch = useDispatch();
  const {
    success: createRecordSuccess,
    error: createRecordError,
    message: createRecordMessage
  } = useSelector((state) => state.createRecordForDomain);
  const {
    success: addDomainToPostfixSuccess,
    error: addDomainToPostfixError,
    message: addDomainToPostfixMessage
  } = useSelector((state) => state.addDomainToPostfix);
  const {
    success: addDkimToMailerQSuccess,
    error: addDkimToMailerQError,
    message: addDkimToMailerQMessage
  } = useSelector((state) => state.addDkimToMailerQ);
  const {
    success: addNewDomainToListDefinitionSuccess,
    error: addNewDomainToListDefinitionError,
    message: addNewDomainToListDefinitionMessage
  } = useSelector((state) => state.addNewDomainToListDefinition);
  // const [skipped, setSkipped] = React.useState(new Set());

  // const isStepOptional = (step) => {
  //   return step === 1;
  // };

  // const isStepSkipped = (step) => {
  //   return skipped.has(step);
  // };

  const handleNext = () => {
    // let newSkipped = skipped;
    // if (isStepSkipped(activeStep)) {
    //   newSkipped = new Set(newSkipped.values());
    //   newSkipped.delete(activeStep);
    // }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    // setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  // const handleSkip = () => {
  //   if (!isStepOptional(activeStep)) {
  //     throw new Error("You can't skip a step that isn't optional.");
  //   }

  //   setActiveStep((prevActiveStep) => prevActiveStep + 1);
  //   setSkipped((prevSkipped) => {
  //     const newSkipped = new Set(prevSkipped.values());
  //     newSkipped.add(activeStep);
  //     return newSkipped;
  //   });
  // };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  React.useEffect(() => {
    if (createRecordSuccess) {
      toast.success(createRecordMessage);
      dispatch({ type: CREATE_NEW_RECORD_RESET });
    }
    if (createRecordError) {
      toast.error(createRecordMessage);
      dispatch({ type: CREATE_NEW_RECORD_RESET });
    }

    if (addDomainToPostfixSuccess) {
      toast.success(addDomainToPostfixMessage);
      dispatch({ type: ADD_DOMAIN_TO_POSTFIX_RESET });
      handleNext();

    }
    if (addDomainToPostfixError) {
      toast.error(addDomainToPostfixMessage);
      dispatch({ type: ADD_DOMAIN_TO_POSTFIX_RESET });
    }

    if (addDkimToMailerQSuccess) {
      toast.success(addDkimToMailerQMessage);
      dispatch({ type: ADD_DKIM_TO_MAILERQ_RESET });
      handleNext();

    }
    if (addDkimToMailerQError) {
      toast.error(addDkimToMailerQMessage);
      dispatch({ type: ADD_DKIM_TO_MAILERQ_RESET });
    }

    if (addNewDomainToListDefinitionSuccess) {
      toast.success(addNewDomainToListDefinitionMessage);
      dispatch({ type: ADD_DOMAIN_TO_LIST_DEFINITION_RESET });
      handleNext();

    }
    if (addNewDomainToListDefinitionError) {
      toast.error(addNewDomainToListDefinitionMessage);
      dispatch({ type: ADD_DOMAIN_TO_LIST_DEFINITION_RESET });
    }
  }, [
    createRecordSuccess,
    createRecordError,
    addDomainToPostfixSuccess,
    addDomainToPostfixError,
    addDkimToMailerQSuccess,
    addDkimToMailerQError,
    addNewDomainToListDefinitionSuccess,
    addNewDomainToListDefinitionError
  ]);

  return (
    <>
      <Head>
        <title>
          Set up new domain
        </title>
      </Head>
      <Box sx={{ width: '100%' }}>
        <Stepper nonLinear={true} activeStep={activeStep} alternativeLabel>
          {steps.map((label, index) => {
            // const stepProps = {};
            // const labelProps = {};
            // if (isStepOptional(index)) {
            //   labelProps.optional = <Typography variant="caption">Optional</Typography>;
            // }
            // if (isStepSkipped(index)) {
            //   stepProps.completed = false;
            // }
            return (
              <Step key={index}>
                <StepButton onClick={handleStep(index)}>{label}</StepButton>
                {/* <StepLabel>{label}</StepLabel> */}
              </Step>
            );
          })}
        </Stepper>
        {activeStep === steps.length ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>All steps completed - you&apos;re
              finished</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            {/* <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography> */}
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              {activeStep === 0 && <CreateNewRecord next={handleNext} back={handleBack} />}
              {activeStep === 1 && <AddDomainToPostfix next={handleNext} back={handleBack} />}
              {activeStep === 2 && <AddDomainToMailerQ next={handleNext} back={handleBack} />}
              {activeStep === 3 && <AddNewDomainToListDefinition next={handleNext}
                                                                 back={handleBack} />}
            </Box>
          </React.Fragment>
        )}
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
