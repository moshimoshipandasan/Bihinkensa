# 備品検査 Google Apps Script

## 概要

Google スプレッドシート上で備品の管理とQRコードラベルの生成を行うための Google Apps Script プロジェクトです。
`https://api.qrserver.com/` を利用してQRコード画像を生成します。
過去には Google Classroom と連携する機能も含まれていましたが、現在は一部機能がコメントアウトされています。

## 使い方

*   **テンプレート:** [こちらのリンク](https://docs.google.com/spreadsheets/d/1g-gboRh1i9A0NnyWuCm21wZhXVHHI3EwnOqYLxqnrEg/copy) からテンプレートのスプレッドシートをコピーして利用できます。

1.  Google スプレッドシートを開きます（または上記のテンプレートを使用します）。
2.  メニューの「拡張機能」>「Apps Script」を選択し、スクリプトエディタを開きます。
3.  このリポジトリにある `コード.js` と `appsscript.json` の内容を、スクリプトエディタにコピー＆ペーストまたは `clasp` を用いてプッシュします。
4.  `appsscript.json` に記載されている必要な API（Google Classroom API など）を有効にします。
5.  スプレッドシートを再読み込みすると、「備品検査」というカスタムメニューが表示されます。
6.  「備品」という名前のシートを作成し、A列に備品番号、C列にQRコードに含めたい情報（例: 備品管理ページのURLなど）を入力します。
7.  カスタムメニューから「備品ラベル作成」を実行すると、「備品」シートのC列のデータに基づいてD列にQRコード画像が生成されます。

## ファイル構成

*   `コード.js`: メインのスクリプトファイル。カスタムメニューの定義、QRコード生成 (`bihinlabel` 関数)、および過去に使用されていた Classroom 連携関数が含まれます。
*   `barcode.js`: (現在未使用、または詳細不明)
*   `appsscript.json`: Google Apps Script プロジェクトのマニフェストファイル。実行に必要な権限スコープやライブラリを定義します。
*   `.clasp.json`: `clasp` (Command Line Apps Script Projects) の設定ファイル。ローカル環境と Google Apps Script を連携させるために使用します。

## 解説動画

より詳しい使い方は、以下の動画で解説されています。

*   [備品管理QRコード作成GAS](https://youtu.be/ktsLFxL23H8?si=mP9xvmdM9gAE7re0)

## ライセンス

MIT License

Copyright (c) 2024 Noboru Ando @ Aoyama Gakuin University

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
