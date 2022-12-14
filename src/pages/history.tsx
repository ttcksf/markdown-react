import * as React from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { Header } from "../components/header";
import { getMemos, MemoRecord, getMemoPageCount } from "../indexeddb/memos";
import { useState, useEffect } from "react";

const HeaderArea = styled.div`
  position: fixed;
  right: 0;
  top: 0;
  left: 0;
`;

const Wrapper = styled.div`
  bottom: 3rem;
  left: 0;
  position: fixed;
  right: 0;
  top: 3rem;
  padding: 0 1rem;
  overflow-y: scroll;
`;

const Memo = styled.button`
  display: block;
  background-color: white;
  border: 1px solid gray;
  width: 100%;
  padding: 1rem;
  margin: 1rem 0;
  text-align: left;
`;

const MemoTitle = styled.div`
  font-size: 1rem;
  margin-bottom: 0.5rem;
`;

const MemoText = styled.div`
  font-size: 0.85rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Paging = styled.div`
  bottom: 0;
  height: 3rem;
  left: 0;
  line-height: 2rem;
  padding: 0.5rem;
  position: fixed;
  right: 0;
  test-align: center;
`;

const PagingButton = styled.button`
  background: none;
  border: none;
  display: inline-block;
  height: 2rem;
  padding: 0.5rem 1rem;

  &:disabled {
    color: silver;
  }
`;

interface Props {
  setText: (text: string) => void;
}

export const History: React.FC<Props> = (props) => {
  const { setText } = props;
  const [memos, setMemos] = useState<MemoRecord[]>([]);
  //ページの最大数をuseStateで管理
  const [page, setPage] = useState(1);
  //最大ページ数をuseStateで管理
  const [maxPage, setMaxPage] = useState(1);
  const history = useHistory();

  //useEffectは副作用（レンダリングの後）に発火する。第二引数は変更を監視するかと頻監視する対象。今回は無しのため[]。
  useEffect(() => {
    //非同期処理のgetMemos（メモの取得）が終わったら、setMemosで履歴を更新する。
    //setMemosによってステートに更新が起きるため再レンダリングが走って、取得されたメモが表示される。
    getMemos(1).then(setMemos);
    getMemoPageCount().then(setMaxPage);
  }, []);

  //最大ページ数未満の時、canNextPageにtrueが入る
  const canNextPage: boolean = page < maxPage;
  //2ページ目以降であればcanPrevPageにtrueが入る
  const canPrevPage: boolean = page > 1;
  const movePage = (targetPage: number) => {
    //遷移先のページが移動できない場合は処理を終了する
    if (targetPage < 1 || maxPage < targetPage) {
      return;
    }
    //遷移先のページに移動できる場合はpageを更新し、IndexedDBから新しいページを取得してmemosを更新
    setPage(targetPage);
    getMemos(targetPage).then(setMemos);
  };

  return (
    <>
      <HeaderArea>
        <Header title="履歴">
          <Link to="/editor">エディタに戻る</Link>
        </Header>
      </HeaderArea>
      <Wrapper>
        {memos.map((memo) => (
          <Memo
            key={memo.datetime}
            onClick={() => {
              setText(memo.text);
              history.push("/editor");
            }}
          >
            <MemoTitle>{memo.title}</MemoTitle>
            <MemoText>{memo.text}</MemoText>
          </Memo>
        ))}
      </Wrapper>
      <Paging>
        <PagingButton
          onClick={() => movePage(page - 1)}
          disabled={!canPrevPage}
        >
          ＜
        </PagingButton>
        <PagingButton
          onClick={() => movePage(page + 1)}
          disabled={!canNextPage}
        >
          ＞
        </PagingButton>
      </Paging>
    </>
  );
};
