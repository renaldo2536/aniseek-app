# AniSeek

AniSeek is a cross-platform application built with Expo that allows users to discover, search, and favorite anime. The app provides a clean and intuitive interface for exploring anime content using the Jikan API.

## Features

- **Anime Discovery**: Browse popular anime with infinite scrolling
- **Search**: Find anime by title
- **Filtering**: Filter anime by multiple genres with search functionality
- **Favorites**: Save and manage favorite anime with persistent storage
- **Detail View**: View comprehensive details about each anime
- **Optimized Performance**: Fast loading and smooth scrolling
- **Offline Support**: Access favorites even without internet connection

## Technologies Used

- **Expo**: For cross-platform development
- **Expo Router**: For navigation and deep linking
- **React Native**: Core framework
- **TypeScript**: For type safety
- **Jotai**: For state management
- **MMKV**: For high-performance local storage
- **TailwindCSS (NativeWind)**: For styling
- **React Query**: For data fetching and caching
- **FlashList**: For virtualized lists with infinite scrolling
- **Reanimated**: For smooth animations
- **Bottom Sheet**: For modal interfaces

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/aniseek-app.git
cd aniseek-app
```

2. Install dependencies:

```bash
yarn install
```

3. Start the development server:

```bash
yarn start
```

4. For development builds

```bash
yarn android
```

## Project Structure

```
aniseek-app/
├── app/                    # Expo Router app directory
│   ├── (tabs)/             # Tab navigation screens
│   │   ├── _layout.tsx     # Tab navigation layout
│   │   ├── explore.tsx     # Discover screen
│   │   ├── search.tsx      # Search screen
│   │   └── favorites.tsx   # Favorites screen
│   ├── anime/              # Anime detail routes
│   │   └── [id].tsx        # Dynamic anime detail page
│   ├── +not-found.tsx      # 404 page
│   ├── index.tsx           # Entry point redirecting to splash
│   └── _layout.tsx         # Root layout with providers
├── assets/                 # Static assets
├── src/                    # Source code
│   ├── api/                # API services
│   │   └── jikanApi.ts     # Jikan API client
│   ├── components/         # Reusable components
│   │   ├── anime/          # Anime-specific components
│   │   ├── ui/             # UI components
│   │   └── AnimeCard.tsx   # Card component for anime items
│   ├── constants/          # App constants
│   │   └── Colors.ts       # Color definitions
│   ├── hooks/              # Custom hooks
│   │   ├── useAnimeData.ts # Data fetching hooks
│   │   └── useFavorites.ts # Favorites management
│   ├── screens/            # Screen components
│   │   ├── AnimeDetail.tsx # Anime detail screen
│   │   ├── AnimeList.tsx   # Main anime list screen
│   │   ├── Favorites.tsx   # Favorites screen
│   │   ├── SearchPage.tsx  # Search screen
│   │   └── Splashscreen.tsx# Splash screen
│   ├── store/              # State management
│   │   ├── atoms.ts        # Jotai atoms
│   │   └── mmkvStorage.ts  # MMKV storage utilities
│   ├── types/              # TypeScript types
│   │   └── anime.ts        # Anime data types
│   └── utils/              # Utility functions
├── __tests__/              # Test files
├── android/                # Android-specific files
├── ios/                    # iOS-specific files
├── babel.config.js         # Babel configuration
├── metro.config.js         # Metro bundler config
├── tailwind.config.js      # Tailwind configuration
├── postcss.config.js       # PostCSS configuration
├── global.css              # Global CSS imports
├── global.d.ts             # TypeScript declarations
└── README.md               # Project documentation
```

## Features in Detail

### Anime Discovery

- Browse popular anime sorted by popularity
- Infinite scroll for seamless browsing
- Pull-to-refresh to get the latest content
- Filter by genre with multi-select capability

### Search

- Search anime by title
- Real-time results as you type
- Debounced input to prevent excessive API calls

### Filtering

- Filter by multiple genres simultaneously
- Search within genres
- Toggle filters on/off easily
- Clear all filters with one tap

### Favorites

- Add/remove anime from favorites with a single tap
- Persistent storage using MMKV
- View all favorites in a dedicated tab
- Favorites work offline

### Detail View

- Comprehensive anime information
- Synopsis, genres, studios, and more
- Rating and aired dates
- Tabbed interface for different content sections

## Color Theme

The app uses a custom color theme:

- Primary: `#3c967b` (Teal)
- Secondary: `#ffffff` (White)
- Dark Background: `#121212`
- Accent Colors: Various complementary colors for UI elements

## Performance Optimizations

- FlashList for efficient list rendering
- Memoization of expensive calculations
- Lazy loading of images
- Debounced search input
- Optimized re-renders with component separation

## Thought and architecture decisions

Decided to go with Expo because it cames with multi-platform support (android, ios, and web). But on this particular project i only enabled android.
Because this project is heavily related to list, i decided to go with FlashList as it is more performant than traditional Flatlist.

## Acknowledgements

- [Jikan API](https://jikan.moe/) for providing anime data
- [Expo](https://expo.dev/) for the development framework
- [React Native](https://reactnative.dev/) for the core platform
- [NativeWind](https://www.nativewind.dev/) for styling
