import { db } from "../db/db";

const adresses = db.adresses;

export const adressesRepository = {

  getAdresses(title?: string | null) {
    if (title) {
      return adresses.filter(a => a.title.indexOf(title) > 1);
    } else {
      return (adresses);
    }
  },

  getAdressById(id: number) {
    const adress = adresses.find(p => p.id === id);
    return adress;
  }
}