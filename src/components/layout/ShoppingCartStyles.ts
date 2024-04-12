import styled from "styled-components";

export const ShoppingCartContainer = styled.div`
  position: fixed;
  right: 0;
  top: 0;
  width: 300px;
  height: 100%;
  background-color: white;
  box-shadow: -2px 0 4px rgba(0, 0, 0, 0.2);
  transform: translateX(100%);
  transition: transform 0.3s ease-in-out;

  &.mostrar {
    transform: translateX(0);
  }
`;

export const StyledLi = styled.li`
  margin: 10px 0;
`;
