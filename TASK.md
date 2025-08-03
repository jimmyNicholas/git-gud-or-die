# Current Task: Implement core todo CRUD with local state

## Task Overview

Implement the core todo management functionality with local state management, including creating, reading, updating, and deleting todos with mandatory deadlines.

## Subtasks

### 1. Set Up Local State Management

- [x] Install AsyncStorage dependency
- [x] Create quest data structure with deadline requirements
- [x] Create questService with AsyncStorage implementation
- [x] Create useQuests hook for state management
- [x] Create characterService and useCharacter hook
- [x] Add date/time utilities for deadline handling

### 2. Create UI Components

- [x] Design quest card component with countdown display
- [x] Create add/edit quest modal/form
- [x] Implement quest list with proper styling
- [ ] Add confirmation dialogs for destructive actions
- [ ] Design character status display component

### 3. Implement Quest CRUD Operations

- [ ] Create "Add Quest" functionality with deadline picker
- [ ] Implement quest list display with countdown timers
- [ ] Add quest editing capabilities
- [ ] Implement quest deletion with confirmation

### 4. Add Countdown Timer Logic

- [ ] Create countdown timer component
- [ ] Implement real-time countdown updates
- [ ] Add visual warnings as deadlines approach
- [ ] Handle deadline expiration logic

### 5. Implement Permadeath System

- [ ] Create character death detection logic
- [ ] Implement quest deletion on character death
- [ ] Add character resurrection/creation flow
- [ ] Set up death statistics tracking

## Success Criteria

- [ ] Users can create todos with mandatory deadlines
- [ ] Countdown timers show accurate time remaining
- [ ] Character dies and todos are deleted when deadlines are missed
- [ ] Users can resurrect/create new characters
- [ ] All todo operations work smoothly with local state

## Estimated Time: 4-6 hours

## Notes

- Use AsyncStorage for local persistence
- Implement countdown timers with useEffect and setInterval
- Keep permadeath logic simple but effective
- Focus on Android-first testing
- Maintain Dark Souls aesthetic in all components
- Use services + hooks pattern (no contexts for simplicity)
- Keep types inline unless used across multiple files
- Design services to be easily replaceable with AWS later
- Fixed AsyncStorage version compatibility (2.1.2)
- Resolved ESLint issues in todo service and storage utilities
- Added avatar system for future pixel art character customization
- Added comprehensive date/time utilities for deadline handling
- Created reusable QuestCard component with proper TypeScript types
- Implemented color-coded health bar system (Green → Yellow → Orange → Red)
- Consolidated types into centralized types folder for better maintainability
- Added fine-tune deadline controls (+/- 5m, 15m) to QuestModal
- Implemented inline editing for quest cards with expandable content
- Replaced manual deadline input with proper date-time picker
- Added comprehensive quick adjustment buttons (5m, 1h, 1d, 1w)
- Implemented card collapse behavior (auto-collapse after edit, only one card expanded at a time)
