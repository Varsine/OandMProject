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
    url: 'https://www.facebook.com/ShellLogixLLC',
    icon: <FbIcon />,
    iconHover: <FbHoverIcon />,
    ariaLabel: 'facebook',
  },
  {
    url: 'https://www.linkedin.com/company/shelllogixarm',
    icon: <LinkedinIcon />,
    iconHover: <LinkedinHoverIcon />,
    ariaLabel: 'linkedin',
  },
  {
    url: 'https://twitter.com/shelllogix',
    icon: <TwitterIcon />,
    iconHover: <TwitterHoverIcon />,
    ariaLabel: 'twitter',
  },
  {
    url: 'https://web.telegram.org/#/im?p=@ShellLogix',
    icon: <TelegramIcon />,
    iconHover: <TelegramHoverIcon />,
    ariaLabel: 'telegram',
  },
  {
    url: 'https://www.instagram.com/shelllogix/?utm_medium=copy_link',
    icon: <Instagram />,
    iconHover: <InstagramHover />,
    ariaLabel: 'instagram',
  },
  {
    url: 'mailto:shelllogix.team@gmail.com',
    icon: <GmailIcon />,
    iconHover: <GmailHoverIcon />,
    ariaLabel: 'gmail',
  },
];

export default linksInformation;
