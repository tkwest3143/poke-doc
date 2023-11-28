# Poke-Doc (ポケドック)

## 概要 / Overview

Poke-Doc はポケモンの努力値を管理するためのデスクトップアプリケーションです。Next.js と Tauri を使用して開発されており、効率的にポケモンのデータ管理を行うことができます。

Poke-Doc is a desktop application for managing the Effort Values (EVs) of Pokémon. It is developed using Next.js and Tauri, offering efficient data management for Pokémon trainers.

## 開始方法 / Getting Started

このプロジェクトをローカルで実行するための手順を以下に示します。

### 必要条件 / Prerequisites

- Node.js (推奨バージョン: 14.x 以上)
- yarn (オプション)

### インストール / Installation

1. リポジトリをクローンします。

   ```bash
   git clone https://github.com/your-repository/poke-doc.git
   cd poke-doc
   ```

2. 必要なパッケージをインストールします。

   ```bash
   npm install
   ```

3. 事前スクリプトを実行します。

   ```bash
   npm run import
   ```

   このコマンドで必須のマスター情報が作成されます

### 実行 / Running the App

開発モードでアプリケーションを実行するには:

```bash
npm run tauri dev
```

※Tauri でのデスクトップアプリケーションでの動作を想定しているため、ほかのプラットフォームでの実行は不具合が起こります

### ビルド / Building

プロダクション用にアプリケーションをビルドするには:

```bash
npm run tauri build
```

### 使用方法 / Usage

ポケモンのニックネーム、レベル、努力値などを入力し、倒したポケモンの情報を管理することができます。アプリケーションのインターフェースは直感的で、簡単に操作が可能です。

### 技術スタック / Tech Stack

- Next.js
- React
- Tauri
- Prisma
- TypeScript
- Tailwind CSS
- Heroicons

### ライセンス / License

このプロジェクトは MIT License の下で公開されています。

### 作者 / Author

Takanori Nishi - [tkwest3143](https://github.com/tkwest3143)
