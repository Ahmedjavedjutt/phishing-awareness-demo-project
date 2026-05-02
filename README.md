# Phishing Awareness Demo — Credential Harvesting Simulation

**Student:** Ahmed Javed
**Institute:** Boston Institute of Analytics (BIA) — Cybersecurity & Ethical Hacking
**Certifications:** ISC2 CC | BIA Cybersecurity Diploma (In Progress)
**Type:** Educational Security Awareness Demonstration
**Purpose:** Demonstrate how phishing attacks work so defenders can identify and stop them

> **Disclaimer:** This project is built strictly for educational and security awareness
> purposes. It demonstrates phishing techniques in a controlled environment to help
> individuals and organizations recognize and defend against real attacks.
> Deploying this against real users without explicit written consent is illegal
> under Pakistan's PECA 2016 and equivalent laws worldwide.

---

## What This Demonstrates

This demo simulates a realistic phishing page — the type used in corporate
security awareness training programs — to show:

- How attackers build convincing fake payment or login pages
- What social engineering elements make victims trust a fake page
- How credential harvesting works technically at the frontend level
- What security controls and user behaviors prevent successful phishing

This is the same type of simulation used by professional red teams and
security awareness platforms like KnowBe4, Proofpoint, and Cofense.

---

## How a Phishing Attack Works (What This Demonstrates)

```
Attacker crafts convincing fake page
         ↓
Sends link via email, SMS, or messaging app (social engineering)
         ↓
Victim clicks — page looks legitimate (brand logos, real design)
         ↓
Victim enters credentials or card details
         ↓
Data captured — victim redirected to real site (attack invisible)
         ↓
Attacker uses credentials for account takeover or financial fraud
```

---

## Red Flags This Demo Teaches Users to Spot

| Red Flag | What to Look For |
|----------|-----------------|
| URL mismatch | Domain doesn't match the real company |
| No HTTPS padlock | Unsecured connection |
| Urgency language | "Act now", "Your account will be suspended" |
| Unexpected requests | Legitimate services never ask for full card details via link |
| Sender address | Slight misspellings: paypa1.com vs paypal.com |
| Generic greeting | "Dear Customer" instead of your real name |

---

## Defenses Demonstrated

**Technical Controls:**
- Email filtering with SPF, DKIM, DMARC records
- Browser-based anti-phishing (Google Safe Browsing, MS Defender SmartScreen)
- Multi-Factor Authentication — stolen password alone is not enough
- DNS filtering to block known phishing domains

**User Awareness Controls:**
- Always verify URLs before entering any credentials
- Never click payment links sent via SMS or email — go directly to the site
- Report suspicious emails to your IT/security team immediately
- Use a password manager — it won't autofill on fake domains

---

## MITRE ATT&CK Mapping

| Technique | ID | Description |
|-----------|-----|-------------|
| Phishing | T1566 | Initial access via deceptive message |
| Spearphishing Link | T1566.002 | Malicious link sent to target |
| Credentials from Web Browsers | T1555.003 | Harvesting entered credentials |
| Valid Accounts | T1078 | Using stolen credentials for access |

---

## OWASP Relevance

- **A07 — Identification & Authentication Failures** — weak auth enables account takeover
- **A05 — Security Misconfiguration** — missing security headers aid phishing
- **A01 — Broken Access Control** — no MFA means one credential = full access

---

## Real-World Case Studies

**Google & Facebook (2013–2015)**
Attacker sent fake invoices to finance teams — $100M stolen over 2 years.
Stopped only when a bank flagged a suspicious wire transfer.

**Twitter (2020)**
Employees targeted via phone phishing (vishing) — attackers gained access
to internal admin tools and hijacked high-profile accounts including
Barack Obama, Elon Musk, and Apple.

**Key lesson:** Even technically sophisticated organizations fall to
social engineering. User awareness is the last line of defense.

---

## Files

| File | Description |
|------|-------------|
| `invoice-payment.html` | Phishing simulation demo page |
| `README.md` | This file — educational context and defenses |

---

## References

- [MITRE ATT&CK — Phishing T1566](https://attack.mitre.org/techniques/T1566/)
- [OWASP Top 10 2021](https://owasp.org/www-project-top-ten/)
- [NIST SP 800-177 — Email Security](https://csrc.nist.gov/publications/detail/sp/800-177/rev-1/final)
- [KnowBe4 — Security Awareness Training](https://www.knowbe4.com/)
- [Pakistan PECA 2016](https://moitt.gov.pk/SiteImage/Misc/files/Electronic%20Crime%20Act%202016.pdf)

---

*Part of my cybersecurity portfolio → [github.com/Ahmedjavedjutt](https://github.com/Ahmedjavedjutt)*
