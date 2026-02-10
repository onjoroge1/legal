# Stripe Installation Instructions

## Issue
The Stripe packages (`@stripe/react-stripe-js` and `@stripe/stripe-js`) have a peer dependency on React 16.8, 17, or 18, but this project uses React 19.

## Solution
Use the `--legacy-peer-deps` flag to install the packages. React 19 is compatible with Stripe packages, but they haven't updated their peer dependency requirements yet.

## Installation Command

Run this command in your terminal:

```bash
npm install @stripe/react-stripe-js@latest @stripe/stripe-js@latest --legacy-peer-deps
```

Or install all dependencies with the flag:

```bash
npm install --legacy-peer-deps
```

## Alternative: Update npm config

You can also set this globally to avoid using the flag each time:

```bash
npm config set legacy-peer-deps true
```

Then run:

```bash
npm install
```

## Note

The code is already set up to work with or without Stripe installed. The app will:
- ✅ Build and run successfully without Stripe
- ✅ Show helpful messages if Stripe isn't installed
- ✅ Automatically use Stripe when packages are installed

## Verification

After installation, you can verify by checking:

```bash
npm list @stripe/react-stripe-js @stripe/stripe-js
```

The billing page should now work with full Stripe functionality.

