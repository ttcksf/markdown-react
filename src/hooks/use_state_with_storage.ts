import { useState } from "react";

//カスタムフック。名前はuseから始める必要がある。
export const useStateWithStorage = (
  //初期値はuseStateの引数と同じ
  init: string,
  //localStorageに保存する際のキー
  key: string
  //カスタムフックの戻り値で、useStateの戻り値と同じ型
): [string, (s: string) => void] => {
  //localStorageの値を取得しつつ、取得できない場合は引数の初期値を使う
  const [value, setValue] = useState<string>(localStorage.getItem(key) || init);

  const setValueWithStorage = (nextValue: string): void => {
    setValue(nextValue);
    localStorage.setItem(key, nextValue);
  };
  //useStateから取得した値であるvalueと、localStorageへの保存を組み合わせた関数を返す
  return [value, setValueWithStorage];
};
