
/**
 * Represents a configuration object for the
 * Service to connect to, pub, and sub.
 */
export interface Config {
  // Which server?
  host: string;
  port: number;
  ssl: boolean;

  // What credentials?
  user: string;
  pass: string;

  // // Which queues?
  // publish: string[];
  // subscribe: string[];

  userTopic: string;
  competitionTopic: string;

  // How often to heartbeat?
  keepalive?: number;

  // Last will
  will: {
    topic: string;
    payload: string;
    qos: number;
    retain: boolean;
  };
}
