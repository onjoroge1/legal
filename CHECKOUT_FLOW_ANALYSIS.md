# Checkout Flow Analysis

## Current Flow Issues

1. **No Password Collection**: Checkout form only asks for email/name, not password
2. **Random Password Generation**: Account created with temp password user doesn't know
3. **Post-Payment Redirect**: User redirected to signup/login after payment (poor UX)
4. **No Sign-In Option**: Existing users can't sign in during checkout

## User Scenarios

### Scenario 1: New User (No Account)
- Needs to: Create account + Set password + Complete payment
- Current: Payment → Account created with random password → Redirect to signup
- Problem: User doesn't know their password, has to set it later

### Scenario 2: Existing User (Has Account)
- Needs to: Sign in + Complete payment
- Current: Payment → Account found → Redirect to login
- Problem: User already paid but can't access document until they sign in separately

### Scenario 3: Logged-In User
- Needs to: Just complete payment
- Current: Works fine (if they have subscription, they skip checkout)
- Problem: None

## Recommended Flow (Hybrid Approach)

### Step 1: Email Check (Before Payment)
- User enters email
- System checks if account exists
- Shows appropriate UI:
  - **Existing User**: "Sign in to your account" with password field
  - **New User**: "Create account" with password field
  - **Logged-In User**: Skip to payment

### Step 2: Account Setup (Before Payment)
- **New User**: 
  - Enter password (required)
  - Confirm password
  - Account created immediately
- **Existing User**:
  - Enter password to sign in
  - Verify credentials
  - Sign in immediately

### Step 3: Payment Processing
- User completes payment
- Document saved to their account
- User is already signed in
- Redirect directly to dashboard (no extra steps)

## Benefits

1. ✅ **No Post-Payment Friction**: User signed in before payment
2. ✅ **Password Known**: User sets/enters password they know
3. ✅ **Seamless Experience**: One flow, no redirects
4. ✅ **Security**: Password required for account access
5. ✅ **Flexibility**: Handles new and existing users

## Implementation Plan

1. Add email check API endpoint
2. Update checkout form to show sign-in OR signup based on email
3. Add password field (conditional based on user status)
4. Sign in/create account BEFORE payment
5. After payment, redirect to dashboard (user already signed in)

