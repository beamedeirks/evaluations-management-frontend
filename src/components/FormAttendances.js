import axios from "axios";
import { useEffect, useRef, useState } from 'react';
import { toast } from "react-toastify";
import styled from "styled-components";
import RadioButton from './RadioButton';
import ToggleSwitch from './ToggleSwitch';

const FormContainer = styled.form`
  display: flex;
  width: 35rem;
  align-items: flex-end;
  gap: 15px;
  flex-wrap: wrap;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 10px;`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column`;

const Label = styled.label``;
const LabelButton = styled.label`
  padding-top: 10px;`;

const Input = styled.input`
  width: 14.5rem;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height:40px;
   
  &:disabled {
    background-color: #eee;
    color: #888;
    cursor: not-allowed;
  }`;

const InputLarger = styled.input`
  width: 31.5rem;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height:40px;
   
  &:disabled {
    background-color: #eee;
    color: #888;
    cursor: not-allowed;
  }`;

const InputSmall = styled.input`
  width: 4rem;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height:40px;
  text-align: center;
  

  &:disabled {
    background-color: #eee;
    font-size: 1.5rem;
    font-weight: bold;
    color: #888;
    cursor: not-allowed;
  }`;

const Select = styled.select`
  width: 15.75rem;
   padding: 0 30px 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height:40px;
`;
const SelectLarger = styled.select`
  width: 33rem;
  padding: 0 30px 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height:40px;
`;
const Option = styled.option``;


const Button = styled.button`
padding: 10px;
cursor: pointer;
border-radius: 5px;
border: none;
background-color: #F6851C;
color: white;
width: 100px;
height: 42px;
align-self: flex-end;
 `;

const SessionArea = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 20px;
  justify-content: center;`;

//RadioButton
const options = [
  { value: '0', label: 'Gravíssimo' },
  { value: '25', label: 'Grave' },
  { value: '50', label: 'Médio' },
  { value: '75', label: 'Leve' },
];

const FormAttendances = ({ onAdd, setOnAdd }) => {
  //formatação do protocolo
  const [systemProtocol, setSystemProtocol] = useState('');
  //função do ToggleButton estiver ativado ou não
  const [toggleButtonEnabled, setToggleButtonEnabled] = useState(false);
  //estado para armazenar o valor da nota selecionada
  const [selectedNote, setSelectedNote] = useState('100');


  //axios
  const ref = useRef();

  useEffect(() => {
    if (onAdd) {
      const attendance = ref.current;

      attendance.systemProtocol.value = onAdd.systemProtocol;
      attendance.attendanceDescription.value = onAdd.attendanceDescription;
      attendance.mistakesDescription.value = onAdd.mistakesDescription;
      attendance.date.value = onAdd.date;
      attendance.noteFinal.value = onAdd.noteFinal;
      attendance.idEvaluator.value = onAdd.idEvaluator;
      attendance.idAttendant.value = onAdd.idAttendant;
      attendance.idTypeOfAttendance.value = onAdd.idTypeOfAttendance;
    }
  }, [onAdd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const attendance = ref.current;
    if (
      !attendance.idEvaluator.value ||
      !attendance.idAttendant.value ||
      !attendance.systemProtocol.value ||
      !attendance.date.value ||
      !attendance.idTypeOfAttendance.value ||
      !attendance.noteFinal.value
    ) {
      return toast.warn("Preencha todos os campos!");
    }
    //função de formatação da Date
    const dateParts = attendance.date.value.split('-');
    const formattedDate = `${dateParts[0]}-${dateParts[1]}-${dateParts[2]}`;

    const requestData = {
      idEvaluator: attendance.idEvaluator.value,
      idAttendant: attendance.idAttendant.value,
      systemProtocol: attendance.systemProtocol.value,
      date: formattedDate,
      attendanceDescription: attendance.attendanceDescription.value,
      idTypeOfAttendance: attendance.idTypeOfAttendance.value,
      mistakesDescription: attendance.mistakesDescription ? attendance.mistakesDescription.value : '',
      noteFinal: selectedNote
    };
    console.log('Dados enviados:', requestData);

    await axios.post("http://localhost:3001/attendances", requestData)
      .then(({ data }) => toast.success("Atendimento criado!"))
      .catch(({ data }) => toast.error("Atendimento com erro durante a criação!"));

    //limpando o form
    attendance.idEvaluator.value = "";
    attendance.idAttendant.value = "";
    attendance.systemProtocol.value = "0";
    attendance.date.value = "";
    attendance.attendanceDescription.value = "";
    attendance.idTypeOfAttendance.value = "";
    //attendance.mistakesDescription.value = attendance.mistakesDescription ? attendance.mistakesDescription.value : " ";
    setSelectedNote('100');

    setOnAdd(null);

  };

  //SystemProtocol para 8 digitos numéricos
  const formatSystemProtocol = (value) => {
    value = value.replace(/[^\d]/g, '');
    value = value.slice(0, 8);
    return value;
  };

  //função da formatação do Protocolo
  const handleSystemProtocolChange = (event) => {
    const formattedValue = formatSystemProtocol(event.target.value);
    setSystemProtocol(formattedValue);

    ref.current.systemProtocol.value = formattedValue;
  };

   //radioButton
  const handleOptionChange = (value) => {
    setSelectedNote(value);
    console.log('Opção selecionada:', value);
  };

  return (
    <FormContainer ref={ref} onSubmit={handleSubmit}>
      <SessionArea>
        <InputArea>
          <Label>Avaliador</Label>
          <Select name="idEvaluator">
            <Option value="">Selecione o avaliador</Option>
            <Option value={1}>Avaliador 1</Option>
            <Option value={2}>Avaliador 2</Option>
            <Option value={3}>Avaliador 3</Option>
          </Select>
        </InputArea>

        <InputArea>
          <Label>Atendente</Label>
          <Select name="idAttendant">
            <Option value="">Selecione o atendente</Option>
            <Option value={1}>André Fernandes</Option>
            <Option value={2}>Alana Oliveira</Option>
            <Option value={3}>Cauan Vieira</Option>
            <Option value={4}>Graziele Moraes</Option>
            <Option value={5}>Jean Souza</Option>
            <Option value={6}>Lucia Martins</Option>
          </Select>
        </InputArea>
      </SessionArea>

      <SessionArea>
        <InputArea>
          <Label>Protocolo</Label>
          <Input
            type="text"
            name="systemProtocol"
            value={systemProtocol}
            onChange={handleSystemProtocolChange}
          />
        </InputArea>

        <InputArea>
          <Label>Data</Label>
          <Input
            type="date"
            name="date"
          />
        </InputArea>
      </SessionArea>

      <SessionArea>
        <InputArea>
          <Label>Descrição do atendimento</Label>
          <InputLarger type="text" name="attendanceDescription" />
        </InputArea>
      </SessionArea>

      <SessionArea>
        <InputArea>
          <Label>Tipo do atendimento</Label>
          <SelectLarger name="idTypeOfAttendance">
            <Option value="">Selecione o tipo de atendimento</Option>
            <Option value={1}>Auxilio sobre 2° via de boleto</Option>
            <Option value={2}>Configuração de Roteador</Option>
            <Option value={3}>Mudança de Titularidade</Option>
            <Option value={4}>Reagendamento</Option>
            <Option value={5}>Aceite de contrato</Option>
            <Option value={6}>Quedas de Conexão</Option>
          </SelectLarger>
        </InputArea>
      </SessionArea>


      <SessionArea>
        <InputArea>
          <Label>Atendimento possui erro?</Label>
        </InputArea>
        <InputArea>
          <ToggleSwitch
            defaultChecked={false}
            checked={toggleButtonEnabled}
            onChange={setToggleButtonEnabled}
          />
        </InputArea>
      </SessionArea>

      {toggleButtonEnabled && (
        <>
          <SessionArea>
            <InputArea>
              <Label>Selecione o grau do erro</Label>
              <RadioButton 
              options={options} 
              value={selectedNote} 
              onChange={handleOptionChange} />
            </InputArea>
          </SessionArea>

          <SessionArea>
            <InputArea>
              <Label>Descrição do erro</Label>
              <InputLarger type="text" name="mistakesDescription" />
            </InputArea>
          </SessionArea>
        </>
      )}

      <SessionArea>
        <InputArea>
          <LabelButton>Nota Final</LabelButton>
        </InputArea>
        <InputArea>
          <InputSmall
            type="text"
            name="noteFinal"
            value={selectedNote} 
            disabled />
        </InputArea>
      </SessionArea>


      <SessionArea>
        <Button type="submit">Enviar</Button>
      </SessionArea>

    </FormContainer>
  )
}
export default FormAttendances;