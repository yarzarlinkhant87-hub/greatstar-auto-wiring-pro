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

export interface SensorDetail {
  id: string;
  nameEn: string;
  nameMy: string;
  acronym: string;
  category: SensorCategory;
  categoryNameMy: string;
  type: string; // e.g. 2-Wire Magnetic, 3-Wire Hall, NTC Thermistor, Piezoelectric
  workingPrinciple: string;
  internalStructure: string;
  pinoutSummary: {
    pin: string;
    signalType: string;
    standardValue: string;
    description: string;
  }[];
  specifications: {
    referenceVoltage?: string;
    operatingVoltage?: string;
    resistance?: string;
    signalOutput?: string;
    tempCoeff?: string;
    threshold?: string;
  };
  testingSteps: {
    step: number;
    title: string;
    description: string;
    tool: 'multimeter_v' | 'multimeter_ohm' | 'oscilloscope' | 'test_light';
  }[];
  symptomsOfFailure: string[];
  diagnosticTips: string;
  wireColorGuide?: string;
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
