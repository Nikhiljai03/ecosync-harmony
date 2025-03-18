
export type EntityType = 'company' | 'civilian' | 'city';

export interface SensorReading {
  id: string;
  timestamp: number;
  type: 'airQuality' | 'temperature' | 'humidity' | 'noise' | 'waterQuality' | 'energyConsumption' | 'wasteProduction' | 'carbonEmission';
  value: number;
  unit: string;
  status: 'good' | 'moderate' | 'poor' | 'critical';
}

export interface AggregatedSensorData {
  airQuality: {
    aqi: number;
    pm25: number;
    pm10: number;
    o3: number;
    no2: number;
    so2: number;
    co: number;
  };
  climate: {
    temperature: number;
    humidity: number;
    weatherCondition: string;
  };
  resources: {
    energyConsumption: number;
    waterUsage: number;
    wasteProduction: number;
  };
  emissions: {
    carbonFootprint: number;
    greenhouseGases: number;
  };
  lastUpdated: number;
}

export interface GreenCreditScoreData {
  overall: number;
  categories: {
    airQuality: number;
    energyEfficiency: number;
    waterConservation: number;
    wasteManagement: number;
    carbonFootprint: number;
  };
  trend: 'improving' | 'stable' | 'declining';
  ranking: number;
  totalEntities: number;
}

export interface BlockchainStatusData {
  lastTransaction: {
    hash: string;
    timestamp: number;
    status: 'pending' | 'confirmed' | 'failed';
  };
  totalTransactions: number;
  network: string;
  syncStatus: 'synced' | 'syncing' | 'offline';
}

export interface Entity {
  id: string;
  name: string;
  type: EntityType;
  location: string;
  description?: string;
}
