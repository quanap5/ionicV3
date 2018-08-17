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
    coin: number,
    beviewed: number,
    beliked: number,

    username: string,
    firstName: string,
    lastName: string,
    introduction1: string,
    introduction2: string,
    
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
    noPhoto: number,

    latitude: number,
    longtitude: number,

    job: string,
    studyExperience: string,
    balance: string,
    salary: string,

    style: string,
    fashionStyle: string,
    appearance: string,

    height: number,
    weight: number,

    smoking: string,
    smoking_frequency: string,

    drinking: string,
    drinking_style: string,

    blood: string,
    religion: string,
    car: string,

    characteristic: string,
    hobby: string,
    favoriteFood: string,

    son: number,
    daughter: number,

    parents: string,
    divorce: string,

    when_marriage: string





    

}

export interface Report{
    femaleUser: number,
    maleUser: number,
    matchedUser: number,
    sumUser: number
}

export interface UserProfile {
    uid: string,
    displayName: string,
    photoURL: string,
    profile: Profile

}