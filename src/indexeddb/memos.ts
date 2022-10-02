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

//テキスト履歴をリストで取得する関数をgetMemosとする。戻り値は配列にするのでMemoRecord[]になる。
export const getMemos = (): Promise<MemoRecord[]> => {
  return memos.orderBy("datetime").reverse().toArray();
};
