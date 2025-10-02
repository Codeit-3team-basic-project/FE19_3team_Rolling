import clsx from 'clsx';

const badges = [
  {
    id: 'self',
    label: '지인',
    backgroundColor: 'var(--color-orange-100)',
    color: 'var(--color-orange-500)',
  },
  {
    id: 'coworker',
    label: '동료',
    backgroundColor: 'var(--color-purple-100)',
    color: 'var(--color-purple-500)',
  },
  {
    id: 'family',
    label: '가족',
    backgroundColor: 'var(--color-green-100)',
    color: 'var(--color-green-500)',
  },
  {
    id: 'friend',
    label: '친구',
    backgroundColor: 'var(--color-blue-100)',
    color: 'var(--color-blue-500)',
  },
];

export default function Badge({ selected }) {
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
        <span
          key={badge.id}
          className={clsx(
            'px-3 py-1 rounded-md font-medium font-regular transition-all duration-200',
            'hover:scale-105 cursor-pointer',
            {
              'ring-2 ring-gray-800 ring-offset-1': selected === badge.id,
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
          {badge.label}
        </span>
      ))}
    </div>
  );
}
