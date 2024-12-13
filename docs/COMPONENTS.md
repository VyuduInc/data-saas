# Vaydr Component Documentation

## Core Components

### ProfileEditor
`src/components/profile/ProfileEditor.tsx`

A modal component for editing user profile information.

#### Props
```typescript
interface ProfileEditorProps {
  isOpen: boolean;
  onClose: () => void;
  user: {
    name: string;
    email: string;
    image?: string;
  };
}
```

#### Usage
```tsx
import { ProfileEditor } from '@/components/profile/ProfileEditor';

function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <ProfileEditor
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      user={currentUser}
    />
  );
}
```

### ChatActions
`src/components/chat/ChatActions.tsx`

Component for managing chat-related actions like deletion.

#### Props
```typescript
interface ChatActionsProps {
  chatId: string;
  onDelete?: () => void;
}
```

#### Usage
```tsx
import { ChatActions } from '@/components/chat/ChatActions';

function ChatComponent() {
  return (
    <ChatActions
      chatId="chat-id"
      onDelete={() => {
        // Handle chat deletion
      }}
    />
  );
}
```

### Settings
`src/components/Settings.tsx`

Modal component for managing user settings.

#### Props
```typescript
interface SettingsProps {
  isOpen: boolean;
  onClose: () => void;
}
```

#### Usage
```tsx
import { Settings } from '@/components/Settings';

function App() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <Settings
      isOpen={isSettingsOpen}
      onClose={() => setIsSettingsOpen(false)}
    />
  );
}
```

## Utility Components

### Modal Components
All modal components follow these guidelines:
- Use NextUI's Modal components
- Include a close button
- Handle ESC key for closing
- Prevent body scroll when open
- Animate entrance/exit

### Form Components
Form components should:
- Include proper validation
- Show loading states during submission
- Handle errors gracefully
- Use NextUI's form components
- Support keyboard navigation

## State Management

Components use React's useState and useEffect hooks for local state management. For global state, consider using:
- React Context for theme/user preferences
- SWR for server state
- URL state for shareable UI states

## Styling

Components use:
- Tailwind CSS for styling
- NextUI components for UI elements
- CSS modules for component-specific styles
- CSS variables for theme values

## Best Practices

1. Component Organization:
   - One component per file
   - Group related components in folders
   - Use index.ts for exports

2. Props:
   - Use TypeScript interfaces
   - Document required vs optional props
   - Provide sensible defaults

3. Error Handling:
   - Use try/catch blocks
   - Show user-friendly error messages
   - Log errors for debugging

4. Performance:
   - Memoize expensive calculations
   - Use React.memo for pure components
   - Lazy load when appropriate

5. Accessibility:
   - Include ARIA labels
   - Support keyboard navigation
   - Maintain proper heading hierarchy
