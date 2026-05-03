import { Component } from '@angular/core'
import {
  NgDiagramBackgroundComponent,
  NgDiagramComponent,
  initializeModel,
  provideNgDiagram
} from 'ng-diagram'

@Component({
  selector: 'app-workflow-1',
  imports: [NgDiagramComponent, NgDiagramBackgroundComponent],
  providers: [provideNgDiagram()],
  template: `<div class="w-full h-full">
    <ng-diagram [model]="model" class="w-full h-full">
      <ng-diagram-background type="dots" />
    </ng-diagram>
  </div>`
})
export class Workflow1 {
  model = initializeModel({
    nodes: [
      { id: '1', position: { x: 100, y: 150 }, data: { label: 'Node 1' } },
      { id: '2', position: { x: 400, y: 150 }, data: { label: 'Node 2' } }
    ],
    edges: [
      {
        id: '1',
        source: '1',
        sourcePort: 'port-right',
        targetPort: 'port-left',
        target: '2',
        data: {
          label: 'Edge'
        }
      }
    ]
  })
}
