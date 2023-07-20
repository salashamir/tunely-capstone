"use client";

import * as RadixSlider from "@radix-ui/react-slider";

interface SliderProps {
  value?: number;
  onChange?: (value: number) => void;
}

const Slider: React.FC<SliderProps> = ({ value = 1, onChange }) => {
  const handleChange = (newValue: number[]) => {
    onChange?.(newValue[0]);
  };

  return (
    <RadixSlider.Root
      className="relative flex select-none items-center w-full touch-none h-10"
      defaultValue={[1]}
      value={[value]}
      step={0.1}
      max={1}
      aria-label="Volume slider"
      onValueChange={handleChange}
    >
      <RadixSlider.Track className="bg-pink-900 h-[4px] relative grow rounded-full">
        <RadixSlider.Range className="absolute rounded-full h-full bg-gray-900" />
      </RadixSlider.Track>
    </RadixSlider.Root>
  );
};

export default Slider;
