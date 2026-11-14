import type { Locale, TranslationLocale } from "./routing";

export const projectMessages = {
  ko: {
    menu: "만든 서비스",
    heading: "직접 만든 도구",
    directory: "서비스 모음",
    title: "내가 만든 서비스",
    intro:
      "자산 관리, 화면 캡처, 서버 접속을 조금 더 편하게 해주는 도구들입니다.",
    adFree: "앱 내 광고 없음",
    mit: "MIT 오픈소스",
    noAccount: "가입 없이 사용",
    download: "다운로드",
    englishGuide: "사용 가이드 (영어)",
    introLink: "소개 글",
    koreanArticle: "소개 글",
  },
  en: {
    menu: "Projects",
    heading: "Apps I built",
    directory: "All projects",
    title: "Apps I built",
    intro:
      "Two macOS tools for capturing your screen and working with remote servers.",
    adFree: "Ad-free",
    mit: "MIT open source",
    noAccount: "No account required",
    download: "Download",
    englishGuide: "User guide",
    introLink: "Read the introduction",
    koreanArticle: "Introduction (Korean)",
  },
  ja: {
    menu: "自作アプリ",
    heading: "作ったアプリ",
    directory: "アプリ一覧",
    title: "作ったアプリ",
    intro: "画面キャプチャとサーバー作業を快適にする、2つのmacOSアプリです。",
    adFree: "アプリ内広告なし",
    mit: "MITライセンス",
    noAccount: "アカウント登録不要",
    download: "ダウンロード",
    englishGuide: "使い方（英語）",
    introLink: "紹介記事",
    koreanArticle: "紹介記事（韓国語）",
  },
  zh: {
    menu: "自制应用",
    heading: "我开发的应用",
    directory: "全部应用",
    title: "我开发的应用",
    intro: "两款 macOS 工具，分别用于屏幕截图和远程服务器操作。",
    adFree: "应用内无广告",
    mit: "MIT 开源",
    noAccount: "无需注册",
    download: "下载",
    englishGuide: "使用指南（英语）",
    introLink: "查看介绍",
    koreanArticle: "介绍文章（韩语）",
  },
} satisfies Record<Locale, Record<string, string>>;

export const translatedProjects = {
  en: {
    promecapt: {
      shortDescription: "Screenshots & annotations",
      category: "macOS · Screen capture",
      story:
        "A free, open-source app for editing and sharing screenshots. It also records GIFs.",
      summary: "Annotate captures, extract text, or pin images to your screen.",
      alt: "Annotating a screenshot in Promecapt",
    },
    promeftp: {
      shortDescription: "SSH & file transfers",
      category: "macOS · SSH / SFTP",
      story: "Keep multiple SSH sessions organized in tabs and split panes.",
      summary:
        "Work in an SSH terminal and transfer files over SFTP in one workspace.",
      alt: "PromeFTP showing local and remote files side by side",
    },
  },
  ja: {
    promecapt: {
      shortDescription: "画面キャプチャ・注釈",
      category: "macOS · 画面キャプチャ",
      story:
        "スクリーンショットの編集と共有に使える無料のオープンソースアプリです。GIF録画にも対応します。",
      summary:
        "画像に注釈を追加したり、文字を抽出したり、画面上に固定したりできます。",
      alt: "Promecaptでスクリーンショットに注釈を付ける画面",
    },
    promeftp: {
      shortDescription: "SSH・ファイル転送",
      category: "macOS · SSH / SFTP",
      story: "複数のSSHセッションをタブや分割ペインで整理できます。",
      summary: "SSHターミナルとSFTPファイル転送を同じ作業スペースで使えます。",
      alt: "PromeFTPでローカルとサーバーのファイルを並べて表示した画面",
    },
  },
  zh: {
    promecapt: {
      shortDescription: "截图与标注",
      category: "macOS · 屏幕截图",
      story: "一款免费的开源截图编辑与分享工具，也支持 GIF 录制。",
      summary: "为截图添加标注、提取文字，或将图片固定在屏幕上。",
      alt: "在 Promecapt 中为截图添加标注",
    },
    promeftp: {
      shortDescription: "SSH 与文件传输",
      category: "macOS · SSH / SFTP",
      story: "通过标签页和分屏管理多个 SSH 会话。",
      summary: "在同一个工作区使用 SSH 终端并通过 SFTP 传输文件。",
      alt: "PromeFTP 并排显示本地与服务器文件",
    },
  },
} satisfies Record<
  TranslationLocale,
  Record<
    "promecapt" | "promeftp",
    {
      shortDescription: string;
      category: string;
      story: string;
      summary: string;
      alt: string;
    }
  >
>;
