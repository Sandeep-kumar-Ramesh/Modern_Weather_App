import moment from 'moment';

// Weather condition mapping
export const getWeatherCondition = (code: number): string => {
  if (code === 0 || code === 1) return "Clear";
  if (code === 2 || code === 3) return "Clouds";
  if (code === 45 || code === 48) return "Fog";
  if (code >= 51 && code <= 57) return "Drizzle";
  if (code >= 61 && code <= 67) return "Rain";
  if (code >= 71 && code <= 77) return "Snow";
  if (code >= 80 && code <= 82) return "Rain showers";
  if (code >= 85 && code <= 86) return "Snow showers";
  if (code >= 95) return "Thunderstorm";
  return "default";
};

// Wind direction conversion
export const getWindDirection = (degree: number): string => {
  const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  return directions[Math.round(degree / 45) % 8];
};

// Date formatting
export const formatDate = (date: Date): string => {
  return moment(date).format("ddd, MMM Do");
};

export const formatTime = (date: Date): string => {
  return moment(date).format("h:mm A");
};

export const formatDayOfWeek = (date: string): string => {
  return new Date(date).toLocaleDateString("en-US", { weekday: "short" });
};

// Temperature formatting
export const formatTemperature = (temp: number): string => {
  return `${Math.round(temp)}°C`;
};

// Time extraction from ISO string
export const extractTimeFromISO = (isoString: string): string => {
  return isoString.split("T")[1] || '';
};

// Weather facts
export const weatherFacts = [
  "The highest temperature ever recorded on Earth was 56.7°C (134°F) in Death Valley, California, on July 10, 1913.",
  "The lowest temperature ever recorded was -89.2°C (-128.6°F) at Vostok Station in Antarctica on July 21, 1983.",
  "A single thunderstorm can hold up to 1 billion gallons of water.",
  "The fastest recorded wind speed on Earth was 408 km/h (253 mph) during Hurricane Olivia in 1996.",
  "Lightning can heat the air to 30,000°C (54,000°F), which is five times hotter than the surface of the sun.",
  "The heaviest hailstone ever recorded weighed 1.02 kg (2.25 lbs) and fell in Bangladesh in 1986.",
  "The world's largest snowflake on record was 38 cm (15 inches) wide and 20 cm (8 inches) thick.",
  "The average raindrop falls at about 22.5 km/h (14 mph).",
  "Tornadoes can occur on every continent except Antarctica.",
  "Some deserts receive less than 25 mm (1 inch) of rain per year.",
];

export const getRandomWeatherFact = (): string => {
  return weatherFacts[Math.floor(Math.random() * weatherFacts.length)];
};

