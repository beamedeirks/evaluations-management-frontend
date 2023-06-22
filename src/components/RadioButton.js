import React from 'react';
import styled from 'styled-components';

const RadioButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const RadioButtonOption = styled.label`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  cursor: pointer;
`;

const RadioButtonInput = styled.input`
  margin-right: 8px;
`;

const RadioButtonLabel = styled.span``;

const RadioButton = ({ options, value, onChange }) => {
  const handleOptionChange = (event) => {
    const selectedValue = event.target.value;
    onChange(selectedValue);
  };

  return (
    <RadioButtonWrapper>
      {options.map((option) => (
        <RadioButtonOption key={option.value}>
          <RadioButtonInput
            type="radio"
            value={option.value}
            checked={value === option.value}
            onChange={handleOptionChange}
          />
          <RadioButtonLabel>{option.label}</RadioButtonLabel>
        </RadioButtonOption>
      ))}
    </RadioButtonWrapper>
  );
};

export default RadioButton;
