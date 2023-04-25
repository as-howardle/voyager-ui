import Select, { createFilter } from 'react-select';
import MenuList from './select';

export const CustomSelect = (props) => {
  const { id, label, options, value, onChange, placeHolder, required, isMulti } = props;
  return (
    <>
      {label && <label htmlFor={id} style={{
        fontSize: '.85rem',
        fontWeight: 'bold',
        lineHeight: 3
      }}>{label} {required && <b style={{ color: 'red' }}>*</b>}</label>}
      <Select
        inputId={id}
        components={{ MenuList }}
        options={options}
        filterOption={createFilter({ ignoreAccents: false })}
        value={value}
        onChange={(e) => onChange(e)}
        placeholder={placeHolder}
        isClearable={true}
        required={required}
        maxMenuHeight={150}
        isMulti={isMulti}
      />
    </>
  );
};