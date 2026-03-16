# Status Component Refactoring - Implementation Checklist

## Pre-Implementation Planning ✓

- [x] Problem analysis and validation
- [x] Architecture design completed
- [x] Manager responsibilities defined
- [x] Data flow documented
- [x] Backward compatibility strategy confirmed
- [x] Test strategy planned

## Phase 1: Create UI Utilities Module

### File Creation
- [ ] Create `client/components/status/ui-utilities.js`
- [ ] Create `client/components/status/__tests__/ui-utilities.test.js`

### Functions to Implement
- [ ] `getDuration(seconds)` - Format session duration
  - [ ] Tests for 0s, 1s, 1m, 1h, mixed cases
  - [ ] Edge cases (negative, very large numbers)

- [ ] `getDateTimeFormat(language, options, date)` - Localized date/time
  - [ ] Tests for multiple languages (en, de, es, it, ru, sl, fur)
  - [ ] Tests with different date formats
  - [ ] Edge cases (null, invalid dates)

- [ ] `getLargeTableRow(session, sessionSettings, showLogoutButton)` - Desktop table row
  - [ ] Tests with active session
  - [ ] Tests with past session
  - [ ] Tests with logout button shown/hidden
  - [ ] Tests with accounting_swap_octets

- [ ] `getSmallTableRow(session, sessionInfo)` - Mobile table row
  - [ ] Tests with responsive layout
  - [ ] Tests with all session fields
  - [ ] Tests with logout button

- [ ] `getLargeTable(sessionInfo, activeSessions, pastSessions)` - Desktop table
  - [ ] Tests with mixed active/past sessions
  - [ ] Tests with empty sessions
  - [ ] Tests header rendering

- [ ] `getSmallTable(sessionInfo, activeSessions, pastSessions)` - Mobile table
  - [ ] Tests responsive rendering
  - [ ] Tests proper structure

- [ ] `getTable(sessionInfo, activeSessions, pastSessions, screenWidth)` - Responsive selector
  - [ ] Tests desktop mode (>656px)
  - [ ] Tests mobile mode (<656px)
  - [ ] Tests boundary

- [ ] `getSpinner()` - Loader component
  - [ ] Tests rendering
  - [ ] Tests props

- [ ] `getSessionInfo()` - Headers and labels
  - [ ] Tests i18n translations
  - [ ] Tests all labels

- [ ] `getUserInfo()` - User labels
  - [ ] Tests i18n translations
  - [ ] Tests all labels

- [ ] `getUserCheckFormattedValue(value, type)` - Format usage values
  - [ ] Tests bytes formatting
  - [ ] Tests seconds formatting
  - [ ] Tests default formatting
  - [ ] Edge cases (0, large numbers)

### Verification
- [ ] All functions exported
- [ ] No side effects
- [ ] All tests passing
- [ ] ESLint passes
- [ ] Jest coverage >90%

---

## Phase 2: Create Authentication Manager

### File Creation
- [ ] Create `client/components/status/authentication-manager.js`
- [ ] Create `client/components/status/__tests__/authentication-manager.test.js`

### Class Implementation
- [ ] Constructor with dependencies
- [ ] State initialization

### Methods to Implement
- [ ] `async validateAndInitialize(cookies, orgSlug, userData, setUserData, logout, language)`
  - [ ] Test valid token
  - [ ] Test invalid token
  - [ ] Test token refresh flow
  - [ ] Test error handling

- [ ] `checkPasswordExpired(userData)`
  - [ ] Test expired password detected
  - [ ] Test valid password
  - [ ] Edge cases

- [ ] `initializeUserInfo(userData, settings)`
  - [ ] Test with email == username
  - [ ] Test with different username
  - [ ] Test with phone_number
  - [ ] Test mobile_phone_verification setting

- [ ] `resolveMustLoginLogout(cookies, orgSlug, captivePortalSyncAuth)`
  - [ ] Test resolution from cookies
  - [ ] Test resolution from localStorage
  - [ ] Test fallback
  - [ ] Test when sync disabled

- [ ] `storeAuthValue(key, value, cookies)`
  - [ ] Test storage in cookies
  - [ ] Test localStorage fallback
  - [ ] Test when sync disabled

- [ ] `resolveStoredValue(key, fallback, cookies)`
  - [ ] Test retrieval from cookies
  - [ ] Test retrieval from localStorage
  - [ ] Test fallback when nothing stored
  - [ ] Test cleanup after retrieval

### Callbacks
- [ ] `onAuthStateChange(username, password, userInfo, rememberMe)`
  - [ ] Called after successful validation
  - [ ] Passes correct data

### Verification
- [ ] All methods implemented
- [ ] All tests passing
- [ ] ESLint passes
- [ ] Jest coverage >90%
- [ ] No direct DOM manipulation

---

## Phase 3: Create Session Manager

### File Creation
- [ ] Create `client/components/status/session-manager.js`
- [ ] Create `client/components/status/__tests__/session-manager.test.js`

### Class Implementation
- [ ] Constructor with dependencies
- [ ] State initialization
- [ ] Interval management

### Methods to Implement
- [ ] `async getUserRadiusSessions(params, orgSlug, authToken, cookies)`
  - [ ] Test API call
  - [ ] Test params (is_open=true/false)
  - [ ] Test error handling
  - [ ] Test 401/403 logout
  - [ ] Test network error retry

- [ ] `async getUserActiveRadiusSessions(params = {})`
  - [ ] Test default behavior
  - [ ] Test with custom params

- [ ] `async getUserPastRadiusSessions(params = {})`
  - [ ] Test pagination
  - [ ] Test page increment
  - [ ] Test results accumulation

- [ ] `async handleSessionLogout(session, orgSlug, authToken, cookies)`
  - [ ] Test form submission
  - [ ] Test session ID extraction
  - [ ] Test error handling

- [ ] `async logoutIfCurrentRadiusSessionIsInactive()`
  - [ ] Test with active session
  - [ ] Test with inactive session
  - [ ] Test in internet mode (skip)
  - [ ] Test without MAC address

- [ ] `setupSessionMonitoring(interval)`
  - [ ] Test interval creation
  - [ ] Test repeated calls
  - [ ] Verify interval ID stored

- [ ] `cleanupSessionMonitoring()`
  - [ ] Test interval cleanup
  - [ ] Test safe cleanup when no interval
  - [ ] Test called on unmount

- [ ] `async fetchMoreSessions()`
  - [ ] Test pagination
  - [ ] Test page increment

- [ ] `updateSpinner()`
  - [ ] Test spinner state based on sessions

### Callbacks
- [ ] `onSessionStateChange(sessions, currentPage, hasMore, loadSpinner)`
  - [ ] Called after session fetch
  - [ ] Passes correct data

### Error Handling
- [ ] Network errors with retry
- [ ] 401/403 triggers logout
- [ ] Invalid response handling
- [ ] Timeout handling

### Verification
- [ ] All methods implemented
- [ ] All tests passing
- [ ] ESLint passes
- [ ] Jest coverage >90%
- [ ] Proper interval cleanup

---

## Phase 4: Create Payment & Subscription Manager

### File Creation
- [ ] Create `client/components/status/payment-subscription-manager.js`
- [ ] Create `client/components/status/__tests__/payment-subscription-manager.test.js`

### Class Implementation
- [ ] Constructor with dependencies
- [ ] State initialization
- [ ] Plan data management

### Methods to Implement
- [ ] `async getUserRadiusUsage(options)`
  - [ ] Test API call
  - [ ] Test plan extraction
  - [ ] Test user checks processing
  - [ ] Test warning message generation
  - [ ] Test plan exhaustion detection
  - [ ] Test error retry logic
  - [ ] Test 401/403 logout

- [ ] `checkPaymentRequired(userData, settings)`
  - [ ] Test bank_card method
  - [ ] Test is_verified false
  - [ ] Test payment_requires_internet setting
  - [ ] Test other payment methods

- [ ] `navigateToPayment(userData, settings, orgSlug, navigate, setUserData)`
  - [ ] Test navigate to process page (proceedToPayment true)
  - [ ] Test navigate to draft page (default)
  - [ ] Test state reset

- [ ] `async upgradeUserPlan(planId, userData, orgSlug, authToken, navigate, setUserData)`
  - [ ] Test API call
  - [ ] Test response processing
  - [ ] Test redirect to payment
  - [ ] Test error handling

- [ ] `async getPlansSuccessCallback(plans)`
  - [ ] Test plan storage
  - [ ] Test modal update

- [ ] `async toggleUpgradePlanModal(hasPlans, orgSlug, language, getPlans)`
  - [ ] Test modal toggle
  - [ ] Test fetch plans if needed
  - [ ] Test with plans already loaded

- [ ] `handlePlanExhaustion(isPlanExhausted, userData, settings)`
  - [ ] Test exhaustion detection
  - [ ] Test warning message
  - [ ] Test upgrade button visibility

- [ ] `setupUsageMonitoring(interval)`
  - [ ] Test interval creation
  - [ ] Test repeated calls

- [ ] `cleanupUsageMonitoring()`
  - [ ] Test interval cleanup

### Callbacks
- [ ] `onPaymentStateChange(userPlan, userChecks, warnings, upgradeBtn, etc)`
  - [ ] Called after usage fetch
  - [ ] Passes correct data

### Error Handling
- [ ] Network errors with retry
- [ ] 401/403 triggers logout
- [ ] Invalid response handling
- [ ] Plan exhaustion edge cases

### Verification
- [ ] All methods implemented
- [ ] All tests passing
- [ ] ESLint passes
- [ ] Jest coverage >90%
- [ ] Proper interval cleanup

---

## Phase 5: Create Captive Portal Manager

### File Creation
- [ ] Create `client/components/status/captive-portal-manager.js`
- [ ] Create `client/components/status/__tests__/captive-portal-manager.test.js`

### Class Implementation
- [ ] Constructor with dependencies
- [ ] State initialization (cpLoginToastId, repeatLogin)
- [ ] Ref management

### Methods to Implement
- [ ] `async handleLoginIframe(iframeRef, setUserData, setLoading, userData)`
  - [ ] Test success response
  - [ ] Test error response (404)
  - [ ] Test toast notification
  - [ ] Test logout redirect
  - [ ] Test MAC address handling

- [ ] `async handleLogin(iframeRef, setUserData, setLoading, userData, cookies, orgSlug)`
  - [ ] Test post-message sending
  - [ ] Test response handling
  - [ ] Test with sync auth
  - [ ] Test without sync auth

- [ ] `async handleLogout(userAutoLogin, repeatLogin, formRef, setLoading, logout, etc)`
  - [ ] Test normal logout
  - [ ] Test repeat login flow
  - [ ] Test form submission
  - [ ] Test internet mode behavior
  - [ ] Test error handling

- [ ] `async handleLogoutIframe(iframeRef, logout, navigate, etc)`
  - [ ] Test logout response
  - [ ] Test SAML logout detection
  - [ ] Test repeat login timeout
  - [ ] Test state reset
  - [ ] Test error handling

- [ ] `handleSamlLogout(samlLogoutUrl)`
  - [ ] Test SAML URL redirect
  - [ ] Test with null URL

- [ ] `async handlePostMessage(event)`
  - [ ] Test owlp-ready message
  - [ ] Test valid origin
  - [ ] Test other message types

- [ ] `notifyCpLogin(userData, showNotification)`
  - [ ] Test toast creation
  - [ ] Test with verified user only
  - [ ] Test toast ID storage

- [ ] `dismissCpLogin()`
  - [ ] Test toast dismissal
  - [ ] Test safe dismiss when no toast

- [ ] Helper methods for form submission
  - [ ] `submitLoginForm(formRef, username, password, additionalFields)`
  - [ ] `submitLogoutForm(formRef, sessionId, additionalFields)`

### Refs Management
- [ ] `setLoginIframeRef(ref)`
- [ ] `setLogoutIframeRef(ref)`
- [ ] `setLoginFormRef(ref)`
- [ ] `setLogoutFormRef(ref)`

### Callbacks
- [ ] `onPortalStateChange(loggedOut)`
  - [ ] Called after logout
  - [ ] Passes logout state

### Error Handling
- [ ] Invalid iframe responses
- [ ] Network errors
- [ ] SAML flow errors
- [ ] Post-message errors
- [ ] Form submission errors

### Verification
- [ ] All methods implemented
- [ ] All tests passing
- [ ] ESLint passes
- [ ] Jest coverage >90%
- [ ] Iframe handling tested

---

## Phase 6: Refactor Status Component

### File Updates
- [ ] Update `client/components/status/status.js`
- [ ] Update `client/components/status/status.test.js`

### Constructor Changes
- [ ] Create manager instances
  ```javascript
  this.authManager = new AuthenticationManager({...})
  this.sessionManager = new SessionManager({...})
  this.paymentManager = new PaymentSubscriptionManager({...})
  this.portalManager = new CaptivePortalManager({...})
  ```
- [ ] Setup refs for iframes
- [ ] Setup callbacks for state updates
- [ ] Reduce state to UI-only state

### State Reduction
- [ ] Remove auth-related state (moved to authManager)
- [ ] Remove session-related state (moved to sessionManager)
- [ ] Remove payment-related state (moved to paymentManager)
- [ ] Remove portal-related state (moved to portalManager)
- [ ] Keep UI-only state:
  - [ ] screenWidth
  - [ ] modalActive
  - [ ] rememberMe
  - [ ] loggedOut

### componentDidMount() Refactor
- [ ] Call authManager.validateAndInitialize()
- [ ] Handle navigation for expired password
- [ ] Call paymentManager.checkPaymentRequired()
- [ ] Call sessionManager.setupMonitoring()
- [ ] Call paymentManager.setupUsageMonitoring()
- [ ] Call portalManager.handleInitial()
- [ ] Reduce from 180+ lines to ~30 lines

### componentWillUnmount() Changes
- [ ] Call sessionManager.cleanupSessionMonitoring()
- [ ] Call paymentManager.cleanupUsageMonitoring()
- [ ] Call portalManager.cleanup()
- [ ] Remove window event listeners from managers

### render() Changes
- [ ] Use manager data from state
- [ ] Keep same JSX structure
- [ ] Pass callbacks to managers
- [ ] Verify all props passed correctly

### Method Delegation
- [ ] Replace direct method calls with manager calls
- [ ] Update all event handlers
- [ ] Update all conditionals to use manager state

### Props & Interface
- [ ] Verify props unchanged
- [ ] Verify behavior identical
- [ ] No breaking changes

### Verification
- [ ] Component compiles
- [ ] All existing tests pass
- [ ] Component works in browser
- [ ] All features function correctly

---

## Phase 7: Testing

### Unit Tests for Managers
- [x] AuthenticationManager tests
- [x] SessionManager tests
- [x] PaymentSubscriptionManager tests
- [x] CaptivePortalManager tests
- [x] UIUtilities tests

### Integration Tests
- [ ] Status component with all managers
- [ ] Manager interactions
- [ ] State flow verification
- [ ] Callback propagation

### E2E Tests
- [ ] Login flow (token validation → final operations)
- [ ] Session management (fetch → logout)
- [ ] Payment flow (verify → upgrade → process)
- [ ] Logout flows (normal, SAML, repeat)

### Regression Tests
- [ ] All existing tests pass
- [ ] All existing features work
- [ ] No new console errors
- [ ] No new warnings

### Coverage Verification
- [ ] AuthenticationManager: >90% coverage
- [ ] SessionManager: >90% coverage
- [ ] PaymentSubscriptionManager: >90% coverage
- [ ] CaptivePortalManager: >90% coverage
- [ ] UIUtilities: >90% coverage
- [ ] Status component: >85% coverage
- [ ] Overall: >85% coverage

---

## Phase 8: Documentation

### Architecture Documentation
- [x] Overall architecture diagram (ARCHITECTURE_COMPARISON.md)
- [x] Module responsibilities (STATUS_COMPONENT_METHOD_EXTRACTION.md)
- [ ] Manager API documentation
- [ ] Data flow documentation
- [ ] Integration examples

### Code Documentation
- [ ] JSDoc comments for all public methods
- [ ] Type hints for all parameters
- [ ] Return type documentation
- [ ] Error documentation

### Developer Guide
- [ ] How to use each manager
- [ ] How to add new features
- [ ] How to debug issues
- [ ] Common patterns

### Migration Guide
- [ ] Breaking changes (none)
- [ ] Deprecated features (none)
- [ ] Updated imports
- [ ] Examples

---

## Final Verification Checklist

### Code Quality
- [ ] ESLint passes on all files
- [ ] Prettier formatting applied
- [ ] No console errors/warnings
- [ ] No unused imports
- [ ] No dead code

### Testing
- [ ] All tests passing
- [ ] Coverage >85% overall
- [ ] All critical paths tested
- [ ] Edge cases covered
- [ ] Error scenarios tested

### Functionality
- [ ] All features work identically
- [ ] No regressions
- [ ] Browser compatibility verified
- [ ] Performance acceptable
- [ ] No memory leaks

### Documentation
- [ ] README updated
- [ ] Architecture documented
- [ ] APIs documented
- [ ] Examples provided
- [ ] Migration guide complete

### Backward Compatibility
- [ ] Props interface unchanged
- [ ] Props validation passing
- [ ] Behavior identical
- [ ] State shape compatible
- [ ] No external API changes

### Review Ready
- [ ] Code formatted
- [ ] Comments added
- [ ] Tests passing
- [ ] Docs complete
- [ ] Ready for code review

---

## Sign-Off

- [ ] Development complete
- [ ] Testing complete
- [ ] Documentation complete
- [ ] Code review approved
- [ ] Ready for merge to main branch

---

## Timeline Tracker

| Phase | Start | End | Status |
|-------|-------|-----|--------|
| 1: UIUtilities | - | - | Not Started |
| 2: AuthenticationManager | - | - | Not Started |
| 3: SessionManager | - | - | Not Started |
| 4: PaymentManager | - | - | Not Started |
| 5: CaptivePortalManager | - | - | Not Started |
| 6: Refactor Status | - | - | Not Started |
| 7: Testing | - | - | Not Started |
| 8: Documentation | - | - | Not Started |

**Total Estimated Hours**: 40-60 hours
**Estimated Start**: [Date]
**Estimated Completion**: [Date + 4 weeks]

---

## Notes & Blockers

(To be filled during implementation)

---

## Success Metrics

Upon completion, verify:

| Metric | Target | Actual |
|--------|--------|--------|
| Status.js lines | <400 | - |
| Max method lines | <50 | - |
| Test coverage | >85% | - |
| ESLint violations | 0 | - |
| Test passing | 100% | - |
| Regressions | 0 | - |
| Documentation | Complete | - |

