const path = require("path");

module.exports = {
  //ファイルを最初に読み込む場所
  entry: "./src/index.tsx",
  //.tsファイルにts-loaderを実行する
  //excludeは除外するファイル。node_moduleは除外しておく
  //resolveはモジュールとして取り込むファイルの拡張子。.tsを指定しておく
  //src/index.jsを.tsに変更する
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".js", ".ts", ".tsx"],
  },
  //出力するファイルの設定。同一階層でdistというフォルダに対してindex.jsで出力
  //変換する場合はJS内に書かれている相対パスのリソースへ自動的にdist/を追加
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.js",
    publicPath: "dist/",
  },
};
