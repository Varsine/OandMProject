const calculatePiecesPosition = (index) => {
  if (index < 12) {
    return `${0 - index * 100}% 0%`;
  }

  if (index > 11 && index < 24) {
    return `${0 - index * 100 + 1200}% -100%`;
  }

  if (index > 23 && index < 36) {
    return `${0 - index * 100 + 2400}% -200%`;
  }

  if (index > 35 && index < 48) {
    return `${0 - index * 100 + 3600}% -300%`;
  }

  if (index > 47 && index < 60) {
    return `${0 - index * 100 + 4800}% -400%`;
  }
  if (index > 59 && index < 72) {
    return `${0 - index * 100 + 6000}% -500%`;
  }
  if (index > 71 && index < 84) {
    return `${0 - index * 100 + 7200}% -600%`;
  }
  if (index > 83 && index < 96) {
    return `${0 - index * 100 + 8400}% -700%`;
  }
  if (index > 95 && index < 108) {
    return `${0 - index * 100 + 9600}% -800%`;
  }
  if (index > 107 && index < 120) {
    return `${0 - index * 100 + 10800}% -900%`;
  }
  if (index > 119 && index < 132) {
    return `${0 - index * 100 + 12000}% -1000%`;
  }
  if (index > 131 && index < 144) {
    return `${0 - index * 100 + 13200}% -1100%`;
  }
  if (index > 143 && index < 156) {
    return `${0 - index * 100 + 14400}% -1200%`;
  }
  if (index > 155 && index < 168) {
    return `${0 - index * 100 + 15600}% -1300%`;
  }

  return `0% 0%`;
};

export default calculatePiecesPosition;
