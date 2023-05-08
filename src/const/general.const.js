const CONST = {
  APPROVED_PROVENIENCES: [
    { value: 'direct', label: 'direct' },
    { value: 'white_label', label: 'white_label' },
    { value: 'affiliation', label: 'affiliation' }
  ],
  STATUS: [
    { value: 'integrating', label: 'integrating' },
    { value: 'active', label: 'active' },
    { value: 'inactive', label: 'inactive' },
    { value: 'suspended', label: 'suspended' },
    { value: 'stopped', label: 'stopped' }
  ],
  DELIVERABILITY_SCOPE: [
    { value: 'glo', label: 'glo' },
    { value: 'pub', label: 'pub' }
  ],
  DELIVERABILITY_RECIPIENT_STATUS: [
    { value: 'regular', label: 'regular' },
    { value: 'no_sends_or_interactions', label: 'no_sends_or_interactions' },
    { value: 'first_sent', label: 'first_sent' },
    { value: 'unresponsive', label: 'unresponsive' }
  ],
  AWS_ACCOUNT: [
    { value: 'EB', label: 'EB'},
    { value: 'KARMA', label: 'KARMA'}
  ]
};

export default CONST;