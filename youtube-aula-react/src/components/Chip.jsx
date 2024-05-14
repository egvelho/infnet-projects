import styled from "styled-components";

export const Chip = styled.button`
  border-radius: 8px;
  padding: 6px;
  font-size: 0.8rem;
  font-weight: bold;
  background-color: ${(props) => props.bgColorLight ?? "rgba(0, 0, 0, 0.1)"};

  cursor: pointer;

  &:hover {
    opacity: 0.75;
  }

  @media (prefers-color-scheme: dark) {
    background-color: ${(props) =>
      props.bgColorDark ?? "rgba(255, 255, 255, 0.1)"};
  }
`;
