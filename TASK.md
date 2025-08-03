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
- [ ] Add date/time utilities for deadline handling

### 2. Implement Todo CRUD Operations

- [ ] Create "Add Todo" functionality with deadline picker
- [ ] Implement todo list display with countdown timers
- [ ] Add todo editing capabilities
- [ ] Implement todo deletion with confirmation

### 3. Add Countdown Timer Logic

- [ ] Create countdown timer component
- [ ] Implement real-time countdown updates
- [ ] Add visual warnings as deadlines approach
- [ ] Handle deadline expiration logic

### 4. Implement Permadeath System

- [ ] Create character death detection logic
- [ ] Implement todo deletion on character death
- [ ] Add character resurrection/creation flow
- [ ] Set up death statistics tracking

### 5. Create UI Components

- [ ] Design todo item component with countdown
- [ ] Create add/edit todo modal/form
- [ ] Implement character status display
- [ ] Add confirmation dialogs for destructive actions

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
