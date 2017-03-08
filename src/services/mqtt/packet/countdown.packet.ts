import {MQTTPacket, MQTTPacketType} from "./mqtt.packet";

//TODO edit packet
export class CountdownPacket implements MQTTPacket{
  type: MQTTPacketType = MQTTPacketType.COUNTDOWN;

  constructor() {
  }
}
