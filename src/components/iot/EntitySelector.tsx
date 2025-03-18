
import React from 'react';
import { Check, ChevronDown } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { EntityType } from '@/types/iot';

// Sample data for demo purposes
const SAMPLE_ENTITIES = {
  company: [
    { id: 'comp-001', name: 'EcoTech Industries' },
    { id: 'comp-002', name: 'GreenWave Manufacturing' },
    { id: 'comp-003', name: 'SustainCorp Energy' },
  ],
  civilian: [
    { id: 'civ-001', name: 'John Smith' },
    { id: 'civ-002', name: 'Maria Rodriguez' },
    { id: 'civ-003', name: 'Ravi Patel' },
  ],
  city: [
    { id: 'city-001', name: 'Greenville' },
    { id: 'city-002', name: 'New Eco City' },
    { id: 'city-003', name: 'Sustainopolis' },
  ],
};

interface EntitySelectorProps {
  selectedEntityType: EntityType;
  setSelectedEntityType: (type: EntityType) => void;
  selectedEntityId: string;
  setSelectedEntityId: (id: string) => void;
}

const EntitySelector: React.FC<EntitySelectorProps> = ({
  selectedEntityType,
  setSelectedEntityType,
  selectedEntityId,
  setSelectedEntityId,
}) => {
  const handleEntityTypeChange = (value: string) => {
    setSelectedEntityType(value as EntityType);
    setSelectedEntityId(''); // Reset selected entity when type changes
  };

  const getEntityName = () => {
    const entity = SAMPLE_ENTITIES[selectedEntityType].find(e => e.id === selectedEntityId);
    return entity ? entity.name : 'Select an entity';
  };

  return (
    <GlassCard className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Entity Type</label>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full justify-between">
                {selectedEntityType.charAt(0).toUpperCase() + selectedEntityType.slice(1)}
                <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuRadioGroup value={selectedEntityType} onValueChange={handleEntityTypeChange}>
                <DropdownMenuRadioItem value="company">Company</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="civilian">Civilian</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="city">City</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Select {selectedEntityType}</label>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full justify-between">
                {getEntityName()}
                <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuRadioGroup value={selectedEntityId} onValueChange={setSelectedEntityId}>
                {SAMPLE_ENTITIES[selectedEntityType].map(entity => (
                  <DropdownMenuRadioItem key={entity.id} value={entity.id}>
                    {entity.name}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Custom ID (Optional)</label>
          <div className="flex items-center space-x-2">
            <Input 
              type="text" 
              placeholder="Enter custom ID" 
              onChange={(e) => setSelectedEntityId(e.target.value)}
              value={!SAMPLE_ENTITIES[selectedEntityType].find(e => e.id === selectedEntityId) ? selectedEntityId : ''}
            />
            <Button 
              variant="outline" 
              className="flex-shrink-0"
              onClick={() => setSelectedEntityId('')}
            >
              Reset
            </Button>
          </div>
        </div>
      </div>
    </GlassCard>
  );
};

export default EntitySelector;
