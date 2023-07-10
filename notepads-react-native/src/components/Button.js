import { ActivityIndicator } from "react-native";
import styled from "styled-components/native";

const ButtonContainer = styled.TouchableOpacity`
  background-color: #9b59b6;
  border-radius: 8px;
  padding-vertical: 8px;
  padding-horizontal: 16px;
`;

const ButtonText = styled.Text`
  color: #ecf0f1;
  text-transform: uppercase;
  font-size: 16px;
  text-align: center;
  font-weight: bold;
`;

export function Button({ children, onPress, style = {}, isLoading = false }) {
  return (
    <ButtonContainer onPress={onPress} style={style} disabled={isLoading}>
      {isLoading && <ActivityIndicator size={30} color="#ecf0f1" />}
      {!isLoading && <ButtonText>{children}</ButtonText>}
    </ButtonContainer>
  );
}
