import add24 from '../../../assets/add-24.svg';
import add20 from '../../../assets/add-20.svg';
import share24 from '../../../assets/share-24.svg';
import share20 from '../../../assets/share-20.svg';
import trash from '../../../assets/deleted.svg';
import plus from '../../../assets/plus.svg';
import arrowLeft from '../../../assets/arrow_left.svg';
import arrowRight from '../../../assets/arrow_right.svg';

function IconAdd({ size = '40' }) {
  const iconSize = {
    56: add24,
    40: add24,
    36: add24,
    32: add20,
    28: add20,
  };

  return <img src={iconSize[size]} alt='추가' />;
}

function IconShare({ size = '40' }) {
  const iconSize = {
    56: share24,
    40: share24,
    36: share24,
    32: share20,
    28: share20,
  };

  return <img src={iconSize[size]} alt='공유' />;
}

function IconDelete() {
  return <img src={trash} alt='삭제' />;
}

function IconPlus() {
  return <img src={plus} alt='추가' />;
}

function IconArrow({ direc = 'lt' }) {
  const iconDirec = {
    lt: arrowLeft,
    rt: arrowRight,
  };
  return <img src={iconDirec[direc]} alt='화살표' />;
}

export { IconAdd, IconShare, IconDelete, IconPlus, IconArrow };
