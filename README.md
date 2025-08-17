# 🌤️ Modern Weather App

A beautiful, responsive weather application built with React, TypeScript, and Tailwind CSS. Get real-time weather information for any location with a modern, intuitive interface.

<img width="1920" height="1140" alt="image" src="https://github.com/user-attachments/assets/05388b1d-1c83-4e34-b54e-5d4370a493eb" />

<img width="1920" height="1140" alt="image" src="https://github.com/user-attachments/assets/994d5669-d214-439f-b3eb-859717eba5c1" />


## ✨ Features

- **🌍 Real-time Weather Data**: Get current weather conditions and forecasts
- **📍 Location Search**: Search for any city with autocomplete suggestions
- **📱 Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **🎯 Current Location**: Get weather for your current location with one click
- **📊 6-Day Forecast**: Extended weather predictions
- **🎨 Dynamic Backgrounds**: Background changes based on weather conditions
- **🔔 Smart Notifications**: User-friendly snackbar notifications
- **⚡ Fast & Lightweight**: Built with modern web technologies

## 🚀 Live Demo

[View Live Demo]
https://sandeepkumarweatherapp.netlify.app/

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Date Handling**: Moment.js
- **Routing**: React Router DOM
- **Testing**: Jest + React Testing Library
- **Build Tool**: Vite
- **Weather API**: Open-Meteo (Free, no API key required)

## 📋 Prerequisites

Before running this project, make sure you have:

- **Node.js** (v16 or higher)
- **npm** or **yarn** package manager
- Modern web browser

## 🏗️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/modern-weather-app.git
cd modern-weather-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### 4. Build for Production

```bash
npm run build
```

### 5. Preview Production Build

```bash
npm run preview
```

## 🧪 Testing

### Run Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

### Test Coverage

- **Hooks**: 40.18% coverage
- **Utils**: 100% coverage
- **Components**: 4.98% coverage
- **API**: 18.18% coverage

## 🌐 API Documentation

### Weather API (Open-Meteo)

The app uses the [Open-Meteo API](https://open-meteo.com/) - a free weather API that doesn't require authentication.

#### Endpoints Used

1. **Weather Data**: `https://api.open-meteo.com/v1/forecast`
   - **Method**: GET
   - **Parameters**:
     - `latitude`: Location latitude
     - `longitude`: Location longitude
     - `current_weather`: true
     - `hourly`: temperature_2m,apparent_temperature,relativehumidity_2m,precipitation_probability
     - `daily`: temperature_2m_max,weathercode,sunrise,sunset
     - `timezone`: auto

2. **Location Search**: `https://geocoding-api.open-meteo.com/v1/search`
   - **Method**: GET
   - **Parameters**:
     - `name`: Search query
     - `count`: Number of results (max 10)
     - `language`: en
     - `format`: json

#### API Response Examples

**Weather Data Response:**
```json
{
  "current_weather": {
    "temperature": 25.7,
    "windspeed": 12.5,
    "winddirection": 180,
    "weathercode": 0,
    "time": "2024-01-15T12:00:00Z"
  },
  "daily": {
    "time": ["2024-01-15", "2024-01-16"],
    "temperature_2m_max": [26, 28],
    "temperature_2m_min": [15, 17],
    "weathercode": [0, 1],
    "sunrise": ["2024-01-15T06:30:00Z"],
    "sunset": ["2024-01-15T18:00:00Z"]
  },
  "hourly": {
    "time": ["2024-01-15T12:00:00Z"],
    "temperature_2m": [25.7],
    "apparent_temperature": [26.2],
    "relativehumidity_2m": [65],
    "precipitation_probability": [10]
  }
}
```

**Location Search Response:**
```json
{
  "results": [
    {
      "id": 1,
      "name": "New York",
      "latitude": 40.7128,
      "longitude": -74.0060,
      "country": "United States",
      "country_code": "US",
      "admin1": "New York"
    }
  ]
}
```

### Weather Codes

The API uses WMO (World Meteorological Organization) weather codes:

| Code | Description | App Display |
|------|-------------|-------------|
| 0-1  | Clear sky | Clear |
| 2-3  | Partly cloudy | Clouds |
| 45-48| Fog | Fog |
| 51-57| Drizzle | Drizzle |
| 61-67| Rain | Rain |
| 71-77| Snow | Snow |
| 80-82| Rain showers | Rain showers |
| 85-86| Snow showers | Snow showers |
| 95+  | Thunderstorm | Thunderstorm |

## 🎯 Use Cases

### 1. **Personal Weather Monitoring**
- Check current weather conditions
- Plan outdoor activities based on forecasts
- Monitor temperature trends

### 2. **Travel Planning**
- Research weather at destination
- Pack appropriate clothing
- Plan travel dates based on weather

### 3. **Business Applications**
- Event planning and scheduling
- Agricultural planning
- Construction project management
- Tourism industry applications

### 4. **Educational Purposes**
- Weather data visualization
- Climate studies
- Geography education

### 5. **Mobile-First Experience**
- On-the-go weather checking
- Location-based weather alerts
- Quick weather updates

## 🎨 Key Components

### **WeatherCard**
Displays current weather information including temperature, wind, humidity, and weather condition.

### **ForecastCard**
Shows 6-day weather forecast with daily high/low temperatures and weather conditions.

### **SearchInputWithAutocomplete**
Provides location search with real-time suggestions and weather data fetching.

### **BackgroundLayout**
Dynamically changes background images based on current weather conditions.

### **Snackbar**
Provides user feedback for actions, errors, and notifications.

## 🔧 Customization

### **Styling**
The app uses Tailwind CSS for styling. You can customize:
- Colors in `tailwind.config.js`
- Component styles in individual `.tsx` files
- Global styles in `src/index.css`

### **Weather Icons**
Icons are provided by Lucide React. You can:
- Replace icons in components
- Add new weather conditions
- Customize icon sizes and colors

### **API Configuration**
To use a different weather API:
1. Update `src/api/weatherApi.ts`
2. Modify data transformation in `src/utils/weatherUtils.ts`
3. Update TypeScript types in `src/types/weather.ts`

## 🚀 Deployment . Already deployed in Netlify

### **Netlify**
1. Build the project: `npm run build`
2. Upload the `dist` folder to Netlify
3. Configure build settings if needed


## 🙏 Acknowledgments

- [Open-Meteo](https://open-meteo.com/) for providing free weather data
- [Lucide React](https://lucide.dev/) for beautiful icons
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- [React](https://reactjs.org/) for the amazing framework

## 📞 Support

If you have any questions or need help:

- Create an issue on GitHub
- Email: sandeepkumar.ramesh16@gmail.com

---

**Made with ❤️ by Sandeepkumar Ramesh**
