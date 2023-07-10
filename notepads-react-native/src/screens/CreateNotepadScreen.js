import Toast from "react-native-root-toast";
import { Formik } from "formik";
import styled from "styled-components/native";
import { Button } from "../components/Button";
import { TextField } from "../components/TextField";
import { Container } from "../components/Container";
import { api } from "../api";
import screens from "../screens.json";
import { notepadSchema } from "../notepadSchema";

const ErrorMessage = styled.Text`
  color: #e74c3c;
`;

const texts = {
  titlePlaceholder: "Digite o título",
  subtitlePlaceholder: "Digite o subtítulo",
  contentPlaceholder: "Digite o conteúdo",
  submitSuccess: "Notepad criado com sucesso!",
};

const initialValues = {
  title: "",
  subtitle: "",
  content: "",
};

export function CreateNotepadScreen({ navigation, route }) {
  const latitude = route.params?.coords.latitude;
  const longitude = route.params?.coords.longitude;
  async function onSubmit({ title, subtitle, content }) {
    const response = await api.post("/notepads", {
      title,
      subtitle,
      content,
    });

    Toast.show(texts.submitSuccess);
    navigation.navigate(screens.listNotepads);
  }

  return (
    <Formik
      validationSchema={notepadSchema}
      onSubmit={onSubmit}
      initialValues={initialValues}
    >
      {({ values, errors, handleChange, handleBlur, handleSubmit }) => (
        <Container>
          <TextField
            placeholder={texts.titlePlaceholder}
            onChangeText={handleChange("title")}
            onBlur={handleBlur("title")}
            value={values.title}
          />
          {errors.title && (
            <ErrorMessage>{errors.title.toString()}</ErrorMessage>
          )}
          <TextField
            placeholder={texts.subtitlePlaceholder}
            onChangeText={handleChange("subtitle")}
            onBlur={handleBlur("subtitle")}
            value={values.subtitle}
          />
          {errors.subtitle && (
            <ErrorMessage>{errors.subtitle.toString()}</ErrorMessage>
          )}
          <TextField
            textAlignVertical="top"
            placeholder={texts.contentPlaceholder}
            multiline
            numberOfLines={6}
            onChangeText={handleChange("content")}
            onBlur={handleBlur("content")}
            value={values.content}
          />
          {errors.content && (
            <ErrorMessage>{errors.content.toString()}</ErrorMessage>
          )}
          {latitude && (
            <TextField value={latitude.toString()} editable={false} />
          )}
          {longitude && (
            <TextField value={longitude.toString()} editable={false} />
          )}
          <Button onPress={handleSubmit}>Enviar</Button>
        </Container>
      )}
    </Formik>
  );
}
