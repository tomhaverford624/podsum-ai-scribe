
import React from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import { Button } from './ui/button';
import { ChevronDown, ChevronUp, Settings } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface AdvancedOptionsProps {
  summaryLength: string;
  onSummaryLengthChange: (value: string) => void;
  language: string;
  onLanguageChange: (value: string) => void;
  modelQuality: string;
  onModelQualityChange: (value: string) => void;
}

export const AdvancedOptions: React.FC<AdvancedOptionsProps> = ({
  summaryLength,
  onSummaryLengthChange,
  language,
  onLanguageChange,
  modelQuality,
  onModelQualityChange,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="w-full max-w-2xl mx-auto mt-4">
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="w-full border rounded-md overflow-hidden"
      >
        <CollapsibleTrigger asChild>
          <Button variant="ghost" className="w-full flex justify-between px-4 py-2">
            <div className="flex items-center gap-2">
              <Settings size={16} />
              <span>Advanced Options</span>
            </div>
            {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="p-4 border-t">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="text-sm font-medium mb-2">Summary Length</h4>
              <RadioGroup value={summaryLength} onValueChange={onSummaryLengthChange} className="space-y-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="short" id="summary-short" />
                  <Label htmlFor="summary-short">Short</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="medium" id="summary-medium" />
                  <Label htmlFor="summary-medium">Medium</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="detailed" id="summary-detailed" />
                  <Label htmlFor="summary-detailed">Detailed</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-2">Language</h4>
              <Select value={language} onValueChange={onLanguageChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Spanish</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                  <SelectItem value="de">German</SelectItem>
                  <SelectItem value="zh">Chinese</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-2">Model Quality</h4>
              <Select value={modelQuality} onValueChange={onModelQualityChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select model" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">Standard</SelectItem>
                  <SelectItem value="premium">Premium</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default AdvancedOptions;
