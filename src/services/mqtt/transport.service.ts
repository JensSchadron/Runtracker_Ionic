import { Subject } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Config } from './config';


/** possible states for the message queue */
export enum TransportState {
  CLOSED,
  TRYING,
  CONNECTED,
  SUBSCRIBED,
  DISCONNECTING
}

/* Interface which MQ Transports must implement */
export interface TransportService {

  // State of the TransportService implementer
  state: BehaviorSubject<TransportState>;

  // Publishes new messages to Observers
  userMessages: Subject<Object>;
  compMessages: Subject<Object>;

  /** Callback run on successfully connecting to server */
  on_connect: () => void;

  /** On message RX, notify the Observable with the message object */
  on_message: (...args: any[]) => void;

  /** Handle errors */
  on_error: (error: any) => void;

  /** Set up configuration */
  configure(config?: Config): void;

  /** Perform connection to broker, returning a Promise resolved when connected */
  try_connect(): Promise<{}>;

  /** Disconnect the client and clean up */
  disconnect(): Promise<any>;

  /** Subscribe to the user andcompetition topic message queues */
  subscribe(): void;

  /** Send a message to the competition topic */
  publishInCompTopic(message: string, qos: number): void;

  /** Send a message to a friends topic */
  publishInFriendTopic(topic: number, message: string): void;

  /** Send a message to own userTopic */
  publishInOwnTopic(message: string): void;
}
