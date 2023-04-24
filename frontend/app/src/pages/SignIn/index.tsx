import React, { useCallback } from "react";
import { Container, Content } from "./styles";
import logoImg from "../../assets/logo.svg";
import { FiLogIn, FiMail, FiLock } from "react-icons/fi";
import Input from "components/Input";
import Button from "components/Button";
import { Form } from '@unform/web';
import { useRef } from "react";
import { FormHandles } from "@unform/core";
import getValidationsErrors from "utils/getValidationsErrors";
import * as Yup from "yup";

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  console.log(formRef);

  const handleSubmit = useCallback(async (data: object) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        email: Yup.string()
          .required("E-mail obrigatório")
          .email("Digite um e-mail válido"),
        password: Yup.string().min(6, "Senha obrigatória"),
      });

      await schema.validate(data, {
        abortEarly: false,
      });
    } catch (err: any) {

      const errors = getValidationsErrors(err);

      formRef.current?.setErrors(errors);
    }
  }, []);
  
  return (
      <Container>
        <Content>
          <img src={logoImg} alt="ClickBeard Logo" />
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Faça seu Logon</h1>
            
            <Input icon={FiMail}  name="Email" type="text" />
            <Input icon={FiLock} name="Senha" type="password"/>
            <Button type="submit">Entrar</Button>
            <a href="/register">
            <FiLogIn />
            Criar Conta
          </a>
          </Form>
          
        </Content>
      </Container>
  );
};

export default SignIn;
