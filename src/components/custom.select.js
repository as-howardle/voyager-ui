import Select, { createFilter } from 'react-select';
import MenuList from './select';
import { Label } from './label';

const customStyle = {
  placeholder: (defaultStyles) => {
    return {
      ...defaultStyles,
      fontSize: 14,
      fontWeight: 500
    };
  },
  control: (defaultStyles) => {
    return {
      ...defaultStyles,
      minHeight: 53,
      borderRadius: 8,
      borderColor: '#E5E7EB'
    };
  }
}

export const CustomSelect = (props) => {
  const { id, label, options, value, onChange, required, isMulti, isLoading } = props;
  return (
    <>
      <Label label={label} required={required}/>
      <Select
        inputId={id}
        styles={customStyle}
        components={{ MenuList }}
        options={options}
        filterOption={createFilter({ ignoreAccents: false })}
        value={value}
        onChange={(e) => onChange(e)}
        isClearable={true}
        required={required}
        maxMenuHeight={150}
        isMulti={isMulti}
        isLoading={isLoading}
      />
    </>
  );
};