# Equil - New Features Documentation

## Overview
Equil now includes three major new features: Mentor Match, Enhanced Anonymous Forum (Yik Yak-style), and Gamification System.

---

## 1. Mentor Match

**Route:** `/mentors`

### Features
- **Smart Matching:** Swipeable mentor cards with AI-powered compatibility scores
- **Detailed Profiles:** View mentor expertise, experience, exits, funds raised, and availability
- **Filtering:** Filter mentors by availability and ratings
- **Real-time Stats:** See response rates, number of mentees, and experience years
- **Connection Management:** Track your mentor connections in one place

### Key Components
- Swipeable card interface (similar to founder matching)
- Pass/Connect actions with visual feedback
- Progress indicator showing position in mentor queue
- Quick access to mentor conversations

### Screenshots/Navigation
Access from Dashboard → "Mentor Match" card or via direct route `/mentors`

---

## 2. Enhanced Founder Signal (Yik Yak-style)

**Route:** `/signal`

### Features
- **Voting System:** Upvote/downvote posts with real-time score calculation
- **Proximity-based:** See distance from other founders' posts
- **Sorting Options:**
  - 🔥 Hot: Trending posts based on engagement
  - 🕐 New: Recently posted content
  - 📈 Top: Highest voted posts
- **Commenting:** Thread-based discussions on posts
- **Anonymous Identity:** Posts show founder type and stage only
- **Trending Indicators:** "Hot" badges on viral posts

### Yik Yak-style Elements
- Location awareness (displays distance from poster)
- Anonymous but categorized (Founder type, stage)
- Vote-based ranking algorithm
- Real-time interaction counts
- Clean, minimal UI focused on content

### Interaction Flow
1. View feed sorted by Hot/New/Top
2. Upvote/Downvote posts
3. Tap comment count to view and add comments
4. Share posts with other founders
5. Create new anonymous posts

---

## 3. Gamification System

**Route:** `/gamification`

### Features

#### XP & Levels
- 50 levels total (Level 1-50)
- XP earned through:
  - Daily check-ins: +50 XP
  - Signal posts: +25 XP
  - Making connections: +100 XP
  - Receiving upvotes: +10 XP each
  - Completing challenges: Variable XP
- Progress bar showing XP until next level
- Level badge display across the app

#### Achievements System
- **Rarity Tiers:** Common, Rare, Epic, Legendary
- **Categories:**
  - Consistency achievements (streaks)
  - Social achievements (connections, upvotes)
  - Milestone achievements (levels, metrics)
  - Special achievements (challenges)
- Progress tracking for locked achievements
- Visual unlock celebrations

#### Leaderboard
- Global ranking system
- Display top performers
- Filter by timeframe (all-time, weekly, monthly)
- Shows: Rank, Level, XP, Streak
- Highlight current user position
- Top 3 receive crown badges

#### Daily Check-in
- **3-step process:**
  1. Mood selection (Great/Okay/Struggling)
  2. Energy level slider (0-100%)
  3. Focus areas selection
- Awards +50 XP per check-in
- Tracks streaks
- Provides insights over time

### Gamification Settings
Access via Profile → Settings Icon

**Options:**
- Enable/Disable entire gamification system
- Show/Hide level badge on posts
- Leaderboard visibility toggle
- Achievement notification preferences

### XP Earning Opportunities
| Action | XP Reward |
|--------|-----------|
| Daily Check-in | +50 |
| Post on Signal | +25 |
| Make Connection | +100 |
| Receive Upvote | +10 |
| Comment on Post | +5 |
| Complete Achievement | Variable |
| Maintain Streak | +10/day |

---

## Navigation Updates

### Bottom Navigation
- **Home:** Dashboard with all features
- **Signal:** Enhanced anonymous forum
- **Level Up:** Gamification hub (replaces Match)
- **Insights:** Performance analytics
- **Profile:** User settings and stats

### Dashboard Quick Access
All features accessible from main dashboard:
1. Founder Signal
2. Founder Match
3. Mentor Match (New)
4. Level Up (New)
5. Founder Insights

---

## Design Philosophy

### Visual Style
- Premium dark mode with electric blue (#3B82F6) and purple (#8B5CF6) accents
- Professional SaaS aesthetic (Linear, Stripe, Notion inspired)
- Subtle shadows and gradients
- Clean typography (Inter/SF Pro)

### User Experience
- Swipeable interactions for matching
- Real-time feedback on actions
- Progress indicators throughout
- Minimal friction, maximum impact
- Mobile-first design (iPhone 15 Pro optimized)

---

## Technical Implementation

### Key Technologies
- React with TypeScript
- React Router for navigation
- Lucide React for icons
- Tailwind CSS v4 for styling
- Shadcn/ui for base components

### State Management
- Local state with useState/useReducer
- No external state management needed yet
- Future: Consider Zustand for global gamification state

### Data Structure
All features currently use mock data structures that can be easily replaced with API calls:
- Mentor profiles
- Post data with voting
- Achievement tracking
- Leaderboard rankings
- User XP and level data

---

## Future Enhancements

### Potential Features
1. **Real-time Notifications:** Push notifications for achievements, upvotes, connections
2. **Mentor Scheduling:** Calendar integration for mentor sessions
3. **Group Challenges:** Team-based gamification
4. **Badges & Titles:** Customizable profile badges
5. **Weekly Quests:** Time-limited challenges
6. **Social Sharing:** Share achievements externally
7. **Analytics Dashboard:** Deep dive into gamification metrics
8. **Referral System:** Invite other founders, earn bonus XP

### Backend Integration Points
- User authentication and profiles
- Persistent XP and level tracking
- Real-time voting and comments
- Mentor matching algorithm
- Achievement unlock logic
- Leaderboard calculation
- Daily check-in data storage

---

## How to Use

### Getting Started with Gamification
1. Complete your first Daily Check-in from Dashboard
2. Earn your first 50 XP
3. Post on Founder Signal for +25 XP
4. Make a connection for +100 XP
5. Track progress in Level Up tab

### Maximizing XP
- ✅ Complete daily check-ins (never miss a day!)
- 📱 Stay active on Signal (post and engage)
- 🤝 Make meaningful connections
- 🎯 Complete achievements
- 🔥 Maintain your streak

### Settings & Privacy
- Control gamification visibility in Profile → Settings
- Toggle anonymous posting preferences
- Manage notification settings
- Customize leaderboard visibility

---

## Support & Feedback

For questions or feature requests related to these new features, please reach out through the app's feedback system or contact the development team.

**Version:** 2.0.0  
**Last Updated:** March 5, 2026
