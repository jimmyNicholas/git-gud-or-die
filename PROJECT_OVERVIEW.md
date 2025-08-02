# PROJECT_OVERVIEW.md

# Permadeath Todo - "Git Gud or Die"

## Project Overview

A gamified todo app where missing deadlines kills your character and all current tasks are permanently deleted. Think Dark Souls meets productivity with no hand-holding, no second chances, just pure accountability.

## What This Project Should Achieve

### Core Features

- **Authentication**: User accounts with persistent stats across character deaths
- **Character System**: Create/recreate characters that hold current todos
- **Task Management**: Add todos with mandatory deadlines
- **Countdown Timers**: Visual countdown showing time remaining per task
- **Permadeath Logic**: Character death = all current todos deleted instantly
- **Stats Persistence**: Track deaths, tasks completed, survival streaks across account

### Technical Goals

- React Native app with Expo (primary platform)
- Web demo using React Native Web for portfolio showcase
- AWS serverless backend (Lambda + DynamoDB)
- Real-time countdown functionality
- Push notifications for mobile app
- Android-first deployment strategy

## Why I'm Building This

### Portfolio Goals

- Demonstrate modern React Native + AWS skills
- Show innovative thinking (unique concept in productivity space)
- Prove ability to ship complete full-stack applications
- Create something memorable for employer conversations

### Learning Objectives

- Master React Native development with Expo
- Learn AWS serverless architecture (Lambda, DynamoDB, Cognito)
- Practice TypeScript in mobile development
- Understand mobile app deployment process

### Cost Constraints

- Stay within AWS free tier during development
- Minimize app store costs (start Android-first)
- Use free tools where possible (Expo, GitHub)

## How I Like to Work

### Development Philosophy

- **Tidy First**: Clean, readable code over clever solutions
- **One step at a time**: Small, focused commits and PRs
- **Incremental progress**: Working software at each step
- **Concise responses**: Clear, actionable feedback

### Workflow Preferences

- CI/CD pipeline for automated testing/deployment
- Feature branches with PR reviews (even solo work)
- Regular commits with descriptive messages
- Documentation-driven development

## Architecture Guidelines

### State Management Preferences

- **Keep it Simple**: No complex contexts for small apps
- **Services + Hooks Pattern**: Use service classes with custom hooks
- **Inline Types**: Only extract types when used across multiple files
- **AWS-Ready Design**: Structure services to be easily replaceable with AWS later

### Code Organization

- **Minimal Abstraction**: Avoid over-engineering for small projects
- **Clear Separation**: Services handle business logic, hooks handle state
- **Pragmatic Structure**: Focus on functionality over perfect architecture
- **Easy Testing**: Design for simple mocking and testing

### Technology Choices

- **AsyncStorage**: For local persistence (simple, reliable)
- **Custom Hooks**: For state management (no context overhead)
- **Service Layer**: For business logic (testable, replaceable)
- **Inline Types**: Unless shared across multiple files

### Future-Proofing

- **Service Interfaces**: Design services to be swappable
- **Local First**: Start with local implementation, add AWS later
- **Incremental Migration**: Can replace services one at a time
- **No Lock-in**: Avoid framework-specific patterns that are hard to change

## Technology Stack

### Frontend

- **React Native** with Expo (easier development/deployment)
- **TypeScript** for type safety
- **Expo Router** for navigation
- **Expo Notifications** for push notifications
- **AsyncStorage** for local persistence
- **Custom hooks + services** for state management (no contexts)

### Backend

- **AWS Lambda** (serverless functions)
- **Amazon DynamoDB** (NoSQL database, generous free tier)
- **Amazon Cognito** (user authentication)
- **API Gateway** (REST API endpoints)

### Development Tools

- **Expo CLI** for React Native development
- **AWS CDK** or **Serverless Framework** for infrastructure
- **GitHub Actions** for CI/CD
- **AWS Budgets** for cost monitoring
- **AsyncStorage** for local data persistence

### Deployment

- **Expo EAS Build** for app building
- **Netlify/Vercel** for web demo hosting
- **AWS** for backend infrastructure

## General Theme - "Soulslike Productivity"

### Visual Design

- Dark, gritty aesthetic
- Terminal/retro gaming inspired UI
- Red warning states as deadlines approach
- Dramatic "CHARACTER DIED" screens

### UX Philosophy

- No hand-holding or excessive tutorials
- Immediate consequences for missed deadlines
- Minimal grace periods (embrace the danger)
- Clear visual feedback for countdown timers

### Tone & Messaging

- "Git gud" mentality
- Dark humor about productivity failure
- Gaming references and terminology
- Respect for the player's time and intelligence

## Development Roadmap

### Phase 1: React Native MVP

- [x] Initialize Expo project with TypeScript
- [x] Set up basic navigation and screens
- [ ] Implement core todo CRUD with local state
- [ ] Add countdown timers and permadeath logic
- [ ] Basic character system (create/reset character)
- [x] Test on Android simulator/device
- [ ] Deploy APK for testing

### Phase 2: AWS Backend Integration

- [ ] Set up AWS account with budgets/alerts
- [ ] Deploy Lambda functions for todo CRUD
- [ ] Set up DynamoDB tables (users, characters, todos)
- [ ] Implement Cognito authentication
- [ ] Connect React Native app to AWS backend
- [ ] Add basic stats tracking (deaths, completed tasks)

### Phase 3: Web Demo & Polish

- [ ] Create web demo using React Native Web or Expo web
- [ ] Deploy web demo to Netlify/Vercel for portfolio
- [ ] Add push notifications for mobile app
- [ ] Polish UI/UX and error handling
- [ ] Add advanced features (streaks, achievements)

### Phase 4: Deploy & Showcase

- [ ] Beta test via Internal Testing (Android)
- [ ] Deploy to Google Play Store
- [ ] Create portfolio documentation
- [ ] Record demo videos for interviews

## Possible Limitations

### Technical Challenges

- **Timer Accuracy**: Ensuring countdown timers work across app backgrounding
- **Push Notifications**: Complex setup for deadline warnings
- **Offline Handling**: What happens when user is offline during deadline?
- **Time Zones**: Managing deadlines across different time zones

### UX Concerns

- **Too Punishing**: Users might abandon app after first character death
- **Notification Fatigue**: Balance between urgency and annoyance
- **Accidental Deaths**: Users might die due to technical issues, not procrastination

### Cost Management

- **Free Tier Limits**: DynamoDB and Lambda have usage limits
- **Notification Costs**: Push notifications may incur charges
- **App Store Fees**: $25-99 developer accounts plus revenue sharing

### Scope Creep Risks

- **Feature Bloat**: Resist adding complexity (social features, multiple characters, etc.)
- **Over-Engineering**: Keep backend simple and focused
- **Perfect UI**: Don't get stuck polishing - ship and iterate

## Success Metrics

- [ ] Working web demo deployable for interviews
- [ ] Mobile app that can be installed and tested
- [ ] AWS backend staying within free tier
- [ ] Clean, documented codebase
- [ ] Memorable portfolio piece that starts conversations

---

_Remember: The goal is learning and demonstrating skills, not building the next unicorn. Keep it simple, ship it working, then iterate._
