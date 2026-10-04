export type SystemCategory = 
  | 'power_ground'
  | 'pinouts'
  | 'sensors'
  | 'assemblies'
  | 'fuse_box'
  | 'interior_symbols'
  | 'dashboard_lights'
  | 'manual_reset'
  | 'jdm_translator'
  | 'dtc_codes'
  | 'bench_tester'
  | 'all';

export type SensorCategory =
  | 'timing'
  | 'air_fuel'
  | 'fuel_injectors'
  | 'throttle_pedal'
  | 'turbo_vvt'
  | 'fluids_temp'
  | 'exhaust'
  | 'transmission'
  | 'chassis_safety'
  | 'body_ac';

export interface PinoutCrossReference {
  functionNameMy: string;
  functionNameEn: string;
  descriptionMy: string;
  voltageSignal: string;
  toyota: string;
  honda: string;
  nissan: string;
  hyundaiKia: string;
  ford: string;
  benzBosch: string;
}

export interface SocketPinInfo {
  pinNumber: number | string;
  label: string;
  wireColor: string;
  destination: string;
  voltage: string;
  descriptionMy: string;
}

export interface TeachingMasterclass {
  triggerMechanism: string; // "ဘာဝင်လိုက်လို့ / ဘာထိတွေ့လို့ / ဘာကွေးညွတ်လို့ / အပူကြောင့်"
  physicsPrinciple: string; // သိပ္ပံနှင့် ရူပဗေဒ အခြေခံ (Piezo, Hall effect, NTC, etc.)
  electronicsControl: string; // "ထရန်စစ်စတာ/MOSFET အချိတ်အဆက် ပြုလုပ်ပုံ"
  analogyForStudents: string; // တပည့်များ ချက်ချင်း နားလည်စေမည့် မြင်သာသော ဥပမာ
}

export interface SensorDetail {
  id: string;
  nameEn: string;
  nameMy: string;
  acronym: string;
  category: SensorCategory;
  categoryNameMy: string;
  type: string; // e.g. 2-Wire Magnetic, 3-Wire Hall, NTC Thermistor, Piezoelectric
  systemRoleMy?: string;

  // 1. တည်ဆောက်ပုံ (Physical Anatomy & Socket)
  internalStructure: string;
  socketPinsCount?: number;
  socketViewDiagram?: SocketPinInfo[];

  // 2. အလုပ်လုပ်ပုံ (System Operation)
  workingPrinciple: string;

  // 3. ဝါယာဝင်ပုံ (Wiring & Pinouts)
  pinoutSummary: {
    pin: string;
    signalType: string;
    standardValue: string;
    description: string;
    ecuTerminal?: string;
  }[];
  wireColorGuide?: string;

  // 4. စမ်းသပ်တိုင်းတာပုံ & စံသတ်မှတ်ချက်များ (Testing Specs & Live Data)
  specifications: {
    referenceVoltage?: string;
    operatingVoltage?: string;
    resistance?: string;
    signalOutput?: string;
    tempCoeff?: string;
    threshold?: string;
    pressureRange?: string; // bar / psi (e.g. 300~2000 bar / 4350~29000 psi)
    liveDataIdle?: string; // e.g. Idle 750 RPM: 1.3V - 1.5V (350 bar)
    liveDataCruise?: string; // e.g. Normal 2000 RPM: 2.2V - 2.8V (850 bar)
    liveDataLoad?: string; // e.g. 2500 RPM / WOT: 3.8V - 4.2V (1800 bar)
    waveformType?: string; // AC Sine wave, Digital Square wave, PWM Duty, DC linear
    overUnderDiagnostic?: {
      tooLowMeaning: string;
      tooHighMeaning: string;
      flatlineMeaning?: string;
    };
  };
  testingSteps: {
    step: number;
    title: string;
    description: string;
    tool: 'multimeter_v' | 'multimeter_ohm' | 'oscilloscope' | 'test_light' | 'scan_tool';
  }[];

  // 5. သင်တန်းသား/အခြားသူများကို ရှင်းပြရန် အတွင်းပိုင်း ရူပဗေဒ/အီလက်ထရောနစ် သဘောတရား (Teaching Masterclass)
  teachingMasterclass?: TeachingMasterclass;

  symptomsOfFailure: string[];
  diagnosticTips: string;
}

export interface ComponentAssembly {
  id: string;
  nameEn: string;
  nameMy: string;
  subtitle: string;
  sensorsInstalled: string[];
  workingPrinciple: string;
  internalComponents: string[];
  testingAndInspection: {
    testName: string;
    procedure: string;
    standardValue: string;
  }[];
  commonProblems: {
    problem: string;
    cause: string;
    fix: string;
  }[];
  wiringDiagramBrief: string;
  proTip: string;
}

export interface RelayPinStandard {
  pinNumber: string;
  standardName: string;
  burmeseName: string;
  function: string;
  connectionFrom: string;
  connectionTo: string;
  testMethod: string;
  normalStatus: string;
}
