import {Tracking} from "./tracking";
import {Competition} from "./competition";

export class HistoryWrapper {
  type: string;
  tracking: Tracking;
  competition: Competition;

  public makeTrackingHistory(tracking: Tracking) {
    this.tracking = tracking;
  }

  public makeCompetitionHistory(competition: Competition){
    this.competition = competition;
  }
}
