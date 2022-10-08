import * as React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../components/button";
import { Header } from "../components/header";
import { SaveModal } from "../components/save_modal";
import { useStateWithStorage } from "../hooks/use_state_with_storage";
import { putMemo } from "../indexeddb/memos";
import ConvertMarkdownWorker from "worker-loader!../worker/convert_markdown_worker";

//workerのインスタンス化
const convertMarkdownWorker = new ConvertMarkdownWorker();

const HeaderArea = styled.div`
  position: fixed;
  right: 0;
  top: 0;
  left: 0;
`;

const Wrapper = styled.div`
  left: 0;
  position: fixed;
  right: 0;
  top: 3rem;
  bottom: 0;
`;

const TextArea = styled.textarea`
  border-right: 1px solid silver;
  border-top: 1px solid silver;
  bottom: 0;
  font-size: 1rem;
  left: 0;
  padding: 0.5rem;
  position: absolute;
  top: 0;
  width: 50vw;
`;

const Preview = styled.div`
  border-top: 1px solid silver;
  bottom: 0;
  overflow-y: scroll;
  padding: 1rem;
  position: absolute;
  right: 0;
  top: 0;
  width: 50vw;
`;

interface Props {
  text: string;
  setText: (text: string) => void;
}

export const Editor: React.FC<Props> = (props) => {
  const { text, setText } = props;
  //モーダルを表示するかどうかのフラグをuseStateで管理
  const [showModal, setShowModal] = useState(false);
  //htmlの文字列をuseStateで管理
  const [html, setHtml] = useState("");
  //webworkerから受け取った処理結果（HTML）でhtmlを更新
  useEffect(() => {
    convertMarkdownWorker.onmessage = (e) => {
      setHtml(e.data.html);
    };
  }, []);

  useEffect(() => {
    convertMarkdownWorker.postMessage(text);
  }, [text]);
  return (
    <>
      <HeaderArea>
        <Header title="Markdown Editor">
          <Button onClick={() => setShowModal(true)}>保存する</Button>
          <Link to="/history">履歴を見る</Link>
        </Header>
      </HeaderArea>
      <Wrapper>
        <TextArea value={text} onChange={(e) => setText(e.target.value)} />
        <Preview>
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </Preview>
      </Wrapper>
      {showModal && (
        <SaveModal
          onSave={(title: string): void => {
            putMemo(title, text);
            setShowModal(false);
          }}
          onCancel={() => setShowModal(false)}
        />
      )}
    </>
  );
};
