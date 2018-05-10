import  { Preference } from "../models/preference";

export interface Profile {
target: string;
username: string;
firstName: string;
lastName: string;
gender: string;
age: string;
birth: number;
education: string;
city: string;

pref: Preference;

}