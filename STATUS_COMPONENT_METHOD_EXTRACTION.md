# Status Component Refactoring - Detailed Method Extraction Guide

## Complete Method and State Breakdown

### 1. AUTHENTICATION MANAGER - Methods to Extract

#### Methods
```javascript
// From componentDidMount - token validation flow
async validateAndInitialize(cookies, orgSlug, setUserData, userData, logout, language)

// Password expiration check
checkPasswordExpired(userData)

// User info initialization
initializeUserInfo(userData, settings)

// Resolve captive portal auth state from storage
resolveMustLoginLogout(cookies, orgSlug, captivePortalSyncAuth)

// Store auth state (captive portal sync)
storeAuthValue(captivePortalSyncAuth, key, value, cookies)

// Retrieve auth state from cookies/localStorage
resolveStoredValue(captivePortalSyncAuth, key, fallback, cookies)
```

#### State to Move
```javascript
// These should be managed by AuthenticationManager
{
  username: "",
  password: "",
  rememberMe: false,
}
```

#### Dependencies
```javascript
import validateToken from "../../utils/validate-token";
import needsVerify from "../../utils/needs-verify";
import {localStorage} from "../../utils/storage";
import {Cookies} from "react-cookie";
import {t} from "ttag";
```

#### Tests Required
- Token validation success/failure
- Password expiration detection
- User info formatting with/without phone number
- Auth state persistence (cookies vs localStorage)
- Fallback logic when storage unavailable
- Different method types (bank_card, etc.)

---

### 2. PAYMENT & SUBSCRIPTION MANAGER - Methods to Extract

#### Methods
```javascript
// Fetch RADIUS usage and plan data
async getUserRadiusUsage(options)

// Determine if payment verification required
checkPaymentRequired(userData, settings)

// Navigate user to appropriate payment page
navigateToPayment(userData, settings, orgSlug, navigate, setUserData)

// Handle plan upgrade initiation
async upgradeUserPlan(event, userData, orgSlug, settings, navigate, setUserData)

// Callback for plan fetch success
getPlansSuccessCallback(plans)

// Toggle upgrade plan modal
toggleUpgradePlanModal(hasUpgradePlans)

// Handle plan exhaustion scenarios
handlePlanExhaustion(isPlanExhausted, userData, settings)
```

#### State to Move
```javascript
// Payment-specific state
{
  userPlan: {},
  upgradePlanModalActive: false,
  upgradePlans: [],
  warningMessage: null,
  showUpgradeBtn: true,
  radiusUsageSpinner: true,
  showRadiusUsage: true,
  userChecks: [],
}
```

#### References (iframes, refs)
```javascript
// None required - handled in component
```

#### Dependencies
```javascript
import axios from "axios";
import {
  getUserRadiusUsageUrl,
  upgradePlanApiUrl,
  mainToastId,
} from "../../constants";
import handleSession from "../../utils/session";
import needsVerify from "../../utils/needs-verify";
import logError from "../../utils/log-error";
import getPlans from "../../utils/get-plans";
import getPlanSelection from "../../utils/get-plan-selection";
import {t, gettext} from "ttag";
import {toast} from "react-toastify";
```

#### Tests Required
- Usage data fetching and parsing
- Plan exhaustion detection and notification
- Plan upgrade API calls
- Error handling in usage fetching
- Retry logic on failures
- Different subscription scenarios
- Internet mode behavior

---

### 3. SESSION MANAGER - Methods to Extract

#### Methods
```javascript
// Fetch sessions with type filter
async getUserRadiusSessions(params, orgSlug, authToken, cookies)

// Fetch active sessions
async getUserActiveRadiusSessions(params = {})

// Fetch past sessions with pagination
async getUserPastRadiusSessions(params = {})

// Logout specific session
async handleSessionLogout(session)

// Monitor for inactive current session
async logoutIfCurrentRadiusSessionIsInactive()

// Setup interval-based session monitoring
setupSessionMonitoring()

// Cleanup monitoring intervals
cleanupSessionMonitoring()

// Fetch more sessions (pagination)
async fetchMoreSessions()

// Update spinner state based on sessions
updateSpinner()
```

#### State to Move
```javascript
// Session-specific state
{
  activeSessions: [],
  pastSessions: [],
  sessionsToLogout: [],
  currentPage: 1,
  hasMoreSessions: false,
  loadSpinner: true,
}
```

#### Refs
```javascript
// logoutFormRef - passed from component
```

#### Dependencies
```javascript
import axios from "axios";
import {getUserRadiusSessionsUrl} from "../../constants";
import handleSession from "../../utils/session";
import logError from "../../utils/log-error";
import {t} from "ttag";
import {toast} from "react-toastify";
import {Cookies} from "react-cookie";
```

#### Intervals
```javascript
// intervalId - for session monitoring (60000ms)
// usageIntervalId - separate for usage (handled by PaymentSubscriptionManager)
```

#### Tests Required
- Session fetching with various filters
- Active vs past session filtering
- Pagination logic and state management
- Session logout API calls
- Inactive session detection
- Interval setup and cleanup
- Error handling and retries
- Internet mode behavior

---

### 4. CAPTIVE PORTAL MANAGER - Methods to Extract

#### Methods
```javascript
// Handle login iframe onLoad event
async handleLoginIframe()

// Handle login response from captive portal
async handleLogin()

// Initiate logout flow
async handleLogout(userAutoLogin = false, repeatLogin = false)

// Handle logout iframe onLoad event
async handleLogoutIframe()

// Handle SAML logout
handleSamlLogout(samlLogoutUrl)

// Handle post-message from iframes
async handlePostMessage(event)

// Show login notification toast
notifyCpLogin(userData)

// Dismiss login notification
dismissCpLogin()

// Submit login form
submitLoginForm(formRef, username, password, additionalFields)

// Submit logout form
submitLogoutForm(formRef, sessionId, additionalFields)
```

#### State to Move
```javascript
// Captive portal specific state
{
  loggedOut: false,
}
```

#### Refs (IMPORTANT - Passed from Component)
```javascript
// These must be passed to manager or stored in component
{
  loginIframeRef: React.createRef(),
  loginFormRef: React.createRef(),
  logoutIframeRef: React.createRef(),
  logoutFormRef: React.createRef(),
}
```

#### Internal State
```javascript
// Manager should maintain this
{
  cpLoginToastId: null,
  repeatLogin: false,
}
```

#### Dependencies
```javascript
import {toast} from "react-toastify";
import {mainToastId} from "../../constants";
import {t} from "ttag";
import {Cookies} from "react-cookie";
import {localStorage} from "../../utils/storage";
import {initialState} from "../../reducers/organization";
```

#### Props Used
```javascript
// These need to be passed to manager
{
  orgSlug: PropTypes.string,
  cookies: PropTypes.instanceOf(Cookies),
  logout: PropTypes.func,
  navigate: PropTypes.func,
  setUserData: PropTypes.func,
  setLoading: PropTypes.func,
  userData: PropTypes.object,
  captivePortalLoginForm: PropTypes.object,
  captivePortalLogoutForm: PropTypes.object,
  captivePortalSyncAuth: PropTypes.bool,
  location: PropTypes.object,
  internetMode: PropTypes.bool,
}
```

#### Tests Required
- Login iframe response handling
- Logout iframe response handling
- SAML logout flow
- Post-message communication
- Login/logout notifications
- Form submission with credentials
- Session logout by ID
- Repeat login flow
- User auto-login handling
- Error handling in flows

---

### 5. UI UTILITIES - Methods to Extract

#### Pure Functions (No State)
```javascript
// Format session duration (seconds -> readable string)
getDuration(seconds)

// Format date/time with i18n
getDateTimeFormat(language, time_option, date)

// Render large (desktop) table row
getLargeTableRow(session, sessionSettings, showLogoutButton = false)

// Render small (mobile) table row
getSmallTableRow(session, session_info)

// Render large sessions table
getLargeTable(session_info, activeSessions, pastSessions)

// Render small sessions table
getSmallTable(session_info, activeSessions, pastSessions)

// Choose appropriate table based on screen width
getTable(session_info, activeSessions, pastSessions, screenWidth)

// Render loading spinner
getSpinner()

// Get session table headers/labels
getSessionInfo()

// Get user info labels
getUserInfo()

// Format user check values (bytes, seconds, etc)
getUserCheckFormattedValue(value, type)
```

#### State to Move
```javascript
// Screen width responsive design
{
  screenWidth: window.innerWidth,
}
```

#### Event Handlers
```javascript
// Window resize handler
updateScreenWidth()
```

#### Dependencies
```javascript
import prettyBytes from "pretty-bytes";
import {timeFromSeconds} from "duration-formatter";
import {t} from "ttag";
import Loader from "../../utils/loader";
import React from "react";
```

#### Tests Required
- Duration formatting edge cases (0s, 1s, 1m, 1h, etc)
- Date formatting with different locales
- Table row rendering with all session types
- Responsive table selection
- Progress bar formatting
- Value formatting for different types
- Spinner rendering

---

## Implementation Order

### Step 1: Create Utility Module (Easiest)
```
client/components/status/ui-utilities.js
```
No state management or side effects. Pure functions only.

### Step 2: Create Authentication Manager
```
client/components/status/authentication-manager.js
```
No external API calls. Mostly local storage/cookie operations.

### Step 3: Create Session Manager
```
client/components/status/session-manager.js
```
API calls to RADIUS endpoints. Interval management.

### Step 4: Create Payment Subscription Manager
```
client/components/status/payment-subscription-manager.js
```
API calls to payment endpoints. Plan operations.

### Step 5: Create Captive Portal Manager
```
client/components/status/captive-portal-manager.js
```
Most complex. Iframe communication, multiple flows.

### Step 6: Refactor Status Component
```
client/components/status/status.js
```
Use all managers. Simplify to orchestrator.

---

## State Management Strategy

### Component State (Keeps)
```javascript
{
  // UI state only
  screenWidth: window.innerWidth,
  modalActive: false,
  rememberMe: false,
  loggedOut: false,
}
```

### Manager State (Via Callbacks)
```javascript
// AuthenticationManager state updates
onAuthenticationStateChange(username, password, userInfo)

// SessionManager state updates
onSessionsStateChange(activeSessions, pastSessions, loadSpinner, etc)

// PaymentSubscriptionManager state updates
onPaymentStateChange(userPlan, userChecks, warningMessage, etc)

// CaptivePortalManager state updates
onPortalStateChange(loggedOut)
```

---

## Props Passing Strategy

### Props Stay Unchanged
```javascript
// Component still receives same props
Status.propTypes = {
  statusPage: PropTypes.object.isRequired,
  language: PropTypes.string.isRequired,
  // ... all existing props
}
```

### Props Passed to Managers
```javascript
// Each manager receives subset of props it needs
const authManager = new AuthenticationManager({
  cookies, orgSlug, setUserData, logout, language,
  captivePortalSyncAuth
});

const paymentManager = new PaymentSubscriptionManager({
  orgSlug, settings, statusPage, navigate, setUserData,
  setPlanExhausted, language, defaultLanguage
});

const sessionManager = new SessionManager({
  orgSlug, cookies, logout, internetMode, userData,
  logoutFormRef
});

const portalManager = new CaptivePortalManager({
  orgSlug, cookies, logout, navigate, setUserData,
  captivePortalLoginForm, captivePortalLogoutForm,
  captivePortalSyncAuth, location, userData,
  loginFormRef, logoutFormRef, setLoading
});
```

---

## Callback Pattern

### From Managers to Component
```javascript
// Manager calls these callbacks to update component state
onAuthStateChange = (authData) => {
  this.setState({
    username: authData.username,
    password: authData.password,
    userInfo: authData.userInfo,
    rememberMe: authData.rememberMe,
  });
}

onSessionStateChange = (sessionData) => {
  this.setState({
    activeSessions: sessionData.activeSessions,
    pastSessions: sessionData.pastSessions,
    loadSpinner: sessionData.loadSpinner,
    currentPage: sessionData.currentPage,
    hasMoreSessions: sessionData.hasMoreSessions,
  });
}

onPaymentStateChange = (paymentData) => {
  this.setState({
    userPlan: paymentData.userPlan,
    userChecks: paymentData.userChecks,
    radiusUsageSpinner: paymentData.radiusUsageSpinner,
    upgradePlanModalActive: paymentData.upgradePlanModalActive,
    upgradePlans: paymentData.upgradePlans,
    showUpgradeBtn: paymentData.showUpgradeBtn,
    warningMessage: paymentData.warningMessage,
  });
}
```

---

## Testing Checklist

### AuthenticationManager Tests
- [ ] validateAndInitialize with valid token
- [ ] validateAndInitialize with invalid token
- [ ] checkPasswordExpired returns true for expired
- [ ] checkPasswordExpired returns false for valid
- [ ] initializeUserInfo formats all fields correctly
- [ ] resolveMustLoginLogout from cookies
- [ ] resolveMustLoginLogout from localStorage
- [ ] resolveMustLoginLogout fallback
- [ ] storeAuthValue in captive portal sync mode
- [ ] storeAuthValue skips when sync disabled

### SessionManager Tests
- [ ] getUserActiveRadiusSessions fetches and filters
- [ ] getUserPastRadiusSessions fetches and filters
- [ ] Session pagination increments page correctly
- [ ] handleSessionLogout submits form
- [ ] logoutIfCurrentRadiusSessionIsInactive detects inactive
- [ ] setupSessionMonitoring creates intervals
- [ ] cleanupSessionMonitoring clears intervals
- [ ] Error handling retries with backoff
- [ ] Internet mode skips session checks

### PaymentSubscriptionManager Tests
- [ ] getUserRadiusUsage fetches usage data
- [ ] checkPaymentRequired identifies bank_card verification
- [ ] navigateToPayment routes to correct page
- [ ] upgradeUserPlan calls API correctly
- [ ] handlePlanExhaustion shows warning
- [ ] Usage interval setup/cleanup
- [ ] Error handling with retry

### CaptivePortalManager Tests
- [ ] handleLoginIframe processes success
- [ ] handleLoginIframe handles errors
- [ ] handleLogout with/without repeatLogin
- [ ] handleLogoutIframe processes response
- [ ] handleSamlLogout redirects correctly
- [ ] notifyCpLogin shows toast
- [ ] dismissCpLogin removes toast
- [ ] Form submission with credentials
- [ ] Post-message communication

### UIUtilities Tests
- [ ] getDuration formats all time ranges
- [ ] getDateTimeFormat works with multiple locales
- [ ] getLargeTableRow renders all session fields
- [ ] getSmallTableRow renders responsive format
- [ ] getTable selects based on screenWidth
- [ ] getUserCheckFormattedValue for bytes/seconds
- [ ] Spinner renders correctly

---

## Migration Notes

### Breaking Changes
**None** - Fully backward compatible.

### Deprecated Methods
**None** - All existing methods work same way.

### New Development
- Import managers instead of extending Status component
- Create custom managers for new features
- Reuse existing managers for common operations

---

## File Size Expectations

```
authentication-manager.js:     ~150 lines
payment-subscription-manager.js: ~200 lines
session-manager.js:            ~180 lines
captive-portal-manager.js:      ~250 lines
ui-utilities.js:               ~300 lines
status.js (refactored):        ~350 lines (from 1,551)

Total module code:             ~1,430 lines
With tests:                    ~3,500 lines
Reduction in main component:   -81%
```

This organization makes each piece testable, maintainable, and reusable.
