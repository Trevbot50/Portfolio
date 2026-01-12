import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import * as SunCalc from "suncalc";

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const determineThemeByTime = () => {
      // Try to get user's location
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            const now = new Date();
            
            // Calculate sunrise and sunset times for the user's location
            const times = SunCalc.getTimes(now, latitude, longitude);
            const sunrise = times.sunrise;
            const sunset = times.sunset;
            
            // Determine if it's daytime or nighttime
            const isDaytime = now >= sunrise && now <= sunset;
            const shouldBeDark = !isDaytime;
            
            setIsDark(shouldBeDark);
            if (shouldBeDark) {
              document.documentElement.classList.add("dark");
            } else {
              document.documentElement.classList.remove("dark");
            }
          },
          (error) => {
            // Fallback: use simple time-based logic (6 AM - 6 PM)
            console.log("Geolocation not available, using fallback", error);
            useFallbackTimeCheck();
          }
        );
      } else {
        // Fallback: use simple time-based logic
        useFallbackTimeCheck();
      }
    };

    const useFallbackTimeCheck = () => {
      const now = new Date();
      const hour = now.getHours();
      
      // Light mode: 6 AM - 6 PM (6:00 - 18:00)
      // Dark mode: 6 PM - 6 AM (18:00 - 6:00)
      const shouldBeDark = hour < 6 || hour >= 18;
      
      setIsDark(shouldBeDark);
      if (shouldBeDark) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    };

    determineThemeByTime();
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);

    if (newIsDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-10 h-10 rounded-lg bg-foreground text-background opacity-50 hover:opacity-100 hover:scale-110 transition-all shadow-lg"
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Moon className="h-4 w-4" />
      ) : (
        <Sun className="h-4 w-4" />
      )}
    </button>
  );
}

export default ThemeToggle;