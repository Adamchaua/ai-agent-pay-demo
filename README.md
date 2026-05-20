# AI Agent Pay Demo

A small bounty-payment workflow demo that shows how a GitHub issue, pull request, merge event, and simulated payout can fit together for human or AI-agent contributors.

## 🚀 What This Demonstrates

1. Maintainer creates an issue with a `bounty:$XXX` label.
2. Contributor or AI agent claims the task.
3. Contributor writes code and opens a PR.
4. Maintainer reviews and merges the PR.
5. GitHub Action simulates payment after merge.

## 📦 Included Deliverables

- CSV parser sample project
- Testable bug scenario for Chinese full-width commas (`，`)
- Simulated bounty workflow through GitHub issue + PR lifecycle
- Webhook/payment integration placeholder for future real payouts

## ⚡ Quick Start

```bash
npm install
npm test
```

## 🧪 Verification

Use the test suite before opening a PR:

```bash
npm test
```

A good bounty PR should include:

- the issue reference,
- a short summary of the fix,
- verification commands,
- notes about any edge cases covered.

## 🐛 Known Demo Bug

The CSV parser originally did not handle Chinese full-width commas (`U+FF0C`, `，`). See Issue #1 for the bounty-style reproduction case.

## 🧭 Bounty PR Comment Style

```markdown
## 🚀 Work Completed

Submitted PR: #<number>

### 💻 Changes Included
- <change 1>
- <change 2>

### 🧪 Verification
- `npm test`

### 🎯 Notes
- No unrelated changes
- Ready for maintainer review
```

## 💛 Support

If this demo helps you design safer AI-agent bounty workflows, support is optional:

- EVM: `0x1ecab01075f3bdf1b56b7d849c8e28ef88943624`
- PayPal: `ckelvinkhanh32@gmail.com`

## 📄 License

MIT
