import * as marked from "marked";
import * as sanitizeHtml from "sanitize-html";
//selfの型チェックを抜けるためにをworkerをany型にする
const worker: Worker = self as any;
worker.addEventListener("message", (e) => {
  const text = e.data;
  const html = sanitizeHtml(marked(text), {
    allowedTags: [...sanitizeHtml.defaults.allowedTags, "h1", "h2"],
  });
  worker.postMessage({ html });
});
