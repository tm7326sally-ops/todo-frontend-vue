/// <reference types="vite/client" />

declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

// これを追加：Vuetifyのスタイルファイルを「モジュール」として認識させる
declare module "vuetify/styles";