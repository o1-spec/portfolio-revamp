# Status Component Refactoring Plan (GSoC 2026)

## Overview
This document outlines the refactoring strategy for the Status Component to improve code maintainability, testability, and separation of concerns while maintaining 100% backward compatibility.

## Problem Statement
The `client/components/status/status.js` component (1,551 lines) has grown to handle multiple responsibilities:
- Authentication and token validation
- Verification flows (mobile phone, bank card)
- Payment and subscription management
- RADIUS session management
- Captive portal login/logout logic
- Session monitoring and auto-logout
- UI rendering with multiple table formats

This violates the Single Responsibility Principle, making the code:
- **Difficult to test** (requires mocking complex interdependencies)
- **Hard to maintain** (changes affect multiple concerns)
- **Error-prone** (tight coupling increases bug risk)
- **Difficult to extend** (adding features requires understanding entire component)

## Solution Architecture

### Current Structure (Monolithic)
```
Status Component (1,551 lines)
├── Authentication Logic
├── Verification Logic
├── Payment/Subscription Logic
├── Session Management Logic
├── Captive Portal Logic
└── UI Rendering
```

### Target Structure (Modular)
```
Status Component (~300 lines - Orchestrator)
├── AuthenticationManager
├── PaymentSubscriptionManager
├── SessionManager
├── CaptivePortalManager
├── UIUtilities
└── UI Rendering
```

## Module Breakdown

### 1. AuthenticationManager (`authentication-manager.js`)
**Responsibility**: Handle all authentication-related logic

**Methods to extract**:
- `validateToken()` - Token validation and expiration
- `checkPasswordExpired()` - Password expiration checks
- `initializeUserInfo()` - User data setup and formatting
- `resolveMustLoginLogout()` - Resolve mustLogin/mustLogout from cookies/localStorage
- `storeAuthValue()` / `resolveStoredValue()` - Auth state persistence

**Dependencies**: validateToken utility, userData, cookies, localStorage

**Tests**: Token validation, password expiration, user data formatting, state persistence

### 2. PaymentSubscriptionManager (`payment-subscription-manager.js`)
**Responsibility**: Handle payment verification and subscription operations

**Methods to extract**:
- `checkPaymentRequired()` - Determine if payment verification needed
- `navigateToPayment()` - Route to appropriate payment page
- `getUserRadiusUsage()` - Fetch usage data and plan status
- `upgradeUserPlan()` - API call to upgrade plan
- `getPlansSuccessCallback()` - Process plan fetch response
- `getPlanSelection()` - Render plan selection UI
- `toggleUpgradePlanModal()` - Modal state management
- `handlePlanExhaustion()` - Handle plan exhaustion scenarios

**Dependencies**: axios, getUserRadiusUsageUrl, upgradePlanApiUrl, needsVerify utility

**Tests**: Payment checks, plan fetching, plan upgrades, plan exhaustion handling

### 3. SessionManager (`session-manager.js`)
**Responsibility**: Manage RADIUS sessions and monitoring

**Methods to extract**:
- `getUserActiveRadiusSessions()` - Fetch active sessions
- `getUserPastRadiusSessions()` - Fetch past sessions with pagination
- `getUserRadiusSessions()` - Generic session fetcher
- `handleSessionLogout()` - Logout specific session
- `logoutIfCurrentRadiusSessionIsInactive()` - Monitor and auto-logout
- `setupSessionMonitoring()` - Configure polling intervals
- `cleanupSessionMonitoring()` - Clear intervals
- `fetchMoreSessions()` - Pagination handler

**Dependencies**: axios, getUserRadiusSessionsUrl, handleSession utility

**Tests**: Session fetching, pagination, logout handling, monitoring intervals

### 4. CaptivePortalManager (`captive-portal-manager.js`)
**Responsibility**: Handle captive portal authentication flows

**Methods to extract**:
- `handleLogin()` - Process login response from iframe
- `handleLogout()` - Initiate logout flow
- `handleLoginIframe()` - Handle login iframe onLoad event
- `handleLogoutIframe()` - Handle logout iframe onLoad event
- `handleSamlLogout()` - SAML logout flow
- `notifyCpLogin()` - Show login notification toast
- `dismissCpLogin()` - Dismiss login notification
- `handlePostMessage()` - Handle cross-iframe messages
- `notifyCpLogin()` - Captive portal login notification

**Dependencies**: iframes, window.postMessage, toast notifications, SAML logout URL

**Tests**: Iframe communication, SAML flow, login/logout notifications, message handling

### 5. UIUtilities (`ui-utilities.js`)
**Responsibility**: UI rendering helper functions

**Methods to extract**:
- `getDuration()` - Format session duration
- `getDateTimeFormat()` - Format dates/times with i18n
- `getLargeTableRow()` - Render desktop table row
- `getSmallTableRow()` - Render mobile table row
- `getLargeTable()` - Render desktop sessions table
- `getSmallTable()` - Render mobile sessions table
- `getTable()` - Responsive table selector
- `getSpinner()` - Render loading spinner
- `getSessionInfo()` - Format session headers/labels
- `getUserInfo()` - Format user info labels
- `getUserCheckFormattedValue()` - Format progress check values

**Dependencies**: prettyBytes, timeFromSeconds, i18n translations

**Tests**: Duration formatting, date formatting, table rendering, value formatting

### 6. Refactored Status Component (`status.js`)
**Responsibility**: Orchestrate managers and render UI

**Simplified methods**:
- `constructor()` - Initialize managers, refs
- `componentDidMount()` - Orchestrate initialization flow
- `componentWillUnmount()` - Cleanup
- `finalOperations()` - Orchestrate post-login operations
- `render()` - Render UI using managers

**Key changes**:
- Reduced from 1,551 to ~300 lines
- Methods delegate to manager instances
- State focused on UI state only
- Props remain unchanged (backward compatible)

## Implementation Phases

### Phase 1: Create Managers (Non-breaking)
1. Create AuthenticationManager module
2. Create PaymentSubscriptionManager module
3. Create SessionManager module
4. Create CaptivePortalManager module
5. Create UIUtilities module

**Status**: ✓ No changes to Status component yet

### Phase 2: Integrate Managers (Non-breaking)
1. Update Status component to use managers
2. Instantiate managers in constructor
3. Replace method calls with manager calls
4. Keep same props/state structure initially

**Status**: ✓ Component works identically

### Phase 3: Optimize State (Non-breaking)
1. Move manager-specific state to managers
2. Keep UI state in component
3. Update state setters to delegate to managers

**Status**: ✓ Cleaner component state

### Phase 4: Testing (Non-breaking)
1. Unit tests for each manager
2. Integration tests for Status component
3. E2E tests for full flows

**Status**: ✓ Comprehensive coverage

## Backward Compatibility Strategy

✅ **Props unchanged**: Status component accepts same props  
✅ **Behavior unchanged**: All features work identically  
✅ **State shape compatible**: Internal restructuring only  
✅ **API contracts same**: No breaking changes to dependencies  
✅ **Browser compatibility**: No new browser requirements  

## Benefits

| Aspect | Before | After |
|--------|--------|-------|
| **Lines in Status** | 1,551 | ~300 |
| **Methods per class** | 25+ | 5-6 |
| **Responsibilities** | 6-7 | 1 (orchestration) |
| **Test coverage** | Low | High |
| **Time to understand** | Hours | Minutes |
| **Time to add feature** | Days | Hours |
| **Error isolation** | Difficult | Easy |

## Testing Strategy

### Unit Tests
- AuthenticationManager: Token validation, auth state persistence
- PaymentSubscriptionManager: Payment checks, plan operations
- SessionManager: Session fetching, pagination, monitoring
- CaptivePortalManager: Iframe handling, SAML flow
- UIUtilities: Formatting, rendering

### Integration Tests
- Manager interactions within Status component
- State flow through managers
- Prop passing and callbacks

### E2E Tests
- Full login flow
- Session management
- Plan upgrade workflow
- Logout flows (normal and SAML)

## Files to Create
```
client/components/status/
├── authentication-manager.js      (New)
├── payment-subscription-manager.js (New)
├── session-manager.js              (New)
├── captive-portal-manager.js       (New)
├── ui-utilities.js                 (New)
├── status.js                       (Refactored)
├── status.test.js                  (Updated)
└── __tests__/
    ├── authentication-manager.test.js      (New)
    ├── payment-subscription-manager.test.js (New)
    ├── session-manager.test.js              (New)
    ├── captive-portal-manager.test.js       (New)
    └── ui-utilities.test.js                 (New)
```

## Timeline (Estimated 40-60 hours)

| Phase | Task | Effort | Hours |
|-------|------|--------|-------|
| 1 | AuthenticationManager | High | 6 |
| 1 | PaymentSubscriptionManager | High | 6 |
| 1 | SessionManager | High | 6 |
| 1 | CaptivePortalManager | High | 8 |
| 1 | UIUtilities | Medium | 4 |
| 2 | Integrate all managers | High | 8 |
| 3 | Optimize state | Medium | 4 |
| 4 | Write unit tests | High | 10 |
| 4 | Write integration tests | Medium | 6 |
| 4 | Documentation | Low | 2 |
| **Total** | | | **60** |

## Success Criteria

✅ All existing tests pass  
✅ New managers have >90% test coverage  
✅ Status component reduced to <400 lines  
✅ Each manager has single responsibility  
✅ No changes to component props/behavior  
✅ Documentation complete  
✅ Code review approved  

## Future Enhancements

Once refactored, easier to implement:
- Custom authentication providers
- Plugin system for payment processors
- Enhanced session analytics
- Custom UI themes
- Mobile app integration
- GraphQL support
- Offline support with service workers

## Conclusion

This refactoring significantly improves code quality while maintaining full backward compatibility. It sets the foundation for future enhancements and makes the codebase more welcoming to new contributors.
