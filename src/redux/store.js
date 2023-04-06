import { configureStore } from '@reduxjs/toolkit';
import {
  CreateMTATransportReducers,
  MTATransportReducers,
  MTATransportTypeReducers,
  UpdateMTATransportReducers
} from './reducers/mta.transport.reducer';
import { MTADefinitionListReducers, CreateMTADefinitionReducers, UpdateMTADefinitionReducers } from './reducers/mta.definition.reducer';

export const store = configureStore(
  {
    reducer: {
      MTATransport: MTATransportReducers,
      MTATransportType: MTATransportTypeReducers,
      createMTATransport: CreateMTATransportReducers,
      updateMTATransport: UpdateMTATransportReducers,
      MTADefinitionList: MTADefinitionListReducers,
      createMTADefinition: CreateMTADefinitionReducers,
      updateMTADefinition: UpdateMTADefinitionReducers
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
      }
    }
  }
);
