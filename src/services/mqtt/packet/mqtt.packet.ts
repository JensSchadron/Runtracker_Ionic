export enum MQTTPacketType {
  COUNTDOWN,
  INVITE,
  INVITE_RESPONSE,
  READY
}

export interface MQTTPacket {
  type: MQTTPacketType;
}
