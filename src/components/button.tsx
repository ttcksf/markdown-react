import * as React from "react";
import styled from "styled-components";

//クリック時の関数と中のテキストを渡すと、スタイリングされたボタンを返すコンポーネント
const StyledButton = styled.button`
  background-color: dodgerblue;
  border: none;
  box-shadow: none;
  color: white;
  font-size: 1rem;
  height: 2rem;
  min-width: 5rem;
  padding: 0 1rem;

  &.cancel {
    background: white;
    border: 1px solid gray;
    color: gray;
  }
`;

//パラメーターの型。childrenはボタン内に表示するテキスト。onClickはボタンをクリックした時の関数
interface Props {
  //cancelは任意でOK
  cancel?: boolean;
  children: string;
  onClick: () => void;
}

//パラメーターの型を定義したPropsとする。
export const Button: React.FC<Props> = (props) => (
  <StyledButton
    onClick={props.onClick}
    className={props.cancel ? "cancel" : ""}
  >
    {props.children}
  </StyledButton>
);
