## Setup
node.js 18以上が必要です

```sh
# pnpmコマンドが利用可能でない場合
$ corepack prepare pnpm@8.10.3 --activate 
# モジュールのインストール
$ pnpm install
# 開発コマンド
$ pnpm dev
```

`build/chrome-mv3-dev`が生成されるので、それを開発中のChrome拡張機能として読み込んでください。以降は変更したら即時反映されます。  
拡張機能の追加方法は、`chrome://extensions`にアクセスして、デベロッパーモードをオンにして、パッケージ化されていない拡張機能を読み込む、でいけます。

## 構成
- `popup`ディレクトリ内に、ボタンを押した時に出てくるpopupがあります。styleはstylesディレクトリで、CSS Modulesです。

## 注意点
- 当日はma_ma_himaページで作業してもらうことになりますが、拡張機能開発中はプログラムからアクセスすることになるので、ミスるとアクセス過多でFirebaseが終わる可能性があります
- `src/contents/main.ts`のmatchesを好きなURLに変更して、そのURL上で作業してください

