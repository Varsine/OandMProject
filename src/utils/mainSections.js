import shortid from 'shortid';

import {
  Map,
  Main,
  AboutUs,
  OurTeam,
  OurWorks,
  HowWeWork,
  JoinOurTeam,
} from 'components/index';

const mainSections = [
  {
    id: shortid.generate(),
    component: Main,
  },
  {
    id: shortid.generate(),
    component: HowWeWork,
  },
  {
    id: shortid.generate(),
    component: AboutUs,
  },
  {
    id: shortid.generate(),
    component: OurWorks,
  },
  {
    id: shortid.generate(),
    component: OurTeam,
  },

  {
    id: shortid.generate(),
    component: JoinOurTeam,
  },
  {
    id: shortid.generate(),
    component: Map,
  },
];

export default mainSections;
