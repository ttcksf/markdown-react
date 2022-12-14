import * as React from "react";
import { useState } from "react";
import styled from "styled-components";
import { Button } from "./button";

const Wrapper = styled.div`
  align-items: center;
  background-color: #0002;
  bottom: 0;
  display: flex;
  justify-content: center;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
`;

const Modal = styled.div`
  background: #fff;
  padding: 1rem;
  width: 32rem;
`;

const TitleInput = styled.input`
  width: 29rem;
  padding: 0.5rem;
`;

const Control = styled.div`
  display: flex;
  justify-content: space-evenly;
  padding: 1rem;
`;

//モーダルは保存時の関数と、キャンセル時の関数をパラメーターに使用するので返り値を含めて型定義する。
interface Props {
  onSave: (title: string) => void;
  onCancel: () => void;
}

export const SaveModal: React.FC<Props> = (props) => {
  const { onCancel, onSave } = props;
  //モーダルは内部でタイトルを保持するのでuseStateで管理
  const [title, setTitle] = useState(new Date().toISOString());

  return (
    <Wrapper>
      <Modal>
        <p>テキストの内容を保存します。</p>
        <p>保存内容のタイトルを入力して「保存」ボタンを押してください。</p>
        <p>
          <TitleInput
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </p>
        <Control>
          {/* cancelとcancel={true}は同じ意味 */}
          <Button onClick={onCancel} cancel>
            キャンセル
          </Button>
          <Button onClick={() => onSave(title)}>保存</Button>
        </Control>
      </Modal>
    </Wrapper>
  );
};
