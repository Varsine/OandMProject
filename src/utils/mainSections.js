import shortid from 'shortid';

import {
  Map,
  Main,
  AboutUs,
  OurTeam,
  OurWorks,
  Industry,
  HowWeWork,
  JoinOurTeam,
  OurPartners,
} from 'containers/Home';
import { JoinForm } from 'containers/Apply';
import { ErrorPage } from 'containers/Error';

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
    component: Industry,
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
    component: OurPartners,
  },
  {
    id: shortid.generate(),
    component: Map,
  },
];

export const applySections = [
  {
    id: shortid.generate(),
    component: JoinForm,
  },
];

export const errorSection = [
  {
    id: shortid.generate(),
    component: ErrorPage,
  },
];
