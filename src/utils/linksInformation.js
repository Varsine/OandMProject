import shortid from 'shortid';

import {
  FbIcon,
  GmailIcon,
  Instagram,
  FbHoverIcon,
  TwitterIcon,
  TelegramIcon,
  LinkedinIcon,
  GmailHoverIcon,
  InstagramHover,
  TwitterHoverIcon,
  TelegramHoverIcon,
  LinkedinHoverIcon,
} from '../icons';

const linksInformation = [
  {
    id: shortid.generate(),
    url: 'https://www.facebook.com/ShellLogixLLC',
    icon: <FbIcon />,
    iconHover: <FbHoverIcon />,
    ariaLabel: 'facebook',
  },
  {
    id: shortid.generate(),
    url: 'https://www.linkedin.com/company/shelllogixarm',
    icon: <LinkedinIcon />,
    iconHover: <LinkedinHoverIcon />,
    ariaLabel: 'linkedin',
  },
  {
    id: shortid.generate(),
    url: 'https://twitter.com/shelllogix',
    icon: <TwitterIcon />,
    iconHover: <TwitterHoverIcon />,
    ariaLabel: 'twitter',
  },
  {
    id: shortid.generate(),
    url: 'https://web.telegram.org/#/im?p=@ShellLogix',
    icon: <TelegramIcon />,
    iconHover: <TelegramHoverIcon />,
    ariaLabel: 'telegram',
  },
  {
    id: shortid.generate(),
    url: 'https://www.instagram.com/shelllogixllc',
    icon: <Instagram />,
    iconHover: <InstagramHover />,
    ariaLabel: 'instagram',
  },
  {
    id: shortid.generate(),
    url: 'mailto:shelllogix.team@gmail.com',
    icon: <GmailIcon />,
    iconHover: <GmailHoverIcon />,
    ariaLabel: 'gmail',
  },
];

export default linksInformation;
