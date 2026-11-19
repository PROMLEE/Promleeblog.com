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
          width={40}
          height={40}
          className={styles.icon}
        />
        <p className={styles.title}>{name}</p>
      </div>
      <p className={styles.description}>{promo.description}</p>
      <div className={styles.links}>
        {renderLink(primaryHref, promo.primaryLabel)}
        {renderLink(secondaryHref, promo.secondaryLabel)}
      </div>
      {first && second && (
        <div className={styles.others}>
          <span>다른 앱도 만들었어요:</span>
          <ul role="list" className={styles.othersList}>
            <li>
              <Link href={`/projects#${first.id}`}>{first.name}</Link>
            </li>
            <li>
              <span aria-hidden="true"> · </span>
              <Link href={`/projects#${second.id}`}>{second.name}</Link>
            </li>
          </ul>
        </div>
      )}
    </aside>
  );
}
