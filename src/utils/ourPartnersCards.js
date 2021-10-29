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
    icon: <AccountantLightIcon className="logo_fix_size" />,
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
    icon: <KomShin className="fix_size_kms" />,
    iconLight: <KomShin className="fix_size_kms" />,
  },
  {
    id: 5,
    href: 'https://spp.am/',
    icon: <Spp className="fix_size_kms" />,
    iconLight: <SppLight className="fix_size_kms spp_lightMode" />,
  },
];

export default ourPartnersCards;
