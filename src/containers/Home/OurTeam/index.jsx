import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { Text } from 'components/index';
import { activeIndexSelector } from 'slices/mainSlice';

import Modal from './Modal';
import styles from './OurTeam.scss';

const OurTeam = () => {
  const activeIndex = useSelector(activeIndexSelector);
  const [activeEmployee, setActiveEmployee] = useState(null);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const isOpen = activeIndex === 6;
  const team = [
    {
      id: 1,
      src: 'https://www.editsuits.com/wp-content/uploads/2019/12/Tailored-Wedding-Suit.jpg',
      name: 'Smbat1',
      left: '-10%',
      delay: '0s',
      profession: 'Engineer',
      info: 'The ability to creatively solve problems is key in any profession, engineering is no different. When problems arise and the most obvious solution isn’t possible it’s crucial to be able to solve the task in front of you in whatever way you can.',
    },
    {
      id: 2,
      src: 'https://www.editsuits.com/wp-content/uploads/2019/12/Tailored-Wedding-Suit.jpg',
      name: 'Smbat2',
      left: '89%',
      delay: '1s',
      profession: 'Engineer',
      info: 'The ability to creatively solve problems is key in any profession, engineering is no different. When problems arise and the most obvious solution isn’t possible it’s crucial to be able to solve the task in front of you in whatever way you can.',
    },
    {
      id: 3,
      src: 'https://www.editsuits.com/wp-content/uploads/2019/12/Tailored-Wedding-Suit.jpg',
      name: 'Smbat3',
      left: '-10%',
      delay: '2s',
      profession: 'Engineer',
      info: 'The ability to creatively solve problems is key in any profession, engineering is no different. When problems arise and the most obvious solution isn’t possible it’s crucial to be able to solve the task in front of you in whatever way you can.',
    },
    {
      id: 4,
      src: 'https://www.editsuits.com/wp-content/uploads/2019/12/Tailored-Wedding-Suit.jpg',
      name: 'Smbat4',
      left: '89%',
      delay: '3s',
      profession: 'Engineer',
      info: 'The ability to creatively solve problems is key in any profession, engineering is no different. When problems arise and the most obvious solution isn’t possible it’s crucial to be able to solve the task in front of you in whatever way you can.',
    },
    {
      id: 5,
      src: 'https://www.editsuits.com/wp-content/uploads/2019/12/Tailored-Wedding-Suit.jpg',
      name: 'Smbat5',
      left: '-10%',
      delay: '4s',
      profession: 'Engineer',
      info: 'The ability to creatively solve problems is key in any profession, engineering is no different. When problems arise and the most obvious solution isn’t possible it’s crucial to be able to solve the task in front of you in whatever way you can.',
    },
    {
      id: 6,
      src: 'https://www.editsuits.com/wp-content/uploads/2019/12/Tailored-Wedding-Suit.jpg',
      name: 'Smbat6',
      left: '89%',
      delay: '5s',
      profession: 'Engineer',
      info: 'The ability to creatively solve problems is key in any profession, engineering is no different. When problems arise and the most obvious solution isn’t possible it’s crucial to be able to solve the task in front of you in whatever way you can.',
    },
  ];

  const handlerModal = (id) => {
    setActiveEmployee(id);
    setIsOpenModal(true);
  };

  const renderTeamItems = team.map((el) => (
    <div
      role="button"
      onClick={() => handlerModal(el.id)}
      className={styles.wrapper__container__item}
      style={{
        left: el.left,
        animationDelay: el.delay,
        animationPlayState: isOpenModal || !isOpen ? 'paused' : 'running',
      }}
      key={el.id}
    >
      <img
        className={styles.wrapper__container__item__img}
        alt={el.name}
        src={el.src}
      />
      <Text className={styles.wrapper__container__item__name}>{el.name}</Text>
    </div>
  ));

  return (
    <section className={`section ${styles.wrapper}`}>
      <div className={`container  ${styles.wrapper__container}`}>
        <h2 className={styles.wrapper__container__title}>Our Team</h2>
        <div className={` ${styles.wrapper__container__content}`}>
          {renderTeamItems}
        </div>
      </div>
      <div className={styles.modal_container}>
        <Modal
          isOpenModal={isOpenModal}
          setIsOpenModal={setIsOpenModal}
          data={team[activeEmployee - 1]}
        />
      </div>
    </section>
  );
};

export default OurTeam;
