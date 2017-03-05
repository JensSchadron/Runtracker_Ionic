import {Injectable} from '@angular/core';

import {Config} from './config';
import {AuthHttpImpl} from "../../auth/auth-http-impl";
import {BACKEND_BASEURL} from "../../../assets/globals";

/**
 * An injected class which grabs the application
 * config variables (e.g. MQ  credentials)
 * for the user application.
 *
 * This makes an AJAX request to the server
 * api containing some user token and secret
 *
 * @type ConfigService
 */
@Injectable()
export class ConfigService {

  // TODO: Provide a user object to the constructor
  //       to allow retrieval of per-user configs
  //       or from a specific URL.
  constructor(private authHttp: AuthHttpImpl) {
  }


  /** Make an https request for a config file, and
   * returns a Promise for its resolution.
   *
   * @return {Promise<Config>}
   */
  public getConfig(): Promise<Config> {
    return this.authHttp.getAuthHttp().get(BACKEND_BASEURL + "/api/mqtt/getConfig")
      .map(res => res.json())
      .toPromise();
  }

  /** Make an https request for a config file, and
   * returns a Promise for its resolution.
   *
   * @return {Promise<Config>}
   */
  public getConfigWithCompTopic(compId: number): Promise<Config> {
    return this.authHttp.getAuthHttp().get(BACKEND_BASEURL + "/api/mqtt/getConfig/" + compId)
      .map(res => res.json())
      .toPromise();
  }
}
