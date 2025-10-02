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
  return (
    <div className='w-200 bg-white grid grid-cols-4 gap-2 p-10 border-1 border-gray-300 rounded-md'>
      {emojiPallete.map((emoji, index) => {
        return (
          <button
            key={index}
            className='cursor-pointer text-24 hover:bg-gray-200'
          >
            {emoji}
          </button>
        );
      })}
    </div>
  );
}

export default EmojiPickerz;
