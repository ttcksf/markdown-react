//キャッシュの名前を定義。キャッシュの内容をリセットしたい場合はキャッシュ名を変更することで新しくできる
const CacheName = "Cache:v1";

self.addEventListener("install", (e) => {
  console.log("ServiceWorker install:", e);
});

self.addEventListener("activate", (e) => {
  console.log("ServiceWorker activate:", e);
});

const networkFallingBackToCache = async (request) => {
  //キャッシュを開く
  const cache = await caches.open(CacheName);
  try {
    const response = await fetch(request);
    //レスポンスの内容をキャッシュに保存。一度しか読み取りできない処理があるため、response.clone()でレスポンスの内容をこポーしてから保存する
    await cache.put(request, response.clone());
    return response;
  } catch (err) {
    console.error(err);
    return cache.match(request);
  }
};

self.addEventListener("fetch", (e) => {
  //respondWithは非同期が終了するまで待機するメソッド。
  e.respondWith(networkFallingBackToCache(e.request));
});
