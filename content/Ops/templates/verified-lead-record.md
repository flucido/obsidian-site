# Verified Lead Record Template

```yaml
name: ""                          # Full name with credentials
slug: ""                          # URL-safe name for file paths
organization: WFC | LTC
status: verifying | verified | rejected | draft | approved | sent | replied | won | lost
verification_date: YYYY-MM-DD
confidence: high | medium | low   # Based on source count (high=5+, medium=3-4, low=<3=REJECT)

# --- Identity ---
license_type: PSY | MFT | LCSW | LPCC | LEP | other
license_number: ""                # From state board
license_state: ""                 # 2-letter code
education: ""                     # Degree + institution
years_in_practice: 0
languages: []

# --- Practice ---
practice_name: ""
address: ""
phone: ""
email: ""
website: ""                       # MUST resolve in DNS
session_fee: ""
insurance: ""
format: in-person | telehealth | both

# --- Discovery ---
source_directory: psychology-today | therapyden | google-maps | linkedin | referral | other
psychology_today_url: ""
linkedin_url: ""
google_maps_url: ""
faculty_page_url: ""
other_source_urls: []

# --- Verification ---
g1_domain_valid: true | false
g2_website_loads: true | false
g3_license_verified: true | false
g4_directory_listed: true | false
g5_cross_referenced: true | false
screenshot_path: ""
all_gates_passed: true | false

# --- Website Audit ---
platform: squarespace | wix | wordpress | custom | weebly | other
https_valid: true | false
mobile_responsive: true | false
design_quality: modern | acceptable | dated | very-dated
differentiation: high | medium | low
notes: ""

# --- WFC-Specific ---
practice_type: new | established | post-launch
offer_fit: 01-landing | 02-cms | 03-support
pain_points: []
trust_language_notes: ""
privacy_requirements: ""

# --- Pipeline ---
stage: new | verified | draft | approved | proposal | commitment | active-build | support | closed
next_action: ""
deadline: YYYY-MM-DD
last_contact: YYYY-MM-DD
human_reviewed: true | false
```
