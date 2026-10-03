export interface FuseColorCode {
  amperage: number;
  colorNameMy: string;
  colorNameEn: string;
  colorHex: string;
  commonUses: string;
  bladeType: 'Mini' | 'Standard' | 'Maxi';
}

export interface FuseAbbreviation {
  code: string;
  fullNameEn: string;
  meaningMy: string;
  typicalAmp: string;
  circuitPowered: string;
  location: 'Under Bonnet (အင်ဂျင်ခန်း)' | 'Under Dashboard (ဒက်ရှ်ဘုတ်အောက်)' | 'Both (၂ နေရာစလုံး)';
}

export const BLADE_FUSE_COLORS: FuseColorCode[] = [
  {
    amperage: 3,
    colorNameMy: 'ခရမ်းရောင် (Violet / Purple)',
    colorNameEn: 'Violet',
    colorHex: '#9333ea',
    commonUses: 'အီလက်ထရောနစ် ကွန်ပျူတာ အာရုံခံလိုင်းများ၊ မန်မိုရီ သေးငယ်သော ဆားကစ်များ',
    bladeType: 'Mini'
  },
  {
    amperage: 5,
    colorNameMy: 'လိမ္မော်နု / သစ်ခွရောင် (Tan / Orange-Light)',
    colorNameEn: 'Tan',
    colorHex: '#d97706',
    commonUses: 'ECU Memory (BATT), ဒိုင်ခွက် မီးရောင်များ၊ အဲကွန်း ဆန်ဆာလိုင်းများ',
    bladeType: 'Standard'
  },
  {
    amperage: 7.5,
    colorNameMy: 'အညိုရောင် (Brown)',
    colorNameEn: 'Brown',
    colorHex: '#854d0e',
    commonUses: 'ABS ကွန်ပျူတာ လော့ဂျစ်လိုင်း၊ မီးကွိုင် မီးစနက်လိုင်း (IGT), Airbag SRS လေအိတ်',
    bladeType: 'Standard'
  },
  {
    amperage: 10,
    colorNameMy: 'အနီရောင် (Red - အသုံးအများဆုံး)',
    colorNameEn: 'Red',
    colorHex: '#dc2626',
    commonUses: 'TAIL (အနောက်မီး), STOP (ဘရိတ်မီး), DOME (အမိုးမီး), A/C Clutch, မီးကြီးမီးနိမ့် (Headlight Low)',
    bladeType: 'Standard'
  },
  {
    amperage: 15,
    colorNameMy: 'အပြာရောင် (Blue - အသုံးအများဆုံး)',
    colorNameEn: 'Blue',
    colorHex: '#2563eb',
    commonUses: 'CIG (စီးကရက်မီးခြစ်/ဖုန်းအားသွင်း), INJ (အင်ဂျက်တာ), FOG (မီးခိုးခွဲမီး), HAZARD (မီးဘေး)',
    bladeType: 'Standard'
  },
  {
    amperage: 20,
    colorNameMy: 'အဝါရောင် (Yellow)',
    colorNameEn: 'Yellow',
    colorHex: '#eab308',
    commonUses: 'EFI / ENGINE ပင်မလိုင်း၊ WIPER (ဝိုင်ဘာမော်တာ), FUEL PUMP (ဆီပန့်မော်တာ), HORN (ဟွန်း)',
    bladeType: 'Standard'
  },
  {
    amperage: 25,
    colorNameMy: 'အဖြူကြည် / အကြည်ရောင် (Clear / White)',
    colorNameEn: 'Clear',
    colorHex: '#f1f5f9',
    commonUses: 'DOOR LOCK (တံခါးလော့ခ်မော်တာ), P/WINDOW (မှန်တင်မှန်ချ), ဒက်ရှ်ဘုတ် ပါဝါလိုင်း',
    bladeType: 'Standard'
  },
  {
    amperage: 30,
    colorNameMy: 'အစိမ်းရောင် (Green)',
    colorNameEn: 'Green',
    colorHex: '#16a34a',
    commonUses: 'DEFOG (နောက်မှန် ရေငွေ့ဖျောက်), RAD FAN (ရေတိုင်ကီပန်ကာ အမြန်), ABS Pump မော်တာ',
    bladeType: 'Standard'
  },
  {
    amperage: 40,
    colorNameMy: 'လိမ္မော်ရင့် (Orange / Amber Maxi)',
    colorNameEn: 'Amber',
    colorHex: '#ea580c',
    commonUses: 'AIR CON BLOWER (လေမှုတ်ပန်ကာ မော်တာကြီး), EPS (ပါဝါစတီယာရင်)',
    bladeType: 'Maxi'
  },
  {
    amperage: 50,
    colorNameMy: 'အနီရင့် (Red Maxi / Fusible Link)',
    colorNameEn: 'Red Maxi',
    colorHex: '#b91c1c',
    commonUses: 'IGNITION SWITCH (သော့ပင်မလိုင်း), ABS Solenoid ပင်မလိုင်း',
    bladeType: 'Maxi'
  },
  {
    amperage: 60,
    colorNameMy: 'အဝါရင့် (Yellow Maxi)',
    colorNameEn: 'Yellow Maxi',
    colorHex: '#ca8a04',
    commonUses: 'GLOW PLUG (ဒီဇယ်မီးတိုင်လိုင်း), မီးကြီးပင်မလိုင်း',
    bladeType: 'Maxi'
  },
  {
    amperage: 80,
    colorNameMy: 'အမည်း / အကြည် (80A~100A Main Link)',
    colorNameEn: 'Black/Clear',
    colorHex: '#475569',
    commonUses: 'ALT (ဒိုင်နမို အားသွင်းပင်မလိုင်း), BATTERY MAIN (ဘက်ထရီပင်မဖျူးစ်တုံး)',
    bladeType: 'Maxi'
  }
];

export const FUSE_ABBREVIATIONS: FuseAbbreviation[] = [
  {
    code: 'EFI / ENG',
    fullNameEn: 'Electronic Fuel Injection / Engine Control',
    meaningMy: 'အင်ဂျင်ကွန်ပျူတာ ပင်မမီးလိုင်း (ပြတ်ပါက စက်လုံးဝ နှိုးမရပါ)',
    typicalAmp: '15A / 20A / 25A',
    circuitPowered: 'Engine ECU, Injectors, O2 Sensor Heater, MAF Sensor',
    location: 'Under Bonnet (အင်ဂျင်ခန်း)'
  },
  {
    code: 'ECU-B',
    fullNameEn: 'Electronic Control Unit - Battery (Memory)',
    meaningMy: 'ကွန်ပျူတာ အမြဲပါဝါ မန်မိုရီလိုင်း (သော့ပိတ်ထားလည်း မီးအမြဲရှိသည်)',
    typicalAmp: '7.5A / 10A',
    circuitPowered: 'ECU Clock, Memory, Diagnostic Codes (DTC), Smart Key System',
    location: 'Both (၂ နေရာစလုံး)'
  },
  {
    code: 'IGN / INJ',
    fullNameEn: 'Ignition / Fuel Injectors',
    meaningMy: 'မီးကွိုင်နှင့် အင်ဂျက်တာ ဆီဖြန်းခေါင်းများ မီးလိုင်း',
    typicalAmp: '10A / 15A',
    circuitPowered: 'Ignition Coils (COP), Fuel Injectors, Camshaft Sensors',
    location: 'Under Bonnet (အင်ဂျင်ခန်း)'
  },
  {
    code: 'ST / STARTER',
    fullNameEn: 'Starter Relay / Solenoid Control',
    meaningMy: 'စတက်တာ မော်တာဆွဲ ရီလေးခလုတ်မီးလိုင်း (ပြတ်ပါက သော့လှည့်သော်လည်း စက်မလည်ပါ)',
    typicalAmp: '7.5A / 10A / 30A',
    circuitPowered: 'Starter Relay, Neutral Safety Switch, Starter Solenoid Terminal 50',
    location: 'Under Bonnet (အင်ဂျင်ခန်း)'
  },
  {
    code: 'ALT / ALT-S',
    fullNameEn: 'Alternator / Alternator Voltage Sense',
    meaningMy: 'ဒိုင်နမို အားသွင်းပင်မဖျူးစ်နှင့် ဘက်ထရီဗို့အား တိုင်းတာရေးလိုင်း',
    typicalAmp: '7.5A (Sense) / 80A~140A (Main)',
    circuitPowered: 'Charging System, Alternator IC Regulator Pin S, Battery Feed',
    location: 'Under Bonnet (အင်ဂျင်ခန်း)'
  },
  {
    code: 'F/PMP / FUEL',
    fullNameEn: 'Fuel Pump Relay & Motor',
    meaningMy: 'ဆီတိုင်ကီတွင်း ဆီပန့်မော်တာလိုင်း (ပြတ်ပါက ဆီဖိအားမတက်ဘဲ စက်မနှိုးပါ)',
    typicalAmp: '15A / 20A',
    circuitPowered: 'In-tank Electric Fuel Pump, Fuel Pump Relay Pin 87',
    location: 'Both (၂ နေရာစလုံး)'
  },
  {
    code: 'DOME',
    fullNameEn: 'Dome Interior Ceiling Light',
    meaningMy: 'ကားအတွင်းခန်း အမိုးမီးနှင့် တံခါးဖွင့်မီးများ (သော့ပိတ်လည်း မီးလင်းနိုင်သည်)',
    typicalAmp: '7.5A / 10A',
    circuitPowered: 'Cabin Ceiling Lights, Door Courtesy Lights, Vanity Mirror Lights',
    location: 'Under Dashboard (ဒက်ရှ်ဘုတ်အောက်)'
  },
  {
    code: 'STOP',
    fullNameEn: 'Stop / Brake Lights',
    meaningMy: 'ဘရိတ်နင်းချိန် အနောက်မီးနီ လင်းစေသော မီးလိုင်း (ပြတ်ပါက ဂီယာ Shift Lock မလွတ်နိုင်ပါ)',
    typicalAmp: '10A / 15A',
    circuitPowered: 'Brake Pedal Switch, Rear Brake Lights, Shift Lock Solenoid',
    location: 'Under Dashboard (ဒက်ရှ်ဘုတ်အောက်)'
  },
  {
    code: 'TAIL',
    fullNameEn: 'Tail Lights & Parking Illumination',
    meaningMy: 'အနောက်မီး၊ ဘေးမီးအသေးနှင့် ညဘက် ဒက်ရှ်ဘုတ် ခလုတ်မီးရောင်များ',
    typicalAmp: '10A / 15A',
    circuitPowered: 'Rear Tail Lights, License Plate Lights, Dashboard Night Lights',
    location: 'Under Dashboard (ဒက်ရှ်ဘုတ်အောက်)'
  },
  {
    code: 'HAZ / HAZARD',
    fullNameEn: 'Hazard Emergency Flasher',
    meaningMy: 'အရေးပေါ် မီးတွဲ/မီးဘေး ခလုတ်လိုင်း (ဘယ်/ညာ အချက်ပြမီး ၄ ပွင့်စလုံး)',
    typicalAmp: '10A / 15A',
    circuitPowered: 'Hazard Warning Switch, Turn Signal Flasher Relay',
    location: 'Under Bonnet (အင်ဂျင်ခန်း)'
  },
  {
    code: 'HORN',
    fullNameEn: 'Horn Relay & Horns',
    meaningMy: 'ကားဟွန်း တီးခတ်သည့် မီးလိုင်း',
    typicalAmp: '10A / 15A',
    circuitPowered: 'Horn Relay, Steering Clockspring Horn Contact, Twin Horns',
    location: 'Under Bonnet (အင်ဂျင်ခန်း)'
  },
  {
    code: 'HEAD LO / HEAD HI',
    fullNameEn: 'Headlight Low Beam / High Beam',
    meaningMy: 'ရှေ့မီးကြီး မီးနိမ့် (Low) နှင့် မီးမြင့် (High) လိုင်းများ (ဘယ်/ညာ သီးခြားစီ ခွဲထားလေ့ရှိသည်)',
    typicalAmp: '10A / 15A (LH & RH သီးခြား)',
    circuitPowered: 'Headlamp Halogen/LED/HID Bulbs, High Beam Indicator',
    location: 'Under Bonnet (အင်ဂျင်ခန်း)'
  },
  {
    code: 'FOG',
    fullNameEn: 'Front Fog Lamps',
    meaningMy: 'အောက်ခြေ မီးခိုးခွဲ မီးသီးလိုင်း',
    typicalAmp: '15A',
    circuitPowered: 'Front Bumper Fog Lights, Fog Light Relay',
    location: 'Under Bonnet (အင်ဂျင်ခန်း)'
  },
  {
    code: 'CIG / ACC',
    fullNameEn: 'Cigarette Lighter / Accessory Power',
    meaningMy: 'စီးကရက်မီးခြစ်ပေါက်၊ ဖုန်းအားသွင်း ၁၂ ဗို့ပေါက်နှင့် သော့ ACC လှည့်ချိန် သုံးသောလိုင်း',
    typicalAmp: '15A',
    circuitPowered: '12V Power Outlets, USB Ports, Radio Accessory Feed',
    location: 'Under Dashboard (ဒက်ရှ်ဘုတ်အောက်)'
  },
  {
    code: 'P/W',
    fullNameEn: 'Power Window Master & Doors',
    meaningMy: 'တံခါးမှန်တင်/မှန်ချ မော်တာများ ပင်မမီးလိုင်း',
    typicalAmp: '20A / 25A / 30A',
    circuitPowered: 'Master Window Switch, 4-Door Window Regulator Motors',
    location: 'Under Dashboard (ဒက်ရှ်ဘုတ်အောက်)'
  },
  {
    code: 'P/SEAT',
    fullNameEn: 'Power Seat Motors',
    meaningMy: 'လျှပ်စစ်မော်တာမောင်း ထိုင်ခုံ အရှေ့/အနောက်၊ အစောင်း ချိန်ခလုတ်လိုင်း',
    typicalAmp: '25A / 30A',
    circuitPowered: 'Electric Driver / Passenger Seat Adjustment Motors',
    location: 'Under Dashboard (ဒက်ရှ်ဘုတ်အောက်)'
  },
  {
    code: 'DEFOG / MIR HTR',
    fullNameEn: 'Rear Window Defogger & Mirror Heater',
    meaningMy: 'အနောက်လေကာမှန်နှင့် ဘေးကြည့်မှန် အပူပေး ရေငွေ့ဖျောက် နန်းကြိုးလိုင်း',
    typicalAmp: '20A / 30A',
    circuitPowered: 'Rear Glass Heating Grid, Heated Side Mirrors Relay',
    location: 'Both (၂ နေရာစလုံး)'
  },
  {
    code: 'WIP / WASHER',
    fullNameEn: 'Windshield Wiper & Washer Pump',
    meaningMy: 'ရှေ့လေကာမှန် ဝိုင်ဘာမော်တာနှင့် မှန်ဆေးရေပန်းထုတ် မော်တာလိုင်း',
    typicalAmp: '15A / 20A / 25A',
    circuitPowered: 'Front/Rear Wiper Motors, Washer Fluid Pump Motor',
    location: 'Under Dashboard (ဒက်ရှ်ဘုတ်အောက်)'
  },
  {
    code: 'ABS / VSC',
    fullNameEn: 'Anti-lock Brake System / Vehicle Stability Control',
    meaningMy: 'အေဘီအက်စ် ဘရိတ်ကွန်ပျူတာ၊ ဟိုက်ဒရောလစ် မော်တာနှင့် ဆိုလီနွိုက်လိုင်း',
    typicalAmp: '7.5A (Logic) / 30A~50A (Pump)',
    circuitPowered: 'ABS Hydraulic Control Unit, Wheel Speed Sensors, ESP System',
    location: 'Under Bonnet (အင်ဂျင်ခန်း)'
  },
  {
    code: 'AIRBAG / SRS',
    fullNameEn: 'Supplemental Restraint System (Airbag)',
    meaningMy: 'လေအိတ် အသက်ကယ်ကွန်ပျူတာနှင့် ပေါက်ကွဲမှု ထိန်းချုပ်မီးလိုင်း',
    typicalAmp: '7.5A / 10A (အဝါရောင် ပလပ်များ)',
    circuitPowered: 'Airbag Control Module, Seatbelt Pretensioners, Impact Sensors',
    location: 'Under Dashboard (ဒက်ရှ်ဘုတ်အောက်)'
  },
  {
    code: 'EPS / P/S',
    fullNameEn: 'Electric Power Steering',
    meaningMy: 'စတီယာရင် လျှပ်စစ်ပါဝါမော်တာ အင်အားကြီးလိုင်း',
    typicalAmp: '40A / 50A / 60A (Maxi Fuse)',
    circuitPowered: 'EPS Motor on Steering Column, EPS ECU, Torque Sensor',
    location: 'Under Bonnet (အင်ဂျင်ခန်း)'
  },
  {
    code: 'RAD FAN / COND FAN',
    fullNameEn: 'Radiator Cooling Fan / A/C Condenser Fan',
    meaningMy: 'အင်ဂျင်ရေတိုင်ကီနှင့် အဲကွန်း ရေတိုင်ကီ အအေးခံ ပန်ကာမော်တာလိုင်းများ',
    typicalAmp: '30A / 40A',
    circuitPowered: 'Radiator Fan Motor, Condenser Fan Motor, Fan Relays',
    location: 'Under Bonnet (အင်ဂျင်ခန်း)'
  },
  {
    code: 'A/C MAG',
    fullNameEn: 'Air Conditioning Magnetic Clutch',
    meaningMy: 'အဲကွန်း ကွန်ပရက်ဆာ သံလိုက်ကလပ် ဆွဲမီးလိုင်း',
    typicalAmp: '10A / 15A',
    circuitPowered: 'A/C Compressor Magnetic Clutch, A/C Relay Pin 87',
    location: 'Under Bonnet (အင်ဂျင်ခန်း)'
  },
  {
    code: 'OBD / DLC',
    fullNameEn: 'On-Board Diagnostics / Data Link Connector',
    meaningMy: 'စကင်နာထိုးသည့် ၁၆ ပင်ပေါက် ပင်နံပါတ် ၁၆ သို့ သွားသော အမြဲတမ်း ၁၂ ဗို့လိုင်း',
    typicalAmp: '7.5A / 10A',
    circuitPowered: 'OBD2 Pin 16 (+12V Constant Battery Power)',
    location: 'Under Dashboard (ဒက်ရှ်ဘုတ်အောက်)'
  },
  {
    code: 'RADIO / AUDIO',
    fullNameEn: 'Audio System & Screen Display',
    meaningMy: 'ကားစတီရီယို၊ တီဗွီ စခရင်နှင့် အသံချဲ့စက် (Amplifier) မီးလိုင်း',
    typicalAmp: '10A / 15A / 20A',
    circuitPowered: 'Head Unit, Android Touchscreen, Power Antenna, Premium Amp',
    location: 'Under Dashboard (ဒက်ရှ်ဘုတ်အောက်)'
  },
  {
    code: 'AM1 / AM2',
    fullNameEn: 'All Main 1 / All Main 2',
    meaningMy: 'သော့ခွေ (Ignition Switch) သို့ သွားသော ပင်မ ၁၂ ဗို့ ဓာတ်အားခွဲ ၂ လိုင်း',
    typicalAmp: '30A / 40A / 50A',
    circuitPowered: 'Ignition Switch Terminals, Starter & Ignition circuits',
    location: 'Under Bonnet (အင်ဂျင်ခန်း)'
  }
];
