import { StylesConfig } from 'react-select';

export const customSelectStyles: StylesConfig = {
  control: (base, state) => ({
    ...base,
    minHeight: '56px',
    height: '56px',
    borderRadius: '8px',
    borderWidth: '1px',
    backgroundColor: '#fff',
    textAlign: 'left',
    outline: 'none',
    borderColor: state.isFocused ? '#000' : '#ccc',
    boxShadow: state.isFocused ? '0 0 0 1px #000' : 'none',
    '&:hover': {
      borderColor: '#000',
    },
  }),
  placeholder: base => ({
    ...base,
    color: '#999',
  }),
  singleValue: base => ({
    ...base,
    color: '#000',
  }),
  multiValue: base => ({
    ...base,
    backgroundColor: '#000',
  }),
  multiValueLabel: base => ({
    ...base,
    color: '#fff',
  }),
  multiValueRemove: base => ({
    ...base,
    color: '#fff',
    ':hover': {
      backgroundColor: '#555',
      color: '#fff',
    },
  }),
  menu: base => ({
    ...base,
    backgroundColor: '#fff',
    overflow: 'hidden',
    textAlign: 'left',
    borderRadius: '8px',
    border: '1px solid #000',
    zIndex: 10,
  }),
  option: (base, state) => ({
    ...base,
    cursor: 'pointer',
    backgroundColor: state.isFocused ? '#000' : '#fff',
    color: state.isFocused ? '#fff' : '#000',
    '&:active': {
      backgroundColor: '#000',
      color: '#fff',
    },
  }),
};
