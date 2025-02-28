# AngularHonoStarter

## プロジェクト概要

このプロジェクトは、Angular 18 と Hono フレームワークを組み合わせたスターターテンプレートです。以下の特徴があります：

- **Angular 18**: 最新の Angular フレームワークを使用したフロントエンド開発
- **Hono**: 軽量で高速な Web フレームワークを使用したバックエンド開発
- **SSR (Server-Side Rendering)**: Angular アプリケーションのサーバーサイドレンダリングをサポート
- **REST API**: Hono によるシンプルな REST API の実装例
- **TypeScript**: 完全な TypeScript サポート

このスターターキットは、モダンな Web アプリケーション開発のための基盤として使用できます。

## インストールと実行方法

### 前提条件

- Node.js (v18 以上)
- npm (v9 以上)

### インストール

```bash
# リポジトリをクローン
git clone https://github.com/yourusername/angular-hono-starter.git
cd angular-hono-starter

# 依存関係のインストール
npm install
```

### 開発サーバーの起動

```bash
# Angularの開発サーバーを起動
npm start
```

### ビルドと本番環境での実行

```bash
# プロジェクトのビルド
npm run build

# SSRサーバーの起動
npm run serve:ssr:angular-hono-starter
```

サーバーは http://localhost:4001 で実行されます。

## プロジェクト構造

```
angular-hono-starter/
├── src/                    # Angularアプリケーションのソースコード
│   ├── app/                # コンポーネント、サービス、モジュール
│   ├── main.ts             # ブラウザエントリーポイント
│   └── main.server.ts      # サーバーサイドレンダリングのエントリーポイント
├── server.ts               # Honoサーバーの設定
├── public/                 # 静的ファイル
├── dist/                   # ビルド成果物
└── ...
```

## API

このスターターキットには、以下の API エンドポイントが含まれています：

- `GET /hello`: JSON 形式で `{ "hello": "world!" }` を返すシンプルな API エンドポイント

## カスタマイズ

新しい API エンドポイントを追加するには、`server.ts`ファイルを編集します：

```typescript
// 新しいAPIエンドポイントの例
app.get("/api/items", (c) =>
  c.json({
    items: [
      { id: 1, name: "Item 1" },
      { id: 2, name: "Item 2" },
    ],
  })
);
```
