// import React, { useEffect, useMemo } from 'react';
// import PropTypes from 'prop-types';
// import { useSelector } from 'react-redux';

// import { noop } from 'utils/index';
// import { Button } from 'components/index';
// import { modeSelector } from 'slices/mainSlice';

// import styles from './OurPartners.scss';

// import { ArrowIcon, ArrowGdtIcon } from '../../../icons';

// const ButtonGroup = ({ next, previous, goToSlide }) => {
//   const isDarkMode = useSelector(modeSelector);

//   useEffect(() => {
//     goToSlide(1);
//   }, []);

//   const arrIconMode = useMemo(() => {
//     if (isDarkMode) {
//       return <ArrowIcon />;
//     }

//     return <ArrowGdtIcon />;
//   }, [isDarkMode]);

//   return (
//     <div className={styles.carousel__controls}>
//       <Button
//         className={`${styles.carousel__controls_item} ${styles.carousel__controls_left}`}
//         onClick={previous}
//       >
//         {arrIconMode}
//       </Button>

//       <Button
//         className={`${styles.carousel__controls_item} ${styles.carousel__controls_right}`}
//         onClick={next}
//       >
//         {arrIconMode}
//       </Button>
//     </div>
//   );
// };

// ButtonGroup.propTypes = {
//   next: PropTypes.func,
//   previous: PropTypes.func,
//   goToSlide: PropTypes.func,
//   carouselState: PropTypes.object,
// };

// ButtonGroup.defaultProps = {
//   next: noop,
//   previous: noop,
//   goToSlide: noop,
//   carouselState: {},
// };

// export default ButtonGroup;
