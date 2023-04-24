import React, { useCallback } from "react";
import { Container, Content } from "./styles";
import logoImg from "../../assets/logo.svg";
import { FiArrowLeft, FiMail, FiLock, FiUser } from "react-icons/fi";
import Input from "components/Input";
import { FormHandles } from "@unform/core";
import Button from "components/Button";
import { Form } from "@unform/web";
import * as Yup from "yup";
import { useRef } from "react";
import getValidationsErrors from "utils/getValidationsErrors";

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  console.log(formRef);

  const handleSubmit = useCallback(async (data: object) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required("Nome obrigatório"),
        email: Yup.string()
          .required("E-mail obrigatório")
          .email("Digite um e-mail válido"),
        password: Yup.string().min(6, "No mínimo 6 caracteres"),
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
          <h1>Criar Conta</h1>
          <Input  name="name" icon={FiUser} placeholder="Nome"/>
          <Input  name="email" icon={FiMail}  placeholder="E-mail"/>
          <Input name="password" icon={FiLock}  type="password" />
          <Button type="submit">Criar Conta</Button>
          
        </Form>
        <a href="login">
            <FiArrowLeft />
            Voltar para Logon
          </a>
      </Content>
    </Container>
  );
};

export default SignUp;
