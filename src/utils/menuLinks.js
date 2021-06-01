import shortid from 'shortid';

import { HomeIcon, AboutUsIcon, TeamIcon } from '../icons';

const menuLinks = [
  {
    id: shortid.generate(),
    svg: HomeIcon,
    sectionIndex: 1,
  },
  {
    id: shortid.generate(),
    svg: AboutUsIcon,
    sectionIndex: 3,
  },
  {
    id: shortid.generate(),
    svg: TeamIcon,
    sectionIndex: 5,
  },
];

export default menuLinks;
