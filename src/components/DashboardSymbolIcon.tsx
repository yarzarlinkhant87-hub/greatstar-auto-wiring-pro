import React from 'react';
import { LightSeverity } from '../data/dashboardLightsData';

interface DashboardSymbolIconProps {
  symbolKey: string;
  severity: LightSeverity;
  size?: number; // size in px, default 40
  className?: string;
}

export const DashboardSymbolIcon: React.FC<DashboardSymbolIconProps> = ({
  symbolKey,
  severity,
  size = 40,
  className = '',
}) => {
  const getColorHex = () => {
    switch (severity) {
      case 'red':
        return '#ef4444'; // Red-500
      case 'yellow':
        return '#f59e0b'; // Amber-500
      case 'green':
        return '#10b981'; // Emerald-500
      case 'blue':
        return '#38bdf8'; // Sky-400
      default:
        return '#fbbf24';
    }
  };

  const color = getColorHex();

  // Specific high-fidelity automotive SVGs
  switch (symbolKey) {
    // 1. ENGINE OIL PRESSURE (Dripping Oil Can)
    case 'oil-pressure':
    case 'oil-pressure-red':
      return (
        <svg viewBox="0 0 48 48" width={size} height={size} className={className} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          {/* Spout */}
          <path d="M 8,24 L 2,21 L 2,24 L 8,27" />
          {/* Can Body */}
          <path d="M 8,24 L 14,24 L 16,16 L 36,16 L 40,24 L 40,34 L 12,34 L 8,24 Z" />
          {/* Handle */}
          <path d="M 32,16 C 32,8 44,10 44,20 L 40,24" />
          {/* Dripping Drop */}
          <path d="M 3,29 C 3,29 1,32 1,33 C 1,34.1 1.9,35 3,35 C 4.1,35 5,34.1 5,33 C 5,32 3,29 3,29 Z" fill={color} stroke="none" />
        </svg>
      );

    // 2. OIL LEVEL LOW (Oil can with waves below)
    case 'oil-level-low':
      return (
        <svg viewBox="0 0 48 48" width={size} height={size} className={className} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M 10,20 L 14,20 L 16,14 L 34,14 L 38,20 L 38,28 L 12,28 L 10,20 Z" />
          <path d="M 30,14 C 30,8 40,10 40,18 L 38,20" />
          <path d="M 6,18 L 2,16 L 2,18 L 6,20" />
          {/* Waves */}
          <path d="M 6,34 C 10,32 14,36 18,34 C 22,32 26,36 30,34 C 34,32 38,36 42,34" />
          <path d="M 6,38 C 10,36 14,40 18,38 C 22,36 26,40 30,38 C 34,36 38,40 42,38" />
        </svg>
      );

    // 3. BATTERY (Rectangular casing with + and - terminals)
    case 'battery':
    case 'battery-charge-red':
      return (
        <svg viewBox="0 0 48 48" width={size} height={size} className={className} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          {/* Battery Body */}
          <rect x="6" y="16" width="36" height="24" rx="3" />
          {/* Negative Post */}
          <rect x="11" y="11" width="8" height="5" rx="1" fill={color} />
          {/* Positive Post */}
          <rect x="29" y="11" width="8" height="5" rx="1" fill={color} />
          {/* Minus Sign */}
          <line x1="12" y1="28" x2="18" y2="28" strokeWidth="3" />
          {/* Plus Sign */}
          <line x1="30" y1="28" x2="36" y2="28" strokeWidth="3" />
          <line x1="33" y1="25" x2="33" y2="31" strokeWidth="3" />
        </svg>
      );

    // 4. CHECK ENGINE / MIL (Engine block outline)
    case 'check-engine':
    case 'check-engine-yellow':
      return (
        <svg viewBox="0 0 48 48" width={size} height={size} className={className} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          {/* Engine block outline */}
          <path d="M 12,18 L 12,12 L 20,12 L 20,16 L 30,16 L 30,12 L 36,12 L 36,18 L 42,22 L 42,34 L 38,34 L 38,38 L 14,38 L 14,34 L 6,34 L 6,24 L 12,18 Z" />
          {/* Front Pulley */}
          <circle cx="2" cy="29" r="1.5" fill={color} />
          <line x1="2" y1="26" x2="6" y2="26" />
          <line x1="2" y1="32" x2="6" y2="32" />
          {/* Intake / Air filter */}
          <path d="M 23,22 L 27,22 L 27,28 L 23,28 Z" fill={color} opacity="0.3" />
        </svg>
      );

    // 5. COOLANT TEMPERATURE (Thermometer in waves)
    case 'coolant-temp-red':
    case 'coolant-cold-blue':
      return (
        <svg viewBox="0 0 48 48" width={size} height={size} className={className} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          {/* Thermometer stem & bulb */}
          <path d="M 22,8 L 26,8 L 26,23 C 28.5,24.5 30,27.1 30,30 C 30,33.3 27.3,36 24,36 C 20.7,36 18,33.3 18,30 C 18,27.1 19.5,24.5 22,23 Z" />
          <circle cx="24" cy="30" r="3" fill={color} stroke="none" />
          <line x1="24" y1="16" x2="24" y2="30" strokeWidth="2" />
          {/* Temp Ticks */}
          <line x1="27" y1="11" x2="31" y2="11" />
          <line x1="27" y1="16" x2="31" y2="16" />
          <line x1="27" y1="21" x2="31" y2="21" />
          {/* Liquid Waves */}
          <path d="M 6,39 C 10,37 14,41 18,39 C 22,37 26,41 30,39 C 34,37 38,41 42,39" />
          <path d="M 6,43 C 10,41 14,45 18,43 C 22,41 26,45 30,43 C 34,41 38,45 42,43" />
        </svg>
      );

    // 6. BRAKE SYSTEM ((!))
    case 'brake-system':
    case 'brake-system-red':
      return (
        <svg viewBox="0 0 48 48" width={size} height={size} className={className} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          {/* Left Brake Shoe Bracket */}
          <path d="M 10,14 C 6,19 6,29 10,34" strokeWidth="3" />
          {/* Right Brake Shoe Bracket */}
          <path d="M 38,14 C 42,19 42,29 38,34" strokeWidth="3" />
          {/* Center Circle */}
          <circle cx="24" cy="24" r="11" />
          {/* Exclamation Mark */}
          <line x1="24" y1="18" x2="24" y2="25" strokeWidth="3.5" />
          <circle cx="24" cy="29.5" r="1.5" fill={color} stroke="none" />
        </svg>
      );

    // 7. HANDBRAKE ((P))
    case 'handbrake':
    case 'parking-brake':
      return (
        <svg viewBox="0 0 48 48" width={size} height={size} className={className} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          {/* Left Bracket */}
          <path d="M 10,14 C 6,19 6,29 10,34" strokeWidth="3" />
          {/* Right Bracket */}
          <path d="M 38,14 C 42,19 42,29 38,34" strokeWidth="3" />
          {/* Center Circle */}
          <circle cx="24" cy="24" r="11" />
          {/* Letter P */}
          <path d="M 21,30 L 21,18 L 25,18 C 27.5,18 29,19.2 29,21.5 C 29,23.8 27.5,25 25,25 L 21,25" strokeWidth="3" />
        </svg>
      );

    // 8. ABS ((ABS))
    case 'abs':
    case 'abs-warning-yellow':
      return (
        <svg viewBox="0 0 48 48" width={size} height={size} className={className} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {/* Left Bracket */}
          <path d="M 7,14 C 3,19 3,29 7,34" strokeWidth="3" />
          {/* Right Bracket */}
          <path d="M 41,14 C 45,19 45,29 41,34" strokeWidth="3" />
          {/* Center Circle */}
          <circle cx="24" cy="24" r="13" />
          {/* ABS text */}
          <text x="24" y="27.5" fill={color} fontSize="9" fontWeight="900" fontFamily="sans-serif" textAnchor="middle" stroke="none">
            ABS
          </text>
        </svg>
      );

    // 9. BRAKE PAD WEAR (Circle with dashed arcs)
    case 'brake-pad-wear':
      return (
        <svg viewBox="0 0 48 48" width={size} height={size} className={className} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          {/* Center Circle */}
          <circle cx="24" cy="24" r="11" />
          {/* Dashed Left Pads */}
          <path d="M 9,13 C 8,15 7,17 7,19" strokeWidth="3.5" />
          <path d="M 6,22 C 6,24 6,26 6,28" strokeWidth="3.5" />
          <path d="M 7,31 C 8,33 9,35 10,37" strokeWidth="3.5" />
          {/* Dashed Right Pads */}
          <path d="M 39,13 C 40,15 41,17 41,19" strokeWidth="3.5" />
          <path d="M 42,22 C 42,24 42,26 42,28" strokeWidth="3.5" />
          <path d="M 41,31 C 40,33 39,35 38,37" strokeWidth="3.5" />
        </svg>
      );

    // 10. TIRE PRESSURE TPMS (!)
    case 'tpms':
    case 'tpms-yellow':
      return (
        <svg viewBox="0 0 48 48" width={size} height={size} className={className} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          {/* Tire cross-section */}
          <path d="M 12,12 C 12,28 14,35 18,36 C 21,37 27,37 30,36 C 34,35 36,28 36,12" />
          {/* Treads at bottom */}
          <path d="M 14,37 L 14,40 M 19,38 L 19,41 M 24,38.5 L 24,41.5 M 29,38 L 29,41 M 34,37 L 34,40" strokeWidth="2" />
          {/* Exclamation Mark */}
          <line x1="24" y1="17" x2="24" y2="26" strokeWidth="3.5" />
          <circle cx="24" cy="31" r="1.5" fill={color} stroke="none" />
        </svg>
      );

    // 11. DIESEL GLOW PLUG (Spring coil loops)
    case 'glow-plug':
    case 'glow-plug-light':
      return (
        <svg viewBox="0 0 48 48" width={size} height={size} className={className} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M 8,30 C 8,20 14,14 18,14 C 23,14 24,24 16,30 C 14,32 13,34 16,34 C 18,34 20,32 22,28 C 24,20 28,14 32,14 C 37,14 38,24 30,30 C 28,32 27,34 30,34 C 33,34 35,32 38,26" />
        </svg>
      );

    // 12. DPF FILTER (Canister with dots and smoke)
    case 'dpf':
    case 'dpf-soot-yellow':
      return (
        <svg viewBox="0 0 48 48" width={size} height={size} className={className} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {/* Canister Outline */}
          <rect x="12" y="14" width="24" height="20" rx="3" strokeWidth="2.5" />
          <line x1="6" y1="24" x2="12" y2="24" strokeWidth="3" />
          <line x1="36" y1="24" x2="42" y2="24" strokeWidth="3" />
          {/* Filter Dots */}
          {[16, 21, 26, 31].map((x) =>
            [18, 24, 30].map((y) => (
              <circle key={`${x}-${y}`} cx={x} cy={y} r="1" fill={color} stroke="none" />
            ))
          )}
        </svg>
      );

    // 13. AIRBAG / SRS (Seated person with inflated bag)
    case 'airbag':
    case 'airbag-srs-red':
      return (
        <svg viewBox="0 0 48 48" width={size} height={size} className={className} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          {/* Person Head */}
          <circle cx="16" cy="14" r="4.5" />
          {/* Seated Body */}
          <path d="M 12,24 C 15,24 18,25 18,30 L 18,38 L 26,38" />
          {/* Seat back */}
          <path d="M 8,16 L 10,38 L 24,38" strokeWidth="1.5" strokeDasharray="2 2" />
          {/* Inflated Airbag */}
          <circle cx="31" cy="22" r="7.5" fill={color} fillOpacity="0.2" strokeWidth="2.5" />
        </svg>
      );

    // 14. SEATBELT WARNING (Person with diagonal belt)
    case 'seatbelt':
      return (
        <svg viewBox="0 0 48 48" width={size} height={size} className={className} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          {/* Head */}
          <circle cx="24" cy="12" r="5" />
          {/* Torso & Legs */}
          <path d="M 17,23 C 17,20 31,20 31,23 L 30,36 L 20,36 Z" />
          {/* Diagonal Seatbelt Strap */}
          <line x1="16" y1="19" x2="31" y2="35" strokeWidth="3.5" />
          {/* Lap Belt */}
          <line x1="18" y1="36" x2="31" y2="36" strokeWidth="3" />
        </svg>
      );

    // 15. TRACTION SLIP / VSC (Car with skid marks)
    case 'traction-slip':
    case 'vsc-trc-slip-yellow':
      return (
        <svg viewBox="0 0 48 48" width={size} height={size} className={className} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          {/* Car Rear View */}
          <path d="M 16,14 L 32,14 L 35,21 L 37,21 C 38.5,21 39,22 39,23 L 39,26 L 37,26 L 37,29 C 37,30 36,31 35,31 L 33,31 C 32,31 31,30 31,29 L 17,29 C 17,30 16,31 15,31 L 13,31 C 12,31 11,30 11,29 L 11,26 L 9,26 L 9,23 C 9,22 9.5,21 11,21 L 13,21 Z" />
          <circle cx="16" cy="26" r="2" fill={color} />
          <circle cx="32" cy="26" r="2" fill={color} />
          {/* Left Skid Wave */}
          <path d="M 15,34 C 18,36 12,40 16,43" strokeWidth="2" />
          {/* Right Skid Wave */}
          <path d="M 33,34 C 36,36 30,40 34,43" strokeWidth="2" />
        </svg>
      );

    // 16. EPS / POWER STEERING (Steering wheel with exclamation)
    case 'eps':
    case 'eps-steering-red':
      return (
        <svg viewBox="0 0 48 48" width={size} height={size} className={className} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          {/* Steering Wheel Rim */}
          <circle cx="21" cy="24" r="14" />
          {/* Center Hub */}
          <circle cx="21" cy="24" r="4" fill={color} stroke="none" />
          {/* Spokes */}
          <line x1="7" y1="24" x2="17" y2="24" />
          <line x1="25" y1="24" x2="35" y2="24" />
          <line x1="21" y1="28" x2="21" y2="38" />
          {/* Exclamation on right */}
          <line x1="41" y1="16" x2="41" y2="28" strokeWidth="3" />
          <circle cx="41" cy="33" r="1.5" fill={color} stroke="none" />
        </svg>
      );

    // 17. LOW FUEL (Gas pump)
    case 'low-fuel':
      return (
        <svg viewBox="0 0 48 48" width={size} height={size} className={className} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          {/* Pump Body */}
          <rect x="8" y="10" width="20" height="28" rx="2" />
          {/* Window */}
          <rect x="12" y="14" width="12" height="8" rx="1" fill={color} fillOpacity="0.2" />
          {/* Hose & Nozzle */}
          <path d="M 28,16 C 34,16 35,22 35,28 L 35,32 C 35,34 38,34 38,30 L 38,20 L 34,16" strokeWidth="2" />
        </svg>
      );

    // 18. WATER IN FUEL (Filter canister with water drops)
    case 'water-in-fuel':
    case 'fuel-filter-water-yellow':
      return (
        <svg viewBox="0 0 48 48" width={size} height={size} className={className} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          {/* Gas pump silhouette */}
          <rect x="8" y="10" width="16" height="22" rx="2" />
          <path d="M 24,14 C 28,14 30,18 30,22 L 30,28" strokeWidth="2" />
          {/* Water droplets below */}
          <path d="M 12,38 C 12,38 10,40 10,41 C 10,42.1 10.9,43 12,43 C 13.1,43 14,42.1 14,41 C 14,40 12,38 12,38 Z" fill={color} stroke="none" />
          <path d="M 20,38 C 20,38 18,40 18,41 C 18,42.1 18.9,43 20,43 C 21.1,43 22,42.1 22,41 C 22,40 20,38 20,38 Z" fill={color} stroke="none" />
          <path d="M 28,38 C 28,38 26,40 26,41 C 26,42.1 26.9,43 28,43 C 29.1,43 30,42.1 30,41 C 30,40 28,38 28,38 Z" fill={color} stroke="none" />
        </svg>
      );

    // 19. SMART KEY / KEY NOT DETECTED (Car with key or key with radio waves)
    case 'smart-key':
    case 'smart-key-yellow':
      return (
        <svg viewBox="0 0 48 48" width={size} height={size} className={className} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          {/* Key Blade & Bow */}
          <circle cx="16" cy="24" r="8" />
          <circle cx="16" cy="24" r="3" />
          <line x1="24" y1="24" x2="38" y2="24" strokeWidth="3" />
          <line x1="32" y1="24" x2="32" y2="28" strokeWidth="2.5" />
          <line x1="36" y1="24" x2="36" y2="30" strokeWidth="2.5" />
          {/* Warning Exclamation */}
          <line x1="42" y1="12" x2="42" y2="18" strokeWidth="2.5" />
          <circle cx="42" cy="21" r="1" fill={color} stroke="none" />
        </svg>
      );

    // 20. MASTER WARNING TRIANGLE
    case 'master-warning':
      return (
        <svg viewBox="0 0 48 48" width={size} height={size} className={className} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M 24,8 L 42,38 L 6,38 Z" />
          <line x1="24" y1="18" x2="24" y2="27" strokeWidth="3.5" />
          <circle cx="24" cy="32" r="1.5" fill={color} stroke="none" />
        </svg>
      );

    // 21. HIGH BEAM (Blue Headlamp with straight rays)
    case 'high-beam':
    case 'high-beam-blue':
      return (
        <svg viewBox="0 0 48 48" width={size} height={size} className={className} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          {/* Headlamp Housing */}
          <path d="M 24,12 C 34,12 36,18 36,24 C 36,30 34,36 24,36 L 20,36 L 20,12 Z" fill={color} fillOpacity="0.2" />
          {/* Straight Horizontal Beams */}
          <line x1="6" y1="16" x2="16" y2="16" strokeWidth="3" />
          <line x1="6" y1="21" x2="16" y2="21" strokeWidth="3" />
          <line x1="6" y1="26" x2="16" y2="26" strokeWidth="3" />
          <line x1="6" y1="31" x2="16" y2="31" strokeWidth="3" />
        </svg>
      );

    // 22. LOW BEAM / FOG LIGHT (Headlamp with angled beams)
    case 'fog-light-front':
    case 'low-beam':
      return (
        <svg viewBox="0 0 48 48" width={size} height={size} className={className} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          {/* Headlamp Housing */}
          <path d="M 24,12 C 34,12 36,18 36,24 C 36,30 34,36 24,36 L 20,36 L 20,12 Z" fill={color} fillOpacity="0.2" />
          {/* Angled Beams */}
          <line x1="16" y1="16" x2="6" y2="22" strokeWidth="2.5" />
          <line x1="16" y1="22" x2="6" y2="28" strokeWidth="2.5" />
          <line x1="16" y1="28" x2="6" y2="34" strokeWidth="2.5" />
          {/* Wavy fog line if fog */}
          <path d="M 10,13 C 12,18 8,24 10,32" strokeWidth="2" />
        </svg>
      );

    // 23. DOOR AJAR (Car top-view with open doors)
    case 'door-ajar':
      return (
        <svg viewBox="0 0 48 48" width={size} height={size} className={className} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {/* Car Body Outline */}
          <path d="M 18,10 C 18,8 30,8 30,10 L 32,16 L 32,34 L 30,40 C 30,42 18,42 18,40 L 16,34 L 16,16 Z" />
          <path d="M 20,14 L 28,14 L 29,20 L 19,20 Z" fill={color} fillOpacity="0.2" />
          {/* Left Door Popped Open */}
          <line x1="16" y1="18" x2="10" y2="24" strokeWidth="3" />
          {/* Right Door Popped Open */}
          <line x1="32" y1="18" x2="38" y2="24" strokeWidth="3" />
        </svg>
      );

    // 24. 4WD / 4x4 (4 wheel hubs with drivetrain)
    case '4wd':
    case '4wd-lock':
      return (
        <svg viewBox="0 0 48 48" width={size} height={size} className={className} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          {/* Center Drive Shaft */}
          <line x1="24" y1="14" x2="24" y2="34" strokeWidth="3" />
          {/* Front Axle */}
          <line x1="14" y1="16" x2="34" y2="16" strokeWidth="3" />
          {/* Rear Axle */}
          <line x1="14" y1="32" x2="34" y2="32" strokeWidth="3" />
          {/* 4 Wheels */}
          <rect x="10" y="12" width="5" height="8" rx="1" fill={color} />
          <rect x="33" y="12" width="5" height="8" rx="1" fill={color} />
          <rect x="10" y="28" width="5" height="8" rx="1" fill={color} />
          <rect x="33" y="28" width="5" height="8" rx="1" fill={color} />
          {/* Center Diff Lock */}
          <circle cx="24" cy="24" r="3.5" fill={color} stroke="none" />
        </svg>
      );

    // 25. AUTO START-STOP OFF (A inside circle arrow with OFF)
    case 'auto-start-stop':
      return (
        <svg viewBox="0 0 48 48" width={size} height={size} className={className} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          {/* Circular Arrow */}
          <path d="M 12,24 A 14,14 0 1,1 24,38" />
          <path d="M 8,24 L 12,24 L 12,20" strokeWidth="3" />
          {/* Letter A */}
          <text x="24" y="28" fill={color} fontSize="14" fontWeight="900" fontFamily="sans-serif" textAnchor="middle" stroke="none">
            A
          </text>
        </svg>
      );

    // 26. ELECTRONIC THROTTLE CONTROL (ETC) lightning in parenthesis
    case 'etc':
      return (
        <svg viewBox="0 0 48 48" width={size} height={size} className={className} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M 14,12 C 10,18 10,30 14,36" strokeWidth="3" />
          <path d="M 34,12 C 38,18 38,30 34,36" strokeWidth="3" />
          <path d="M 26,12 L 20,24 L 26,24 L 22,36" strokeWidth="3" fill="none" />
        </svg>
      );

    // DEFAULT AUTOMOTIVE BADGE (Generic Warning Shield)
    default:
      return (
        <svg viewBox="0 0 48 48" width={size} height={size} className={className} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="24" cy="24" r="16" />
          <line x1="24" y1="16" x2="24" y2="26" strokeWidth="3.5" />
          <circle cx="24" cy="31" r="1.5" fill={color} stroke="none" />
        </svg>
      );
  }
};
