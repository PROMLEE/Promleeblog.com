import Image from "next/image";
import Link from "next/link";
import dashboard from "../../public/portrhythm/dashboard.webp";
import capture from "../../public/projects/promecapt.webp";
import sftp from "../../public/projects/promeftp.webp";
import portrhythmIcon from "../../public/projects/portrhythm-icon.webp";
import promecaptIcon from "../../public/projects/promecapt-icon.webp";
import promeftpIcon from "../../public/projects/promeftp-icon.webp";
import { projectMessages, translatedProjects } from "@/lib/i18n/projects";
import { localizePath, type Locale } from "@/lib/i18n/routing";
import styles from "./ProjectsShowcase.module.css";

const projects = [
  {
    id: "portrhythm",
    icon: portrhythmIcon,
    name: "포트리듬",
    shortDescription: "포트폴리오 관리",
    category: "웹 · 자산관리",
    summary: "흩어진 자산을 모아 보고, 지금 비중과 목표 비중을 비교합니다.",
    story: "제 투자 포트폴리오를 관리하려고 만들었습니다.",
    image: dashboard,
    alt: "보유 자산과 포트별 투자 비중을 보여주는 포트리듬 대시보드 예시",
    links: [
      { label: "포트리듬 열기", href: "https://pf.promleeblog.com/" },
      { label: "사용 가이드", href: "https://pf.promleeblog.com/guide" },
    ],
  },
  {
    id: "promecapt",
    licenseUrl: "https://github.com/PROMLEE/promecapt/blob/main/LICENSE",
    icon: promecaptIcon,
    name: "Promecapt",
    shortDescription: "Mac 화면 캡처·주석",
    category: "macOS · 화면 캡처",
    summary:
      "캡처한 화면에 주석을 달고, 텍스트를 추출하거나 화면 위에 고정합니다.",
    story:
      "캡처한 내용을 바로 다듬고 공유할 수 있는 무료 오픈소스 앱입니다. GIF 녹화도 지원합니다.",
    image: capture,
    alt: "Promecapt에서 캡처 이미지에 주석을 추가하는 편집 화면",
    links: [
      {
        label: "다운로드",
        href: "https://github.com/PROMLEE/promecapt/releases/latest",
      },
      {
        label: "소개와 설치 방법",
        href: "/blog/post/474-promecapt-open-source-macos-capture",
      },
    ],
  },
  {
    id: "promeftp",
    licenseUrl: "https://github.com/PROMLEE/promeftp/blob/main/LICENSE",
    icon: promeftpIcon,
    name: "PromeFTP",
    shortDescription: "SSH 접속·파일 전송",
    category: "macOS · SSH / SFTP",
    summary: "SSH 터미널과 SFTP 파일 전송을 한 작업 공간에서 사용합니다.",
    story:
      "서버를 오갈 때 터미널과 파일 전송 창을 따로 관리하는 수고를 줄였습니다. 여러 SSH 세션을 탭이나 분할 창으로 정리할 수 있습니다.",
    image: sftp,
    alt: "PromeFTP에서 로컬 파일과 테스트 서버 파일을 나란히 보는 화면",
    links: [
      {
        label: "다운로드",
        href: "https://github.com/PROMLEE/promeftp/releases/latest",
      },
      {
        label: "사용 가이드",
        href: "https://github.com/PROMLEE/promeftp/blob/main/docs/USAGE.md",
      },
      { label: "소개 글", href: "/blog/post/475-promeftp-macos-ssh-sftp" },
    ],
  },
] as const;

function localizedProjects(locale: Locale) {
  if (locale === "ko") return projects;
  const t = projectMessages[locale];
  return projects.flatMap((project) => {
    if (project.id === "portrhythm") return [];
    const links = project.links.map(({ href }) => {
      if (href.endsWith("/releases/latest")) return { label: t.download, href };
      if (href.startsWith("/")) {
        return project.id === "promecapt"
          ? { label: t.introLink, href: localizePath(href, locale) }
          : { label: t.koreanArticle, href };
      }
      return { label: t.englishGuide, href };
    });
    return [{ ...project, ...translatedProjects[locale][project.id], links }];
  });
}

function ProjectIcon({ icon }: { icon: (typeof projects)[number]["icon"] }) {
  return (
    <Image
      src={icon}
      alt=""
      width={52}
      height={52}
      className={styles.appIcon}
    />
  );
}

export function ProjectsCuration({ locale }: { locale: Locale }) {
  const t = projectMessages[locale];
  const path = localizePath("/projects", locale);
  return (
    <section
      className={styles.curation}
      aria-labelledby="projects-curation-title"
    >
      <header className={styles.sectionHeader}>
        <h2 id="projects-curation-title">{t.heading}</h2>
        <Link href={path}>
          {t.directory} <span aria-hidden="true">→</span>
        </Link>
      </header>
      <ul className={styles.homeGrid} data-locale={locale} role="list">
        {localizedProjects(locale).map((project) => (
          <li key={project.id}>
            <Link href={`${path}#${project.id}`} className={styles.homeCard}>
              <ProjectIcon icon={project.icon} />
              <div>
                <h3>{project.name}</h3>
                <p>{project.shortDescription}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function ProjectsDirectory({ locale }: { locale: Locale }) {
  const t = projectMessages[locale];
  const visibleProjects = localizedProjects(locale);
  return (
    <main className={styles.directory}>
      <header className={styles.directoryHeader}>
        <h1>{t.title}</h1>
        <p>{t.intro}</p>
      </header>
      <nav aria-label={t.directory} className={styles.jumpLinks}>
        {visibleProjects.map((project) => (
          <a key={project.id} href={`#${project.id}`}>
            {project.name}
          </a>
        ))}
      </nav>
      {visibleProjects.map((project, index) => (
        <section
          id={project.id}
          key={project.id}
          className={styles.project}
          aria-labelledby={`${project.id}-title`}
        >
          <div className={styles.projectCopy}>
            <div className={styles.appIdentity}>
              <ProjectIcon icon={project.icon} />
              <div>
                <p className={styles.category}>
                  {String(index + 1).padStart(2, "0")} / {project.category}
                </p>
                <h2 id={`${project.id}-title`}>{project.name}</h2>
              </div>
            </div>
            <ul className={styles.badges} role="list">
              <li>{t.adFree}</li>
              {"licenseUrl" in project && (
                <li>
                  <a href={project.licenseUrl}>{t.mit}</a>
                </li>
              )}
              {project.id === "promeftp" && <li>{t.noAccount}</li>}
            </ul>
            <p className={styles.summary}>
              {project.story}
              <br />
              {project.summary}
            </p>
            <div className={styles.actions}>
              {project.links.map(({ label, href }) =>
                href.startsWith("/") ? (
                  <Link key={href} href={href}>
                    {label}
                  </Link>
                ) : (
                  <a key={href} href={href}>
                    {label} <span aria-hidden="true">↗</span>
                  </a>
                ),
              )}
            </div>
          </div>
          <Image
            className={styles.preview}
            src={project.image}
            alt={project.alt}
            sizes="(max-width: 767px) 90vw, (max-width: 1199px) 40vw, 28vw"
          />
        </section>
      ))}
    </main>
  );
}
