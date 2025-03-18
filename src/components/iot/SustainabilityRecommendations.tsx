
import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, AlertCircle, BadgeDollarSign } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { RecommendationItem, FineAssessment } from '@/lib/sustainabilityRecommendations';
import { EntityType } from '@/types/iot';

interface SustainabilityRecommendationsProps {
  recommendations: RecommendationItem[];
  fines: FineAssessment[];
  entityType: EntityType;
  isLoading: boolean;
}

const SustainabilityRecommendations: React.FC<SustainabilityRecommendationsProps> = ({
  recommendations,
  fines,
  entityType,
  isLoading
}) => {
  if (isLoading) {
    return (
      <GlassCard className="h-full flex items-center justify-center">
        <p className="text-muted-foreground">Loading recommendations...</p>
      </GlassCard>
    );
  }

  if (!recommendations.length && !fines.length) {
    return (
      <GlassCard className="h-full flex flex-col items-center justify-center p-8 text-center">
        <Lightbulb className="h-12 w-12 text-green-500 mb-4" />
        <h3 className="text-xl font-semibold mb-2">No Recommendations Needed</h3>
        <p className="text-muted-foreground">
          Great job! Your environmental performance is excellent. 
          Keep up the good work to maintain your sustainability score.
        </p>
      </GlassCard>
    );
  }

  return (
    <GlassCard className="space-y-4">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-semibold flex items-center">
            <Lightbulb className="mr-2 h-5 w-5 text-amber-500" />
            Sustainability Recommendations
          </h2>
          <p className="text-sm text-muted-foreground">
            AI-generated guidance to improve your environmental impact
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {recommendations.length > 0 && (
          <div>
            <h3 className="text-lg font-medium mb-3">Improvement Actions</h3>
            <Accordion type="single" collapsible className="space-y-2">
              {recommendations.map((rec, index) => (
                <motion.div
                  key={`${rec.category}-${index}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <AccordionItem value={`item-${index}`} className="border rounded-lg overflow-hidden">
                    <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-muted/50">
                      <div className="flex items-center text-left">
                        <Badge 
                          className={`mr-3 ${
                            rec.severity === 'critical' ? 'bg-red-500' : 
                            rec.severity === 'high' ? 'bg-orange-500' : 
                            rec.severity === 'medium' ? 'bg-amber-500' : 'bg-green-500'
                          }`}
                        >
                          {rec.severity.toUpperCase()}
                        </Badge>
                        <span>{rec.title}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pt-2 pb-4">
                      <p className="mb-3">{rec.description}</p>
                      <div className="mb-3">
                        <span className="text-sm font-medium">Environmental Impact:</span>
                        <p className="text-sm text-muted-foreground">{rec.impact}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium">Recommended Actions:</span>
                        <ul className="mt-2 space-y-2">
                          {rec.suggestedActions.map((action, i) => (
                            <li key={i} className="flex items-start">
                              <span className="h-5 w-5 text-green-500 mr-2">•</span>
                              <span className="text-sm">{action}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </div>
        )}

        {fines.length > 0 && (
          <div className="pt-2">
            <h3 className="text-lg font-medium mb-3 flex items-center">
              <AlertCircle className="mr-2 h-5 w-5 text-red-500" />
              Regulatory Notices
              {entityType === 'civilian' ? ' (Warnings Only)' : ''}
            </h3>
            <div className="space-y-3">
              {fines.map((fine, index) => (
                <motion.div
                  key={`${fine.category}-${index}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="border rounded-lg p-4"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center">
                      <BadgeDollarSign className="h-5 w-5 text-red-500 mr-2" />
                      <h4 className="font-medium">
                        {fine.amount > 0 
                          ? `Fine: $${fine.amount.toLocaleString()}`
                          : 'Warning Notice'
                        }
                      </h4>
                    </div>
                    {fine.regulationCode && (
                      <Badge variant="outline" className="text-xs">
                        Ref: {fine.regulationCode}
                      </Badge>
                    )}
                  </div>
                  
                  <p className="text-sm mb-3">{fine.reason}</p>
                  
                  {fine.amount > 0 && (
                    <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                      <div>
                        <span className="block font-medium">Due Date:</span>
                        {fine.dueDate.toLocaleDateString()}
                      </div>
                      <div>
                        <span className="block font-medium">Appeal By:</span>
                        {fine.appealDeadline.toLocaleDateString()}
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </GlassCard>
  );
};

export default SustainabilityRecommendations;
