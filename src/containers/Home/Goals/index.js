import React from 'react';
// import classNames from 'classnames';
// import { useSelector } from 'react-redux';

// import { activeIndexSelector } from 'slices/mainSlice';
import { Heading, Text } from 'components/index';

import styles from './Goals.scss';

const Goals = () => {
  //   const activeIndex = useSelector(activeIndexSelector);

  const cardsList = [
    {
      id: 1,
      name: 'Become most Dependability',
      info: "Aiming at improving the reliability and consistency of a company's operations. This can be achieved through measures such as implementing backup systems, maintaining equipment and facilities, and ensuring adequate staffing levels.",
    },
    {
      id: 2,
      name: 'Become most Flexibility',
      info: 'Seeking to improve the ability of a company to adapt to changing circumstances. This can be achieved through measures such as cross-training employees, diversifying product lines, and implementing flexible work arrangements.',
    },
    {
      id: 3,
      name: 'Become most Speed',
      info: "Focused on improving the speed and responsiveness of a company's operations. This can be achieved through measures such as reducing lead times, improving communication and coordination between departments, and investing in faster technology.",
    },
    {
      id: 4,
      name: 'Become most Flexibility',
      info: 'seeking to improve the ability of a company to adapt to changing circumstances. This can be achieved through measures such as cross-training employees, diversifying product lines, and implementing flexible work arrangements.',
    },
    {
      id: 5,
      name: 'Become most Flexibility',
      info: 'seeking to improve the ability of a company to adapt to changing circumstances. This can be achieved through measures such as cross-training employees, diversifying product lines, and implementing flexible work arrangements.',
    },
  ];

  const renderItems = cardsList.map(({ id, name, info }) => (
    <div key={id} className={styles.wrapper__flip_card}>
      <div className={styles.wrapper__flip_card__inner}>
        <div className={styles.wrapper__flip_card__front}>
          <Text>{name}</Text>
        </div>
        <div className={styles.wrapper__flip_card__back}>
          <Text>{info}</Text>
        </div>
      </div>
    </div>
  ));

  return (
    <section className={`${styles.height_response} section`}>
      <div className={`container ${styles.wrapper}`}>
        <Heading className={styles.wrapper__title} isTitle>
          Our Partners
        </Heading>
        <div className={styles.wrapper__content}>{renderItems}</div>
      </div>
    </section>
  );
};

export default Goals;
