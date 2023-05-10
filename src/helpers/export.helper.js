const DEFAULT_DEMILITER = '\t';

const ExportHelper = {
  generateVerifyEmailCSV: (row) => {
    const data = row.map(r => ({ email: r.email_address }));
    const csv = convertArrayOfObjectsToCSV(data);
    downloadCSV(csv);
  }

};

function convertArrayOfObjectsToCSV(args) {
  let result, ctr, keys, columnDelimiter, lineDelimiter, data;

  data = args || null;
  if (data == null || !data.length) {
    return null;
  }

  columnDelimiter = args.columnDelimiter || DEFAULT_DEMILITER;
  lineDelimiter = args.lineDelimiter || '\n';

  keys = Object.keys(data[0]);

  result = '';
  result += keys.join(columnDelimiter);
  result += lineDelimiter;

  data.forEach(function (item) {
    ctr = 0;
    keys.forEach(function (key) {
      if (ctr > 0) {
        result += columnDelimiter;
      }

      result += item[key];
      ctr++;
    });
    result += lineDelimiter;
  });

  return result;
}

function downloadCSV(csv) {
  let data, filename, link;
  if (csv == null) {
    return;
  }
  filename = 'verify_email.csv';
  while (csv.indexOf('#') !== -1) {
    csv = csv.replace('#', '-');
  }
  csv.replace('^');
  data = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));

  link = document.createElement('a');
  link.setAttribute('href', data);
  link.setAttribute('download', filename);
  link.click();
}

export default ExportHelper;