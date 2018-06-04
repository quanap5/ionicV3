import { Preference } from "../models/preference";


export interface City{
    id: number,
    name: string,
}

export interface District{
    id: number,
    name: string,
    city_id: number,
    city_name: string,
}

export interface Profile {
    uid: string,
    target: string,

    username: string,
    firstName: string,
    lastName: string,
    
    gender: string,
    age: string,
    birth: number,
    zodiac: string,
    
    education: string,
    city: City,
    district: District,
    
    photoURL: string,
    profileURL1: string,
    profileURL2: string,
    profileURL3: string,
    profileURL4: string,

    latitude: number,
    longtitude: number,

}

export interface UserProfile {
    uid: string,
    displayName: string,
    photoURL: string,
    profile: Profile

}