import { useState } from 'react';
import { 
  Button, 
  Input, 
  Text, 
  Badge, 
  Heading, 
  Label, 
  Skeleton, 
  Separator,
  SearchBar,
  Card,
  CardHeader,
  CardContent
} from '@evoke-ui/react';

function DesignSystemDemo() {
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [searchError, setSearchError] = useState(false);

  const handleLoadingTest = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  const handleSearch = (value: string) => {
    console.log('Searching for:', value);
    if (value === 'error') {
      setSearchError(true);
      setTimeout(() => setSearchError(false), 3000);
    }
  };

  return (
    <div className="space-y-8">
      <div className="rounded-lg border border-border p-6">
        <div className="flex items-center gap-4 mb-6">
          <Heading level="h1">Design System Demo</Heading>
          <Badge variant="secondary">22KB styles.css</Badge>
        </div>

        <Text className="text-gray-600 mb-8">
          This page uses{' '}
          <code className="bg-gray-100 px-2 py-1 rounded text-sm">@evoke-ui/react/styles.css</code>{' '}
          - the optimized design system CSS bundle containing only the necessary styles for Evoke UI
          components.
        </Text>

        {/* SearchBar Focus Test Section */}
        <section className="mb-8">
          <Heading level="h2" className="mb-4">
            SearchBar Component - Focus State Testing
          </Heading>
          <div className="space-y-6">
            {/* Basic SearchBar */}
            <Card>
              <CardHeader>
                <Heading level="h3">Basic SearchBar</Heading>
              </CardHeader>
              <CardContent>
                <SearchBar
                  placeholder="Search products..."
                  value={searchValue}
                  onChange={setSearchValue}
                  onSearch={handleSearch}
                  showClearButton
                />
                <Text className="mt-2 text-sm text-gray-600">
                  Focus on this input to test focus ring styles
                </Text>
              </CardContent>
            </Card>

            {/* SearchBar with Action Button */}
            <Card>
              <CardHeader>
                <Heading level="h3">SearchBar with Action Button</Heading>
              </CardHeader>
              <CardContent>
                <SearchBar
                  placeholder="Search with button..."
                  showActionButton
                  actionButtonText="Search"
                  showClearButton
                  onSearch={handleSearch}
                />
                <Text className="mt-2 text-sm text-gray-600">
                  Test focus states with both clear and action buttons
                </Text>
              </CardContent>
            </Card>

            {/* SearchBar with Error State */}
            <Card>
              <CardHeader>
                <Heading level="h3">SearchBar with Error State</Heading>
              </CardHeader>
              <CardContent>
                <SearchBar
                  placeholder="Type 'error' to trigger error state..."
                  error={searchError ? "Invalid search term" : undefined}
                  showClearButton
                  onSearch={handleSearch}
                />
                <Text className="mt-2 text-sm text-gray-600">
                  Type 'error' to see error state focus ring
                </Text>
              </CardContent>
            </Card>

            {/* SearchBar Variants */}
            <Card>
              <CardHeader>
                <Heading level="h3">SearchBar Variants</Heading>
              </CardHeader>
              <CardContent className="space-y-4">
                <SearchBar
                  variant="default"
                  placeholder="Default variant..."
                  showClearButton
                />
                <SearchBar
                  variant="compact"
                  size="sm"
                  placeholder="Compact variant..."
                  showClearButton
                />
                <SearchBar
                  variant="prominent"
                  size="lg"
                  placeholder="Prominent variant..."
                  showClearButton
                  showActionButton
                />
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="my-8" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Button Section */}
          <section>
            <Heading level="h2" className="mb-4">
              Buttons
            </Heading>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Button variant="default">Default</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button variant="destructive">Destructive</Button>
                <Button variant="link">Link</Button>
                <Button loading={loading} onClick={handleLoadingTest}>
                  {loading ? 'Loading...' : 'Test Loading'}
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 items-center">
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
              </div>
            </div>
          </section>

          {/* Input Section */}
          <section>
            <Heading level="h2" className="mb-4">
              Input & Forms - Focus Testing
            </Heading>
            <div className="space-y-4">
              <div>
                <Label htmlFor="test-input">Standard Input (Focus to test ring)</Label>
                <Input
                  id="test-input"
                  placeholder="Type something..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="error-state-input">Input with Error State</Label>
                <Input 
                  id="error-state-input" 
                  placeholder="Focus to see error focus ring"
                  state="error"
                  error="This field has an error"
                />
              </div>
              <div>
                <Label htmlFor="success-state-input">Input with Success State</Label>
                <Input 
                  id="success-state-input" 
                  placeholder="Focus to see success focus ring"
                  state="success"
                />
              </div>
              <div>
                <Label htmlFor="disabled-input">Disabled Input (No focus)</Label>
                <Input id="disabled-input" placeholder="This is disabled" disabled />
              </div>
              <div>
                <Label>Input Sizes with Focus</Label>
                <div className="space-y-2">
                  <Input size="sm" placeholder="Small input - focus me" />
                  <Input size="md" placeholder="Medium input - focus me" />
                  <Input size="lg" placeholder="Large input - focus me" />
                </div>
              </div>
            </div>
          </section>

          {/* Badge Section */}
          <section>
            <Heading level="h2" className="mb-4">
              Badges
            </Heading>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Badge variant="default">Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="outline">Outline</Badge>
                <Badge variant="destructive">Destructive</Badge>
              </div>
              <div className="flex flex-wrap gap-2 items-center">
                <Badge size="sm">Small</Badge>
                <Badge size="md">Medium</Badge>
                <Badge size="lg">Large</Badge>
              </div>
            </div>
          </section>

          {/* Typography Section */}
          <section>
            <Heading level="h2" className="mb-4">
              Typography
            </Heading>
            <div className="space-y-3">
              <Heading level="h1">Heading H1</Heading>
              <Heading level="h2">Heading H2</Heading>
              <Heading level="h3">Heading H3</Heading>
              <Heading level="h4">Heading H4</Heading>
              <Separator />
              <Text variant="large">Large text - Lorem ipsum dolor sit amet.</Text>
              <Text variant="body">Body text - Lorem ipsum dolor sit amet.</Text>
              <Text variant="small">Small text - Lorem ipsum dolor sit amet.</Text>
              <Text variant="caption">Caption text - Lorem ipsum dolor sit amet.</Text>
            </div>
          </section>
        </div>

        <Separator className="my-8" />

        {/* Loading States */}
        <section>
          <Heading level="h2" className="mb-4">
            Loading States
          </Heading>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label className="mb-2">Text Skeleton</Label>
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-3/4" />
            </div>
            <div>
              <Label className="mb-2">Button Skeleton</Label>
              <Skeleton className="h-10 w-32" />
            </div>
            <div>
              <Label className="mb-2">Avatar Skeleton</Label>
              <Skeleton className="h-12 w-12 rounded-full" />
            </div>
          </div>
        </section>

        <Separator className="my-8" />

        {/* Interactive Test */}
        <section>
          <Heading level="h2" className="mb-4">
            Interactive Test
          </Heading>
          <div className="bg-card p-4 rounded-lg">
            <Text className="mb-4">
              Current input value: <Badge variant="outline">{inputValue || '(empty)'}</Badge>
            </Text>
            <Text className="mb-4">
              Loading state:{' '}
              <Badge variant={loading ? 'destructive' : 'default'}>
                {loading ? 'Active' : 'Inactive'}
              </Badge>
            </Text>
          </div>
        </section>
      </div>
    </div>
  );
}

export default DesignSystemDemo;
