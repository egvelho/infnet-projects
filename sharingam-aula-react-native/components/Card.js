import { Box } from 'native-base';

export function Card(props) {
  return (
    <Box
      gap="2"
      p="4"
      width="100%"
      bg="white"
      borderStyle="solid"
      borderColor="gray.500"
      borderWidth="1"
      borderRadius="6"
      {...props}
    />
  );
}
