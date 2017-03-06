import {MQTTPacket, MQTTPacketType} from "./mqtt.packet";

export class InviteResponsePacket implements MQTTPacket{
  type: MQTTPacketType = MQTTPacketType.INVITE_RESPONSE;
  compId: number;
  userId: number;
  accepted: boolean;

  constructor(compId: number, userId: number, accepted: boolean) {
    this.compId = compId;
    this.userId = userId;
    this.accepted = accepted;
  }
}
