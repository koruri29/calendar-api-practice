# Google Calendar API 演習

このリポジトリは、**Google Calendar API を用いた学習プロジェクト**です。  
Node.js (TypeScript) を使って認証処理を実装し、Google カレンダーから予定を取得・表示する機能を作成しています。

---

## ✨ 現在できること
- 認証(Google OAuth2.0）
- カレンダー機能
  - 参照
    - 今日・今後の予定一覧の取得  
    - CLI での詳細検索（開始日・終了日・キーワードなどを入力して絞り込み）  

---

## 🔧 使用技術
- **言語**: TypeScript (Node.js)  
- **ライブラリ**:  
  - googleapis  
  - readline/promises  
  - dotenv  
- **ツール**:  
  - Git / GitHub  
  - VSCode  

---

## 📂 ブランチ構成
- `main`: 完成版を管理するブランチ。ポートフォリオとして公開する内容をここに反映します 
- `develop`: 開発のメインブランチ。動作する状態を保ちながら、段階的に機能を追加・修正していきます
- `feature/*`: 個別機能の開発用ブランチ

---

## 🚀 今後の予定
- カレンダーイベントの登録・更新・削除  
- CLI メニュー形式での操作  
- エラーハンドリングや入力バリデーションの追加  

---

## 💡 学習の目的
- Google API を実際に使いながら OAuth 認証の流れを理解する  
- TypeScript + Node.js の開発体験を積む  
- 就職活動向けのポートフォリオとして「継続的に成長しているコード」を公開する  

---

## 🧑‍💻 実行方法
```bash
git clone git@github.com:koruri29/calendar-api-practice.git
cd google-calendar-api-practice
npm install
npx ts-node src/index.ts
