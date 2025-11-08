# Stock Price Polling Implementation

## Overview

The frontend automatically fetches real-time stock prices **directly from Yahoo Finance API** every 5 minutes for all stocks in the user's watchlist. No backend required!

## Architecture

### 1. **Stock Service** (`src/services/stock.service.ts`)

Directly calls Yahoo Finance public API to fetch real-time stock prices.

```typescript
// Fetch prices for multiple stocks
const prices = await stockService.getPrices(["AAPL", "MSFT", "GOOGL"]);

// Fetch price for a single stock
const price = await stockService.getPrice("AAPL");
```

**Yahoo Finance API Endpoint Used:**

- `https://query1.finance.yahoo.com/v8/finance/chart/{ticker}?interval=1d&range=1d`

**Data Retrieved:**

- Current price (regularMarketPrice)
- Previous close
- Price change (calculated)
- Change percentage (calculated)
- Volume
- Market cap

### 2. **Watchlist Store** (`src/store/useWatchlistStore.ts`)

Enhanced with price data management:

```typescript
interface WatchlistState {
  stockPrices: Record<string, StockPriceData>; // ticker -> price data
  isPricesLoading: boolean;
  lastPriceUpdate: string | null;
  fetchStockPrices: () => Promise<void>;
}
```

**Features:**

- Stores prices in a key-value map for O(1) lookup
- Tracks loading state separately from watchlist loading
- Records timestamp of last price update
- Automatically fetches prices after watchlist is loaded

### 3. **Polling Hook** (`src/hooks/useStockPricePolling.ts`)

Custom hook that manages the 5-minute polling interval:

```typescript
const { refresh } = useStockPricePolling();
```

**Features:**

- ✅ Fetches prices immediately on mount
- ✅ Sets up 5-minute interval (300,000ms)
- ✅ Automatically cleans up interval on unmount
- ✅ Only polls if watchlist exists
- ✅ Logs to console on each fetch
- ✅ Provides manual refresh function

### 4. **WatchlistCard Component**

Displays real-time stock prices with:

- Current price
- Price change (absolute)
- Price change (percentage)
- Color-coded: green for gains, red for losses
- Manual refresh button with spinning animation
- Last update timestamp
- Loading state per stock

## Data Flow

```
Dashboard Mount
    ↓
fetchWatchlist() → Backend API
    ↓
watchlist data received
    ↓
fetchStockPrices() → Yahoo Finance API (Direct)
    ↓
prices stored in state
    ↓
useStockPricePolling() starts 5-min interval
    ↓
Every 5 minutes: fetchStockPrices() → Yahoo Finance API (Direct)
    ↓
UI updates automatically (Zustand)
```

## Usage

### In Dashboard (Already Set Up)

```typescript
import { useStockPricePolling } from "../hooks/useStockPricePolling";

const Dashboard: React.FC = () => {
  useStockPricePolling(); // Starts automatic polling

  // ... rest of component
};
```

### Access Price Data Anywhere

```typescript
import { useWatchlistStore } from "../store";

const MyComponent = () => {
  const stockPrices = useWatchlistStore((state) => state.stockPrices);

  // Get price for a specific ticker
  const aaplPrice = stockPrices["AAPL"];

  if (aaplPrice) {
    console.log(`AAPL: $${aaplPrice.price}`);
    console.log(`Change: ${aaplPrice.change} (${aaplPrice.changePercent}%)`);
  }
};
```

### Manual Refresh

```typescript
const fetchStockPrices = useWatchlistStore((state) => state.fetchStockPrices);

// Trigger immediate price update
const handleRefresh = () => {
  fetchStockPrices();
};
```

## Yahoo Finance API Integration

### How It Works

The frontend makes direct HTTP requests to Yahoo Finance's public API:

```
https://query1.finance.yahoo.com/v8/finance/chart/{TICKER}?interval=1d&range=1d
```

### Example Response

Yahoo Finance returns data in this format:

```json
{
  "chart": {
    "result": [{
      "meta": {
        "regularMarketPrice": 178.52,
        "chartPreviousClose": 176.18,
        "marketCap": 2847392847392,
        "currency": "USD",
        "symbol": "AAPL"
      },
      "indicators": {
        "quote": [{
          "volume": [52847392, ...]
        }]
      }
    }]
  }
}
```

### Data Extraction

The service calculates:

- **Price**: `meta.regularMarketPrice`
- **Change**: `currentPrice - previousClose`
- **Change %**: `(change / previousClose) * 100`
- **Volume**: Latest volume from indicators
- **Market Cap**: `meta.marketCap`

### No Backend Required! 🎉

Stock prices are fetched directly from Yahoo Finance's public API, eliminating the need for a backend proxy service.

## Configuration

### Change Polling Interval

Edit `src/hooks/useStockPricePolling.ts`:

```typescript
// Change from 5 minutes to 1 minute
const POLLING_INTERVAL = 1 * 60 * 1000;

// Change to 10 minutes
const POLLING_INTERVAL = 10 * 60 * 1000;
```

### Disable Automatic Polling

Simply remove the hook from Dashboard:

```typescript
// Remove this line:
useStockPricePolling();
```

You can still manually refresh using the refresh button in WatchlistCard.

## Error Handling

- Price fetch errors are logged to console but don't disrupt UI
- If prices fail to load, stocks show "Loading..." text
- Previous prices remain visible until new data arrives
- Watchlist errors are displayed prominently to the user

## Performance Optimizations

1. **Selective Re-renders:** Components only subscribe to the specific state they need
2. **Batch Updates:** Zustand batches all price updates in a single render
3. **Conditional Polling:** Only polls when watchlist exists and has stocks
4. **Cleanup:** Intervals are properly cleared on unmount to prevent memory leaks
5. **Optimistic Loading:** Shows previous prices while fetching new ones

## Testing

### Test Manual Refresh

1. Open Dashboard
2. Click refresh icon in WatchlistCard header
3. Icon should spin during loading
4. Prices should update

### Test Auto Polling

1. Open Dashboard
2. Open browser console
3. Wait 5 minutes
4. Should see: "Fetching stock prices... [timestamp]"
5. Prices should update automatically

### Test Multiple Tabs

1. Open Dashboard in two browser tabs
2. Each tab polls independently
3. State is synced via localStorage (persisted store)

## Troubleshooting

### Prices not updating?

- Check browser console for errors
- Verify backend API endpoints are working
- Check that `VITE_API_URL` env variable is set correctly

### Interval not working?

- Ensure Dashboard component is mounted
- Check that watchlist has stocks
- Look for console logs every 5 minutes

### Wrong prices displayed?

- Verify backend is calling Yahoo Finance API correctly
- Check ticker symbols match exactly (case-sensitive)
- Ensure backend returns proper response format
