Design a modern industrial-grade mobile and web UI for a manufacturing quality inspection system.

STYLE:
Clean enterprise SaaS UI
Industrial theme with steel grey, dark blue (#1E3A5F), white background
Use green (#22C55E) for OK and red (#EF4444) for NG
Rounded cards, soft shadows
Large touch-friendly buttons
Highly readable typography (Inter or Roboto)

📱 MOBILE APP (ANDROID / PWA)

Create full clickable prototype with transitions.

USER ROLE LOGIC:
User 1 → can see Station 1 (Visual Inspection 1) and Station 2 (Visual Inspection 2)
User 2 → can see Station 3 (Assembly) and Station 4 (Final Inspection)

🔐 SCREEN 1: LOGIN
Fields:

User ID

Password

Login Button (Primary)

📍 SCREEN 2: STATION SELECTION

Show ONLY assigned stations based on user login.

For User 1:
[ ST01 - Visual Inspection 1 ]
[ ST02 - Visual Inspection 2 ]

For User 2:
[ ST03 - Assembly ]
[ ST04 - Final Inspection ]

Design:

Card layout

Station code bold

Subtitle station name

Icon for station

Click → Navigate to Scanner

📷 SCREEN 3: BARCODE SCANNER

Camera UI with scan overlay box
Animated scanning line
Auto-detect item

On scan → auto navigate to Checklist screen

📋 SCREEN 4: CHECKLIST (CORE SCREEN)

Header:
Item ID: CAC12345
Station: ST01 - Visual Inspection 1
Timestamp: 23 Mar 2026, 12:45 PM
Progress bar: Step 1 of 4

Checklist Items:

Appearance
Requirement: Parts should be free from dust & contamination
[ OK ✅ ] [ NG ❌ ]

Moulding Defect
Requirement: No flash, cracks, shrinkage, black spots
[ OK ✅ ] [ NG ❌ ]

Temporary Lug Location & Movement
Requirement: Proper movement as per WI
[ OK ✅ ] [ NG ❌ ]

🚨 NG BEHAVIOUR (IMPORTANT)

If user selects NG:

Open modal or new screen:

Fields:

Defect Description (Required)

Remarks (Required)

Suggested Action

Upload Images (Camera + Gallery)

UI:

Image preview thumbnails (max 5)

Show error if no image uploaded

RULE:
Disable Submit button until:

Description filled

At least 1 image uploaded

✅ SCREEN 5: SUBMISSION RESULT

Case 1: All OK
Show success screen:
"Inspection Completed"
Button: Move to Next Station →

Case 2: NG
Show:
"Item Sent to Rework"
Red indicator
Block forward movement

🔁 SCREEN 6: REWORK STATUS

Status: Rework Pending
Show previous NG details
Button: Re-inspect (only if allowed)

💻 WEB DASHBOARD (DESKTOP UI)

📊 DASHBOARD

Cards:

In Progress

Rework

Completed

Charts:

NG Frequency

Station Load

📄 ITEM DETAIL PAGE

Show timeline (VERY IMPORTANT):

ST01 → OK ✔
ST02 → NG ❌ (with image preview)
ST03 → Pending

Click NG → open:

Image zoom

Remarks

Inspector name

Timestamp

Also show:
Transaction ID
Item ID
Full inspection history

✏️ SUPERVISOR EDIT SCREEN

Editable checklist results
Mandatory field: Reason for edit

Save → create audit log

🔐 ADMIN PANEL

Manage:

Users

Stations

Station assignment to users

Checklist configuration

📊 REPORTS PAGE

Filters:

Date

Station

User

Charts:

NG %

Productivity

Station efficiency

📜 AUDIT LOG PAGE

Table:
Old Value | New Value | Changed By | Timestamp

🔁 FLOW CONNECTIONS (IMPORTANT)

Login → Station Selection → Scanner → Checklist

Checklist splits into:

All OK → Submit → Next Station

NG → NG Form → Rework → Stop Flow

Show arrows and transitions clearly

🎯 CLIENT WOW FEATURES TO HIGHLIGHT

User-based station visibility

NG cannot submit without image

Rework loop blocking system

Full audit trail

Timeline-based inspection tracking

Digital QA signature (user name + timestamp auto)

OUTPUT:

Create clickable prototype with:

Mobile flow

Web dashboard

Smooth transitions

Consistent design system