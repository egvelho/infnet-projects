import { Formik } from "formik";
import * as yup from "yup";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import { Button } from "../components/Button";
import { TextField } from "../components/TextField";
import { ErrorText } from "../components/ErrorText";
import { Select } from "../components/Select";
import { Card } from "../components/Card";
import { axios } from "../axios";
import { AxiosError } from "axios";
import Cropper from "react-easy-crop";
import { useGlobalStore } from "../useGlobalStore";
import toast from "react-simple-toasts";
import { getCroppedImage } from "../getCroppedImage";

const profileSchema = yup.object({
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
});

export function EditProfilePage() {
  const navigate = useNavigate();
  const user = useGlobalStore((state) => state.user);
  const setUser = useGlobalStore((state) => state.setUser);

  return (
    <div className="w-full h-full p-4 md:px-0 md:py-16 bg-[url(/background.jpg)]">
      <Card className="md:m-auto max-w-screen-md">
        <h2 className="text-center font-bold text-2xl mb-4">Editar perfil</h2>
        <UploadAvatar />
        <Formik
          validationSchema={profileSchema}
          initialValues={user}
          enableReinitialize
          onSubmit={async (values, { setFieldError }) => {
            try {
              const response = await axios.patch("/account/profile", values);
              setUser(response.data.user);
              toast("Perfil atualizado com sucesso!");
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
                  value={user.gender}
                >
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

function UploadAvatar() {
  const user = useGlobalStore((state) => state.user);
  const setUser = useGlobalStore((state) => state.setUser);
  const [avatar, setAvatar] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  async function onAvatarUpload() {
    const avatarCropped = await getCroppedImage(avatar, croppedAreaPixels);
    setAvatar(null);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setCroppedAreaPixels(null);
    const formData = new FormData();
    formData.append("avatar", avatarCropped);
    const response = await axios.post("/account/upload-avatar", formData);
    const user = response.data;
    setUser({
      ...user,
      avatar: user.avatar.concat(`?refresh=${Math.random()}`),
    });
    toast("Avatar alterado com sucesso!");
  }

  async function onAvatarSelect(event) {
    const [file] = event.target.files;
    const avatar = URL.createObjectURL(file);
    setAvatar(avatar);
  }

  const cropper = avatar !== null && (
    <div>
      <Cropper
        image={avatar}
        crop={crop}
        zoom={zoom}
        aspect={1 / 1}
        onCropChange={setCrop}
        onCropComplete={onCropComplete}
        onZoomChange={setZoom}
      />
      <Button
        className="fixed bottom-10 right-10 rounded-full p-4"
        onClick={onAvatarUpload}
      >
        <FaCheck size="28px" />
      </Button>
    </div>
  );

  return (
    <div className="flex my-4 justify-center">
      {cropper}
      <label htmlFor="avatar-upload">
        <img
          src={user.avatar ?? "/anon.png"}
          alt=""
          className="w-[196px] h-[196px] rounded-full bg-slate-100 cursor-pointer"
          title="Clique para alterar seu avatar"
        />
      </label>
      <input
        type="file"
        accept="image/jpeg"
        id="avatar-upload"
        className="hidden"
        onChange={onAvatarSelect}
      />
    </div>
  );
}
