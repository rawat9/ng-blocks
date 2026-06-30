import { NgTemplateOutlet } from '@angular/common'
import { Component, signal } from '@angular/core'
import { Tree, TreeItem, TreeItemGroup } from '@angular/aria/tree'
import { NgIcon, provideIcons } from '@ng-icons/core'
import {
  lucideChevronDown,
  lucideChevronRight,
  lucideFile,
  lucideFolder,
  lucideSettings
} from '@ng-icons/lucide'

interface TreeNode {
  value: string
  label: string
  icon?: 'file' | 'settings'
  expanded?: boolean
  disabled?: boolean
  children?: TreeNode[]
}

@Component({
  selector: 'app-tree-1',
  standalone: true,
  imports: [NgTemplateOutlet, Tree, TreeItem, TreeItemGroup, NgIcon],
  providers: [
    provideIcons({
      lucideChevronDown,
      lucideChevronRight,
      lucideFile,
      lucideFolder,
      lucideSettings
    })
  ],
  template: `
    <div class="bg-background w-96 rounded-xl border p-3 shadow-sm">
      <div class="mb-3 flex items-center justify-between px-1">
        <div>
          <p class="text-sm font-medium">Project</p>
          <p class="text-muted-foreground text-xs">Keyboard navigable tree</p>
        </div>
        <span class="bg-muted rounded-full px-2 py-0.5 text-xs"
          >3 selected</span
        >
      </div>

      <ul
        ngTree
        #projectTree="ngTree"
        [(values)]="selectedNodes"
        [multi]="true"
        selectionMode="explicit"
        class="space-y-1 outline-none"
      >
        <ng-template
          [ngTemplateOutlet]="treeNodes"
          [ngTemplateOutletContext]="{ nodes: nodes, parent: projectTree }"
        />
      </ul>
    </div>

    <ng-template #treeNodes let-nodes="nodes" let-parent="parent">
      @for (node of nodes; track node.value) {
        <li
          ngTreeItem
          #treeItem="ngTreeItem"
          [parent]="parent"
          [value]="node.value"
          [label]="node.label"
          [expanded]="node.expanded ?? false"
          [disabled]="node.disabled ?? false"
          class="outline-none"
        >
          <div
            class="tree-row"
            [class.is-active]="treeItem.active()"
            [class.is-selected]="treeItem.selected()"
            [class.is-disabled]="node.disabled"
          >
            @if (node.children?.length) {
              <ng-icon
                [name]="
                  treeItem.expanded()
                    ? 'lucideChevronDown'
                    : 'lucideChevronRight'
                "
                size="14"
                class="text-muted-foreground"
              />
              <ng-icon name="lucideFolder" size="15" class="text-amber-500" />
            } @else {
              <span class="size-3.5"></span>
              <ng-icon
                [name]="
                  node.icon === 'settings' ? 'lucideSettings' : 'lucideFile'
                "
                size="15"
                class="text-muted-foreground"
              />
            }
            <span class="truncate">{{ node.label }}</span>
          </div>

          @if (node.children?.length) {
            <ul role="group" class="mt-1 ml-5 space-y-1 border-l pl-2">
              <ng-template
                ngTreeItemGroup
                [ownedBy]="treeItem"
                #group="ngTreeItemGroup"
              >
                <ng-template
                  [ngTemplateOutlet]="treeNodes"
                  [ngTemplateOutletContext]="{
                    nodes: node.children,
                    parent: group
                  }"
                />
              </ng-template>
            </ul>
          }
        </li>
      }
    </ng-template>
  `,
  styles: [
    `
      .tree-row {
        display: flex;
        min-height: 2rem;
        align-items: center;
        gap: 0.5rem;
        border-radius: 0.5rem;
        padding: 0.25rem 0.5rem;
        font-size: 0.875rem;
        outline: none;
        transition:
          background-color 150ms ease,
          color 150ms ease;
      }

      .tree-row:hover,
      .tree-row.is-active {
        background: var(--muted);
      }

      .tree-row.is-selected {
        background: var(--foreground);
        color: var(--background);
      }

      .tree-row.is-disabled {
        opacity: 0.5;
      }
    `
  ]
})
export class Tree1 {
  protected readonly selectedNodes = signal<string[]>([
    'src.app',
    'src.routes',
    'settings.theme'
  ])

  protected readonly nodes: TreeNode[] = [
    {
      value: 'src',
      label: 'src',
      expanded: true,
      children: [
        { value: 'src.app', label: 'app.component.ts' },
        { value: 'src.routes', label: 'app.routes.ts' },
        {
          value: 'src.lib',
          label: 'lib',
          expanded: true,
          children: [
            { value: 'src.lib.registry', label: 'registry.ts' },
            { value: 'src.lib.source', label: 'get-component-source.ts' }
          ]
        }
      ]
    },
    {
      value: 'settings',
      label: 'settings',
      expanded: true,
      children: [
        { value: 'settings.theme', label: 'theme.json', icon: 'settings' },
        { value: 'settings.local', label: 'local.env', disabled: true }
      ]
    }
  ]
}
