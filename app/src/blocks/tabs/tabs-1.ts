import { Component, signal } from '@angular/core'
import { TabContent } from '@angular/aria/tabs'
import { Tabs } from '../../components/ui/tabs/tabs'
import { TabList } from '../../components/ui/tabs/tab-list'
import { Tab } from '../../components/ui/tabs/tab'
import { TabPanel } from '../../components/ui/tabs/tab-panel'

@Component({
  selector: 'app-tabs-2',
  standalone: true,
  imports: [Tabs, TabList, Tab, TabPanel, TabContent],
  template: `
    <div appNgTabs class="w-full">
      <div
        appNgTabList
        orientation="horizontal"
        selectionMode="follow"
        [(selectedTab)]="selectedTab"
        class="h-9 w-60"
      >
        <button appNgTab value="account">Account</button>
        <button appNgTab value="password">Password</button>
        <button appNgTab value="settings">Settings</button>
      </div>
      <div class="bg-muted/40 h-36 w-60 rounded-md border p-4">
        <div appNgTabPanel value="account" class="text-sm">
          <ng-template ngTabContent>
            Make changes to your account here.
          </ng-template>
        </div>
        <div appNgTabPanel value="password" class="text-sm">
          <ng-template ngTabContent> Change your password here. </ng-template>
        </div>
        <div appNgTabPanel value="settings" class="text-sm">
          <ng-template ngTabContent>
            Update your preferences here.
          </ng-template>
        </div>
      </div>
    </div>
  `
})
export class Tabs1 {
  protected readonly selectedTab = signal('account')
}
