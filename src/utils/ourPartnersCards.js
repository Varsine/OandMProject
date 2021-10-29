import {
  Spp,
  KomShin,
  SppLight,
  DoubleOneIcon,
  KristobadIcon,
  AccountantLightIcon,
} from '../icons';

const ourPartnersCards = [
  {
    id: 1,
    href: 'https://kristobad.com/',
    icon: <KristobadIcon className="logo_fix_size" />,
    iconLight: <KristobadIcon className="logo_fix_size" />,
  },
  {
    id: 2,
    href: '',
    icon: (
      <AccountantLightIcon className="acc_logo_edit_dark_mode logo_fix_size" />
    ),
    iconLight: <AccountantLightIcon className="logo_fix_size" />,
  },
  {
    id: 3,
    href: 'https://doubleone.org/',
    icon: <DoubleOneIcon className="logo_fix_size" />,
    iconLight: <DoubleOneIcon className="logo_fix_size" />,
  },
  {
    id: 4,
    href: 'https://www.tekhhskich.am/',
    icon: <KomShin className="logo_fix_size" />,
    iconLight: <KomShin className="logo_fix_size" />,
  },
  {
    id: 5,
    href: 'https://spp.am/',
    icon: <Spp className="logo_fix_size" />,
    iconLight: <SppLight className="logo_fix_size spp_lightMode" />,
  },
];

export default ourPartnersCards;
