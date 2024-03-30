import { pageRoot } from "./constants";
const nav = [
  {
    text: "前端基础",
    link: "/base/index",
    activeMath: "/pages//base/",
  },
  {
    text: "前端进阶",
    link: "/advance/index",
    activeMath: "/pages/advance/",
  },
  {
    text: "前端通识",
    link: "/common/index",
    activeMath: "/common/",
  },
  {
    text: "配置",
    items: [
      { text: "脚手架", link: "/cli/index", activeMath: "/cli/" },
      { text: "个人配置", link: "/custom/index", activeMath: "/custom/" },
      { text: "知识扩展", link: "/expand/index", activeMath: "/expand/" },
    ],
  },
  {
    text: "其他",
    items: [
      { text: "开发日志", link: "/devlog/index", activeMath: "/devlog/" },
      { text: "转载文章", link: "/reproduce/index", activeMath: "/reproduce/" },
      { text: "tk库", link: "/tk/index", activeMath: "/tk/" },
    ],
  },
  {
    text: "2024",
    items: [
      {
        text: "202403",
        link: "/collect/202403/index",
        activeMath: "/collect/",
      },
    ],
  },
];

const addPrefix = (link: string) => {
  return pageRoot + link;
};

const endNav = nav.map((i) => {
  const items = i.items?.map((i) => {
    return {
      ...i,
      link: addPrefix(i.link),
    };
  });
  const hasItems = i.items?.length > 0;
  const isLink = i.link?.length > 0;
  const baseRes = isLink
    ? { ...i, link: i.external ? i.link : addPrefix(i.link) }
    : { ...i };
  return hasItems ? { ...baseRes, items } : { ...baseRes };
});

export default endNav;
