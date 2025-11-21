# First-Principles Debugging Framework

**Purpose**: Prevent assumption-based debugging and ensure systematic root cause analysis.

**Last Updated**: 2025-11-21
**Created After**: 12+ failed deployments due to assumption-based debugging

---

## The Problem This Solves

**What Went Wrong (Webflow Cloud Deployment)**:
- Claude assumed OpenNext compatibility was the issue
- Claude downgraded Next.js to "fix" compatibility
- **Reality**: Webflow Cloud REQUIRES Next.js 15+ (platform requirement)
- **Result**: 12+ failed deployments, wasted hours, blamed "bugs" that didn't exist

**Root Cause**: Skipped verification of platform requirements, made assumptions, then tried to "fix" downstream symptoms.

---

## First-Principles Debugging Protocol

### Phase 1: Gather Facts (No Assumptions)

**Before attempting ANY fix, answer these questions with EVIDENCE:**

#### 1.1 Platform Requirements
```
□ What is the EXACT version requirement for the deployment platform?
  - Where is this documented? (provide URL)
  - Is there a compatibility matrix?
  - What versions are officially supported?

□ What runtime environment does the platform use?
  - Node.js version?
  - Edge runtime vs serverless?
  - Any compatibility flags required?

□ What build tools does the platform expect?
  - Specific adapters/builders?
  - Build output format?
  - File structure requirements?
```

**Example (Webflow Cloud)**:
```
✅ Platform requires: Next.js 15+ (verified at developers.webflow.com/cloud)
✅ Runtime: Cloudflare Workers with nodejs_compat
✅ Build tool: @opennextjs/cloudflare (official adapter)
✅ Output: .worker-next directory
```

#### 1.2 Current State Analysis
```
□ What versions are currently installed?
  - Framework version
  - Runtime version
  - Dependencies

□ What is the EXACT error message?
  - Full stack trace
  - Error code (if provided)
  - Which build step failed?

□ What changed since last successful deployment?
  - Git diff
  - Dependency changes
  - Configuration changes
```

#### 1.3 Verify Official Documentation
```
□ What does the platform's official documentation say?
  - Deployment guide
  - Troubleshooting section
  - Known issues

□ Are there official examples/starters?
  - Can we compare our setup to working examples?
  - What versions do official examples use?

□ Is there a status page or known incidents?
  - Platform outages
  - Recent breaking changes
```

---

### Phase 2: Root Cause Hypothesis (Evidence-Based)

**Rule**: Every hypothesis must cite evidence. No "probably" or "might be".

#### 2.1 Hypothesis Template
```markdown
## Hypothesis: [Specific claim]

**Evidence**:
1. [Error message showing X]
2. [Documentation stating Y]
3. [Log output indicating Z]

**Test**:
- [Specific action to validate hypothesis]
- [Expected outcome if hypothesis is correct]
- [Expected outcome if hypothesis is wrong]

**Alternative Explanations**:
1. [What else could cause this?]
2. [Have we ruled out X?]
```

#### 2.2 Red Flags (Stop and Research)
```
❌ "This seems like a bug in [platform]"
   → Have you verified it's not a configuration issue?
   → Have others reported this exact bug?
   → Is there a GitHub issue or status page incident?

❌ "Let's downgrade to fix compatibility"
   → Does the platform ALLOW this version?
   → What are the platform's minimum requirements?
   → Could downgrading violate platform requirements?

❌ "The platform's template is broken"
   → Are we using the configuration format correctly?
   → Have we checked official examples?
   → Could our code be violating expected patterns?

❌ "This worked before, so..."
   → What changed? (git diff)
   → Did platform update? (check changelog)
   → Are we testing the same configuration?
```

---

### Phase 3: Systematic Verification

#### 3.1 Check Compatibility Matrix
```bash
# Before making ANY version change, verify compatibility:

1. Check platform requirements:
   - Minimum versions
   - Maximum versions
   - Supported configurations

2. Check dependency compatibility:
   - Framework peer dependencies
   - Adapter compatibility ranges
   - TypeScript version requirements

3. Build compatibility matrix:
   Next.js X.Y.Z → requires React A.B.C
   Adapter X.Y.Z → supports Next.js range [min, max]
   Platform → requires Next.js >= W.X.Y
```

**Example Check (Before Downgrading Next.js)**:
```
Question: Can I downgrade Next.js 15 → 14 for Webflow Cloud?

Evidence Gathering:
1. ✅ Check Webflow Cloud docs: "Requires Next.js 15+"
2. ✅ Check OpenNext compatibility: "v1.13.0 supports Next.js 15"
3. ✅ Check error message: Is it a version incompatibility or config error?

Decision: ❌ CANNOT downgrade - violates platform requirement

Conclusion: Must upgrade OpenNext, not downgrade Next.js
```

#### 3.2 Minimal Reproduction
```
Before fixing complex production app:

1. Create minimal reproduction:
   - Fresh install with platform starter
   - Add ONE feature at a time
   - Identify exact breaking change

2. Compare working vs broken:
   - Diff package.json
   - Diff configuration files
   - Diff build output

3. Isolate the variable:
   - Change ONE thing at a time
   - Verify each change independently
   - Don't compound changes
```

---

### Phase 4: Solution Validation

#### 4.1 Pre-Implementation Checklist
```
Before committing a fix:

□ Does this solution align with platform requirements?
□ Have we verified this in official documentation?
□ Will this create new incompatibilities?
□ Have we tested this locally?
□ Is there a rollback plan?

If any answer is "unsure" → STOP and research more
```

#### 4.2 Implementation Principles
```
✅ DO:
- Upgrade to meet platform requirements
- Follow official migration guides
- Test each change independently
- Document why each change is needed

❌ DON'T:
- Downgrade to "fix" issues (usually wrong)
- Change multiple things simultaneously
- Skip reading error messages carefully
- Assume platform bugs without evidence
```

---

## Decision Tree: Is This a Platform Bug?

```
[Error Occurs]
    ↓
[Read FULL error message + stack trace]
    ↓
Are we using supported versions? ──NO──→ [Upgrade to supported versions FIRST]
    ↓ YES
    ↓
Is our config following official docs? ──NO──→ [Fix config to match docs]
    ↓ YES
    ↓
Does official starter/example work? ──YES──→ [Compare our code to working example]
    ↓ NO
    ↓
Is there a status page incident? ──YES──→ [Wait for platform fix]
    ↓ NO
    ↓
[NOW it might be a platform bug]
    ↓
[File issue with: versions, config, minimal reproduction]
```

---

## Case Study: Webflow Cloud Deployment

### What Should Have Happened

#### Step 1: Initial Error Analysis
```
Error: TypeScript template injection error

First-Principles Questions:
1. What does Webflow Cloud require?
   → Research: https://developers.webflow.com/cloud
   → Finding: Next.js 15+ required

2. What version are we using?
   → Check: package.json shows Next.js 14.2.33
   → Conclusion: VIOLATES PLATFORM REQUIREMENT

3. What's the fix?
   → Upgrade Next.js 14 → 15
   → Upgrade related dependencies (React, OpenNext)
   → Verify compatibility of all changes
```

**Result**: One deployment, immediate success.

### What Actually Happened

#### Anti-Pattern Example
```
Error: TypeScript template injection error

Assumption-Based Debugging:
1. "This looks like a Webflow template bug"
   → Try workaround: add loaderFile
   → Failed

2. "TypeScript is the problem"
   → Convert to JavaScript
   → Failed (different error)

3. "OpenNext doesn't like edge runtime"
   → Remove edge runtime
   → Failed (different error)

4. "OpenNext 1.6.5 doesn't support Next.js 15"
   → Downgrade Next.js 15 → 14
   → VIOLATES PLATFORM REQUIREMENT
   → Cascade of peer dependency errors

5. After 10+ failures: "Let me research platform requirements"
   → Discovery: Webflow Cloud requires Next.js 15+
   → Realize: We created the problem by downgrading
```

**Result**: 12+ deployments, hours wasted, blamed non-existent bugs.

---

## When to Use Specialized Agents

### Immediate Agent Deployment Triggers

```
Deploy research agent IMMEDIATELY when:

□ Encountering platform-specific errors for first time
□ Considering version downgrades
□ Error messages mention "unsupported" or "incompatible"
□ After 2 failed fix attempts
□ Before claiming "platform bug"
□ When documentation is unclear
```

### Agent Assignment Guide

**@webflow-cloud-build-expert**:
- Webflow Cloud deployment errors
- Next.js + Cloudflare compatibility
- Build configuration issues
- Platform requirement verification

**@web-intelligence-specialist**:
- Official documentation lookup
- Compatibility matrix research
- Known issues / status page checks
- Migration guide discovery

**@backend-architect**:
- API compatibility with new versions
- Runtime requirement analysis
- Dependency compatibility assessment

**@Plan**:
- Complex multi-step migrations
- Risk assessment of version changes
- Rollback strategy planning

---

## Automation Safeguards

### Pre-Commit Hooks
```bash
# .husky/pre-commit
#!/bin/bash

# Check if package.json changed
if git diff --cached --name-only | grep -q "package.json"; then
  echo "📦 package.json changed - running compatibility checks..."

  # Extract versions
  NEXT_VERSION=$(node -p "require('./apps/web/package.json').dependencies.next")

  # Check against known platform requirements
  # (Add platform-specific checks here)

  echo "✅ Version compatibility verified"
fi
```

### CI/CD Validation
```yaml
# .github/workflows/validate-versions.yml
name: Version Compatibility Check

on: [pull_request]

jobs:
  check-versions:
    runs-on: ubuntu-latest
    steps:
      - name: Verify Platform Requirements
        run: |
          # Webflow Cloud requires Next.js 15+
          NEXT_VERSION=$(node -p "require('./apps/web/package.json').dependencies.next")
          if [[ "$NEXT_VERSION" < "15.0.0" ]]; then
            echo "❌ Webflow Cloud requires Next.js 15+"
            exit 1
          fi
```

---

## Quick Reference Card

### Before Attempting Any Fix:

1. **Read the FULL error message** (don't skim)
2. **Check platform requirements** (official docs)
3. **Verify current versions** (package.json)
4. **Research before changing** (don't guess)
5. **One change at a time** (isolate variables)

### Red Flags to Stop and Research:

- ❌ "Let's downgrade X to fix this"
- ❌ "This seems like a [platform] bug"
- ❌ "The template/config is broken"
- ❌ "This worked before" (without checking what changed)
- ❌ Multiple simultaneous changes

### When to Deploy Agents:

- ✅ First encounter with platform error
- ✅ Before any version downgrade
- ✅ After 2nd failed fix attempt
- ✅ When claiming "platform bug"
- ✅ Any "unsupported" / "incompatible" error

---

## Commitment

**Before debugging production issues**:
1. Read this document
2. Follow the decision tree
3. Deploy research agents early
4. Document assumptions with evidence
5. Verify platform requirements FIRST

**Remember**: The cost of 1 hour of research is less than 12 failed deployments.

---

**Related Documentation**:
- [CLAUDE.md](./CLAUDE.md) - Project architecture reference
- [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md) - Pre-deployment verification
- [Platform Requirements](https://developers.webflow.com/cloud) - Official Webflow Cloud docs
