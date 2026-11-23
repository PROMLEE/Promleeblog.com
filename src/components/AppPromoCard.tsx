import Image from "next/image";
import Link from "next/link";
import { projects } from "@/components/ProjectsShowcase";
import { otherPromoApps, type PromoAppId } from "@/lib/promoApp";
import styles from "./AppPromoCard.module.css";

function renderLink(href: string, label: string) {
  if (href.startsWith("/")) {
    return (
      <Link href={href} key={label}>
        {label}
      </Link>
    );
  }
  return (
    <a
      key={label}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label} (새 탭)`}
    >
      {label} <span aria-hidden="true">↗</span>
    </a>
  );
}

export default function AppPromoCard({ appId }: { appId: PromoAppId }) {
  const project = projects.find((p) => p.id === appId);
  if (!project) return null;

  const { name, icon, links, promo } = project;
  const secondaryLink = links[promo.secondaryLinkIndex];
  if (!secondaryLink) return null;
  const primaryHref = links[0].href;
  const secondaryHref = secondaryLink.href;

  const [firstId, secondId] = otherPromoApps(appId);
  const first = projects.find((p) => p.id === firstId);
  const second = projects.find((p) => p.id === secondId);

  return (
    <aside aria-label={`직접 만든 앱 ${name}`} className={styles.card}>
      <p className={styles.eyebrow}>직접 만든 앱</p>
      <div className={styles.head}>
        <Image
          src={icon}
          alt=""
          width={48}
          height={48}
          className={styles.icon}
        />
        <div>
          <p className={styles.title}>{name}</p>
          <p className={styles.tagline}>{promo.tagline}</p>
        </div>
      </div>
      <ul role="list" className={styles.highlights}>
        {promo.highlights.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <div className={styles.links}>
        {renderLink(primaryHref, promo.primaryLabel)}
        {renderLink(secondaryHref, promo.secondaryLabel)}
      </div>
      {first && second && (
        <div className={styles.others}>
          <p className={styles.othersTitle}>다른 앱도 만들었어요</p>
          <ul role="list" className={styles.othersList}>
            {[first, second].map((app) => (
              <li key={app.id}>
                <Link href={`/projects#${app.id}`} className={styles.other}>
                  <Image
                    src={app.icon}
                    alt=""
                    width={32}
                    height={32}
                    className={styles.otherIcon}
                  />
                  <span>
                    <span className={styles.otherName}>{app.name}</span>
                    <span className={styles.otherPitch}>{app.promo.pitch}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </aside>
  );
}
