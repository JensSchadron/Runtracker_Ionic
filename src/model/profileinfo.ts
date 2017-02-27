/**
 * Created by Wout on 13/02/2017.
 */
export class Profileinfo{
  email:string;
  emailVerified:boolean;
  nickname:string;
  picture:string;
  sub:string;
  updatedAt:string;
  givenName:string;
  familyName:string;
  gender:string;

  constructor(email:string, emailVerified:boolean, nickname:string, picture:string, sub:string, updatedAt:string, givenName:string, familyName:string, gender:string) {
      this.email = email;
      this.emailVerified = emailVerified;
      this.nickname = nickname;
      this.picture = picture;
      this.sub = sub;
      this.updatedAt = updatedAt;
      this.givenName = givenName;
      this.familyName = familyName;
      this.gender = gender;
  }
}
