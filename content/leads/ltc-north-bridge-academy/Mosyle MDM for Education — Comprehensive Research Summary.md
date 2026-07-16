# Mosyle MDM for Education — Comprehensive Research Summary

## 1. What Mosyle Is

**Mosyle** is a cloud-native, Apple-exclusive Mobile Device Management (MDM) and security platform. Its education product is called **Mosyle Manager**, designed exclusively for K-12 schools. It was originally founded as an iPad-first Learning Management System provider, then pivoted to MDM after hearing frustration from schools about legacy MDM providers.

- **Market reach:** 52,000+ customer accounts managing 7+ million Apple devices globally (2026 figure); over 20,000 schools
- **Supported platforms:** macOS, iOS, iPadOS, tvOS, watchOS, visionOS
- **Headquarters:** Winter Park, Florida
- **Website:** [https://school.mosyle.com/](https://school.mosyle.com/)

**Sources:** school.mosyle.com, siit.io/tools/trending/mosyle-review, mosyle.com/news-room

---

## 2. Pricing Tiers (Education)

|Plan|Cost|Key Inclusions|
|---|---|---|
|**Manager Free**|$0.00/device|No device limit; iOS/iPadOS _or_ macOS; full MDM protocol; Shared iPad; SSO; parental controls; personalized onboarding|
|**Manager Premium**|$5.50/device/year|Everything in Free + iOS + macOS + tvOS simultaneously; unlimited support; classroom management; automated workflows; App Catalog for macOS; screen sharing|
|**Manager OneK12**|$9.00/device/year|Everything in Premium + Mosyle Auth 2 (SSO); Web Filtering & Security; CDN app hosting; Endpoint Security (AI-based malware, compliance scanning/remediation)|

- 1 free tvOS license for each paid license
- Multi-year discounts available for education
- No minimum device count for Free tier

**Source:** school.mosyle.com/pricing

---

## 3. Core MDM Capabilities for iPad at Scale

### Deployment

- **Zero-Touch Enrollment** via Apple School Manager / Automated Device Enrollment (formerly DEP)
- **Apple Configurator 2** support for non-ASM devices
- **Manual Safari enrollment** for devices already in use
- Scales from 100 to 100,000+ devices
- **Mosyle Embark:** guided onboarding tool for Mac (included in OneK12)

### Configuration & Policies

- Passcode policies, restrictions, device authentication
- Single App Mode / Kiosk Mode
- Wi-Fi, VPN, DNS, cellular configuration
- Google/Microsoft/AD/LDAP/SCEP integration
- Mail, calendar, web clips, notifications, AirPrint, AirPlay, wallpaper, fonts

### Shared iPad Management

- Dedicated deployment workflows for shared devices
- Exclusive **Shared iPad Carts management tools**
- Per-student personalized experience on shared hardware

### BYOD (Bring Your Own Device)

- Uses **Apple User Enrollment** for privacy-first management
- Cryptographic data separation — manages only school data, no access to personal data
- Clean unenrollment removes school data without wiping personal content

### App Deployment

- Install/update App Store apps via Apple School Manager (VPP/Apps & Books) with device-based licensing — no Apple IDs needed per student
- **Custom Apps** and **Enterprise Apps** support
- macOS PKG & DMG installation
- **Mosyle App Catalog:** auto-install and patch non-App Store macOS apps without PKG handling
- Dynamic/automated install and patching workflows
- **Temporary Apps** with automated license management
- Secure hosting for PKG, DMG, and IPA files

### Remote Management Commands

- Lock, erase, reboot, activate Lost Mode
- Remote scripting for macOS (with AI script generation)
- Script Catalog with ready-to-use scripts
- Secure screen sharing for iPad and Mac

**Sources:** school.mosyle.com, school.mosyle.com/solutions/ios/mdm, afnts.ca/blog/mosyle-manager

---

## 4. Classroom Management Features

Mosyle's **Class Manager** provides teacher-facing tools:

|Feature|Description|
|---|---|
|**Study Apps**|Teachers select allowed apps; everything else is temporarily hidden on student devices|
|**Study Sites**|Temporary allowed website list for class time|
|**App Lock**|Lock student device to a single app (students cannot exit)|
|**Safe Test Mode**|Lock students into a specific webpage for assessments — prevents navigation elsewhere|
|**Live Screens** (macOS)|Teachers view student screens in real-time; can take screenshots|
|**Heads-Up Command**|Alert/notification to student devices|
|**Quick Poll**|In-class polling|
|**Class Feed / Class History**|Activity tracking and history|
|**Application Timeline** (macOS)|Track what apps students are using|
|**Device Compliance Check**|Verify devices meet teacher-defined policies|
|**Camera/Bluetooth Control**|Enable/disable camera and Bluetooth on student devices|

- Works across any network (school, home, remote learning)
- Integrates with Apple Classroom app
- Teachers configure classes with "one click" to apply all settings

**Source:** school.mosyle.com/teachers/, school.mosyle.com/pricing

---

## 5. Content Filtering & Web Security

### Technology

- **Encrypted DNS-based filtering** — operates at the device OS layer
- Works regardless of network (school Wi-Fi, home, cellular)
- No additional software required beyond MDM enrollment

### Filtering Capabilities

- **Standard filters:** Pre-curated filters for typical school needs
- **Custom filters:** 100+ domain categories, unlimited combinations
- **SafeSearch enforcement:** Google, YouTube, Bing, DuckDuckGo
- **Browser enforcement:** Automated on Chrome and Firefox
- **Bypass protection:** Proprietary list of 500+ iPadOS apps that could circumvent filtering — blockable with one click

### Security & Threat Protection

- AI-based threat databases updated several times daily
- Proprietary database of domains linked to Apple device malware
- Filters by **domain age** and **host country**
- Protection against phishing, malware distribution, fraud, spyware, spam
- Automated device isolation when threats detected

### Compliance & Logging

- **CIPA Compliance:** Full logging for students with one click
- **Staff privacy:** Configurable logging (blocked-only or disabled); when reduced, no one can see browsing history
- Robust logging and reporting capabilities

**Source:** school.mosyle.com/solutions/ios/web-filtering-security, helpnetsecurity.com, 9to5mac.com

---

## 6. Security Suite (Endpoint Protection)

Included in **OneK12** tier:

- **Device Scout:** Automated security compliance scanning and remediation against K-12-specific rules (iOS and macOS)
- **Detection & Removal:** AI-based malware/antivirus protection — auto-installs on current and future devices
- **Automated Hardening & Compliance:** Scanning and patching for both iOS and macOS
- **Privilege Management:** Admin On-Demand with automated rollback
- **Security Reports:** Comprehensive reports and ready-for-audit security logs
- **Mosyle Auth 2:** macOS SSO with Google Workspace, Microsoft 365, AD FS, LDAP, with MFA support and automated FileVault account creation

**Source:** mosyle.com/news-room/mosyle-sets-first-standard-k12, school.mosyle.com/pricing

---

Based on my research, here is the comprehensive summary:

---

