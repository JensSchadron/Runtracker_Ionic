export enum MQTTPacketType {
  INVITE,
  INVITE_RESPONSE,
  READY
}

export interface MQTTPacket {
  type: MQTTPacketType;
}
