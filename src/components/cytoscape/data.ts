export default async function getList() {
  const nodeSize1 = 20;
  const nodeSize2 = 17;
  const nodeSize3 = 10;
  const nodeSize4 = 10;
  const fontSize1 = 7;
  const fontSize2 = 6;
  const fontSize3 = 4;
  const fontSize4 = 4;
  const nodes: any[] = [];
  const edges: any[] = [];
  const Links = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/post/links`,
    { next: { revalidate: 60 }, mode: "no-cors" },
  )
    .then((res) => res.json())
    .then((data) => data.data);
  Links.map((category: any) => {
    console.log(category.url);
    nodes.push({
      data: {
        id: category.url,
        label: category.nameko,
        type: "category",
        url: `/blog/${category.url}`,
        size: nodeSize1,
        font: fontSize1,
      },
    });
    category.Subject.map((sub: any) => {
      nodes.push({
        data: {
          id: category.url + sub.url,
          label: sub.nameko,
          type: "sub",
          url: `/blog/${category.url}/${sub.url}`,
          size: nodeSize2,
          font: fontSize2,
        },
      });
      edges.push({
        data: {
          source: category.url,
          target: category.url + sub.url,
          label: "sub",
        },
      });
      sub.Series.map((series: any) => {
        nodes.push({
          data: {
            id: category.url + sub.url + series.url,
            label: series.nameko,
            type: "series",
            url: `/`,
            size: nodeSize3,
            font: fontSize3,
          },
        });
        edges.push({
          data: {
            source: category.url + sub.url,
            target: category.url + sub.url + series.url,
            label: "to series",
          },
        });
        // series.Post.map((post: any) => {
        //   nodes.push({
        //     data: {
        //       id: category.url + sub.url + series.url + post.id,
        //       label: post.id,
        //       type: "post",
        //       url: `/blog/${category.url}/${sub.url}/${post.id.padStart(2, "0")}`,
        //       size: nodeSize4,
        //       font: fontSize4,
        //     },
        //   });
        //   edges.push({
        //     data: {
        //       source: category.url + sub.url + series.url,
        //       target: category.url + sub.url + series.url + post.id,
        //       label: "to post",
        //     },
        //   });
        // });
      });
    });
  });
  // for (const key in CategoryKo) {
  //   for (const subKey in CategoryKo[key].sub) {
  //     edges.push({
  //       data: { source: key, target: key + subKey, label: "sub" },
  //     });
  //     for (const titleKey in CategoryKo[key].sub[subKey].title) {
  //       edges.push({
  //         data: {
  //           source: key + subKey,
  //           target: key + subKey + titleKey,
  //           label: "title",
  //         },
  //       });
  //     }
  //   }
  // }
  return {
    nodes: nodes,
    edges: edges,
  };
}
