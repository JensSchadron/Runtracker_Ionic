import {Component, Input} from '@angular/core';
import {RankingService} from "../../services/ranking/ranking.service";
import {CoreInfo} from "../../model/coreinfo";

@Component({
  selector: 'core-info',
  templateUrl: 'core-info.html'
})
export class CoreInfoPart{
  @Input() coreInfo: CoreInfo;


}
