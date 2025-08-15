import {
  getWeatherCondition,
  getWindDirection,
  formatDate,
  formatTime,
  formatDayOfWeek,
  formatTemperature,
  extractTimeFromISO,
  weatherFacts,
  getRandomWeatherFact
} from '../weatherUtils';

describe('weatherUtils', () => {
  describe('getWeatherCondition', () => {
    it('should return "Clear" for codes 0 and 1', () => {
      expect(getWeatherCondition(0)).toBe('Clear');
      expect(getWeatherCondition(1)).toBe('Clear');
    });

    it('should return "Clouds" for codes 2 and 3', () => {
      expect(getWeatherCondition(2)).toBe('Clouds');
      expect(getWeatherCondition(3)).toBe('Clouds');
    });

    it('should return "Fog" for codes 45 and 48', () => {
      expect(getWeatherCondition(45)).toBe('Fog');
      expect(getWeatherCondition(48)).toBe('Fog');
    });

    it('should return "Drizzle" for codes 51-57', () => {
      expect(getWeatherCondition(51)).toBe('Drizzle');
      expect(getWeatherCondition(55)).toBe('Drizzle');
      expect(getWeatherCondition(57)).toBe('Drizzle');
    });

    it('should return "Rain" for codes 61-67', () => {
      expect(getWeatherCondition(61)).toBe('Rain');
      expect(getWeatherCondition(65)).toBe('Rain');
      expect(getWeatherCondition(67)).toBe('Rain');
    });

    it('should return "Snow" for codes 71-77', () => {
      expect(getWeatherCondition(71)).toBe('Snow');
      expect(getWeatherCondition(75)).toBe('Snow');
      expect(getWeatherCondition(77)).toBe('Snow');
    });

    it('should return "Rain showers" for codes 80-82', () => {
      expect(getWeatherCondition(80)).toBe('Rain showers');
      expect(getWeatherCondition(81)).toBe('Rain showers');
      expect(getWeatherCondition(82)).toBe('Rain showers');
    });

    it('should return "Snow showers" for codes 85-86', () => {
      expect(getWeatherCondition(85)).toBe('Snow showers');
      expect(getWeatherCondition(86)).toBe('Snow showers');
    });

    it('should return "Thunderstorm" for codes >= 95', () => {
      expect(getWeatherCondition(95)).toBe('Thunderstorm');
      expect(getWeatherCondition(99)).toBe('Thunderstorm');
    });

    it('should return "default" for unknown codes', () => {
      expect(getWeatherCondition(94)).toBe('default');
      expect(getWeatherCondition(-1)).toBe('default');
    });
  });

  describe('getWindDirection', () => {
    it('should return correct wind directions', () => {
      expect(getWindDirection(0)).toBe('N');
      expect(getWindDirection(45)).toBe('NE');
      expect(getWindDirection(90)).toBe('E');
      expect(getWindDirection(135)).toBe('SE');
      expect(getWindDirection(180)).toBe('S');
      expect(getWindDirection(225)).toBe('SW');
      expect(getWindDirection(270)).toBe('W');
      expect(getWindDirection(315)).toBe('NW');
    });

    it('should handle edge cases', () => {
      expect(getWindDirection(22)).toBe('N');
      expect(getWindDirection(67)).toBe('NE');
      expect(getWindDirection(112)).toBe('E');
      expect(getWindDirection(157)).toBe('SE');
      expect(getWindDirection(202)).toBe('S');
      expect(getWindDirection(247)).toBe('SW');
      expect(getWindDirection(292)).toBe('W');
      expect(getWindDirection(337)).toBe('NW');
    });

    it('should handle degrees > 360', () => {
      expect(getWindDirection(360)).toBe('N');
      expect(getWindDirection(405)).toBe('NE');
      expect(getWindDirection(450)).toBe('E');
    });
  });

  describe('formatDate', () => {
    it('should format date correctly', () => {
      const date = new Date('2024-01-15T12:00:00Z');
      const result = formatDate(date);
      expect(typeof result).toBe('string');
      expect(result.length).toBeGreaterThan(0);
    });

    it('should handle different dates', () => {
      const date1 = new Date('2024-12-25T12:00:00Z');
      const result1 = formatDate(date1);
      expect(typeof result1).toBe('string');
      expect(result1.length).toBeGreaterThan(0);

      const date2 = new Date('2024-03-03T12:00:00Z');
      const result2 = formatDate(date2);
      expect(typeof result2).toBe('string');
      expect(result2.length).toBeGreaterThan(0);
    });
  });

  describe('formatTime', () => {
    it('should format time correctly', () => {
      const date = new Date('2024-01-15T14:30:00Z');
      const result = formatTime(date);
      expect(typeof result).toBe('string');
      expect(result.length).toBeGreaterThan(0);
    });

    it('should handle different times', () => {
      const date1 = new Date('2024-01-15T09:15:00Z');
      const result1 = formatTime(date1);
      expect(typeof result1).toBe('string');
      expect(result1.length).toBeGreaterThan(0);

      const date2 = new Date('2024-01-15T23:45:00Z');
      const result2 = formatTime(date2);
      expect(typeof result2).toBe('string');
      expect(result2.length).toBeGreaterThan(0);
    });
  });

  describe('formatDayOfWeek', () => {
    it('should format day of week correctly', () => {
      expect(formatDayOfWeek('2024-01-15')).toBe('Mon');
      expect(formatDayOfWeek('2024-01-16')).toBe('Tue');
      expect(formatDayOfWeek('2024-01-17')).toBe('Wed');
      expect(formatDayOfWeek('2024-01-18')).toBe('Thu');
      expect(formatDayOfWeek('2024-01-19')).toBe('Fri');
      expect(formatDayOfWeek('2024-01-20')).toBe('Sat');
      expect(formatDayOfWeek('2024-01-21')).toBe('Sun');
    });
  });

  describe('formatTemperature', () => {
    it('should format temperature correctly', () => {
      expect(formatTemperature(25.7)).toBe('26°C');
      expect(formatTemperature(-5.2)).toBe('-5°C');
      expect(formatTemperature(0)).toBe('0°C');
      expect(formatTemperature(100.9)).toBe('101°C');
    });
  });

  describe('extractTimeFromISO', () => {
    it('should extract time from ISO string', () => {
      expect(extractTimeFromISO('2024-01-15T14:30:00Z')).toBe('14:30:00Z');
      expect(extractTimeFromISO('2024-01-15T09:15:30.123Z')).toBe('09:15:30.123Z');
    });

    it('should handle invalid ISO strings', () => {
      expect(extractTimeFromISO('invalid')).toBe('');
      expect(extractTimeFromISO('')).toBe('');
      expect(extractTimeFromISO('2024-01-15')).toBe('');
    });
  });

  describe('weatherFacts', () => {
    it('should contain weather facts', () => {
      expect(Array.isArray(weatherFacts)).toBe(true);
      expect(weatherFacts.length).toBeGreaterThan(0);
      
      weatherFacts.forEach(fact => {
        expect(typeof fact).toBe('string');
        expect(fact.length).toBeGreaterThan(0);
      });
    });
  });

  describe('getRandomWeatherFact', () => {
    it('should return a random fact from the array', () => {
      const fact = getRandomWeatherFact();
      expect(typeof fact).toBe('string');
      expect(fact.length).toBeGreaterThan(0);
      expect(weatherFacts).toContain(fact);
    });

    it('should return different facts on multiple calls', () => {
      const facts = new Set();
      for (let i = 0; i < 10; i++) {
        facts.add(getRandomWeatherFact());
      }
      // With 10 calls, we should get at least 2 different facts (unless very unlucky)
      expect(facts.size).toBeGreaterThan(1);
    });
  });
});
