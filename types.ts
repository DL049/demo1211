export enum SlideState {
  SENSORS = 'SENSORS',
  SYSTEM = 'SYSTEM',
  ASSISTIVE = 'ASSISTIVE'
}

export interface GaitDataPoint {
  time: number;
  acceleration: number;
  gyroscope: number;
}

export interface PatientStatus {
  heartRate: number;
  location: string;
  status: 'Normal' | 'Fall Detected' | 'Wandering';
  battery: number;
}
