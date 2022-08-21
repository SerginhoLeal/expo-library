import styled from 'styled-components/native';

// export const Container = styled.View`
//   flex: 1;
//   justify-content: center;
//   align-items: center;

//   padding: 10px;
// `;

export const Container = styled.View`
  flex: 1;
`;

export const ContainerInput = styled.View`
  position: relative;

  width: 100%;
  height: 50px;

  align-items: center;

  border-radius: 2px;
  border: 1px solid #888;
`;

export const Tag = styled.View`
  position: absolute;
  top: -15px;

  padding: 5px 10px;

  background-color: #f1f1f1;
`;

export const Text = styled.Text`
  color: #888;
`;

export const Input = styled.TextInput`
  flex: 1;
  color: #888;
`;
