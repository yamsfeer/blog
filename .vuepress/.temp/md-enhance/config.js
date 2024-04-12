import { defineClientConfig } from "vuepress/client";
import CodeDemo from "/Users/yams/github/notes-fe/node_modules/.pnpm/vuepress-plugin-md-enhance@2.0.0-rc.36_flowchart.ts@3.0.0_katex@0.16.10_markdown-it@14.1.0_me_6pyk2wh63kxcpuk7fgrf24rsbu/node_modules/vuepress-plugin-md-enhance/lib/client/components/CodeDemo.js";
import MdDemo from "/Users/yams/github/notes-fe/node_modules/.pnpm/vuepress-plugin-md-enhance@2.0.0-rc.36_flowchart.ts@3.0.0_katex@0.16.10_markdown-it@14.1.0_me_6pyk2wh63kxcpuk7fgrf24rsbu/node_modules/vuepress-plugin-md-enhance/lib/client/components/MdDemo.js";
import FlowChart from "/Users/yams/github/notes-fe/node_modules/.pnpm/vuepress-plugin-md-enhance@2.0.0-rc.36_flowchart.ts@3.0.0_katex@0.16.10_markdown-it@14.1.0_me_6pyk2wh63kxcpuk7fgrf24rsbu/node_modules/vuepress-plugin-md-enhance/lib/client/components/FlowChart.js";
import { useHintContainers } from "/Users/yams/github/notes-fe/node_modules/.pnpm/vuepress-plugin-md-enhance@2.0.0-rc.36_flowchart.ts@3.0.0_katex@0.16.10_markdown-it@14.1.0_me_6pyk2wh63kxcpuk7fgrf24rsbu/node_modules/vuepress-plugin-md-enhance/lib/client/composables/useHintContainers.js";
import "/Users/yams/github/notes-fe/node_modules/.pnpm/vuepress-plugin-md-enhance@2.0.0-rc.36_flowchart.ts@3.0.0_katex@0.16.10_markdown-it@14.1.0_me_6pyk2wh63kxcpuk7fgrf24rsbu/node_modules/vuepress-plugin-md-enhance/lib/client/styles/hint/index.scss";
import "/Users/yams/github/notes-fe/node_modules/.pnpm/katex@0.16.10/node_modules/katex/dist/katex.min.css";
import "/Users/yams/github/notes-fe/node_modules/.pnpm/vuepress-plugin-md-enhance@2.0.0-rc.36_flowchart.ts@3.0.0_katex@0.16.10_markdown-it@14.1.0_me_6pyk2wh63kxcpuk7fgrf24rsbu/node_modules/vuepress-plugin-md-enhance/lib/client/styles/katex.scss";
import Mermaid from "/Users/yams/github/notes-fe/node_modules/.pnpm/vuepress-plugin-md-enhance@2.0.0-rc.36_flowchart.ts@3.0.0_katex@0.16.10_markdown-it@14.1.0_me_6pyk2wh63kxcpuk7fgrf24rsbu/node_modules/vuepress-plugin-md-enhance/lib/client/components/Mermaid.js";
import { injectMermaidConfig } from "/Users/yams/github/notes-fe/node_modules/.pnpm/vuepress-plugin-md-enhance@2.0.0-rc.36_flowchart.ts@3.0.0_katex@0.16.10_markdown-it@14.1.0_me_6pyk2wh63kxcpuk7fgrf24rsbu/node_modules/vuepress-plugin-md-enhance/lib/client//index.js";

export default defineClientConfig({
  enhance: ({ app }) => {
    app.component("CodeDemo", CodeDemo);
    app.component("MdDemo", MdDemo);
    app.component("FlowChart", FlowChart);
    injectMermaidConfig(app);
    app.component("Mermaid", Mermaid);
  },
  setup: () => {
useHintContainers();
  }
});
