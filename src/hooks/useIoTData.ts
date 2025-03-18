
import { useState, useEffect } from 'react';
import { AggregatedSensorData, BlockchainStatusData, EntityType, GreenCreditScoreData } from '@/types/iot';
import { fetchEntityData, calculateGreenScore, storeOnBlockchain } from '@/lib/iotService';
import { FineAssessment, RecommendationItem, getSustainabilityRecommendations } from '@/lib/sustainabilityRecommendations';

export const useIoTData = (entityType: EntityType, entityId: string) => {
  const [sensorData, setSensorData] = useState<AggregatedSensorData | null>(null);
  const [creditScore, setCreditScore] = useState<GreenCreditScoreData | null>(null);
  const [blockchainStatus, setBlockchainStatus] = useState<BlockchainStatusData | null>(null);
  const [recommendations, setRecommendations] = useState<RecommendationItem[]>([]);
  const [fines, setFines] = useState<FineAssessment[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      if (!entityId) {
        setIsLoading(false);
        return;
      }
      
      setIsLoading(true);
      setError(null);
      
      try {
        // For demo purposes, we're using simulated data
        // In a real app, this would connect to actual IoT sensors
        const data = await fetchEntityData(entityType, entityId);
        
        if (isMounted) {
          setSensorData(data);
          
          // Calculate green credit score using our AI model
          const score = await calculateGreenScore(entityType, data);
          setCreditScore(score);
          
          // Get AI-generated sustainability recommendations and fines
          const { recommendations, fines } = await getSustainabilityRecommendations(
            entityType,
            data,
            score
          );
          setRecommendations(recommendations);
          setFines(fines);
          
          // Store the data and score on blockchain
          const status = await storeOnBlockchain(entityType, entityId, data, score);
          setBlockchainStatus(status);
          
          setIsLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          console.error('Error fetching IoT data:', err);
          setError(err instanceof Error ? err.message : 'Failed to fetch data');
          setIsLoading(false);
        }
      }
    };

    fetchData();
    
    // Set up a polling interval to fetch real-time data
    const interval = setInterval(fetchData, 30000); // Update every 30 seconds
    
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [entityType, entityId]);

  return { 
    sensorData, 
    creditScore, 
    blockchainStatus, 
    recommendations,
    fines,
    isLoading, 
    error 
  };
};
