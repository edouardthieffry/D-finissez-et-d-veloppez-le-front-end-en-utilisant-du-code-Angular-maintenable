# Olympic Games Dashboard

An Angular application displaying Olympic statistics by country. The dashboard shows the number of countries, the number of editions, and a pie chart of medals. Each country's page displays its statistics and medal history by edition.

## Technologies & Dependencies

- Angular 18
- TypeScript
- RxJS and `HttpClient` for asynchronous data loading
- Chart.js for charts

## Prerequisites

- Node.js and npm

## Installation

1. Clone the repository.
2. Change to the project directory.
3. Install the project dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   ng serve
   ```

5. Open the URL provided by `ng serve` in your browser, for example [http://localhost:4200](http://localhost:4200).

## Development

Run `ng serve` to start the development server, then navigate to [http://localhost:4200](http://localhost:4200). The application automatically reloads when source files change.

## Data

The demo data is stored in [`src/assets/mock/olympic.json`](src/assets/mock/olympic.json). The [`DataOlympicService`](src/app/services/olympic.service.ts) loads it with `HttpClient` and exposes observables for countries, participations, and statistics.

Components consume observables with the `async` pipe. To connect a backend in the future, replace the data URL in the service with the API URL while keeping the methods and types expected by the UI.

## Navigation

- `/`: main dashboard
- `/country/:countryName`: country details, for example `/country/Italy`
- Other routes display the not-found page.

## Code Structure

```text
src/
├── assets/mock/olympic.json     # Demo data
└── app/
    ├── components/              # Header, statistics, charts, and spinner
    ├── models/                  # Data types and chart configuration
    ├── pages/                   # Home, country details, and not-found pages
    ├── services/                # Data loading and calculations
    ├── app-routing.module.ts    # Application routes
    └── app.module.ts            # Application declarations and configuration
```

## Available Commands

```bash
npm start       # Start the Angular development server
npm run build   # Build the application into dist/
npm test        # Run unit tests with Karma
npm run watch   # Rebuild the application whenever files change
```
