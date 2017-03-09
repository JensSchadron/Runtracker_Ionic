import {Goal} from "../../../model/goal";
import {Coordinate} from "../../../model/coordinate";
export enum MQTTPacketType {
  COUNTDOWN,
  INVITE,
  INVITE_RESPONSE,
  READY,
  TRACKING
}

export interface MQTTPacket {
  type: MQTTPacketType;
}

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

export class CountdownPacket implements MQTTPacket{
  type: MQTTPacketType = MQTTPacketType.COUNTDOWN;

  constructor() {
  }
}

export class TrackingPacket implements MQTTPacket{
  type: MQTTPacketType = MQTTPacketType.TRACKING;
  compId: number;
  userId: number;
  coordinate: Coordinate;
  totalDistance: number;

  constructor(compId: number, userId: number, coordinate: Coordinate, totalDistance: number) {
    this.compId = compId;
    this.userId = userId;
    this.coordinate = coordinate;
    this.totalDistance = totalDistance;
  }
}
