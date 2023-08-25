
export const Label = (props) => {
  const { label, required } = props;
  return (
    <label style={{
      fontSize: '.85rem',
      fontWeight: 'bold',
      lineHeight: 3
    }}>{label} {required && <b style={{ color: 'red' }}>*</b>}</label>
  )
}