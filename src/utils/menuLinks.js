import shortid from 'shortid';

import {
  HomeIcon,
  TeamIcon,
  AboutUsIcon,
  HomeHoverIcon,
  HomeLightIcon,
  TeamLightIcon,
  TeamHoverIcon,
  AboutUsHoverIcon,
  AboutUsLightIcon,
} from '../icons';

const menuLinks = [
  {
    id: shortid.generate(),
    icon: HomeIcon,
    iconLight: HomeLightIcon,
    iconHover: HomeHoverIcon,
    sectionIndex: 1,
  },
  {
    id: shortid.generate(),
    icon: AboutUsIcon,
    iconLight: AboutUsLightIcon,
    iconHover: AboutUsHoverIcon,
    sectionIndex: 3,
  },
  {
    id: shortid.generate(),
    icon: TeamIcon,
    iconLight: TeamLightIcon,
    iconHover: TeamHoverIcon,
    sectionIndex: 5,
  },
];

export default menuLinks;
