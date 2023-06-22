import React from 'react';
import styled from 'styled-components';

const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;`;

const Switch = styled.div`
   position: relative;
  width: 60px;
  height: 28px;
  background: #B3B3B3;
  border-radius: 32px;
  padding: 4px;
  transition: 300ms all;

  &:before {
    transition: 300ms all;
    content: "";
    position: absolute;
    width: 28px;
    height: 28px;
    border-radius: 35px;
    top: 50%;
    left: 4px;
    background: white;
    transform: translate(0, -50%);
  }
`;

const Input = styled.input`
  opacity: 0;
  position: absolute;

  &:checked + ${Switch} {
    background: #F6851C;

    &:before {
      transform: translate(32px, -50%);
    }
  }
  `;


const ToggleSwitch = ({ defaultChecked, checked, onChange }) => {
  //const [checked, setChecked] = useState(false);

  const handleChange = (e) => {
    onChange && onChange(e.target.checked);
  };
  
  return (
    <Label>
      <Input checked={checked} type="checkbox" onChange={handleChange} />
      <Switch />
    </Label>
  );
};

export default ToggleSwitch;