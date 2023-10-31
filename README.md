# Next-total-population-graph

## 環境

- package manager

  - yarnのバージョン1を使用
  - npmは使用禁止

- nodeバージョン
  - 18.18.2
  - asdfで固定

## 実行方法

```bash
yarn
```

でモジュールをインストールし、

```bash
yarn dev
```

で実行します。
また、ビルドは

```bash
yarn build
```

で行えます。

## 環境変数

実行時 `.env.local` ファイルを作成し、その中に `RESAS_API_KEY` と `BASE_URL` を設定する必要がある  
それ以外のGitHub Actionsやサイトはそれぞれの環境に設定済み

## サイト

<https://miyabin-total-population-graph.vercel.app/>

## 仕様・設計

[Wiki](https://github.com/miyabin66/next-total-population-graph/wiki)に記載
