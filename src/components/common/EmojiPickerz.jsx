const URL = 'https://rolling-api.vercel.app';
const TEAM = '19-3';
const ID = 13971;

const emojiPallete = [
  '😂',
  '😁',
  '👍',
  '🫡',
  '❤️',
  '🍀',
  '😍',
  '🔥',
  '🎉',
  '🎁',
  '🥳',
  '😊',
  '😎',
];

function EmojiPickerz() {
  const handleClick = async e => {
    e.preventDefault();
    const emoji = e.target.textContent;
    const postData = {
      emoji,
      type: 'increase',
    };

    try {
      fetch(`${URL}/${TEAM}/recipients/${ID}/reactions/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      alert(`${emoji} reaction increased!`);
    } catch (err) {
      throw new Error(`Reaction increase Error ${err}`);
    }
  };

  return (
    <div className='w-200 bg-white grid grid-cols-4 gap-2 p-10 border-1 border-gray-300 rounded-md'>
      {emojiPallete.map((emoji, index) => {
        return (
          <button
            key={index}
            className='cursor-pointer text-24 hover:bg-gray-200'
            onClick={handleClick}
          >
            {emoji}
          </button>
        );
      })}
    </div>
  );
}

export default EmojiPickerz;
