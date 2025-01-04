import { WithId } from "mongodb";
import { apiAttemptsCollection } from "../db/mongoDb";
import { IApiAttempt } from "../@types/shared";

export const apiAttemptsQueryRepository = {
  
  async countRequests(values: IApiAttempt): Promise<IApiAttempt[]> {

    const { IP, URL, date } = values;
    const thresholdDate = new Date(date.getTime() - 10 * 1000);

    const attempts = await apiAttemptsCollection.find({ 
      IP, 
      URL, 
      date: { $gte: thresholdDate }, 
    }).toArray();
    return attempts.map(a => this._mapToOutput(a));
  },

  _mapToOutput(attempt: WithId<IApiAttempt>): IApiAttempt {
    return {
      IP: attempt.IP,
      URL: attempt.URL,
      date: attempt.date,
    };
  },
}