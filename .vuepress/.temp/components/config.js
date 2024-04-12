import { defineClientConfig } from "vuepress/client";
import { hasGlobalComponent } from "/Users/yams/github/notes-fe/node_modules/.pnpm/@vuepress+helper@2.0.0-rc.24_vuepress@2.0.0-rc.9/node_modules/@vuepress/helper/lib/client/index.js";

import Badge from "/Users/yams/github/notes-fe/node_modules/.pnpm/vuepress-plugin-components@2.0.0-rc.36_vuepress@2.0.0-rc.9/node_modules/vuepress-plugin-components/lib/client/components/Badge.js";
import FontIcon from "/Users/yams/github/notes-fe/node_modules/.pnpm/vuepress-plugin-components@2.0.0-rc.36_vuepress@2.0.0-rc.9/node_modules/vuepress-plugin-components/lib/client/components/FontIcon.js";

import "/Users/yams/github/notes-fe/node_modules/.pnpm/vuepress-plugin-components@2.0.0-rc.36_vuepress@2.0.0-rc.9/node_modules/vuepress-plugin-components/lib/client/styles/sr-only.scss";

export default defineClientConfig({
  enhance: ({ app }) => {
    if(!hasGlobalComponent("Badge")) app.component("Badge", Badge);
    if(!hasGlobalComponent("FontIcon")) app.component("FontIcon", FontIcon);
    
  },
  setup: () => {

  },
  rootComponents: [

  ],
});
