import React, { useRef, useState } from "react";

import { Form } from "@unform/web";
import { FormHandles, FormHelpers, SubmitHandler } from "@unform/core";

import * as Yup from "yup";

import Input from "./Input";
import Button from "./Button";

type Todo = {
  id: string;
  title: string;
  description: string;
  user: string;
  didAt?: Date;
  createdAt: Date;
};

const form: Record<string, any> = {
  title: "",
  description: "",
  user: "",
};

const Unform: React.FC = () => {
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

      helper.reset(form);
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
    <div>
      <h1>unForm</h1>
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

export default Unform;
