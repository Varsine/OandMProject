import styles from '../containers/Home/AboutUs/AboutUs.scss';

const AboutTextSvg = () => (
  <svg viewBox="0 0 400 72">
    <symbol id="s-text">
      <text textAnchor="middle" x="50%" y="80%">
        About Us
      </text>
    </symbol>

    <g className={styles.g_ants}>
      <use xlinkHref="#s-text" className={styles.text_copy} />
      <use xlinkHref="#s-text" className={styles.text_copy} />
      <use xlinkHref="#s-text" className={styles.text_copy} />
      <use xlinkHref="#s-text" className={styles.text_copy} />
      <use xlinkHref="#s-text" className={styles.text_copy} />
    </g>
  </svg>
);

export default AboutTextSvg;
