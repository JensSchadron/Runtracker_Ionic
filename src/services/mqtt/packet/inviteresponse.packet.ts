import {MQTTPacket, MQTTPacketType} from "./mqtt.packet";

export class InviteResponsePacket implements MQTTPacket{
  type: MQTTPacketType = MQTTPacketType.INVITE_RESPONSE;
  compId: number;
  username: string;
  accepted: boolean;

  constructor(compId: number, username: string, accepted: boolean) {
    this.compId = compId;
    this.username = username;
    this.accepted = accepted;
  }
}
