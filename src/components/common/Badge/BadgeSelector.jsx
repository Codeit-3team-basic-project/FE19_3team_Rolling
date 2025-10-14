import clsx from 'clsx';
import { badges } from '../badgeData';

export default function BadgeSelector({ selected, onSelectionChange }) {
  return (
    <div
      className={clsx(
        'p-4 border-2 border-dashed rounded-lg inline-flex gap-4',
        'transition-colors duration-200'
      )}
      style={{
        borderColor: 'var(--color-purple-300)',
      }}
    >
      {badges.map(badge => (
        <label
          key={badge.id}
          className={clsx(
            'relative px-3 py-1 rounded-md font-medium font-regular transition-all duration-200',
            'hover:scale-105 cursor-pointer flex items-center gap-2 ',
            {
              '': selected === badge.id,
            }
          )}
          style={{
            backgroundColor:
              selected === badge.id
                ? badge.backgroundColor
                : 'var(--color-gray-100)',
            color:
              selected === badge.id ? badge.color : 'var(--color-gray-400)',
            fontSize: 'var(--text-14)',
          }}
        >
          <input
            type='checkbox'
            checked={selected === badge.id}
            onChange={() => onSelectionChange(badge.id)}
            className='sr-only'
          />
          {badge.label}
        </label>
      ))}
    </div>
  );
}
