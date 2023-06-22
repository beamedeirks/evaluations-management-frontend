import axios from "axios";
import React, { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";

const FormContainer = styled.form`
  display: flex;
  width:100%
  align-items: flex-end;
  gap:10px;
  flex-wrap: wrap;
  background-color #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 10px`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column`;

const Input = styled.input`
  width: 150px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height:40px;`;

const Label = styled.label``;
const Select = styled.select`
  width: 200px;
  padding: 0 10px;
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


const FormUsers = ({ getUsers, onEdit, setOnEdit }) => {
  const ref = useRef();

  useEffect(() => {
    if (onEdit) {
      const user = ref.current;

      user.login.value = onEdit.login;
      user.password.value = onEdit.password;
      user.name.value = onEdit.name;
      user.email.value = onEdit.email;
      user.idUserGroup.value = onEdit.idUserGroup;

    }
  }, [onEdit]);


  const handleSubmit = async (e) => {
    e.preventDefault(); //evita com que a página seja recarregada durante o envio da informação

    const user = ref.current;
    if (
      !user.login.value ||
      !user.password.value ||
      !user.name.value ||
      !user.email.value ||
      !user.idUserGroup.value
    ) {
      return toast.warn("Preencha todos os campos!");
    }

    if (onEdit) {
      await axios.put("http://localhost:3001/users/" + onEdit.idUser, {
        login: user.login.value,
        password: user.password.value,
        name: user.name.value,
        email: user.email.value,
        idUserGroup: user.idUserGroup.value
      })
        .then(({ data }) => toast.success("Usuário alterado!"))
        .catch(({ data }) => toast.error("Usuário com erro!"));
    } else {
      const requestData = {
        login: user.login.value,
        password: user.password.value,
        name: user.name.value,
        email: user.email.value,
        idUserGroup: user.idUserGroup.value
      }
      console.log('Dados enviados:', requestData);

      await axios.post("http://localhost:3001/users/", requestData)
        .then(({ data }) => toast.success("Usuário criado!"))
        .catch(({ data }) => toast.error("Usuário com erro durante a criação!"));
    }
    //limpando o form
    user.login.value = "";
    user.password.value = "";
    user.name.value = "";
    user.email.value = "";
    user.idUserGroup.value = "";

    setOnEdit(null);
    getUsers();
  };


  return (
    <FormContainer ref={ref} onSubmit={handleSubmit}>
      <InputArea>
        <Label>Login</Label>
        <Input type="text" name="login" />
      </InputArea>
      <InputArea>
        <Label>Senha</Label>
        <Input type="password" name="password" />
      </InputArea>
      <InputArea>
        <Label>Nome</Label>
        <Input type="text" name="name" />
      </InputArea>
      <InputArea>
        <Label>Email</Label>
        <Input type="email" name="email" />
      </InputArea>
      <InputArea>
        <Label>Permissão</Label>
        <Select
          name="idUserGroup"
        >
          <Option value="">Selecione uma opção</Option>
          <Option value={1}>SAC</Option>
          <Option value={2}>Suporte</Option>
          <Option value={3}>Vendas</Option>
        </Select>
      </InputArea>

      <Button type="submit">Enviar</Button>
    </FormContainer>
  );
};

export default FormUsers;