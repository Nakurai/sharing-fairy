export default (nbCharacter) => {
  let res = "";
  for (let cpt = 0; cpt < nbCharacter; cpt++) {
    res += Math.floor(Math.random() * 10);
  }
  return res;
};
