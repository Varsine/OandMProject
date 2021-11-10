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
    id: 1,
    url: 'https://www.facebook.com/ShellLogixLLC/',
    icon: <FbIcon />,
    iconHover: <FbHoverIcon />,
    ariaLabel: 'facebook',
  },
  {
    id: 2,
    url: 'https://www.linkedin.com/company/shelllogixarm',
    icon: <LinkedinIcon />,
    iconHover: <LinkedinHoverIcon />,
    ariaLabel: 'linkedin',
  },
  {
    id: 3,
    url: 'https://twitter.com/shelllogix',
    icon: <TwitterIcon />,
    iconHover: <TwitterHoverIcon />,
    ariaLabel: 'twitter',
  },
  {
    id: 4,
    url: 'https://web.telegram.org/#/im?p=@ShellLogix',
    icon: <TelegramIcon />,
    iconHover: <TelegramHoverIcon />,
    ariaLabel: 'telegram',
  },
  {
    id: 5,
    url: 'https://instagram.com/shelllogix?utm_medium=copy_link',
    icon: <Instagram />,
    iconHover: <InstagramHover />,
    ariaLabel: 'instagram',
  },
  {
    id: 6,
    url: 'mailto:shelllogix.team@gmail.com',
    icon: <GmailIcon />,
    iconHover: <GmailHoverIcon />,
    ariaLabel: 'gmail',
  },
];

export default linksInformation;
