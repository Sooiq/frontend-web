// TradingViewWidget.jsx
import { useEffect, useRef, memo } from "react";

interface TradingViewWidgetProps {
  readonly ticker?: string;
  readonly exchange?: string;
}

function TradingViewWidget({
  ticker = "AAPL",
  exchange = "NASDAQ",
}: TradingViewWidgetProps) {
  const container = useRef<HTMLDivElement>(null);
  const symbol = `${exchange}:${ticker}`;
  console.log(symbol);

  useEffect(() => {
    const currentContainer = container.current;
    if (!currentContainer) return;

    // Clear any existing content
    currentContainer.innerHTML = "";

    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = `
        {
          "symbol": "${symbol}",
          "chartOnly": false,
          "dateRange": "12M",
          "noTimeScale": false,
          "colorTheme": "dark",
          "isTransparent": false,
          "locale": "en",
          "width": "100%",
          "autosize": true,
          "height": "100%"
        }`;
    currentContainer.appendChild(script);

    // Cleanup
    return () => {
      if (currentContainer) {
        currentContainer.innerHTML = "";
      }
    };
  }, [symbol]);

  return (
    <div className="tradingview-widget-container" ref={container}>
      <div className="tradingview-widget-container__widget"></div>
      <div className="tradingview-widget-copyright">
        <a
          href={`https://www.tradingview.com/symbols/${exchange}:${ticker}/`}
          rel="noopener nofollow"
          target="_blank"
        >
          <span className="blue-text">{ticker} stock price</span>
        </a>
        <span className="trademark"> by TradingView</span>
      </div>
    </div>
  );
}

export default memo(TradingViewWidget);
