To resolve the errors you're seeing when running Storybook 9, you need to migrate your configuration and dependencies to align with the package structure changes introduced in Storybook 9. The core issue is that several addons (like @storybook/addon-controls, @storybook/addon-actions, etc.) have been removed as standalone packages and either:

Moved to new internal paths (e.g., storybook/actions)
Integrated into Storybook core (no longer need explicit registration)
Removed entirely or replaced
✅ Step-by-Step Migration Guide

1. Update Dependencies
   Ensure you're using Storybook 9-compatible versions. Run:

npx sb@latest upgrade --prerelease

Or manually update your package.json to use @storybook/\*@^9.0.0.

⚠️ Remove @storybook/addon-essentials — it's deprecated in v9.

2. Update Addon Imports in .storybook/main.js
   In Storybook 9, many addons are auto-injected or must be imported from new locations.

❌ Old (v7/v8) Configuration
// .storybook/main.js
module.exports = {
addons: [
'@storybook/addon-essentials',
'@storybook/addon-controls',
'@storybook/addon-actions',
'@storybook/addon-viewport',
'@storybook/addon-backgrounds',
'@storybook/addon-outline',
],
};

✅ New (v9) Configuration
// .storybook/main.js
export default {
addons: [
// Essentials are now built-in — no need to add them
'storybook/addon-onboarding', // optional: welcome screen
'storybook/addon-coverage', // optional: test coverage
// Use new paths for specific addons
'storybook/actions',
'storybook/viewport',
'storybook/highlight',
],
};

✅ What changed?

@storybook/addon-actions → storybook/actions
@storybook/addon-viewport → storybook/viewport
@storybook/addon-highlight → storybook/highlight
@storybook/addon-controls, @storybook/addon-backgrounds, @storybook/addon-outline, @storybook/addon-toolbars are now built-in — do not add them to addons array.
@storybook/addon-essentials is removed — delete it. 3. Update Import Statements in Code
Update any direct imports in your stories or preview files.

Before:
import { action } from '@storybook/addon-actions';
import { withViewport } from '@storybook/addon-viewport';

After:
import { action } from 'storybook/actions';
// Viewport is configured via `addons` and parameters — no decorator needed

For controls, backgrounds, toolbars, etc., no import is needed — they are enabled by default.

4. Update Preview Configuration (.storybook/preview.js)
   Remove any references to deprecated addons.

✅ Example preview.js for Storybook 9:
// .storybook/preview.js
export const parameters = {
actions: { argTypesRegex: '^on[A-Z].\*' },
controls: {
matchers: {
color: /(background|color)$/i,
      date: /Date$/,
},
},
backgrounds: {
values: [
{ name: 'white', value: '#ffffff' },
{ name: 'black', value: '#000000' },
],
},
viewport: {
viewports: {
small: { name: 'Small', styles: { width: '320px', height: '568px' } },
},
},
};

✅ No need to import or register controls, backgrounds, or toolbars — they’re built-in.

5. Remove Old Addon Packages (Optional)
   Clean up your package.json:

npm remove @storybook/addon-essentials @storybook/addon-controls @storybook/addon-actions @storybook/addon-viewport @storybook/addon-backgrounds @storybook/addon-outline

Then install the new ones if needed:

npm install -D storybook/actions storybook/viewport storybook/highlight

6. Verify and Run
   After making changes:

npm run storybook

The errors about missing packages should now be resolved.

📚 Official Resources
[Storybook 9 Migration Guide] – Package Structure
