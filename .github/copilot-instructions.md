# ng-blocks

## Project Overview
This is an AnalogJS (Angular + Vite) monorepo for showcasing reusable UI components built on Angular Aria. It follows shadcn/ui patterns but for Angular, with zoneless change detection and file-based routing.

## Architecture
- **Framework**: AnalogJS (Angular 21 + Vite) with zoneless change detection
- **Routing**: File-based routing in `app/src/app/pages/` (e.g., `(home).page.ts`, `(blocks)/accordion.page.ts`)
- **Styling**: Tailwind CSS with custom theme variables and component classes in `app/src/styles/style-nova.css`
- **Icons**: Lucide icons via `@ng-icons/core` and `lucide-angular`
- **Build Tool**: Nx monorepo with Vite
- **Testing**: Vitest with jsdom

## Component Structure
- **UI Components**: Reusable primitives in `app/src/components/ui/` (e.g., `accordion/`, `button.ts`)
- **Blocks**: Example implementations in `app/src/blocks/` (e.g., `accordion/accordion-1.ts`)
- **Pages**: Route components in `app/src/app/pages/` that showcase blocks

## Key Patterns
- **Directive Wrappers**: UI components wrap Angular Aria directives (e.g., `AccordionGroup` extends `NgAccordionGroup`)
- **Class Merging**: Use `cn()` utility from `app/src/lib/utils.ts` (clsx + tailwind-merge)
- **Host Directives**: Apply Angular Aria directives via `hostDirectives` in component directives
- **Icon Providers**: Provide icons at component level with `provideIcons()` from `@ng-icons/core`
- **Template Slots**: Use `data-slot` attributes for styling hooks (e.g., `data-slot="accordion-group"`)

## Development Workflow
- **Serve**: `npm run dev` or `nx serve app` (runs on port 4200 with HMR)
- **Build**: `npm run build` or `nx build app`
- **Lint**: `nx lint app` (ESLint with Nx rules)
- **Test**: `nx test app` (Vitest)

## File-Based Routing
- Routes are defined by file structure in `app/src/app/pages/`
- Parentheses denote route groups (e.g., `(blocks)/` creates `/blocks/` prefix)
- Default export from page files becomes the component
- Use `RouterLink` for navigation

## Component Creation
- Create UI primitives in `app/src/components/ui/` with directive-based API
- Wrap Angular Aria components with custom styling and class merging
- Export from index files for clean imports
- Use `input<ClassValue>()` for class inputs aliased as `'class'`

## Styling Conventions
- Apply base styles via `host` property with computed classes
- Use CSS custom properties for theme variables
- Component-specific classes prefixed with `cn-` (e.g., `cn-button`, `cn-input`)
- Dark mode via `.dark` class on `document.documentElement`

## Server-Side Features
- API routes in `app/src/server/routes/` using h3
- SSR enabled with `provideClientHydration()`
- Custom Vite plugin handles `?source` query for code display

## Dependencies
- Angular Aria for accessibility primitives
- Class Variance Authority for variant handling (though minimal usage)
- Theme service in `app/src/services/theme.service.ts` for dark mode toggle

## Example Component Pattern
```typescript
@Directive({
  selector: 'app-accordion-group,[appNgAccordionGroup]',
  hostDirectives: [{ directive: NgAccordionGroup, inputs: ['multiExpandable'] }],
  host: { 'data-slot': 'accordion-group', '[class]': '_computedClass()' },
})
export class AccordionGroup {
  _class = input<ClassValue>('', { alias: 'class' })
  _computedClass = computed(() => cn('cn-accordion flex w-full flex-col', this._class()))
}
```</content>
<parameter name="filePath">/Users/anuragrawat/Projects/ng-blocks/.github/copilot-instructions.md
