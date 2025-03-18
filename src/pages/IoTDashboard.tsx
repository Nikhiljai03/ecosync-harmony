
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import IoTDataFeed from '@/components/iot/IoTDataFeed';
import GreenCreditScore from '@/components/iot/GreenCreditScore';
import BlockchainStatus from '@/components/iot/BlockchainStatus';
import EntitySelector from '@/components/iot/EntitySelector';
import SustainabilityRecommendations from '@/components/iot/SustainabilityRecommendations';
import { useIoTData } from '@/hooks/useIoTData';
import { EntityType } from '@/types/iot';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const IoTDashboard = () => {
  const [selectedEntityType, setSelectedEntityType] = useState<EntityType>('company');
  const [selectedEntityId, setSelectedEntityId] = useState<string>('');
  const { 
    sensorData, 
    creditScore, 
    blockchainStatus,
    recommendations,
    fines,
    isLoading, 
    error 
  } = useIoTData(selectedEntityType, selectedEntityId);

  useEffect(() => {
    document.title = 'EcoSync - IoT Dashboard';
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-white dark:bg-ecosync-dark"
    >
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-2">
            IoT Sustainability Dashboard
          </h1>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto">
            Real-time environmental data collection, green credit scoring, and blockchain verification for companies, civilians, and smart cities.
          </p>
        </motion.div>

        <div className="mb-8">
          <EntitySelector 
            selectedEntityType={selectedEntityType}
            setSelectedEntityType={setSelectedEntityType}
            selectedEntityId={selectedEntityId}
            setSelectedEntityId={setSelectedEntityId}
          />
        </div>
        
        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-ecosync-green-dark"></div>
          </div>
        ) : error ? (
          <div className="text-center py-20 text-destructive">
            <p>Error loading data: {error}</p>
          </div>
        ) : (
          <Tabs defaultValue="dashboard" className="w-full">
            <TabsList className="w-full mb-6 grid grid-cols-2">
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="recommendations">Recommendations & Compliance</TabsTrigger>
            </TabsList>
            
            <TabsContent value="dashboard">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                <IoTDataFeed sensorData={sensorData} entityType={selectedEntityType} />
                <GreenCreditScore score={creditScore} entityType={selectedEntityType} />
                <BlockchainStatus status={blockchainStatus} />
              </div>
            </TabsContent>
            
            <TabsContent value="recommendations">
              <div className="grid grid-cols-1 gap-6 mb-10">
                <SustainabilityRecommendations 
                  recommendations={recommendations}
                  fines={fines}
                  entityType={selectedEntityType}
                  isLoading={isLoading}
                />
              </div>
            </TabsContent>
          </Tabs>
        )}
      </main>
      <Footer />
    </motion.div>
  );
};

export default IoTDashboard;
