# Google Summer of Code 2026 Proposal
## Status Component Refactoring - OpenWISP WiFi Login Pages

### Student Information
- **Project**: Modernize OpenWISP WiFi Login Pages
- **Objective**: Code Refactoring and Architecture Improvements
- **Problem ID**: Status Component Refactoring (#918)

---

## Problem Statement

The Status Component (`client/components/status/status.js`) is a critical part of the OpenWISP WiFi Login Pages application that manages the post-login user experience. However, the component has become a monolithic class with **1,551 lines of code** handling multiple distinct responsibilities:

### Current Issues:

1. **Single Responsibility Principle Violation**
   - Authentication and token management
   - Payment and subscription operations
   - RADIUS session management
   - Captive portal authentication flows
   - Mobile phone verification
   - UI rendering (multiple table formats)
   - All intertwined in one component

2. **Maintainability Challenges**
   - Complex interdependencies make changes risky
   - Adding features requires understanding entire component
   - Bug fixes can have unexpected side effects
   - High cognitive load for new developers

3. **Testing Difficulties**
   - Cannot test individual features in isolation
   - Mock setup is complex and brittle
   - Integration tests fail with small changes
   - Low code coverage due to complexity

4. **Scalability Concerns**
   - Difficult to add new authentication methods
   - Hard to support new payment providers
   - Challenging to customize UI per organization
   - Cannot easily reuse session management logic

### Example: Current `componentDidMount()` (180+ lines)
The lifecycle hook performs:
- Token validation
- User data initialization
- Password expiration checks
- Captive portal auth state resolution
- Multiple conditional redirects
- Form submission logic
- Event listener setup
- Interval-based polling initialization

This violates the Single Responsibility Principle and makes testing extremely difficult.

---

## Proposed Solution

### Architecture Redesign

Transform the monolithic component into a **modular, manager-based architecture**:

```
Status Component (Orchestrator)
├── AuthenticationManager
│   ├── Token validation
│   ├── Password expiration checks
│   ├── User data initialization
│   └── Auth state persistence
├── PaymentSubscriptionManager
│   ├── Payment verification
│   ├── Plan fetching/upgrading
│   ├── Plan exhaustion handling
│   └── Subscription UI management
├── SessionManager
│   ├── RADIUS session fetching
│   ├── Session monitoring
│   ├── Session-based logout
│   └── Pagination
├── CaptivePortalManager
│   ├── Iframe-based authentication
│   ├── SAML logout flow
│   ├── Post-message handling
│   └── Login notifications
└── UIUtilities
    ├── Table rendering
    ├── Data formatting
    ├── Duration/date formatting
    └── Progress bar rendering
```

### Key Benefits

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| **Status component lines** | 1,551 | ~300 | -81% |
| **Methods per class** | 25+ | ~5 | -80% |
| **Distinct responsibilities** | 6-7 | 1 | Single purpose |
| **Code to test ratio** | 1:0.3 | 1:0.8 | +167% testable |
| **Time to understand** | 2-4 hours | 30 minutes | -87% |
| **Feature addition time** | 2-3 days | 4-8 hours | -87% |

### Backward Compatibility

✅ **100% Backward Compatible**
- Props interface unchanged
- Behavior identical from user perspective
- No breaking changes to external APIs
- Browser compatibility preserved
- All existing integrations work unchanged

---

## Implementation Plan

### Phase 1: Manager Module Creation (Weeks 1-2)
Create standalone manager modules with full functionality:

1. **AuthenticationManager** (`authentication-manager.js`)
   - Extract all auth-related logic
   - Provide clean API for token/password validation
   - Handle user data formatting
   - Manage auth state persistence

2. **PaymentSubscriptionManager** (`payment-subscription-manager.js`)
   - Extract payment verification logic
   - Implement plan operations
   - Manage plan upgrade flows
   - Handle subscription state

3. **SessionManager** (`session-manager.js`)
   - Extract session fetching logic
   - Implement monitoring and auto-logout
   - Handle pagination
   - Manage session state

4. **CaptivePortalManager** (`captive-portal-manager.js`)
   - Extract iframe-based auth
   - Implement SAML logout
   - Handle post-message communication
   - Manage login notifications

5. **UIUtilities** (`ui-utilities.js`)
   - Extract all formatting functions
   - Create reusable table components
   - Implement responsive rendering

### Phase 2: Component Integration (Weeks 2-3)
Integrate managers into Status component:

1. Create manager instances in constructor
2. Replace method calls with manager calls
3. Update lifecycle hooks to use managers
4. Maintain identical behavior and props
5. Remove redundant code

### Phase 3: Testing (Week 4)
Comprehensive test coverage:

1. Unit tests for each manager
2. Integration tests for Status component
3. E2E tests for full user flows
4. Regression testing
5. Performance testing

### Phase 4: Documentation (Week 4)
Complete documentation:

1. Architecture documentation
2. Manager API documentation
3. Migration guide for developers
4. Code examples and use cases
5. Performance and scalability guide

---

## Technical Specifications

### Manager API Examples

#### AuthenticationManager
```javascript
class AuthenticationManager {
  async validateTokenAndInit(cookies, orgSlug, language)
  checkPasswordExpired(userData)
  initializeUserInfo(userData, settings)
  resolveMustLoginLogout(cookies, orgSlug, captivePortalSyncAuth)
  storeAuthValue(key, value, cookies)
  resolveStoredValue(key, fallback, cookies)
}
```

#### PaymentSubscriptionManager
```javascript
class PaymentSubscriptionManager {
  requiresPaymentVerification(userData, settings)
  getPaymentNavigationTarget(userData, settings)
  async fetchRadiusUsage(orgSlug, authToken)
  async upgradeUserPlan(orgSlug, authToken, planId)
  handlePlanExhaustion(userData, settings)
  setupUsageMonitoring(interval)
  cleanupUsageMonitoring()
}
```

#### SessionManager
```javascript
class SessionManager {
  async fetchActiveRadiusSessions(orgSlug, authToken, params)
  async fetchPastRadiusSessions(orgSlug, authToken, params)
  async logoutSession(sessionId, orgSlug, authToken)
  setupSessionMonitoring(interval)
  cleanupSessionMonitoring()
  isCurrentSessionActive()
}
```

#### CaptivePortalManager
```javascript
class CaptivePortalManager {
  async handleLoginResponse(iframeElement)
  async handleLogoutResponse(iframeElement)
  initiateLogin(credentials, forms, captivePortalConfig)
  initiateLogout(sessionId, forms, captivePortalConfig)
  handleSamlLogout(samlLogoutUrl)
  notifyUserOfLogin(message)
}
```

#### UIUtilities
```javascript
class UIUtilities {
  static formatDuration(seconds)
  static formatDateTime(date, language, options)
  static renderSessionsTable(sessions, screenWidth, language)
  static renderProgressBar(current, max, label)
  static formatBytes(bytes)
  static formatUsagePercentage(used, total)
}
```

---

## Testing Strategy

### Unit Testing
- **AuthenticationManager**: Token validation, state persistence, user data formatting
- **PaymentSubscriptionManager**: Payment verification, plan operations
- **SessionManager**: Session fetching, monitoring, pagination
- **CaptivePortalManager**: Iframe handling, SAML flow, notifications
- **UIUtilities**: All formatting and rendering functions

### Integration Testing
- Manager interactions within Status component
- State flow between managers
- Event handling and callbacks
- Prop passing and updates

### E2E Testing
- Complete login-to-status flow
- Session management workflow
- Plan upgrade process
- Multiple logout scenarios (normal, SAML, repeat-login)

### Coverage Targets
- **Unit tests**: >90% coverage per manager
- **Integration tests**: >85% component coverage
- **Overall**: >85% codebase coverage

---

## Success Criteria

### Code Quality
✅ Status component reduced from 1,551 to <400 lines  
✅ Each manager has single responsibility  
✅ Cyclomatic complexity reduced by >70%  
✅ Code duplication eliminated  

### Functionality
✅ All existing features work identically  
✅ All browser compatibility maintained  
✅ All existing tests pass  
✅ No prop/API changes  

### Testing
✅ >90% test coverage for managers  
✅ >85% test coverage for Status component  
✅ All critical paths tested  
✅ Edge cases handled  

### Documentation
✅ Architecture documentation complete  
✅ API documentation for each manager  
✅ Migration guide for developers  
✅ Code examples provided  

---

## Timeline

| Week | Tasks | Deliverables |
|------|-------|--------------|
| 1 | AuthenticationManager, PaymentSubscriptionManager | 2 modules, design docs |
| 2 | SessionManager, CaptivePortalManager, UIUtilities | 3 modules, API docs |
| 3 | Integrate all managers into Status component | Refactored component, all tests passing |
| 4 | Testing, documentation, performance tuning | Full test suite, architecture docs |

**Total Effort**: 40-60 hours (10 hours/week)

---

## Impact Assessment

### For Maintainers
- Easier to review and understand code
- Faster to implement bug fixes
- Safer to add new features
- Better code organization

### For Contributors
- Clear where to add new features
- Easy to understand each part
- Can work on one module independently
- Better testing infrastructure

### For Project
- Reduced technical debt
- Improved code quality metrics
- Foundation for future enhancements
- Better community contribution experience

### For Users
- More stable application
- Fewer bugs due to cleaner code
- Faster feature additions
- Better customization options

---

## Future Enhancements Enabled

Once refactored, these become possible:

1. **Custom Authentication Providers**
   - LDAP integration
   - Multi-factor authentication
   - Single Sign-On (SSO) support

2. **Payment Processor Plugins**
   - Multiple payment gateways
   - Custom billing logic
   - Subscription management

3. **Session Analytics**
   - Detailed usage analytics
   - Custom reports
   - Bandwidth management

4. **Mobile App Support**
   - Native iOS/Android apps
   - Unified API for mobile/web
   - Offline support

5. **Performance Optimizations**
   - Code splitting
   - Lazy loading
   - Service workers

---

## Related Work

This refactoring is part of the broader "Modernize OpenWISP WiFi Login Pages" initiative:

- **Parent Project**: Code Refactoring and Architecture Improvements
- **Related Issues**: #918 (Status Component Refactoring)
- **Related PRs**: Various component cleanup efforts
- **Coordination**: Aligns with other component refactorings

---

## Risks and Mitigation

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|-----------|
| Regression bugs | Medium | High | Comprehensive testing, staged rollout |
| Performance impact | Low | Medium | Performance benchmarking, optimization |
| Integration issues | Low | High | Integration tests, CI/CD validation |
| Timeline overrun | Medium | Medium | Weekly reviews, buffer time |

---

## Learning Outcomes

### For Student
- Advanced React architecture patterns
- Large-scale refactoring techniques
- Testing strategies for complex systems
- Open source contribution best practices
- Code review and documentation skills

### For Project
- Improved codebase quality
- Better architectural patterns
- Enhanced testing infrastructure
- Improved documentation

---

## Conclusion

This proposal addresses a critical technical debt issue in the OpenWISP WiFi Login Pages codebase. The refactoring maintains 100% backward compatibility while significantly improving code maintainability, testability, and scalability. 

The modular architecture enables future enhancements and makes the codebase more accessible to new contributors. The systematic approach with clear phases, success criteria, and testing strategy ensures successful implementation.

---

## Contact & Questions

For questions about this proposal, please refer to the detailed implementation plan in `REFACTORING_PLAN.md`.
