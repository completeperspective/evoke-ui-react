import { useState } from 'react';
import { Button, Input, Text, Badge, Heading, Label, Skeleton, Separator } from '@evoke-ui/react';

// Tailwind CSS is now provided through index.css with @theme configuration
import '@evoke-ui/react/tailwind.css';

function TailwindDemo() {
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLoadingTest = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl border border-blue-200 p-8 shadow-lg">
        <div className="flex items-center gap-4 mb-6">
          <Heading
            level="h1"
            className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
          >
            Full Tailwind Demo
          </Heading>
          <Badge
            variant="secondary"
            className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-none"
          >
            88KB tailwind.css
          </Badge>
        </div>

        <Text className="text-gray-700 mb-8 leading-relaxed">
          This page uses{' '}
          <code className="bg-gray-200/70 px-3 py-1 rounded-md text-sm font-mono border">
            @evoke-ui/react/tailwind.css
          </code>{' '}
          - the complete Tailwind CSS utility bundle that includes all Tailwind classes for maximum
          styling flexibility. Notice the enhanced styling capabilities with gradients, shadows, and
          advanced utilities.
        </Text>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Enhanced Button Section */}
          <section className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/50 shadow-sm">
            <Heading level="h2" className="mb-6 text-gray-800">
              Enhanced Buttons
            </Heading>
            <div className="space-y-6">
              <div className="flex flex-wrap gap-3">
                <Button variant="default" className="shadow-lg hover:shadow-xl transition-shadow">
                  Enhanced Default
                </Button>
                <Button
                  variant="secondary"
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-none"
                >
                  Gradient Secondary
                </Button>
                <Button
                  variant="outline"
                  className="border-2 border-blue-500 text-blue-600 hover:bg-blue-50"
                >
                  Thick Outline
                </Button>
                <Button
                  variant="ghost"
                  className="bg-yellow-50 text-yellow-700 hover:bg-yellow-100"
                >
                  Colored Ghost
                </Button>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button
                  variant="destructive"
                  className="bg-gradient-to-r from-red-500 to-red-600 shadow-lg hover:shadow-red-500/25"
                >
                  Enhanced Destructive
                </Button>
                <Button
                  variant="link"
                  className="text-blue-600 hover:text-blue-800 underline-offset-4"
                >
                  Styled Link
                </Button>
                <Button
                  loading={loading}
                  onClick={handleLoadingTest}
                  className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 shadow-lg"
                >
                  {loading ? 'Processing...' : 'Gradient Loading'}
                </Button>
              </div>
              <div className="flex flex-wrap gap-3 items-center">
                <Button
                  size="sm"
                  className="rounded-full shadow-md hover:shadow-lg transition-shadow"
                >
                  Small Rounded
                </Button>
                <Button
                  size="md"
                  className="rounded-lg bg-gradient-to-r from-orange-400 to-red-400 text-white border-none shadow-md"
                >
                  Medium Gradient
                </Button>
                <Button
                  size="lg"
                  className="rounded-2xl shadow-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white border-none"
                >
                  Large Multi-Gradient
                </Button>
              </div>
            </div>
          </section>

          {/* Enhanced Input Section */}
          <section className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/50 shadow-sm">
            <Heading level="h2" className="mb-6 text-gray-800">
              Enhanced Forms
            </Heading>
            <div className="space-y-6">
              <div className="relative">
                <Label
                  htmlFor="enhanced-input"
                  className="text-sm font-semibold text-gray-700 mb-2 block"
                >
                  Enhanced Input
                </Label>
                <Input
                  id="enhanced-input"
                  placeholder="Styled with full Tailwind utilities..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="border-2 border-blue-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 rounded-lg shadow-sm transition-all duration-200"
                />
              </div>
              <div>
                <Label
                  htmlFor="gradient-border-input"
                  className="text-sm font-semibold text-gray-700 mb-2 block"
                >
                  Gradient Border Effect
                </Label>
                <div className="p-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                  <Input
                    id="gradient-border-input"
                    placeholder="Gradient border effect"
                    className="bg-white border-none rounded-md shadow-inner"
                  />
                </div>
              </div>
              <div>
                <Label
                  htmlFor="shadow-input"
                  className="text-sm font-semibold text-gray-700 mb-2 block"
                >
                  Shadow Input
                </Label>
                <Input
                  id="shadow-input"
                  placeholder="Enhanced shadows and effects"
                  className="shadow-lg focus:shadow-xl border-gray-300 focus:border-indigo-500 rounded-lg transition-all duration-300"
                />
              </div>
            </div>
          </section>

          {/* Enhanced Badge Section */}
          <section className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/50 shadow-sm">
            <Heading level="h2" className="mb-6 text-gray-800">
              Enhanced Badges
            </Heading>
            <div className="space-y-6">
              <div className="flex flex-wrap gap-3">
                <Badge
                  variant="default"
                  className="shadow-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white"
                >
                  Gradient Default
                </Badge>
                <Badge
                  variant="secondary"
                  className="bg-gradient-to-r from-gray-700 to-gray-800 text-white shadow-md"
                >
                  Dark Gradient
                </Badge>
                <Badge
                  variant="outline"
                  className="border-2 border-purple-500 text-purple-600 bg-purple-50"
                >
                  Enhanced Outline
                </Badge>
                <Badge
                  variant="destructive"
                  className="bg-gradient-to-r from-red-500 to-pink-500 shadow-lg"
                >
                  Gradient Destructive
                </Badge>
              </div>
              <div className="flex flex-wrap gap-3 items-center">
                <Badge size="sm" className="rounded-full bg-green-500 text-white shadow-md">
                  Small Pill
                </Badge>
                <Badge
                  size="md"
                  className="rounded-lg bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-md"
                >
                  Medium Gradient
                </Badge>
                <Badge
                  size="lg"
                  className="rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg"
                >
                  Large Enhanced
                </Badge>
              </div>
              <div className="bg-gray-900 p-4 rounded-lg">
                <div className="flex flex-wrap gap-3">
                  <Badge className="bg-cyan-400 text-black shadow-lg">Neon Cyan</Badge>
                  <Badge className="bg-pink-400 text-black shadow-lg">Neon Pink</Badge>
                  <Badge className="bg-green-400 text-black shadow-lg">Neon Green</Badge>
                </div>
              </div>
            </div>
          </section>

          {/* Enhanced Typography Section */}
          <section className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/50 shadow-sm">
            <Heading level="h2" className="mb-6 text-gray-800">
              Enhanced Typography
            </Heading>
            <div className="space-y-4">
              <Heading
                level="h1"
                className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent font-bold"
              >
                Gradient Heading H1
              </Heading>
              <Heading level="h2" className="text-gray-800 drop-shadow-sm">
                Shadow Heading H2
              </Heading>
              <Heading level="h3" className="text-indigo-700 font-semibold">
                Colored Heading H3
              </Heading>
              <Separator className="bg-gradient-to-r from-blue-500 to-purple-500 h-1 rounded-full" />
              <Text variant="large" className="text-gray-700 leading-relaxed drop-shadow-sm">
                Enhanced large text with better spacing and subtle shadow effects for improved
                readability.
              </Text>
              <Text
                variant="body"
                className="text-gray-600 bg-gray-50 p-3 rounded-lg border-l-4 border-blue-500"
              >
                Body text with background styling and accent border.
              </Text>
              <Text variant="small" className="text-gray-500 italic">
                Small italicized text with subtle coloring.
              </Text>
              <Text
                variant="caption"
                className="text-gray-400 font-mono bg-gray-100 px-2 py-1 rounded"
              >
                Caption text (monospace) with background.
              </Text>
            </div>
          </section>
        </div>

        <Separator className="my-10 bg-gradient-to-r from-transparent via-gray-400 to-transparent h-px" />

        {/* Enhanced Loading States */}
        <section className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/50 shadow-sm">
          <Heading level="h2" className="mb-6 text-gray-800">
            Enhanced Loading States
          </Heading>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
              <Label className="mb-3 block font-semibold text-blue-800">Gradient Skeleton</Label>
              <Skeleton className="h-4 w-full mb-3 bg-gradient-to-r from-blue-200 to-blue-300 rounded-lg" />
              <Skeleton className="h-4 w-3/4 bg-gradient-to-r from-blue-200 to-blue-300 rounded-lg" />
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200">
              <Label className="mb-3 block font-semibold text-purple-800">Animated Skeleton</Label>
              <Skeleton className="h-10 w-36 bg-gradient-to-r from-purple-200 to-purple-300 rounded-lg shadow-sm" />
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
              <Label className="mb-3 block font-semibold text-green-800">Avatar Skeleton</Label>
              <Skeleton className="h-14 w-14 bg-gradient-to-r from-green-200 to-green-300 rounded-full shadow-md" />
            </div>
          </div>
        </section>

        <Separator className="my-10 bg-gradient-to-r from-transparent via-gray-400 to-transparent h-px" />

        {/* Enhanced Interactive Test */}
        <section className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200 shadow-inner">
          <Heading level="h2" className="mb-6 text-gray-800">
            Enhanced Interactive State
          </Heading>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <Text className="mb-3 text-gray-700">Current input value:</Text>
              <Badge
                variant="outline"
                className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-300 text-blue-700 px-3 py-1"
              >
                {inputValue || '(empty)'}
              </Badge>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <Text className="mb-3 text-gray-700">Loading state:</Text>
              <Badge
                variant={loading ? 'destructive' : 'default'}
                className={
                  loading
                    ? 'bg-gradient-to-r from-red-500 to-pink-500 animate-pulse shadow-lg'
                    : 'bg-gradient-to-r from-green-500 to-emerald-500 shadow-md'
                }
              >
                {loading ? 'Active & Pulsing' : 'Inactive & Stable'}
              </Badge>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default TailwindDemo;
