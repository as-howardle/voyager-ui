import { configureStore } from '@reduxjs/toolkit';
import {
  CreateMTATransportReducers,
  MTATransportReducers,
  MTATransportTypeReducers,
  UpdateMTATransportReducers
} from './reducers/mta.transport.reducer';

export const store = configureStore(
  {
    reducer: {
      MTATransport: MTATransportReducers,
      MTATransportType: MTATransportTypeReducers,
      createMTATransport: CreateMTATransportReducers,
      updateMTATransport: UpdateMTATransportReducers
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
      }
    }
  }
);
