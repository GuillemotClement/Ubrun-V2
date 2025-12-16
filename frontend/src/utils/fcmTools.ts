/**
 * For get the FCMax theoric, we use the more accurate formule (FCM = 206 – 0,7 x age (Gellish et cool. 2007)
 * Is the best if user don't know her FcRepos.
 * @param age
 * @returns résultat arrondis à l'entier le plus proche.
 */
export const getFCmax = (age: number): number => {
  const ageCarre = age * age;
  const result = 192 - 0.0007 * ageCarre;
  return Math.round(result);
};
