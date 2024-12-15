## Modern Craigslist Design System

### Color Palette

Primary Colors:
- Blue: #2563EB (Primary brand color)
- White: #FFFFFF (Background)
- Gray-50: #F9FAFB (Light background)
- Gray-900: #111827 (Text)

Accent Colors:
- Green-600: #059669 (Success, Prices)
- Red-600: #DC2626 (Urgent listings)
- Yellow-400: #FBBF24 (Ratings)

### Typography

Headings:
- Font: Inter
- H1: 30px/36px, Bold
- H2: 24px/32px, Bold
- H3: 20px/28px, Semibold
- H4: 18px/24px, Semibold

Body:
- Font: Inter
- Regular: 16px/24px
- Small: 14px/20px
- Tiny: 12px/16px

### Spacing System

- xs: 4px
- sm: 8px
- md: 16px
- lg: 24px
- xl: 32px
- 2xl: 48px
- 3xl: 64px

### Components

1. Header
- Height: 64px
- Logo: Blue (#2563EB)
- Search bar: 384px width
- Navigation: Regular 14px
- Post button: Blue background

2. Category Cards
- Size: 160px x 160px
- Icon size: 24px
- Border radius: 8px
- Hover state: Shadow elevation

3. Listing Cards
- Width: 100% (responsive grid)
- Image height: 192px
- Border radius: 8px
- Shadow: 0px 1px 3px rgba(0, 0, 0, 0.1)

4. Buttons
- Height: 40px (default)
- Border radius: 6px
- Padding: 16px 24px
- Font: 14px/20px, Medium

### Layout Grid

- Max width: 1280px
- Columns: 12
- Gutter: 24px
- Margin: 24px

### Breakpoints

- Mobile: 320px - 639px
- Tablet: 640px - 1023px
- Desktop: 1024px+

### Component States

Buttons:
- Default
- Hover
- Active
- Disabled

Cards:
- Default
- Hover
- Selected
- Loading

Form Fields:
- Default
- Focus
- Error
- Disabled

### Page Templates

1. Homepage
- Hero search section
- Category grid (8 categories)
- Featured listings (3x3 grid)
- Footer navigation

2. Listing Details
- Gallery viewer
- Product information
- Seller details
- Related listings

3. Category Page
- Filter sidebar
- Listings grid
- Sort options
- Pagination

4. Search Results
- Search filters
- Results grid
- Map view toggle
- Sort and filter options

### Micro-interactions

1. Hover States
- Scale: 1.02
- Shadow increase
- Transition: 200ms ease

2. Loading States
- Skeleton screens
- Pulse animation
- Progress indicators

3. Transitions
- Page transitions: 300ms ease
- Modal transitions: 200ms ease-out
- Menu transitions: 150ms ease-in-out

### Accessibility

- Color contrast ratio: 4.5:1 minimum
- Focus states: 2px blue outline
- Icon labels and alt text
- Keyboard navigation support
- Screen reader optimization

### Responsive Behavior

Mobile:
- Single column layout
- Collapsible filters
- Bottom navigation
- Stack card layout

Tablet:
- Two column grid
- Sidebar filters
- Hybrid navigation
- 2x2 card grid

Desktop:
- Three column grid
- Expanded filters
- Top navigation
- 3x3 card grid