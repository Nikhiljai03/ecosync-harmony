
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import GlassCard from '@/components/ui/GlassCard';
import { AggregatedSensorData, EntityType } from '@/types/iot';
import { AirVent, Cloud, Droplet, Leaf, Thermometer } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface IoTDataFeedProps {
  sensorData: AggregatedSensorData | null;
  entityType: EntityType;
}

const IoTDataFeed: React.FC<IoTDataFeedProps> = ({ sensorData, entityType }) => {
  if (!sensorData) {
    return (
      <GlassCard className="col-span-full md:col-span-2 h-96 flex items-center justify-center">
        <p className="text-muted-foreground">Select an entity to view sensor data</p>
      </GlassCard>
    );
  }

  return (
    <GlassCard className="col-span-full md:col-span-2">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <Leaf className="mr-2 h-5 w-5 text-ecosync-green-dark" />
        Environmental Sensor Data
      </h2>
      <p className="text-sm text-muted-foreground mb-5">
        Real-time IoT sensor readings from {entityType === 'company' ? 'company facilities' : 
        entityType === 'city' ? 'city-wide sensor network' : 'personal environment'}
      </p>
      
      <Tabs defaultValue="air" className="w-full">
        <TabsList className="w-full grid grid-cols-4 mb-6">
          <TabsTrigger value="air">Air Quality</TabsTrigger>
          <TabsTrigger value="climate">Climate</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="emissions">Emissions</TabsTrigger>
        </TabsList>
        
        <TabsContent value="air" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <AirVent className="mr-2 h-4 w-4 text-blue-500" />
                  <span>Air Quality Index (AQI)</span>
                </div>
                <span className="font-semibold">{sensorData.airQuality.aqi.toFixed(1)}</span>
              </div>
              <Progress 
                value={Math.min(100, (sensorData.airQuality.aqi / 300) * 100)} 
                className={`h-2 ${sensorData.airQuality.aqi < 50 ? 'bg-green-100' : 
                  sensorData.airQuality.aqi < 100 ? 'bg-yellow-100' : 
                  sensorData.airQuality.aqi < 150 ? 'bg-orange-100' : 'bg-red-100'}`}
              />
              
              <div className="text-xs flex justify-between mt-1">
                <span className="text-green-500">Good</span>
                <span className="text-yellow-500">Moderate</span>
                <span className="text-orange-500">Unhealthy</span>
                <span className="text-red-500">Hazardous</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-lg p-3 bg-blue-50 dark:bg-blue-900/20">
                <div className="text-sm text-muted-foreground">PM2.5</div>
                <div className="text-lg font-semibold">{sensorData.airQuality.pm25.toFixed(1)} µg/m³</div>
              </div>
              <div className="rounded-lg p-3 bg-blue-50 dark:bg-blue-900/20">
                <div className="text-sm text-muted-foreground">PM10</div>
                <div className="text-lg font-semibold">{sensorData.airQuality.pm10.toFixed(1)} µg/m³</div>
              </div>
              <div className="rounded-lg p-3 bg-blue-50 dark:bg-blue-900/20">
                <div className="text-sm text-muted-foreground">NO₂</div>
                <div className="text-lg font-semibold">{sensorData.airQuality.no2.toFixed(1)} ppb</div>
              </div>
              <div className="rounded-lg p-3 bg-blue-50 dark:bg-blue-900/20">
                <div className="text-sm text-muted-foreground">O₃</div>
                <div className="text-lg font-semibold">{sensorData.airQuality.o3.toFixed(1)} ppb</div>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="climate" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-lg p-4 bg-orange-50 dark:bg-orange-900/20 flex items-center">
              <Thermometer className="h-8 w-8 mr-3 text-orange-500" />
              <div>
                <div className="text-sm text-muted-foreground">Temperature</div>
                <div className="text-xl font-semibold">{sensorData.climate.temperature.toFixed(1)}°C</div>
              </div>
            </div>
            <div className="rounded-lg p-4 bg-blue-50 dark:bg-blue-900/20 flex items-center">
              <Droplet className="h-8 w-8 mr-3 text-blue-500" />
              <div>
                <div className="text-sm text-muted-foreground">Humidity</div>
                <div className="text-xl font-semibold">{sensorData.climate.humidity.toFixed(1)}%</div>
              </div>
            </div>
            <div className="rounded-lg p-4 bg-gray-50 dark:bg-gray-800/30 flex items-center">
              <Cloud className="h-8 w-8 mr-3 text-gray-500" />
              <div>
                <div className="text-sm text-muted-foreground">Weather</div>
                <div className="text-xl font-semibold">{sensorData.climate.weatherCondition}</div>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="resources" className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Energy Consumption</span>
                <span className="font-medium">{sensorData.resources.energyConsumption.toFixed(1)} kWh</span>
              </div>
              <Progress value={Math.min(100, (sensorData.resources.energyConsumption / 5000) * 100)} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Water Usage</span>
                <span className="font-medium">{sensorData.resources.waterUsage.toFixed(1)} m³</span>
              </div>
              <Progress value={Math.min(100, (sensorData.resources.waterUsage / 500) * 100)} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Waste Production</span>
                <span className="font-medium">{sensorData.resources.wasteProduction.toFixed(1)} kg</span>
              </div>
              <Progress value={Math.min(100, (sensorData.resources.wasteProduction / 2000) * 100)} className="h-2" />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="emissions" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 border rounded-lg">
              <h3 className="text-sm font-medium mb-2">Carbon Footprint</h3>
              <div className="text-2xl font-bold mb-1">{sensorData.emissions.carbonFootprint.toFixed(1)}</div>
              <div className="text-xs text-muted-foreground">kg CO₂ equivalent</div>
              <div className="mt-3 text-xs">
                {
                  sensorData.emissions.carbonFootprint < 1000 
                    ? "Low carbon emission level" 
                    : sensorData.emissions.carbonFootprint < 3000 
                      ? "Moderate carbon emission level" 
                      : "High carbon emission level - reduction recommended"
                }
              </div>
            </div>
            
            <div className="p-4 border rounded-lg">
              <h3 className="text-sm font-medium mb-2">Greenhouse Gases</h3>
              <div className="text-2xl font-bold mb-1">{sensorData.emissions.greenhouseGases.toFixed(1)}</div>
              <div className="text-xs text-muted-foreground">kg CO₂ equivalent</div>
              <div className="mt-3 text-xs">
                {
                  sensorData.emissions.greenhouseGases < 500 
                    ? "Low greenhouse gas emission" 
                    : sensorData.emissions.greenhouseGases < 1500 
                      ? "Moderate greenhouse gas emission" 
                      : "High greenhouse gas emission - reduction recommended"
                }
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="mt-6 text-xs text-right text-muted-foreground">
        Last updated: {new Date(sensorData.lastUpdated).toLocaleString()}
      </div>
    </GlassCard>
  );
};

export default IoTDataFeed;
