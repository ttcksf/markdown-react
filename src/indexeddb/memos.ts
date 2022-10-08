import Dexie from "dexie";

//保存するデータの型
export interface MemoRecord {
  datetime: string;
  title: string;
  text: string;
}

//indexedDBを使いやすくするためのDexieというライブラリをインスタンス化
const database = new Dexie("markdown-editor");
//version(1)はデータベースのバージョン。storesでは({使用するテーブル : インデックスとなるデータ名})
database.version(1).stores({ memos: "&datetime" });
//MemoRecordは定義していた型、stringはキーとなるデータ（今回はdatetime）の型。
const memos: Dexie.Table<MemoRecord, string> = database.table("memos");

//メモを保存するために、タイトルとテキストを引数として受け取る関数をputMemoとする
export const putMemo = async (title: string, text: string): Promise<void> => {
  //日時はISO8601の型式で出力
  const datetime = new Date().toISOString();
  await memos.put({ datetime, title, text });
};

//1ページあたりを10件とする
const NUM_PER_PAGE: number = 10;

export const getMemoPageCount = async (): Promise<number> => {
  //IndexedDBのmemosテーブルから総件数を取得。count()はDexieのメソッド
  const totalCount = await memos.count();
  //トータル件数から1ページあたりの件数で割って、ページ数を算出。0件でも1ページと判定する。
  const pageCount = Math.ceil(totalCount / NUM_PER_PAGE);
  return pageCount > 0 ? pageCount : 1;
};

//テキスト履歴をリストで取得する関数をgetMemosとする。戻り値は配列にするのでMemoRecord[]になる。
export const getMemos = (page: number): Promise<MemoRecord[]> => {
  //ページ数をもとに取得する最初に位置を算出
  const offset = (page - 1) * NUM_PER_PAGE;
  //offsetは取得するリスト内の開始位置。limitは取得する件数。
  return memos
    .orderBy("datetime")
    .reverse()
    .offset(offset)
    .limit(NUM_PER_PAGE)
    .toArray();
};
