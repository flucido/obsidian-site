I now have comprehensive data from official Apple documentation. Let me compile the complete structured inventory.

---

# Apple iPad Accessibility Features — Complete Structured Inventory

## Source Documentation
- Apple Support: https://support.apple.com/guide/ipad/get-started-with-accessibility-features-ipad9a2465f9/ipados
- Apple Features Page: https://www.apple.com/accessibility/features/
- Apple Education: https://support.apple.com/en-us/121825
- Apple Developer HIG: https://developer.apple.com/design/Human-Interface-Guidelines/accessibility
- Individual Apple Support articles for each feature (cited below)

---

## CATEGORY 1: VISION

### 1.1 VoiceOver
- **Location:** Settings > Accessibility > VoiceOver
- **What it does:** Industry-leading gesture-based screen reader that audibly describes everything on screen — text, buttons, battery level, caller ID, images. Supports navigation via gestures, external keyboards, and Bluetooth braille displays.
- **How it works:** Once enabled, the iPad speaks each element as you tap it. Swipe right/left to move between items. Double-tap to activate. Three-finger swipe to scroll. Rotor control (two-finger rotate) lets you switch between navigation modes (characters, words, headings, links, etc.).
- **Customization:** Adjustable speaking rate and pitch, verbosity settings, rotor actions, audio ducking, braille display support, Braille Screen Input (on-screen braille typing), haptic feedback, and per-app VoiceOver settings.
- **Supports:** 80+ voices in 60+ languages. Works with all built-in and most third-party apps.
- **Source:** https://support.apple.com/guide/ipad/ipad9a246898/ipados

### 1.2 Zoom (Screen Magnifier)
- **Location:** Settings > Accessibility > Zoom
- **What it does:** Magnifies the entire screen or a resizable window lens, regardless of which app is running.
- **How it works:** Full Screen Zoom magnifies everything on screen. Window Zoom creates a resizable magnifying lens that follows your finger. Supports simultaneous use with VoiceOver. Double-tap with three fingers to toggle zoom; drag three fingers to pan.
- **Customization:** Zoom level, zoom filter (inverted, grayscale, low light), zoom region (full screen/window), follow focus, smart typing.

### 1.3 Magnifier
- **Location:** Settings > Accessibility > Magnifier (or Settings > Control Center > add Magnifier)
- **What it does:** Turns the iPad's camera into a digital magnifying glass for real-world objects.
- **How it works:** Opens a live camera view with pinch-to-zoom. Apply color filters, adjust brightness/contrast, lock focus, and freeze frames. Save magnified images to Photos.
- **Advanced features (LiDAR-equipped iPads):** Detection Mode uses on-device ML to identify people, doors, furniture. Point and Speak reads text you point at. Reader Mode integrates with Accessibility Reader for customized text display.
- **Source:** https://support.apple.com/guide/ipad/use-ipad-like-a-magnifying-glass-ipadd86f5027/ipados

### 1.4 Display & Text Size
- **Location:** Settings > Accessibility > Display & Text Size
- **What it does:** Comprehensive visual accommodations for readability.
- **Sub-features:**
  - **Bold Text:** Increases font weight system-wide.
  - **Larger Text / Dynamic Type:** Adjusts font size system-wide or per-app (supports up to 200% scaling).
  - **Color Filters:** Applies filters for color blindness (protanopia, deuteranopia, tritanopia) or grayscale.
  - **Smart Invert / Classic Invert:** Reverses display colors; Smart Invert preserves images and media.
  - **Increase Contrast / Reduce Transparency:** Improves text legibility over backgrounds.
  - **Reduce White Point:** Decreases intensity of bright colors.
  - **Auto-Brightness:** Manages screen brightness based on ambient light.
  - **Per-App Settings (iOS 15+):** Apply different display settings to individual apps.

### 1.5 Reduce Motion
- **Location:** Settings > Accessibility > Motion > Reduce Motion
- **What it does:** Minimizes automatic animations, parallax effects, and screen transitions that can cause motion sickness or visual discomfort.
- **How it works:** When enabled, replaces zoom/slide animations with simple crossfade transitions. Also reduces automatic message effects and GIF animations.
- **Additional:** "Dim Flashing Lights" automatically dims the display when strobing/flashing content is detected in video.

### 1.6 Spoken Content / Speak Screen / Speak Selection
- **Location:** Settings > Accessibility > Spoken Content
- **What it does:** Text-to-speech suite for reading on-screen content aloud.
- **Sub-features:**
  - **Speak Screen:** Swipe down with two fingers from top of screen to read entire screen content aloud.
  - **Speak Selection:** Select text and tap "Speak" to hear it read aloud.
  - **Typing Feedback:** Speaks typed characters, words, auto-corrections, and capitalizations as they occur.
  - **Voices:** 80+ voices in 60+ languages. Adjustable speaking rate.
  - **Highlight Content:** Highlights words or sentences as they are spoken.
- **Source:** https://support.apple.com/guide/ipad/spoken-content-ipad9a247097/ipados

### 1.7 Hover Text / Hover Color (iPad with pointer support)
- **Location:** Settings > Accessibility > Hover Text / Hover Color
- **What it does:** When using a pointer (trackpad/mouse), Hover Text displays a high-resolution magnified text overlay. Hover Color speaks the color name under the pointer.

### 1.8 Audio Descriptions
- **Location:** Settings > Accessibility > Audio Descriptions (within video settings)
- **What it does:** Provides spoken narration describing important visual content in movies and TV shows within the Apple TV app and supported apps.

---

## CATEGORY 2: HEARING

### 2.1 Live Captions
- **Location:** Settings > Accessibility > Live Captions
- **What it does:** Real-time, on-device transcription of spoken audio from any app and live in-person conversations.
- **How it works:** Uses the iPad's processor to transcribe audio in real time. Works with FaceTime calls, video conferencing, media playback, and ambient conversations. Captions appear in a resizable, repositionable overlay.
- **Customization:** Font size, color, and background. On iPhone 11+ and Apple silicon Macs.
- **Source:** https://support.apple.com/guide/ipad/get-live-captions-of-spoken-audio-ipad0bbca12e/ipados

### 2.2 Sound Recognition
- **Location:** Settings > Accessibility > Sound Recognition
- **What it does:** iPad listens for specific environmental sounds and sends visual/tactile alerts.
- **Recognized sounds:** Fire alarm, siren, smoke detector, cat/dog sounds, doorbell, door knock, water running, baby crying, car horn, shouting, glass breaking, doorbell, appliance beeps, and more.
- **How it works:** On-device ML processes audio continuously. When a recognized sound is detected, a notification appears. Works even when wearing AirPods.
- **Name Recognition:** Alerts when your name is called in conversation.

### 2.3 Subtitles & Captioning
- **Location:** Settings > Accessibility > Subtitles & Captioning
- **What it does:** Customizes appearance of closed captions and subtitles (font, size, color, background, opacity). Enables Closed Captions + SDH system-wide.
- **Style options:** Large Text, Classic, or fully custom caption styles.

### 2.4 Hearing Devices / MFi Hearing Aids
- **Location:** Settings > Accessibility > Hearing Devices
- **What it does:** Pairs and manages Made for iPhone hearing aids and sound processors. Includes AirPods Pro clinical-grade Hearing Aid feature and Hearing Test (iOS 18+).

### 2.5 Live Listen
- **Location:** Settings > Control Center > add Hearing, then use Control Center
- **What it does:** Streams audio from iPad's microphone directly to AirPods or MFi hearing devices, effectively turning the iPad into a remote microphone.

### 2.6 Background Sounds
- **Location:** Settings > Accessibility > Audio/Visual > Background Sounds
- **What it does:** Plays ambient sounds (rain, ocean, bright noise, dark noise, stream, balanced noise) to mask environmental noise, improve focus, or aid rest. Can play alongside other audio.

### 2.7 Visual Alerts / LED Flash
- **Location:** Settings > Accessibility > Audio/Visual > LED Flash for Alerts
- **What it does:** Blinks the iPad's camera flash or screen for notifications, providing a visual cue for sounds.

### 2.8 Mono Audio / Balance
- **Location:** Settings > Accessibility > Audio/Visual
- **What it does:** Plays both audio channels in both ears for users with hearing loss in one ear. Left-right audio balance slider also available.

---

## CATEGORY 3: MOBILITY / MOTOR

### 3.1 AssistiveTouch
- **Location:** Settings > Accessibility > Touch > AssistiveTouch
- **What it does:** Provides an on-screen floating button/menu that gives quick access to gestures, device functions, and custom shortcuts without requiring complex physical gestures.
- **How it works:** A persistent on-screen button can be tapped to open a customizable menu. Menu items can include: Home, Siri, Notifications, Control Center, custom gestures, device controls (volume, rotation, lock screen), and third-party shortcuts.
- **Customization:** Create custom gestures, adjust idle opacity, use virtual trackpad, assign actions to long press/double tap/tap. Supports external adaptive devices.
- **Source:** https://support.apple.com/guide/iphone/use-assistivetouch-iph96b21954/ios

### 3.2 Touch Accommodations
- **Location:** Settings > Accessibility > Touch > Touch Accommodations
- **What it does:** Adjusts how the screen responds to touch input.
- **Sub-features:**
  - **Hold Duration:** Sets how long you must touch the screen before a tap is recognized (prevents accidental touches).
  - **Ignore Repeat:** Ignores repeated touches within a specified time interval.
  - **Tap Assistance (Use Initial Touch Location / Use Final Touch Location):** Controls whether the initial or final touch point is registered when your finger drifts.

### 3.3 Switch Control
- **Location:** Settings > Accessibility > Switch Control
- **What it does:** Enables full iPad control using external adaptive switches, the screen itself, the camera (head tracking), or sounds.
- **How it works:** The iPad scans through on-screen items (highlighting them sequentially). The user activates a switch to select the highlighted item. Supports single-switch, two-switch, and auto-scan modes.
- **Switch sources:** External Bluetooth/USB switches, screen tap, camera (head movements), sound (sip/puff, specific sounds).
- **Features:** Platform Switching (control synced Apple devices from one switch), recipes (sequences of actions), groups items for faster scanning, adjustable scan speed and behavior.

### 3.4 Eye Tracking (iPadOS 18+)
- **Location:** Settings > Accessibility > Eye Tracking
- **What it does:** Uses the front-facing camera and on-device ML to track eye movements and control the on-screen pointer.
- **How it works:** Quick calibration (seconds). Look at an element and use Dwell Control (dwell for a set time) to tap, or combine with a physical switch. Supports swipes, scrolling, and physical button simulation.
- **Privacy:** All processing is on-device; no eye tracking data leaves the iPad.

### 3.5 Voice Control
- **Location:** Settings > Accessibility > Voice Control
- **What it does:** Complete hands-free iPad control using spoken commands — navigate, tap, swipe, dictate text, and edit content.
- **How it works:** After initial setup (requires Wi-Fi for one-time language download), Voice Control listens for commands. On-screen overlays (numbers, names, grid) identify interactive elements. Commands include "Tap [item]," "Go home," "Open Control Center," "Show grid," etc.
- **Text modes:** Dictation mode (word-by-word), Spelling mode (character-by-character with phonetic alphabet), Command mode (only commands, no text input).
- **Customization:** Custom vocabulary, custom commands, attention-aware mode (Face ID iPads listen only when you look at the screen).
- **Source:** https://support.apple.com/guide/ipad/use-voice-control-ipad4b6c9ee4/ipados

### 3.6 Head Tracking (within Switch Control)
- **Location:** Settings > Accessibility > Switch Control > Head Tracking
- **What it does:** Uses the front-facing camera to track head movements and move the on-screen pointer accordingly.

### 3.7 Dwell Control (within AssistiveTouch or Eye Tracking)
- **What it does:** Allows selection by hovering/looking at an element for a set dwell time, eliminating the need to tap.

### 3.8 Full Keyboard Access
- **Location:** Settings > Accessibility > Keyboards > Full Keyboard Access
- **What it does:** Navigate and control the entire iPad using an external keyboard, with customizable keyboard shortcuts.

---

## CATEGORY 4: SPEECH

### 4.1 Live Speech
- **Location:** Settings > Accessibility > Live Speech
- **What it does:** Speaks typed words aloud using system voices or a personalized Personal Voice. Saved phrases available for quick communication.
- **How it works:** Type text and the iPad speaks it aloud through the speaker. Works in calls, FaceTime, and in-person communication.

### 4.2 Personal Voice
- **Location:** Settings > Accessibility > Personal Voice
- **What it does:** Creates a secure, synthesized voice that sounds like the user.
- **How it works:** User reads a set of prompted phrases (~15 minutes of recording). On-device ML generates a voice model. Integrated with Live Speech so the user's own voice speaks their typed text.
- **Privacy:** Voice model is stored securely on-device and never uploaded to Apple servers.

### 4.3 Type to Siri
- **Location:** Settings > Accessibility > Siri > Type to Siri
- **What it does:** Allows typing Siri requests instead of speaking them, for users who are non-verbal or in situations where speaking isn't possible.

---

## CATEGORY 5: COGNITIVE / LEARNING

### 5.1 Guided Access
- **Location:** Settings > Accessibility > Guided Access
- **What it does:** Temporarily locks the iPad to a single app and lets you control which features are available.
- **How it works:** Open the desired app, triple-click the Home/Top button (or use Control Center) to start. Draw circles to disable specific screen areas. Disable hardware buttons, motion, touch, or keyboard. Set time limits with audible warnings.
- **Use cases:** Keeping a child focused on an educational app, kiosk mode, preventing accidental app switching during tests.
- **Ending:** Triple-click and enter passcode, or use Face ID/Touch ID.
- **Source:** https://support.apple.com/guide/ipad/lock-ipad-to-one-app-ipada16d1374/ipados

### 5.2 Assistive Access
- **Location:** Settings > Accessibility > Assistive Access
- **What it does:** Provides a dramatically simplified, high-contrast interface for users with cognitive disabilities.
- **How it works:** Reduces the iPad to core apps (Calls, Messages, Camera, Photos, Music) with large buttons, simplified layouts, one interaction per screen, and double-confirmation for destructive actions. Removes non-critical UI and workflows.

### 5.3 Focus Modes
- **Location:** Settings > Focus
- **What it does:** Minimizes distractions by filtering notifications, apps, and home screens based on context (Work, Personal, Sleep, custom).
- **Accessibility/learning relevance:** Can be configured to show only educational apps and hide social media during study time. Custom home screens per Focus mode. Allow notifications only from specific people/apps. Can be automated by time, location, or app.
- **Source:** https://support.apple.com/guide/ipad/set-up-a-focus-ipad2789d162/ipados

### 5.4 Screen Time
- **Location:** Settings > Screen Time
- **What it does:** Monitors and manages device/app usage with limits, downtime schedules, and content restrictions.
- **Accessibility/learning relevance:**
  - **App Limits:** Set daily time limits for specific apps or categories (e.g., social media, games).
  - **Downtime:** Schedule periods when only allowed apps are available (e.g., bedtime).
  - **Content & Privacy Restrictions:** Restrict explicit content, app downloads, in-app purchases, and privacy settings.
  - **Communication Limits:** Control who the user can communicate with during allowed and downtime.
  - **Always Allowed:** Whitelist essential apps (e.g., educational apps, communication) that bypass limits.
  - **Activity Reports:** Detailed usage reports for self-monitoring or parental oversight.

### 5.5 Accessibility Reader
- **Location:** Available system-wide via sharing, or integrated into Magnifier
- **What it does:** A system-wide reading mode that customizes font, color, spacing, and layout for easier reading. Integrates with Magnifier for real-world text capture.

### 5.6 Safari Reader
- **What it does:** Distraction-free web reading mode with customizable text size, font, and background color. Supports spoken content.

### 5.7 Siri Shortcuts
- **Location:** Settings > Siri & Search, or the Shortcuts app
- **What it does:** Automate multi-step tasks across apps with a single tap or voice command.
- **Accessibility/learning relevance:** Create shortcuts for common tasks (e.g., "Start my homework" opens specific apps, enables Focus mode, starts a timer). Can be triggered by voice, widget, NFC tag, or automation. Reduces cognitive load by combining complex sequences into single actions.

### 5.8 Apple Intelligence Features (iPadOS 18+)
- **Writing Tools:** Proofreading, rewriting, summarizing text system-wide.
- **Visual Intelligence:** On-device image understanding and description.
- **Live Translation:** Real-time translation in Messages, FaceTime, and apps.
- **Audio Summaries in Notes:** Summarize recorded audio/lectures.

---

## CATEGORY 6: ADDITIONAL CROSS-CUTTING FEATURES

### 6.1 Accessibility Shortcut (Triple-Click)
- **Location:** Settings > Accessibility > Accessibility Shortcut
- **What it does:** Quickly toggle any combination of accessibility features by triple-clicking the Home/Top button or adding to Control Center.
- **Selectable features:** VoiceOver, Zoom, Switch Control, AssistiveTouch, Guided Access, Magnifier, Color Filters, Reduce Motion, Live Captions, and more.

### 6.2 Share Accessibility Settings
- **Location:** Settings > Accessibility > Share Accessibility Settings
- **What it does:** Temporarily apply another device's accessibility settings to your iPad (e.g., a teacher shares settings with student devices).

### 6.3 Per-App Accessibility Settings
- **Location:** Settings > Accessibility > Per-App Settings
- **What it does:** Apply different accessibility configurations to individual apps (e.g., larger text in one app, color filters in another).

### 6.4 Braille Access
- **Location:** Settings > Accessibility > Braille
- **What it does:** Turns iPad into a braille notetaker with app launcher, note-taking, and real-time Live Captions transcription. Supports Nemeth Braille and UEB Math. Connects Bluetooth braille displays.

### 6.5 Predictive Text & Dictation
- **Location:** Built-in keyboard settings
- **What it does:** Predictive text suggests words as you type. Dictation converts speech to text inline. Both reduce typing effort and support accessibility.

### 6.6 Real-Time Text (RTT)
- **Location:** Settings > Accessibility > RTT
- **What it does:** Enables text communication during phone calls in real time (text appears character-by-character to the recipient).

---

## Summary of Findings

**What I did:** Searched and extracted content from 8+ official Apple documentation pages, Apple's accessibility features page, Apple Education resources, and the Apple Developer Human Interface Guidelines.

**What I found:** iPadOS contains 40+ distinct accessibility features organized across 6 categories (Vision, Hearing, Mobility, Speech, Cognitive, Cross-cutting). Every feature listed in the task request was found with detailed descriptions. Key findings:

1. **VoiceOver** — Full screen reader with braille support, rotor navigation, and 60+ language voices
2. **Spoken Content/Speak Screen** — Text-to-speech with 80+ voices, two-finger swipe to read screen
3. **Guided Access** — Single-app lock with area disabling, time limits, hardware button control
4. **AssistiveTouch** — Floating on-screen menu with customizable gestures and device controls
5. **Switch Control** — Full device control via external switches, head tracking, sounds, with platform switching
6. **Voice Control** — Complete hands-free control with grid/name/number overlays and custom commands
7. **Eye Tracking** — Camera-based eye tracking with Dwell Control (iPadOS 18+)
8. **Live Captions** — On-device real-time transcription of all audio sources
9. **Sound Recognition** — ML-based environmental sound detection with alerts
10. **Magnifier** — Digital magnifying glass with Detection Mode, Point and Speak, LiDAR support
11. **Display & Text Size** — Color filters, bold text, Dynamic Type, invert colors, per-app settings
12. **Reduce Motion** — Minimizes animations, includes Dim Flashing Lights
13. **Touch Accommodations** — Hold duration, ignore repeat, tap assistance
14. **Siri Shortcuts** — Multi-step task automation via voice/tap
15. **Focus Modes** — Context-based distraction filtering with custom home screens
16. **Screen Time** — Usage monitoring, app limits, downtime, content restrictions
17. **Assistive Access** — Dramatically simplified interface for cognitive disabilities
18. **Accessibility Reader** — System-wide customizable reading mode
19. **Personal Voice** — On-device voice cloning for Live Speech
20. **Braille Access** — Full braille notetaker with Nemeth Braille/UEB Math support

**Files created:** None (this is a research deliverable returned as text).

**Issues encountered:** None; all major sources were accessible and returned comprehensive data.

