#!/usr/bin/env node

import moment from "moment-timezone";
import fetch from "node-fetch";
import minimist from "minimist";

const args = minimist(process.argv.slice(2))

// help text
if (args.h) {
    console.log("Usage: galosh.js [options] -[n|s] LATITUDE -[e|w] LONGITUDE -z TIME_ZONE")
    console.log("    -h            Show this help message and exit.")
    console.log("    -n, -s        Latitude: N positive; S negative.")
    console.log("    -e, -w        Longitude: E positive; W negative.")
    console.log("    -z            Time zone: uses tz.guess() from moment-timezone by default.")
    console.log("    -d 0-6        Day to retrieve weather: 0 is today; defaults to 1.")
    console.log("    -j            Echo pretty JSON from open-meteo API and exit.")
    exit(0)
}

let timezone = moment.tz.guest()
let longitude = 0;
let latitude = 0; 
let day = 1;

// latitude 
if (args.n) {
    latitude = args.n
}
else if (args.s) {
    latitude = -args.s
}
//longitude 
if (args.e) {
    longitude = args.e
}
else if (args.w) {
    longitude = -args.w
}
//timezone
if (args.z) {
    timezone = args.z
}
// day
if (args.d) {
    day = args.d
}

// Make a request
let url = 'https://api.open-meteo.com/v1/forecast?' + 'latitude=' + latitude + '&longitude=' + longitude + "&timezone=" + timezone + "&daily=precipitation_hours"
const response = await fetch(url);

// Get the data from the request
const data = await response.json();

if (args.j) {
    console.log(data)
    exit(0)
}

let precipitation = data.daily.precipitation_hours[day]
let result = ""
if (precipitation > 0) {
    result = "You might need your galoshes "
}
else {
    result = "You probably won't need your galoshes "
}
if (days == 0) {
  result += "today."
} else if (days > 1) {
  result += "in " + days + " days."
} else {
  result += "tomorrow."
}
console.log(result)