import { describe, expect, it } from "vitest";
import { getFCmax } from "../fcmTools";

describe("getFcMax", () => {
  it("should return 191.37 if age is 30", () => {
    // for the theorique basique, we use formule FCM = 206 – 0,7 x age (Gellish et cool. 2007)
    expect(getFCmax(30)).toBe(191.37);
  });
});
// https://www.running-addict.fr/conseil-running/comment-calculer-sa-frequence-cardiaque-maximale-fcm/
// https://www.running-addict.fr/conseil-running/formule-de-karvonen-calcul-zone-cardiaque/
// 
// Formule #2 : FCM = 206 – 0,7 x age (Londeree et col. 1982)=> un peu plus fiable
// Formule #3 : FCM = 192-0,007 x age² (Gellish et coll. 2007) => encore plus fiable
// 
// Formule pour la deuxième méthode 
// FC repos => fréquence le matin au reveil.
// FcMax - FcRepos => Fc de réserve
// on applique ensuite le % de FC sur cette valeur.
// 