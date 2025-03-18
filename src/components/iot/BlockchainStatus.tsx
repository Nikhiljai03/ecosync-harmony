
import React from 'react';
import GlassCard from '@/components/ui/GlassCard';
import { BlockchainStatusData } from '@/types/iot';
import { ClipboardCheck, Layers, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BlockchainStatusProps {
  status: BlockchainStatusData | null;
}

const BlockchainStatus: React.FC<BlockchainStatusProps> = ({ status }) => {
  if (!status) {
    return (
      <GlassCard className="h-full flex items-center justify-center">
        <p className="text-muted-foreground">Select an entity to view blockchain status</p>
      </GlassCard>
    );
  }

  return (
    <GlassCard className="flex flex-col h-full">
      <div>
        <h2 className="text-xl font-semibold flex items-center mb-2">
          <Layers className="mr-2 h-5 w-5 text-ecosync-blue-dark" />
          Blockchain Verification
        </h2>
        <p className="text-sm text-muted-foreground mb-6">
          Immutable record of environmental data and green credits
        </p>
      </div>

      <div className="flex items-center justify-between mb-4 p-3 rounded-lg bg-muted/30">
        <div className="text-sm">Network</div>
        <div className="font-medium flex items-center">
          <span className={`h-2 w-2 rounded-full mr-2 ${
            status.syncStatus === 'synced' ? 'bg-green-500' : 
            status.syncStatus === 'syncing' ? 'bg-yellow-500' : 'bg-red-500'
          }`}></span>
          {status.network}
        </div>
      </div>

      <div className="border rounded-lg p-4 mb-4 flex-1">
        <h3 className="text-sm font-medium mb-3">Latest Transaction</h3>
        <div className="space-y-2">
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground">Hash</span>
            <code className="text-xs bg-muted/50 p-1 rounded overflow-x-auto whitespace-nowrap">
              {status.lastTransaction.hash}
            </code>
          </div>
          <div className="flex justify-between">
            <div>
              <span className="text-xs text-muted-foreground">Status</span>
              <div className={`text-sm font-medium ${
                status.lastTransaction.status === 'confirmed' ? 'text-green-500' : 
                status.lastTransaction.status === 'pending' ? 'text-yellow-500' : 'text-red-500'
              }`}>
                {status.lastTransaction.status.charAt(0).toUpperCase() + status.lastTransaction.status.slice(1)}
              </div>
            </div>
            <div>
              <span className="text-xs text-muted-foreground">Time</span>
              <div className="text-sm">
                {new Date(status.lastTransaction.timestamp).toLocaleTimeString()}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <ClipboardCheck className="h-4 w-4 mr-1 text-green-500" />
          <span className="text-sm">{status.totalTransactions} total transactions</span>
        </div>
        <div className={`text-xs px-2 py-1 rounded-full ${
          status.syncStatus === 'synced' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' : 
          status.syncStatus === 'syncing' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' : 
          'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
        }`}>
          {status.syncStatus.charAt(0).toUpperCase() + status.syncStatus.slice(1)}
        </div>
      </div>

      <Button variant="outline" className="w-full flex items-center justify-center">
        <RefreshCw className="h-4 w-4 mr-2" />
        Verify on Blockchain Explorer
      </Button>
    </GlassCard>
  );
};

export default BlockchainStatus;
