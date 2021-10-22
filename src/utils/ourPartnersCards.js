import shortid from 'shortid';

import {
  DoubleOneIcon,
  KristobadIcon,
  AccountantIcon,
  AccountantLightIcon,
} from '../icons';

const ourPartnersCards = [
  {
    href: 'https://kristobad.com/',
    id: shortid.generate(),
    icon: <KristobadIcon />,
    iconLight: <KristobadIcon />,
  },
  {
    href: '',
    id: shortid.generate(),
    icon: <AccountantIcon />,
    iconLight: <AccountantLightIcon />,
  },
  {
    href: 'https://doubleone.org/',
    id: shortid.generate(),
    icon: <DoubleOneIcon />,
    iconLight: <DoubleOneIcon />,
  },
  {
    href: 'https://spp.am/',
    id: shortid.generate(),
    icon: <KristobadIcon />,
    iconLight: <KristobadIcon />,
  },
  {
    href: '',
    id: shortid.generate(),
    icon: <AccountantIcon />,
    iconLight: <AccountantLightIcon />,
  },
];

export default ourPartnersCards;
