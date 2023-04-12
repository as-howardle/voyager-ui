import { configureStore } from '@reduxjs/toolkit';
import {
  CreateMTATransportReducers,
  MTATransportReducers,
  MTATransportTypeReducers,
  SetMTATransportDetailReducers,
  UpdateMTATransportReducers
} from './reducers/mta.transport.reducer';
import {
  CreateMTADefinitionReducers,
  MTADefinitionListReducers,
  SetMTADefinitionDetailReducers,
  UpdateMTADefinitionReducers
} from './reducers/mta.definition.reducer';
import {
  MTAAssignationListReducers,
  SetMTAAssignationDetailReducers
} from './reducers/mta.assignation.reducer';
import {
  CreatePublisherReducers,
  PublisherListReducers,
  SetPublisherDetailReducers,
  UpdatePublisherReducers
} from './reducers/publisher.reducer';
import {
  CountryListReducers,
  LanguageListReducers,
  SaleManagerListReducers
} from './reducers/general.reducer';

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
      MTAAssignationDetail: SetMTAAssignationDetailReducers,
      listPublisher: PublisherListReducers,
      listCountry: CountryListReducers,
      listLanguage: LanguageListReducers,
      listSaleManager: SaleManagerListReducers,
      createPublisher: CreatePublisherReducers,
      publisherDetail: SetPublisherDetailReducers,
      updatePublisher: UpdatePublisherReducers
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
      },
      listPublisher: {
        list: [],
        error: '',
        isLoading: false
      },
      listCountry: {
        list: [],
        error: '',
        isLoading: false
      },
      listLanguage: {
        list: [],
        error: '',
        isLoading: false
      },
      listSaleManager: {
        list: [],
        error: '',
        isLoading: false
      },
      createPublisher: {
        isLoading: false,
        success: false,
        error: false,
        message: ''
      },
      publisherDetail: {
        pub: null,
        error: '',
        isLoading: false
      },
      updatePublisher: {
        isLoading: false,
        success: false,
        error: false,
        message: ''
      }
    }
  }
);
