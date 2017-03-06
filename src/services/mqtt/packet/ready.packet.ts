import {MQTTPacket, MQTTPacketType} from "./mqtt.packet";

export class ReadyPacket implements MQTTPacket{
  type: MQTTPacketType = MQTTPacketType.READY;
  compId: number;
  userId: number;
  ready: boolean;

  constructor(compId: number, userId: number, ready: boolean) {
    this.compId = compId;
    this.userId = userId;
    this.ready = ready;
  }
}
