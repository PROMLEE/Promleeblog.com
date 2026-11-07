import Image from "next/image";
import styles from "./PortRhythmCard.module.css";

export default function PortRhythmCard({
  compact = false,
}: {
  compact?: boolean;
}) {
  return (
    <aside
      aria-label="직접 만든 서비스 포트리듬"
      className={`${styles.card} ${compact ? styles.compact : ""}`}
    >
      <div className={styles.copy}>
        <p className={styles.eyebrow}>직접 만든 서비스</p>
        <p className={styles.title}>
          포트리듬 <span>PortRhythm</span>
        </p>
        <p className={styles.description}>
          {compact ? (
            "흩어진 자산과 투자 비중을 함께 살펴보는 자산관리 도구입니다."
          ) : (
            <>
              제 투자 포트폴리오를 관리하려고 만들었습니다.
              <br />
              흩어진 계좌와 자산을 모아 보고, 목표 비중과 리밸런싱을 확인할 수
              있어요.
            </>
          )}
        </p>
        <div className={styles.links}>
          <a
            href="https://pf.promleeblog.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="포트리듬 둘러보기 (새 탭)"
          >
            둘러보기 <span aria-hidden="true">↗</span>
          </a>
          <a
            href="https://pf.promleeblog.com/guide"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="포트리듬 사용 가이드 (새 탭)"
          >
            사용 가이드 <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
      {!compact && (
        <a
          className={styles.preview}
          href="https://pf.promleeblog.com/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="포트리듬 대시보드 둘러보기 (새 탭)"
        >
          <Image
            src="/portrhythm/dashboard.webp"
            alt="포트리듬 대시보드 예시: 보유 자산과 현재·목표 투자 비중"
            width={1265}
            height={970}
            sizes="(max-width: 767px) 90vw, 280px"
          />
        </a>
      )}
    </aside>
  );
}
