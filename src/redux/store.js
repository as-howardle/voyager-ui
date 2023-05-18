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
  ProviderDomainListReducers,
  ProviderListReducers,
  SaleManagerListReducers
} from './reducers/general.reducer';
import {
  CreateDeliverabilityConfigReducers,
  DefinitionListReducer,
  DeleteDeliverabilityConfigReducers,
  DeliverabilityListReducer,
  SetDeliverabilityConfigReducers,
  UpdateDeliverabilityConfigReducers
} from './reducers/deliverability.reducer';
import {
  CreateDeliverabilityDomainConfigReducers,
  DeleteDeliverabilityDomainConfigReducers,
  DeliverabilityDomainListReducer,
  SetDeliverabilityDomainConfigReducers,
  UpdateDeliverabilityDomainConfigReducers
} from './reducers/deliverability.domain.reducer';
import {
  AddDkimToMailerQReducer,
  AddDomainToPostfixReducer,
  AddNewDomainToListDefinitionReducer,
  CreateRecordForDomainReducer,
  NewDomainFormValueReducer
} from './reducers/setup.domain.reducer';
import {
  CreateListDefinitionReducers,
  ListDatabaseReducers,
  ListTemplateCountryListReducers,
  ListTemplateListReducers,
  SetListDefinitionDetail,
  UpdateListDefinitionReducers
} from './reducers/list.definition.reducer';
import { VerifyEmailReducer } from './reducers/verify.email.reducer';

export const store = configureStore({
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
    listProvider: ProviderListReducers,
    listProviderDomain: ProviderDomainListReducers,
    createPublisher: CreatePublisherReducers,
    publisherDetail: SetPublisherDetailReducers,
    updatePublisher: UpdatePublisherReducers,
    listDeliverability: DeliverabilityListReducer,
    listDefinitionDeliverability: DefinitionListReducer,
    createDeliverabilityConfig: CreateDeliverabilityConfigReducers,
    deliverabilityConfigDetail: SetDeliverabilityConfigReducers,
    updateDeliverabilityConfig: UpdateDeliverabilityConfigReducers,
    deleteDeliverabilityConfig: DeleteDeliverabilityConfigReducers,
    listDeliverabilityDomain: DeliverabilityDomainListReducer,
    createDeliverabilityDomainConfig: CreateDeliverabilityDomainConfigReducers,
    deliverabilityDomainConfigDetail: SetDeliverabilityDomainConfigReducers,
    updateDeliverabilityDomainConfig: UpdateDeliverabilityDomainConfigReducers,
    deleteDeliverabilityDomainConfig: DeleteDeliverabilityDomainConfigReducers,
    newDomainFormValue: NewDomainFormValueReducer,
    createRecordForDomain: CreateRecordForDomainReducer,
    addDomainToPostfix: AddDomainToPostfixReducer,
    addDkimToMailerQ: AddDkimToMailerQReducer,
    addNewDomainToListDefinition: AddNewDomainToListDefinitionReducer,
    listDefinitionDetail: SetListDefinitionDetail,
    listTemplate: ListTemplateListReducers,
    listTemplateCountry: ListTemplateCountryListReducers,
    listDatabase: ListDatabaseReducers,
    updateListDefinition: UpdateListDefinitionReducers,
    createListDefinition: CreateListDefinitionReducers,
    verifyEmail: VerifyEmailReducer
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
    listProvider: {
      list: [],
      error: '',
      isLoading: false
    },
    listProviderDomain: {
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
    },
    listDeliverability: {
      list: [],
      error: '',
      isLoading: false
    },
    listDefinitionDeliverability: {
      list: [],
      error: '',
      isLoading: false
    },
    createDeliverabilityConfig: {
      isLoading: false,
      success: false,
      error: false,
      message: ''
    },
    deliverabilityConfigDetail: {
      config: null,
      isLoading: false,
      error: ''
    },
    updateDeliverabilityConfig: {
      isLoading: false,
      success: false,
      error: false,
      message: ''
    },
    deleteDeliverabilityConfig: {
      isLoading: false,
      success: false,
      error: false,
      message: ''
    },
    listDeliverabilityDomain: {
      list: [],
      error: '',
      isLoading: false
    },
    createDeliverabilityDomainConfig: {
      isLoading: false,
      success: false,
      error: false,
      message: ''
    },
    deliverabilityDomainConfigDetail: {
      config: null,
      isLoading: false,
      error: ''
    },
    updateDeliverabilityDomainConfig: {
      isLoading: false,
      success: false,
      error: false,
      message: ''
    },
    deleteDeliverabilityDomainConfig: {
      isLoading: false,
      success: false,
      error: false,
      message: ''
    },
    newDomainFormValue: {
      value: null
    },
    createRecordForDomain: {
      isLoading: false,
      success: false,
      error: false,
      message: ''
    },
    addDomainToPostfix: {
      isLoading: false,
      success: false,
      error: false,
      message: ''
    },
    addDkimToMailerQ: {
      isLoading: false,
      success: false,
      error: false,
      message: ''
    },
    addNewDomainToListDefinition: {
      isLoading: false,
      success: false,
      error: false,
      message: ''
    },
    listDefinitionDetail: {
      def: null,
      isLoading: false,
      error: ''
    },
    listTemplate: {
      list: [],
      error: '',
      isLoading: false
    },
    listTemplateCountry: {
      list: [],
      error: '',
      isLoading: false
    },
    listDatabase: {
      list: [],
      error: '',
      isLoading: false
    },
    updateListDefinition: {
      isLoading: false,
      success: false,
      error: false,
      message: ''
    },
    verifyEmail: {
      isLoading: false,
      success: false,
      error: false,
      message: '',
      emails: []
    },
    createListDefinition: {
      isLoading: false,
      success: false,
      error: false,
      message: ''
    }
  }
});
