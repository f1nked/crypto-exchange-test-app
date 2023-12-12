import styled from "styled-components";

export const InputStyled = styled.input`
  width: 100%;
  height: 50px;
  border: none;
  outline: none;
  background: none;
  padding-left: 16px;
`;
export const InputBase = styled.div`
  flex-direction: row;
  border-radius: 5px;
  border: 1px solid #e3ebef;
  width: 100%;
  background: #f6f7f8;
  display: flex;
  align-items: center;
`;

export const ButtonStyled = styled.button`
  width: 205px;
  height: 50px;
  background-color: #11b3fe;
  text-transform: uppercase;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;
  border: none;
  outline: none;
  &:hover {
    background-color: #0095e0;
  }
  &:disabled {
    background-color: #11b3fe;
    cursor: auto;
  }
`;
