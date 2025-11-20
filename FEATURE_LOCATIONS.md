# Feature Locations - UI Guide

Quick reference for where each new feature appears in the interface.

---

## Page Layout

```
┌─────────────────────────────────────────────────────┐
│ HEADER (sticky, shown when results displayed)       │
│ ┌──────────────────────────────────────────────┐   │
│ │ Webflow AI Assistant                         │   │
│ │           [History] [Saved] [New Topic]      │ ◄─┐ NEW: "Saved" button
│ └──────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────┘
                                                      │
┌─────────────────────────────────────────────────────┐
│ MAIN CONTENT                                        │
│                                                     │
│ ┌───────────────────────────────────────────────┐ │
│ │ Your question:                                │ │
│ │ How do I add custom JavaScript to Webflow?   │ │
│ └───────────────────────────────────────────────┘ │
│                                                     │
│ ┌───────────────────────────────────────────────┐ │
│ │ ANSWER (streaming)                            │ │
│ │                                               │ │
│ │ To add custom JavaScript to Webflow...       │ │
│ │                                               │ │
│ │ ┌─────────────────────────────────────────┐  │ │
│ │ │ JavaScript                    [Copy 📋]  │  │ │ ◄─ NEW: Code block with syntax highlighting
│ │ ├─────────────────────────────────────────┤  │ │
│ │ │ const example = "hello world";          │  │ │
│ │ │ document.querySelector('.my-class')     │  │ │
│ │ │   .addEventListener('click', () => {    │  │ │
│ │ │     console.log('Clicked!');            │  │ │
│ │ │   });                                   │  │ │
│ │ └─────────────────────────────────────────┘  │ │
│ │                                               │ │
│ │ You can add this in the...                   │ │
│ └───────────────────────────────────────────────┘ │
│                                                     │
│ [🔄 Try different approach ▼] [🔖 Save conversation] ◄─ NEW: Regenerate & Save buttons
│                                                     │
│ ┌───────────────────────────────────────────────┐ │
│ │ SOURCES                                       │ │
│ │ • Webflow University - Custom Code           │ │
│ │ • Webflow Blog - JavaScript Tips             │ │
│ └───────────────────────────────────────────────┘ │
│                                                     │
│ Related questions:                                  │
│ • How do I debug JavaScript in Webflow?            │
│ • Can I use jQuery in Webflow?                     │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

## Feature 1: Code Syntax Highlighting

### Location
- **Inside answer content** (automatically detected)
- Appears for any code blocks in the LLM response

### Visual Appearance
```
┌─────────────────────────────────────────────┐
│ JavaScript                        [Copy 📋] │ ← Language label + Copy button
├─────────────────────────────────────────────┤
│ const example = "hello world";              │ ← Syntax highlighted code
│ console.log(example);                       │
└─────────────────────────────────────────────┘
```

### Colors
- **Header background**: #21252b
- **Code background**: #282c34 (oneDark theme)
- **Syntax colors**: oneDark palette (blue, green, orange, etc.)
- **Border**: #363636

---

## Feature 2: Saved Conversations

### Location A: Save Button
- **Below each answer** (after Confidence Badge, before Citations)
- Appears when answer is complete (not streaming/loading)

```
[🔄 Try different approach ▼] [🔖 Save conversation]
                               ^^^^^^^^^^^^^^^^^^^
                               Save button appears here
```

### Location B: Saved Button (Header)
- **Top-right header**, between "History" and "New Topic"

```
┌──────────────────────────────────────────────┐
│ Webflow AI Assistant                         │
│           [History] [Saved] [New Topic]      │
│                      ^^^^^^                  │
│                      Button to open modal    │
└──────────────────────────────────────────────┘
```

### Location C: Saved Conversations Modal
- **Centered overlay** when "Saved" button is clicked
- Dark modal (#171717) with list of saved conversations

```
                ┌─────────────────────────────────┐
                │ 🔖 Saved Conversations      [X] │
                ├─────────────────────────────────┤
                │ ┌─────────────────────────────┐ │
                │ │ How do I create a...    [🗑] │ │ ← Saved conversation
                │ │ 3 turns • 2h ago            │ │
                │ └─────────────────────────────┘ │
                │ ┌─────────────────────────────┐ │
                │ │ What's the difference... [🗑]│ │
                │ │ 2 turns • 1d ago            │ │
                │ └─────────────────────────────┘ │
                ├─────────────────────────────────┤
                │ 2 of 20 conversations saved     │
                └─────────────────────────────────┘
```

---

## Feature 3: Regenerate Answer Button

### Location
- **Below each answer** (after Confidence Badge, before Citations)
- Left side, next to "Save conversation" button

```
[🔄 Try different approach ▼] [🔖 Save conversation]
 ^^^^^^^^^^^^^^^^^^^^^^^^^^^^
 Regenerate button appears here
```

### Dropdown Menu
- Appears **below button** when clicked
- 4 strategy options with icons and descriptions

```
┌─────────────────────────────────────────┐
│ 🔄 Re-generate                          │
│    Try again with default settings      │
├─────────────────────────────────────────┤
│ 📚 Search more sources                  │
│    Expand search to 10 sources          │
├─────────────────────────────────────────┤
│ 💡 Explain simpler                      │
│    Get a beginner-friendly explanation  │
├─────────────────────────────────────────┤
│ ⚙️ More technical                       │
│    Get advanced technical details       │
└─────────────────────────────────────────┘
```

---

## Button States

### Save Conversation Button

**Normal state:**
```
[🔖 Save conversation]
```

**Hover state:**
- Background: #363636
- Border: #146EF5
- Text: #FFFFFF
- Scale: 1.05

### Regenerate Button

**Normal state:**
```
[🔄 Try different approach ▼]
```

**Loading state:**
```
[🔄 Regenerating...]
    ↑ spinner animation
```

**Hover state:**
- Background: #363636
- Border: #146EF5
- Text: #FFFFFF
- Scale: 1.05

### Saved Button (Header)

**Normal state:**
```
[🔖 Saved (3)]
      ↑ count badge
```

**With count badge:**
- Badge background: #146EF5
- Badge text: #FFFFFF
- Shows number of saved conversations

---

## Toast Notifications

### Success (Save)
```
✓ Conversation saved!
```

### Success (Load)
```
✓ Conversation loaded!
```

### Error (Save failed)
```
✗ Failed to save conversation. Storage might be full.
```

### Error (No conversation)
```
✗ No conversation to save
```

---

## Mobile Layout

All features are responsive and work on mobile:

### Buttons Stack
```
┌─────────────────────┐
│ 🔄 Try different    │
│    approach ▼       │
└─────────────────────┘
┌─────────────────────┐
│ 🔖 Save             │
│    conversation     │
└─────────────────────┘
```

### Header Wraps
```
┌─────────────────┐
│ Webflow AI      │
│ [Saved (3)]     │
│ [New Topic]     │
└─────────────────┘
```

---

## Keyboard Navigation

All interactive elements are keyboard accessible:

1. **Tab** - Navigate between buttons
2. **Enter/Space** - Activate button
3. **Escape** - Close modal/dropdown
4. **Arrow keys** - Navigate dropdown menu (future enhancement)

---

## ARIA Labels

All buttons have proper ARIA labels for screen readers:

```typescript
aria-label="Copy code to clipboard"
aria-label="Save this conversation"
aria-label="View saved conversations"
aria-label="Regenerate answer with different approach"
aria-label="Delete saved conversation"
aria-label="Close modal"
```

---

## Color Reference

### Webflow Brand Colors (maintained)
- **Primary**: #146EF5
- **Background**: #171717
- **Borders**: #363636
- **Text (primary)**: #FFFFFF
- **Text (secondary)**: #D8D8D8
- **Text (muted)**: #898989
- **Text (disabled)**: #5A5A5A

### Code Block Colors (oneDark theme)
- **Background**: #282c34
- **Header**: #21252b
- **Keywords**: #c678dd (purple)
- **Strings**: #98c379 (green)
- **Functions**: #61afef (blue)
- **Numbers**: #d19a66 (orange)
- **Comments**: #5c6370 (gray)

---

## Animation Details

### Button Hover
- **Transform**: scale(1.05)
- **Duration**: 200ms
- **Easing**: ease-in-out

### Modal Entry
- **Fade in**: opacity 0 → 1
- **Duration**: 300ms
- **Backdrop**: rgba(0,0,0,0.8)

### Toast Notifications
- **Slide up**: translateY(20px) → 0
- **Duration**: 300ms
- **Auto-dismiss**: 3 seconds

---

This guide provides a complete visual reference for all new features and their locations in the UI.
