# Turf Booking App - KIXAR Internship Assignment

A React Native mobile application for browsing and booking turf facilities, built with Expo, TypeScript, and NativeWind (Tailwind CSS).

## Features

- **Turf Details Screen**: Browse turf information with carousel images, ratings, amenities, sports availability, reviews, and map preview
- **Booking Flow**: Select date, time period, court, and player count with real-time validation
- **My Bookings**: View all saved bookings with persistent storage using AsyncStorage
- **State Management**: Context API for global booking state
- **Responsive UI**: Built with NativeWind (Tailwind CSS) for consistent styling

## Tech Stack

- **React Native** with Expo SDK 54
- **TypeScript** for type safety
- **Expo Router** for file-based navigation
- **NativeWind 4.2.1** (Tailwind CSS for React Native)
- **Context API** for state management
- **AsyncStorage** for data persistence
- **React Hooks** only (functional components)

## Project Structure

```
├── app/
│   ├── (tabs)/
│   │   ├── _layout.tsx          # Tab navigation layout
│   │   ├── index.tsx             # Turf Details screen
│   │   └── mybookings.tsx        # My Bookings screen
│   ├── _layout.tsx               # Root layout with providers
│   └── booking.tsx               # Booking flow screen
├── context/
│   └── BookingContext.tsx        # Global booking state management
├── data/
│   └── turfData.json             # Static turf data
├── assets/
│   └── images/                   # App images and icons
├── globals.css                   # Tailwind directives
├── tailwind.config.js            # Tailwind configuration
├── metro.config.js               # Metro bundler config
└── babel.config.js               # Babel configuration
```

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo Go app on your mobile device (for testing)

### Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd KIXAR_Assignment
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npx expo start
```

4. Run on your device:
   - Scan the QR code with Expo Go app (Android)
   - Scan with Camera app (iOS) and open in Expo Go

### Build for Production

```bash
# For Android
npx expo build:android

# For iOS
npx expo build:ios
```

## Usage

1. **Browse Turf Details**: View turf information, amenities, and reviews on the home screen
2. **Book a Slot**: Tap "Book Now" to select date, time, court, and players
3. **Confirm Booking**: Tap "Next" (enabled only when all required fields are selected)
4. **View Bookings**: Navigate to "My Bookings" tab to see all confirmed bookings
5. **Delete Booking**: Tap the trash icon on any booking to remove it

## Assumptions

1. **Static Data**: All turf details are static JSON data (no backend API)
2. **Single Turf**: App focuses on booking a single turf venue
3. **Date Format**: Dates are displayed as "DD MMM YYYY" format
4. **Time Slots**: Time slots are pre-defined and not dynamically loaded
5. **Court Availability**: All courts are assumed available for selected slots
6. **Booking ID**: Generated using timestamp for uniqueness
7. **No Authentication**: User authentication is not implemented
8. **Map Preview**: Map is a static placeholder (no actual map integration)

## Time Spent

**Total: ~6 hours**

- Initial setup with Expo Router and TypeScript: 1 hour
- NativeWind configuration and debugging: 1.5 hours
- UI implementation (all 3 screens): 2 hours
- Context API and AsyncStorage integration: 1 hour
- Conversion from StyleSheet to Tailwind: 1 hour
- Testing and bug fixes: 30 minutes

## Known Issues

1. **Map Integration**: Map preview is a placeholder image, not an interactive map
2. **Date Picker**: Dates are hardcoded, not using a calendar picker
3. **Time Period Logic**: Switching time periods doesn't update available slots dynamically
4. **No Edit Booking**: Bookings can only be deleted, not edited
5. **Minimal Error Handling**: No error boundaries or comprehensive error handling

## Pending Improvements

### High Priority

- Integrate actual map with react-native-maps
- Add date picker component for flexible date selection
- Implement edit booking functionality
- Add confirmation dialogs before deleting bookings
- Dynamic time slot availability based on selected period

### Medium Priority

- Add animations and transitions (Reanimated)
- Implement search/filter on My Bookings
- Add booking confirmation screen with summary
- Loading states and skeleton screens
- Error boundaries and better error handling

### Low Priority

- Dark mode support
- Share booking feature
- Calendar view for bookings
- Push notifications for upcoming bookings
- Multi-language support
- Payment integration (mock)

## Code Quality Highlights

- **TypeScript**: Full type safety with interfaces for all data structures
- **Clean Architecture**: Separated concerns (screens, context, data)
- **Reusable Patterns**: Consistent Tailwind classes and component structure
- **State Management**: Centralized booking state with Context API
- **Persistence**: AsyncStorage integration with error handling
- **Navigation**: Type-safe routing with Expo Router
- **Code Style**: Consistent formatting and naming conventions

## Dependencies

### Main Dependencies

```json
{
  "expo": "~54.0.25",
  "react": "19.0.0",
  "react-native": "0.78.3",
  "expo-router": "~5.0.20",
  "nativewind": "^4.2.1",
  "react-native-reanimated": "~4.1.1",
  "react-native-safe-area-context": "~5.6.0",
  "@react-native-async-storage/async-storage": "^2.1.0",
  "@expo/vector-icons": "^15.0.3"
}
```

### Dev Dependencies

```json
{
  "typescript": "~5.7.2",
  "tailwindcss": "^3.4.18",
  "@types/react": "~19.0.2"
}
```

## License

This project is created for the KIXAR internship assignment.

---

**Built with ❤️ using React Native, Expo, and NativeWind**
