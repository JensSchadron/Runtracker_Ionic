import {MQTTPacket, MQTTPacketType} from "./mqtt.packet";

export class ReadyPacket implements MQTTPacket{
  type: MQTTPacketType = MQTTPacketType.READY;
  compId: number;
  username: string;
  ready: boolean;

  constructor(compId: number, username: string, ready: boolean) {
    this.compId = compId;
    this.username = username;
    this.ready = ready;
  }
}
