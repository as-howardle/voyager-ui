import { configureStore } from '@reduxjs/toolkit';
import {
  CreateMTATransportReducers,
  MTATransportReducers,
  MTATransportTypeReducers,
  UpdateMTATransportReducers,
  SetMTATransportDetailReducers
} from './reducers/mta.transport.reducer';
import {
  MTADefinitionListReducers,
  CreateMTADefinitionReducers,
  UpdateMTADefinitionReducers,
  SetMTADefinitionDetailReducers
} from './reducers/mta.definition.reducer';
import { MTAAssignationListReducers, SetMTAAssignationDetailReducers } from './reducers/mta.assignation.reducer';

export const store = configureStore(
  {
    reducer: {
      MTATransport: MTATransportReducers,
      MTATransportType: MTATransportTypeReducers,
      createMTATransport: CreateMTATransportReducers,
      updateMTATransport: UpdateMTATransportReducers,
      MTADefinitionList: MTADefinitionListReducers,
      createMTADefinition: CreateMTADefinitionReducers,
      updateMTADefinition: UpdateMTADefinitionReducers,
      MTAAssignationList: MTAAssignationListReducers,
      MTATransportDetail: SetMTATransportDetailReducers,
      MTADefinitionDetail: SetMTADefinitionDetailReducers,
      MTAAssignationDetail: SetMTAAssignationDetailReducers
    },
    preloadedState: {
      MTATransport: {
        isLoading: false,
        listMTATransport: []
      },
      MTATransportType: {
        isLoading: false,
        mtaTransportTypeList: []
      },
      createMTATransport: {
        isLoading: false,
        success: false,
        error: false,
        message: ''
      },
      updateMTATransport: {
        isLoading: false,
        success: false,
        error: false,
        message: ''
      },
      MTADefinitionList: {
        isLoading: false,
        list: []
      },
      createMTADefinition: {
        isLoading: false,
        success: false,
        error: false,
        message: ''
      },
      updateMTADefinition: {
        isLoading: false,
        success: false,
        error: false,
        message: ''
      },
      MTAAssignationList: {
        isLoading: false,
        list: []
      },
      MTATransportDetail: {
        mta: null,
        isLoading: false
      },
      MTADefinitionDetail: {
        mta: null,
        isLoading: false
      },
      MTAAssignationDetail: {
        mta: null,
        isLoading: false
      }
    }
  }
);
