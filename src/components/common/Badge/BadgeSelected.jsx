import clsx from 'clsx';
import { badges } from '../badgeData';

export default function BadgeSelected({ selectedId, className }) {
  // 선택된 배지 찾기
  const selectedBadge = badges.find(badge => badge.id === selectedId);

  // 선택된 배지가 없으면 null 반환
  if (!selectedBadge) {
    return null;
  }

  return (
    <span
      className={clsx(
        'inline-flex items-center px-3 py-1 rounded-md font-medium font-regular',
        className
      )}
      style={{
        backgroundColor: selectedBadge.backgroundColor,
        color: selectedBadge.color,
        fontSize: 'var(--text-14)',
      }}
    >
      {selectedBadge.label}
    </span>
  );
}
