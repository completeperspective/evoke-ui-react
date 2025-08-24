import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { adjustLightness, adjustChroma, rotateHue, generateColorScale } from './colors';

const meta = {
  title: 'Design System/Utilities/Color Utils',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'OKLCH color space utilities for perceptually uniform color manipulation.',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const ColorUtilsDemo = () => {
  const [baseColor, setBaseColor] = useState('0.65 0.2 255');
  const [lightnessAdjust, setLightnessAdjust] = useState(0);
  const [chromaAdjust, setChromaAdjust] = useState(0);
  const [hueRotate, setHueRotate] = useState(0);

  const colorScale = generateColorScale(baseColor);
  const adjustedLightness = adjustLightness(baseColor, lightnessAdjust);
  const adjustedChroma = adjustChroma(baseColor, chromaAdjust);
  const rotatedHue = rotateHue(baseColor, hueRotate);

  const ColorSwatch = ({ color, label }: { color: string; label: string }) => (
    <div className="space-y-2">
      <div className="h-20 rounded-md border" style={{ backgroundColor: `oklch(${color})` }} />
      <div className="text-xs space-y-1">
        <p className="font-semibold">{label}</p>
        <code className="text-muted-foreground">{color}</code>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">OKLCH Color Utilities</h2>
        <p className="text-muted-foreground">
          OKLCH provides perceptually uniform color adjustments, better accessibility calculations,
          and wide gamut support for modern displays.
        </p>
      </div>

      {/* Base Color Input */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Base Color</h3>
        <div className="flex gap-4 items-center">
          <input
            type="text"
            value={baseColor}
            onChange={(e) => setBaseColor(e.target.value)}
            className="px-3 py-2 border rounded-md bg-background"
            placeholder="L C H (e.g., 0.65 0.2 255)"
          />
          <div
            className="w-20 h-10 rounded-md border"
            style={{ backgroundColor: `oklch(${baseColor})` }}
          />
        </div>
        <p className="text-sm text-muted-foreground">
          Format: Lightness (0-1) Chroma (0-0.4) Hue (0-360)
        </p>
      </div>

      {/* Color Scale Generation */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Generated Color Scale</h3>
        <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
          {Object.entries(colorScale).map(([key, value]) => (
            <ColorSwatch key={key} color={value} label={key} />
          ))}
        </div>
      </div>

      {/* Lightness Adjustment */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Lightness Adjustment</h3>
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">
            Adjustment: {lightnessAdjust > 0 ? '+' : ''}
            {lightnessAdjust.toFixed(2)}
          </label>
          <input
            type="range"
            min="-0.5"
            max="0.5"
            step="0.01"
            value={lightnessAdjust}
            onChange={(e) => setLightnessAdjust(parseFloat(e.target.value))}
            className="w-full"
          />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <ColorSwatch color={adjustLightness(baseColor, -0.2)} label="Darker (-0.2)" />
          <ColorSwatch color={baseColor} label="Original" />
          <ColorSwatch
            color={adjustedLightness}
            label={`Adjusted (${lightnessAdjust > 0 ? '+' : ''}${lightnessAdjust.toFixed(2)})`}
          />
        </div>
      </div>

      {/* Chroma Adjustment */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Chroma Adjustment</h3>
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">
            Adjustment: {chromaAdjust > 0 ? '+' : ''}
            {chromaAdjust.toFixed(2)}
          </label>
          <input
            type="range"
            min="-0.2"
            max="0.2"
            step="0.01"
            value={chromaAdjust}
            onChange={(e) => setChromaAdjust(parseFloat(e.target.value))}
            className="w-full"
          />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <ColorSwatch color={adjustChroma(baseColor, -0.1)} label="Less Vivid (-0.1)" />
          <ColorSwatch color={baseColor} label="Original" />
          <ColorSwatch
            color={adjustedChroma}
            label={`Adjusted (${chromaAdjust > 0 ? '+' : ''}${chromaAdjust.toFixed(2)})`}
          />
        </div>
      </div>

      {/* Hue Rotation */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Hue Rotation</h3>
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">Rotation: {hueRotate}°</label>
          <input
            type="range"
            min="-180"
            max="180"
            step="1"
            value={hueRotate}
            onChange={(e) => setHueRotate(parseInt(e.target.value))}
            className="w-full"
          />
        </div>
        <div className="grid grid-cols-5 gap-2">
          <ColorSwatch color={rotateHue(baseColor, -90)} label="-90°" />
          <ColorSwatch color={rotateHue(baseColor, -45)} label="-45°" />
          <ColorSwatch color={baseColor} label="Original" />
          <ColorSwatch color={rotateHue(baseColor, 45)} label="+45°" />
          <ColorSwatch color={rotatedHue} label={`${hueRotate}°`} />
        </div>
      </div>

      {/* OKLCH Benefits */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">OKLCH Color Space Benefits</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="p-4 border rounded-lg space-y-2">
            <h4 className="font-semibold text-sm">Perceptually Uniform</h4>
            <p className="text-sm text-muted-foreground">
              Lightness and chroma adjustments appear consistent to human vision across all hues.
            </p>
          </div>
          <div className="p-4 border rounded-lg space-y-2">
            <h4 className="font-semibold text-sm">Wide Gamut Support</h4>
            <p className="text-sm text-muted-foreground">
              Supports P3 and Rec2020 color spaces for modern displays.
            </p>
          </div>
          <div className="p-4 border rounded-lg space-y-2">
            <h4 className="font-semibold text-sm">Better Accessibility</h4>
            <p className="text-sm text-muted-foreground">
              More accurate contrast calculations for WCAG compliance.
            </p>
          </div>
          <div className="p-4 border rounded-lg space-y-2">
            <h4 className="font-semibold text-sm">Predictable Mixing</h4>
            <p className="text-sm text-muted-foreground">
              Color interpolation and gradients appear more natural.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Default: Story = {
  render: () => <ColorUtilsDemo />,
};
