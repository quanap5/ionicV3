//  Declare full interface for each user

import { Preference } from "../models/preference";
import { Profile } from '../models/profile';

export interface Fullprofile {
    uid: string,
    target: string,

    username: string,
    displayName: string,
    firstName: string,
    lastName: string,

    gender: string,
    age: string,
    birth: number,

    education: string,
    city: string,

    photoURL: string,
    profileURL1: string,
    profileURL2: string,
    profileURL3: string,
    profileURL4: string,

    profile: Profile,


}
