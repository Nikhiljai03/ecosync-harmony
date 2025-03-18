
import React from 'react';
import GlassCard from '@/components/ui/GlassCard';
import { GreenCreditScoreData, EntityType } from '@/types/iot';
import { ArrowDown, ArrowRight, ArrowUp, ChartBar, Medal, TrendingDown, TrendingUp } from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
  Legend
} from 'recharts';
import {
  ChartContainer,
} from "@/components/ui/chart";

interface GreenCreditScoreProps {
  score: GreenCreditScoreData | null;
  entityType: EntityType;
}

const GreenCreditScore: React.FC<GreenCreditScoreProps> = ({ score, entityType }) => {
  if (!score) {
    return (
      <GlassCard className="h-full flex items-center justify-center">
        <p className="text-muted-foreground">Select an entity to view green credit score</p>
      </GlassCard>
    );
  }

  // Sample historical data for chart
  const historicalData = [
    { month: 'Jan', score: Math.max(0, score.overall - 12 + Math.round(Math.random() * 20)) },
    { month: 'Feb', score: Math.max(0, score.overall - 10 + Math.round(Math.random() * 20)) },
    { month: 'Mar', score: Math.max(0, score.overall - 8 + Math.round(Math.random() * 20)) },
    { month: 'Apr', score: Math.max(0, score.overall - 6 + Math.round(Math.random() * 20)) },
    { month: 'May', score: Math.max(0, score.overall - 4 + Math.round(Math.random() * 20)) },
    { month: 'Jun', score: Math.max(0, score.overall - 2 + Math.round(Math.random() * 10)) },
    { month: 'Jul', score: score.overall },
  ];

  // Category data for radial chart
  const categoryData = [
    { name: 'Air Quality', value: score.categories.airQuality, fill: '#4ade80' },
    { name: 'Energy', value: score.categories.energyEfficiency, fill: '#3b82f6' },
    { name: 'Water', value: score.categories.waterConservation, fill: '#06b6d4' },
    { name: 'Waste', value: score.categories.wasteManagement, fill: '#f59e0b' },
    { name: 'Carbon', value: score.categories.carbonFootprint, fill: '#8b5cf6' },
  ];

  return (
    <GlassCard className="space-y-4">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-semibold flex items-center">
            <ChartBar className="mr-2 h-5 w-5 text-ecosync-green-dark" />
            Green Credit Score
          </h2>
          <p className="text-sm text-muted-foreground">
            AI calculated sustainability rating for {entityType}
          </p>
        </div>
        <div className="flex items-center">
          {score.trend === 'improving' ? (
            <TrendingUp className="h-5 w-5 text-green-500 mr-1" />
          ) : score.trend === 'declining' ? (
            <TrendingDown className="h-5 w-5 text-red-500 mr-1" />
          ) : (
            <ArrowRight className="h-5 w-5 text-yellow-500 mr-1" />
          )}
          <span className={`text-sm font-medium ${
            score.trend === 'improving' ? 'text-green-500' : 
            score.trend === 'declining' ? 'text-red-500' : 'text-yellow-500'
          }`}>
            {score.trend.charAt(0).toUpperCase() + score.trend.slice(1)}
          </span>
        </div>
      </div>
      
      <div className="flex items-center justify-center py-4">
        <div className="relative h-36 w-36 flex items-center justify-center">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <circle
              className="text-muted stroke-current"
              strokeWidth="10"
              cx="50"
              cy="50"
              r="40"
              fill="transparent"
            />
            <circle
              className={`
                ${score.overall >= 75 ? 'text-green-500' : 
                  score.overall >= 50 ? 'text-yellow-500' : 'text-red-500'} 
                stroke-current
              `}
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={`${score.overall * 2.51} 251.2`}
              strokeDashoffset="0"
              cx="50"
              cy="50"
              r="40"
              fill="transparent"
              transform="rotate(-90 50 50)"
            />
          </svg>
          <div className="absolute flex flex-col items-center justify-center">
            <span className="text-4xl font-bold">{score.overall}</span>
            <span className="text-xs text-muted-foreground">out of 100</span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center justify-between px-4 py-2 rounded-lg bg-muted/50">
        <div className="flex items-center">
          <Medal className="h-4 w-4 text-yellow-500 mr-1" />
          <span className="text-sm">Rank: <strong>{score.ranking}</strong></span>
        </div>
        <span className="text-xs text-muted-foreground">
          of {score.totalEntities} {entityType}s
        </span>
      </div>
      
      <div className="h-44">
        <h3 className="text-sm font-medium mb-2">6-Month Trend</h3>
        <ChartContainer className="h-36" config={{
          score: { theme: { dark: "#10b981", light: "#10b981" } },
        }}>
          <AreaChart data={historicalData}>
            <defs>
              <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis dataKey="month" tick={{ fontSize: 10 }} />
            <YAxis domain={[0, 100]} tick={{ fontSize: 10 }} />
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <Tooltip />
            <Area type="monotone" dataKey="score" stroke="#10b981" fillOpacity={1} fill="url(#colorScore)" />
          </AreaChart>
        </ChartContainer>
      </div>
      
      <div className="h-72">
        <h3 className="text-sm font-medium mb-2">Category Breakdown</h3>
        <ChartContainer className="h-64" config={{}}>
          <RadialBarChart 
            innerRadius="30%" 
            outerRadius="90%" 
            data={categoryData} 
            startAngle={180} 
            endAngle={0}
          >
            <RadialBar 
              label={{ fill: '#666', position: 'insideStart' }}
              background
              dataKey="value"
            />
            <Legend iconSize={10} layout="horizontal" verticalAlign="bottom" />
            <Tooltip />
          </RadialBarChart>
        </ChartContainer>
      </div>
    </GlassCard>
  );
};

export default GreenCreditScore;
