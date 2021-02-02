import React, { useRef, useState } from "react";
import logo from "./logo.svg";
import "./styles.css";

import { Form } from "@unform/web";
import { FormHandles, FormHelpers, SubmitHandler } from "@unform/core";

import * as Yup from "yup";
import "./settings/yup-locale";

import Input from "./components/Input";
import Button from "./components/Button";

type Todo = {
  id: string;
  title: string;
  description: string;
  user: string;
  didAt?: Date;
  createdAt: Date;
};

const App: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [todo, setTodo] = useState<Todo[]>([]);
  const onFormSubmit = async (
    data: SubmitHandler<Todo>,
    helper: FormHelpers,
    event: any
  ) => {
    try {
      await Yup.object()
        .shape({
          title: Yup.string().required().label("Título"),
          description: Yup.string().min(20).required().label("Descrição"),
          user: Yup.string().min(10).required().label("Usuário"),
        })
        .validateSync(data, { abortEarly: false });

      setTodo([
        ...todo,
        {
          createdAt: new Date(),
          title: formRef.current?.getFieldValue("title"),
          description: formRef.current?.getFieldValue("description"),
          id: "fasafa",
          user: formRef.current?.getFieldValue("user"),
        },
      ]);

      helper.reset();
      formRef.current?.reset();
    } catch (err) {
      const validationErrors: Record<string, string> = {};
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach((error) => {
          validationErrors[error.path || ""] = error.message;
        });
        formRef?.current?.setErrors(validationErrors);
      }
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Unform test usage</h1>
      </header>

      <Form onSubmit={onFormSubmit} ref={formRef}>
        <Input.TextInput label="Título" placeholder="Título" name="title" />
        <Input.TextInput
          label="Descrição"
          placeholder="Descrição"
          name="description"
        />
        <Input.TextInput label="Usuário" placeholder="Usuário" name="user" />

        <Button.Submit>Enviar</Button.Submit>
      </Form>

      <code>{JSON.stringify(todo)}</code>
    </div>
  );
};

export default App;
