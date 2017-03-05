import {MQTTPacket, MQTTPacketType} from "./mqtt.packet";
import {Goal} from "../../../model/goal";

export class InvitePacket implements MQTTPacket{
  type: MQTTPacketType = MQTTPacketType.INVITE;
  compId: number;
  username: string;
  goal: Goal;

  constructor(compId: number, username: string, goal: Goal) {
    this.compId = compId;
    this.username = username;
    this.goal = goal;
  }
}
