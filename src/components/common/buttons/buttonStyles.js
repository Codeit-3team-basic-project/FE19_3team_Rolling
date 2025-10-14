// import { environments } from 'eslint-plugin-prettier';

export const ButtonStyles = {
  base: 'font-normal rounded transition-all duration-150 ease-in-out',

  size: {
    56: 'h-[56px] text-[18px] px-[16px] py-[14px] rounded-[12px] font-bold',
    40: 'h-[40px] text-[16px] px-[16px] py-[8px] rounded-[6px]',
    36: 'h-[36px] text-[16px] px-[16px] py-[6px] rounded-[6px]',
    32: 'h-[32px] text-[14px] px-[12px] py-[6px] rounded-[6px]',
    28: 'h-[28px] text-[14px] px-[12px] py-[2px] rounded-[6px]',
  },

  variant: {
    primary: {
      enabled:
        'bg-purple-600 text-white hover:bg-purple-700 active:bg-purple-800 focus:bg-purple-800 outline-purple-500',
      disabled: 'bg-gray-300 text-white cursor-not-allowed',
    },
    secondary: {
      enabled:
        'bg-white text-purple-600 border border-purple-600 hover:bg-purple-100 active:bg-purple-100 focus:bg-white text-purple-600 border border-purple-600',
      disabled: 'bg-gray-300 text-white cursor-not-allowed',
    },
    outlined: {
      enabled:
        'bg-white text-gray-900 border border-gray-300 hover:bg-gray-100 active:bg-gray-100 focus:border-gray-500',
      disabled: 'bg-gray-300 text-white border-none cursor-not-allowed',
    },
    circle: {
      enabled: 'bg-gray-500 rounded-full hover:bg-gray-600 active:bg-gray-700',
      disabled: 'bg-gray-300',
    },
    arrow: {
      enabled:
        'w-[40px] h-[40px] flex items-center bg-white opacity-70 rounded-full border border-gray-300 shadow-md shadow-gray-300/50',
      disabled: 'opacity-100',
    },
  },
};
