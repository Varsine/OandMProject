import shortid from 'shortid';

const teamCard = [
  {
    id: shortid.generate(),
    image: 'url(/images/team/Sash.png)',
    imageLight: 'url(/images/team/Sash.png)',
    title: 'Sasha Vardanyan',
    subtitle: 'SOFTWARE DEVELOPER',
    text: 'Before software can be reusable it first has to be usable',
    animPosition: 'teamAnimateBottom',
  },
  {
    id: shortid.generate(),
    image: 'url(/images/team/Karo.png)',
    imageLight: 'url(/images/team/KaroLight.png)',
    title: 'Karo Zakaryan',
    subtitle: 'FULL-STACK DEVELOPER',
    text: 'Programming is not about what you know; it is about what you can figure out',
    animPosition: 'teamAnimateTop',
  },
  {
    id: shortid.generate(),
    image: 'url(/images/team/Martin.png)',
    imageLight: 'url(/images/team/Martin.png)',
    title: 'Martin Martirosyan',
    subtitle: 'FRONT-END DEVELOPER',
    text: 'Experience is the name everyone gives to their mistakes',
    animPosition: 'teamAnimateLeft',
  },
  {
    id: shortid.generate(),
    image: 'url(/images/team/Lyudvig.png)',
    imageLight: 'url(/images/team/LyudvigLight.png)',
    title: 'Lyudvig Grigoryan',
    subtitle: 'FRONT-END DEVELOPER',
    text: 'Don’t worry if it doesn’t work right. If everything did, you’d be out of a job',
    animPosition: 'teamAnimateRight',
  },
];

export default teamCard;
