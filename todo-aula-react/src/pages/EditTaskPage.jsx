import { Formik } from "formik";
import * as yup from "yup";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../components/Button";
import { TextField } from "../components/TextField";
import { ErrorText } from "../components/ErrorText";
import { Select } from "../components/Select";
import { Card } from "../components/Card";
import { axios } from "../axios";
import useAxios from "axios-hooks";
import toast from "react-simple-toasts";

const stepSchema = yup
  .string()
  .matches(
    /Para fazer|Em andamento|Pronto/,
    'Os passos devem ser "Para fazer", "Em andamento" ou "Pronto".'
  );

const todoSchema = yup.object({
  title: yup
    .string()
    .required("É necessário informar o título")
    .min(4, "O título precisa ter pelo menos 4 caracteres")
    .max(64, "O título pode ter no máximo 64 caracteres."),
  description: yup
    .string()
    .required("É necessário informar a descrição")
    .min(8, "A descrição precisa ter pelo menos 8 caracteres")
    .max(128, "A descrição pode ter no máximo 128 caracteres."),
  step: stepSchema,
});

const initialTask = {
  title: "",
  description: "",
  step: "",
};

export function EditTaskPage() {
  const navigate = useNavigate();
  const params = useParams();
  const [{ data: task = initialTask }, fetchTask] = useAxios(
    `/tasks/${params.id}`,
    {
      manual: true,
    }
  );

  useEffect(() => {
    fetchTask();
  }, [params.id]);

  return (
    <div className="max-w-screen-lg m-auto p-5">
      <Card>
        <Formik
          enableReinitialize
          validationSchema={todoSchema}
          initialValues={task}
          onSubmit={async (values) => {
            await axios.put(`/tasks/${params.id}`, values);
            toast(`A tarefa #${params.id} foi editada com sucesso!`);
            navigate("/");
          }}
        >
          {({
            handleBlur,
            handleChange,
            handleSubmit,
            errors,
            values,
            touched,
          }) => (
            <form
              onSubmit={handleSubmit}
              noValidate
              className="flex flex-col gap-2"
            >
              <h2 className="text-center font-bold text-3xl mb-4">
                Editar tarefa #{params.id}
              </h2>
              <fieldset>
                <TextField
                  className={`w-full ${
                    touched.title && errors.title ? "border-red-500" : ""
                  }`}
                  name="title"
                  type="text"
                  placeholder="Digite o título"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.title}
                />
                <ErrorText>{touched.title && errors.title}</ErrorText>
              </fieldset>
              <fieldset>
                <TextField
                  className={`w-full ${
                    touched.description && errors.description
                      ? "border-red-500"
                      : ""
                  }`}
                  name="description"
                  type="text"
                  placeholder="Digite a descrição"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.description}
                />
                <ErrorText>
                  {touched.description && errors.description}
                </ErrorText>
              </fieldset>
              <fieldset>
                <Select
                  className={`w-full ${
                    touched.step && errors.step ? "border-red-500" : ""
                  }`}
                  name="step"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.step}
                >
                  <option value="Para fazer">Para fazer</option>
                  <option value="Em andamento">Em andamento</option>
                  <option value="Pronto">Pronto</option>
                </Select>
                <ErrorText>{touched.step && errors.step}</ErrorText>
              </fieldset>
              <Button className="mt-2" type="submit">
                Enviar
              </Button>
            </form>
          )}
        </Formik>
      </Card>
    </div>
  );
}
