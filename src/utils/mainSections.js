import shortid from 'shortid';

import {
  Map,
  Main,
  Apply,
  AboutUs,
  OurTeam,
  OurWorks,
  HowWeWork,
  JoinOurTeam,
} from 'components/index';

export const mainSections = [
  {
    id: shortid.generate(),
    component: Main,
  },
  {
    id: shortid.generate(),
    component: AboutUs,
  },
  {
    id: shortid.generate(),
    component: HowWeWork,
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

export const applySections = [
  {
    id: shortid.generate(),
    component: Apply,
  },
];

export const errorSection = [
  {
    id: shortid.generate(),
    component: Main,
  },
];
