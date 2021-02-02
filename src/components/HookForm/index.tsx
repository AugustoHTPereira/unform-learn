import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

type Inputs = {
  title: string;
  description: string;
  user: string;
};

const schema = Yup.object().shape({
  title: Yup.string().required("O campo título é obrigatório"),
  description: Yup.string()
    .min(10, "O campo descrição precisa ter pelomenos 10 caracteres")
    .required(),
});

const HookForm: React.FC = () => {
  const [data, setData] = useState<Inputs[]>([]);

  const { register, handleSubmit, errors, reset } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });

  const onFormSubmit = handleSubmit((onValid) => {
    setData([...data, onValid]);
    reset();
  });

  return (
    <div>
      <h1>React hook form</h1>
      <form onSubmit={onFormSubmit}>
        <div className="input-content">
          <label htmlFor="title">Título</label>
          <div className="input-control">
            <input
              placeholder="Título"
              type="text"
              ref={register({ required: true })}
              name="title"
            />
            {errors.title && (
              <span className="error-message">{errors.title.message}</span>
            )}
          </div>
        </div>

        <div className="input-content">
          <label htmlFor="description">Descrição</label>
          <div className="input-control">
            <input
              placeholder="Descrição"
              type="text"
              ref={register}
              name="description"
            />
            {errors.description && (
              <span className="error-message">
                {errors.description.message}
              </span>
            )}
          </div>
        </div>

        <div className="input-content">
          <label htmlFor="user">Usuário</label>
          <div className="input-control">
            <input
              placeholder="Usuário"
              type="text"
              ref={register}
              name="user"
            />
            {errors.user && (
              <span className="error-message">{errors.user.message}</span>
            )}
          </div>
        </div>

        <div className="input-content">
          <button className="btn" type="submit">
            Enviar
          </button>
        </div>
      </form>

      <code>{JSON.stringify(data)}</code>
    </div>
  );
};

export default HookForm;
