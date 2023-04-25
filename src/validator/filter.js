import DataGrid from '@inovua/reactdatagrid-community';

export const deliverabilityFilterTypes = Object.assign({}, DataGrid.defaultProps.filterTypes, {
  listDefinitionFilter: {
    name: 'list_definition',
    operators: [
      {
        name: 'contains',
        fn: ({ value, filterValue, data }) => {
          if (value) {
            if (value.name.includes(filterValue)) {
              return true;
            } else {
              return false;
            }
          }
          return true;
        }
      }
    ]
  },
  publisherFilter: {
    name: 'publisher',
    operators: [
      {
        name: 'contains',
        fn: ({ value, filterValue, data }) => {
          if (value) {
            if (value.account.name.includes(filterValue)) {
              return true;
            } else {
              return false;
            }
          }
          return true;
        }
      }
    ]
  },
  mtaDefinitionFilter: {
    name: 'mta_definition',
    operators: [
      {
        name: 'contains',
        fn: ({ value, filterValue, data }) => {
          if (value) {
            if (value.name.includes(filterValue)) {
              return true;
            } else {
              return false;
            }
          }
          return true;
        }
      }
    ]
  },
  mtaTransportFilter: {
    name: 'mta_definition',
    operators: [
      {
        name: 'contains',
        fn: ({ value, filterValue, data }) => {
          if (value) {
            if (value.mta_transport.name.includes(filterValue)) {
              return true;
            } else {
              return false;
            }
          }
          return true;
        }
      }
    ]
  }
});