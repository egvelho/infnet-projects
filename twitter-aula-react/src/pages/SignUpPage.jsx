import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useMask } from "@react-input/mask";
import { Button } from "../components/Button";
import { TextField } from "../components/TextField";
import { ErrorText } from "../components/ErrorText";
import { Select } from "../components/Select";
import { Card } from "../components/Card";
import { axios } from "../axios";
import { AxiosError } from "axios";
import { AuthService } from "../auth.service";
import { useGlobalStore } from "../useGlobalStore";
import toast from "react-simple-toasts";

const signUpSchema = yup.object({
  name: yup
    .string()
    .min(2, "O nome precisa ter pelo menos 2 caracteres.")
    .max(16, "O nome precisa ter até 16 caracteres.")
    .required("O nome não pode ficar vazio."),
  surname: yup
    .string()
    .min(2, "O sobrenome precisa ter pelo menos 2 caracteres.")
    .max(24, "O sobrenome precisa ter até 24 caracteres.")
    .required("O sobrenome não pode ficar vazio."),
  gender: yup.string().required("O gênero não pode ficar vazio."),
  pronouns: yup.string().required("Os pronomes não podem ficar vazios."),
  email: yup
    .string()
    .email("O email digitado é inválido")
    .required("O email não pode ficar vazio."),
  username: yup
    .string()
    .lowercase("O nome de usuário só pode ter letras minúsculas.")
    .min(3, "O nome de usuário precisa ter pelo menos 3 caracteres.")
    .max(16, "O nome de usuário só pode ter até 16 caracteres.")
    .required("O nome de usuário não pode ficar vazio."),
  cpf: yup
    .string()
    .matches(/^\d{3}.\d{3}.\d{3}-\d{2}$/, "O CPF digitado é inválido.")
    .required("O CPF não pode ficar vazio."),
  password: yup
    .string()
    .min(6, "A senha precisa ter pelo menos 6 caracteres.")
    .max(30, "A senha só pode ter até 30 caracteres.")
    .required("O campo senha não pode ficar vazio."),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "As senhas precisam ser iguais.")
    .required("O campo confirmar senha não pode ficar vazio."),
  acceptTerms: yup.boolean().equals([true], "Você precisa vender a sua alma."),
});

export function SignUpPage() {
  const navigate = useNavigate();
  const setUser = useGlobalStore((state) => state.setUser);
  const setIsAuthenticated = useGlobalStore(
    (state) => state.setIsAuthenticated
  );

  const cpfMask = useMask({
    mask: "___.___.___-__",
    replacement: {
      _: /\d/,
    },
    showMask: true,
  });

  return (
    <div className="w-full h-full p-4 md:px-0 md:py-16 bg-[url(/background.jpg)]">
      <Card className="md:m-auto max-w-screen-md">
        <Formik
          validationSchema={signUpSchema}
          initialValues={{
            name: "",
            surname: "",
            gender: "",
            pronouns: "",
            email: "",
            username: "",
            cpf: "",
            password: "",
            confirmPassword: "",
            acceptTerms: false,
          }}
          onSubmit={async (values, { setFieldError }) => {
            try {
              const response = await axios.post("/account/sign-up", values);
              const token = response.data.token;
              AuthService.setToken(token);
              toast(
                `Seja bem-vinde, ${response.data.user.name}! Sua conta foi criada com sucesso!`
              );
              setUser(response.data.user);
              setIsAuthenticated(true);
              navigate("/perfil");
            } catch (error) {
              if (error instanceof AxiosError) {
                setFieldError(
                  error.response.data.path,
                  error.response.data.message
                );
              } else {
                throw error;
              }
            }
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
              <h2 className="text-center font-bold text-2xl mb-4">
                Criar conta
              </h2>
              <fieldset>
                <TextField
                  className={`w-full ${
                    touched.name && errors.name ? "border-red-500" : ""
                  }`}
                  name="name"
                  type="text"
                  placeholder="Digite o seu nome"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                />
                <ErrorText>{touched.name && errors.name}</ErrorText>
              </fieldset>
              <fieldset>
                <TextField
                  className={`w-full ${
                    touched.surname && errors.surname ? "border-red-500" : ""
                  }`}
                  name="surname"
                  type="text"
                  placeholder="Digite o seu sobrenome"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.surname}
                />
                <ErrorText>{touched.surname && errors.surname}</ErrorText>
              </fieldset>
              <fieldset>
                <Select
                  className={`w-full ${
                    touched.gender && errors.gender ? "border-red-500" : ""
                  }`}
                  name="gender"
                  onBlur={handleBlur}
                  onChange={handleChange}
                >
                  <option value="">Escolher gênero...</option>
                  <option value="mulher">Mulher (cis ou trans)</option>
                  <option value="homem">Homem (cis ou trans)</option>
                  <option value="nao-binario">Não-binário</option>
                  <option value="agenero">Agênero</option>
                  <option value="genero-fluido">Gênero fluído</option>
                  <option value="outros">Outros</option>
                </Select>
                <ErrorText>{touched.gender && errors.gender}</ErrorText>
              </fieldset>
              <fieldset>
                <input
                  type="radio"
                  name="pronouns"
                  id="pronouns-ele-dele"
                  value="ele-dele"
                  onChange={handleChange}
                  checked={values.pronouns === "ele-dele"}
                />
                <label htmlFor="pronouns-ele-dele" className="ml-1 mr-2">
                  Ele/dele
                </label>
                <input
                  type="radio"
                  name="pronouns"
                  id="pronouns-ela-dela"
                  value="ela-dela"
                  onChange={handleChange}
                  checked={values.pronouns === "ela-dela"}
                />
                <label htmlFor="pronouns-ela-dela" className="ml-1 mr-2">
                  Ela/dela
                </label>
                <input
                  type="radio"
                  name="pronouns"
                  id="pronouns-elo-delo"
                  value="elo-delo"
                  onChange={handleChange}
                  checked={values.pronouns === "elo-delo"}
                />
                <label htmlFor="pronouns-elo-delo" className="ml-1 mr-2">
                  Elo/delo
                </label>
                <ErrorText>{touched.pronouns && errors.pronouns}</ErrorText>
              </fieldset>
              <fieldset>
                <TextField
                  className={`w-full ${
                    touched.email && errors.email ? "border-red-500" : ""
                  }`}
                  name="email"
                  type="email"
                  placeholder="Digite o seu email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
                <ErrorText>{touched.email && errors.email}</ErrorText>
              </fieldset>
              <fieldset>
                <TextField
                  className={`w-full ${
                    touched.username && errors.username ? "border-red-500" : ""
                  }`}
                  name="username"
                  type="text"
                  placeholder="Digite um nome de usuário para a sua conta"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.username}
                />
                <ErrorText>{touched.username && errors.username}</ErrorText>
              </fieldset>
              <fieldset>
                <TextField
                  className={`w-full ${
                    touched.cpf && errors.cpf ? "border-red-500" : ""
                  }`}
                  ref={cpfMask}
                  name="cpf"
                  type="text"
                  placeholder="Digite o seu CPF"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.cpf}
                />
                <ErrorText>{touched.cpf && errors.cpf}</ErrorText>
              </fieldset>
              <fieldset>
                <TextField
                  className={`w-full ${
                    touched.password && errors.password ? "border-red-500" : ""
                  }`}
                  name="password"
                  type="password"
                  placeholder="Digite a sua senha"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                />
                <ErrorText>{touched.password && errors.password}</ErrorText>
              </fieldset>
              <fieldset>
                <TextField
                  className={`w-full ${
                    touched.confirmPassword && errors.confirmPassword
                      ? "border-red-500"
                      : ""
                  }`}
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirme a sua senha"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.confirmPassword}
                />
                <ErrorText>
                  {touched.confirmPassword && errors.confirmPassword}
                </ErrorText>
              </fieldset>
              <fieldset>
                <input
                  type="checkbox"
                  name="acceptTerms"
                  id="acceptTerms"
                  className="align-middle cursor-pointer"
                  checked={values.acceptTerms}
                  onChange={handleChange}
                />
                <label
                  htmlFor="acceptTerms"
                  className="ml-1 text-sm cursor-pointer"
                >
                  Para continuar, você deve vender a sua alma para mim, conforme
                  os{" "}
                  <a
                    className="text-purple-500"
                    href="https://caiogondim.github.io/piao-da-casa-propria-em-css-3d/"
                  >
                    termos de contrato
                  </a>
                  .
                </label>
                <ErrorText>
                  {touched.acceptTerms && errors.acceptTerms}
                </ErrorText>
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
