import shortid from 'shortid';

const teamCard = [
  {
    id: shortid.generate(),
    image: 'url(/images/team/Sash.png)',
    title: 'Sasha Vardanyan',
    subtitle: 'SOFTWARE DEVELOPER',
    text: 'Before software can be reusable it first has to be usable',
  },
  {
    id: shortid.generate(),
    image: 'url(/images/team/Karo.png)',
    title: 'Karo Zakaryan',
    subtitle: 'FULL-STACK DEVELOPER',
    text: 'Programming is not about what you know; it is about what you can figure out',
  },
  {
    id: shortid.generate(),
    image: 'url(/images/team/Martin.png)',
    title: 'Martin Martirosyan',
    subtitle: 'FRONT-END DEVELOPER',
    text: 'Experience is the name everyone gives to their mistakes',
  },
  {
    id: shortid.generate(),
    image: 'url(/images/team/Lyudvig.png)',
    title: 'Lyudvig Grigoryan',
    subtitle: 'FRONT-END DEVELOPER',
    text: 'Don’t worry if it doesn’t work right. If everything did, you’d be out of a job',
  },
];

export default teamCard;
