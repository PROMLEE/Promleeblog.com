import { CategoryKo } from "@/config/koname";

const nodeSize1 = 30;
const nodeSize2 = 20;
const nodeSize3 = 15;
const nodeSize4 = 10;
const fontSize1 = 10;
const fontSize2 = 8;
const fontSize3 = 6;
const fontSize4 = 4;
const nodes = [];

for (const key in CategoryKo) {
  nodes.push({
    data: {
      id: key,
      label: CategoryKo[key].name,
      type: "category",
      url: `/blog/${key}`,
      size: nodeSize1,
      font: fontSize1,
    },
  });
  for (const subKey in CategoryKo[key].sub) {
    nodes.push({
      data: {
        id: key + subKey,
        label: CategoryKo[key].sub[subKey].name,
        type: "sub",
        url: `/blog/${key}/${subKey}`,
        size: nodeSize2,
        font: fontSize2,
      },
    });
    for (const titleKey in CategoryKo[key].sub[subKey].title) {
      nodes.push({
        data: {
          id: key + subKey + titleKey,
          label: CategoryKo[key].sub[subKey].title[titleKey].name,
          type: "title",
          url: `/blog/${key}/${subKey}/${titleKey}`,
          size: nodeSize3,
          font: fontSize3,
        },
      });
      for (const contentKey in CategoryKo[key].sub[subKey].title[titleKey]
        .content) {
        nodes.push({
          data: {
            id: key + subKey + titleKey + contentKey,
            label:
              CategoryKo[key].sub[subKey].title[titleKey].content[contentKey]
                .name,
            type: "content",
            url: `/blog/${key}/${subKey}/${titleKey}/${contentKey}`,
            size: nodeSize4,
            font: fontSize4,
          },
        });
      }
    }
  }
}
const edges = [];
for (const key in CategoryKo) {
  for (const subKey in CategoryKo[key].sub) {
    edges.push({
      data: { source: key, target: key + subKey, label: "sub" },
    });
    for (const titleKey in CategoryKo[key].sub[subKey].title) {
      edges.push({
        data: {
          source: key + subKey,
          target: key + subKey + titleKey,
          label: "title",
        },
      });
      for (const contentKey in CategoryKo[key].sub[subKey].title[titleKey]
        .content) {
        edges.push({
          data: {
            source: key + subKey + titleKey,
            target: key + subKey + titleKey + contentKey,
            label: "content",
          },
        });
      }
    }
  }
}
export const graphData = {
  nodes: nodes,
  edges: edges,
};