import {
  flowRendererV2,
  flowStyles
} from "./chunk-ZATECEGX.js";
import "./chunk-SNHZFICM.js";
import {
  flowDb,
  parser$1
} from "./chunk-GWNTOUDJ.js";
import "./chunk-2SONE66B.js";
import "./chunk-AOE3DBIU.js";
import "./chunk-BSEYONYF.js";
import "./chunk-GVRB6UXK.js";
import {
  require_dayjs_min,
  require_dist,
  setConfig
} from "./chunk-GP36KRM6.js";
import {
  __toESM
} from "./chunk-3EJPJMEH.js";

// node_modules/.pnpm/mermaid@10.9.0/node_modules/mermaid/dist/flowDiagram-v2-3b53844e.js
var import_dayjs = __toESM(require_dayjs_min(), 1);
var import_sanitize_url = __toESM(require_dist(), 1);
var diagram = {
  parser: parser$1,
  db: flowDb,
  renderer: flowRendererV2,
  styles: flowStyles,
  init: (cnf) => {
    if (!cnf.flowchart) {
      cnf.flowchart = {};
    }
    cnf.flowchart.arrowMarkerAbsolute = cnf.arrowMarkerAbsolute;
    setConfig({ flowchart: { arrowMarkerAbsolute: cnf.arrowMarkerAbsolute } });
    flowRendererV2.setConf(cnf.flowchart);
    flowDb.clear();
    flowDb.setGen("gen-2");
  }
};
export {
  diagram
};
//# sourceMappingURL=flowDiagram-v2-3b53844e-7P6ZD7AB.js.map
