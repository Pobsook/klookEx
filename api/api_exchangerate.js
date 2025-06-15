import { useEffect, useState } from "react";

const useExchangeRates = () => {
  const [rates, setRates] = useState({});

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const res = await fetch("https://api.frankfurter.app/latest?from=USD");
        const data = await res.json();
        setRates(data.rates);
      } catch (error) {
        console.error("Failed to fetch exchange rates:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRates();

    // Auto-refresh every 5 minutes (optional)
    const interval = setInterval(fetchRates, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return rates ;
};

export default useExchangeRates;
