import {Component} from '@angular/core';
import {bootstrapApplication} from '@angular/platform-browser';

interface Task { done: boolean; description: string; nestedTask?: Task;}

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <h2>Liosta Tascanna</h2>
    <input #text />
    <button (click)="add(text.value)">Add</button>

    @for (task of tasks; track $index)
	{
		<p>
		  <input type="checkbox" (change)="toggle($index)" />
      <input type="button" (click)="delete($index)" value="X"/>
      <input type="button" (click)="nest()" value="+"/>
      
      @if (task.done) {
        <s>{{ task.description}}</s>

      } @else {
        <span>{{ task.description}}</span>
      }

      <!-- check for nested list -->
      
		</p>
    }
	@empty
	{
		<p>No todos</p>
    }
  `,
})

export class TodosComponent {
  tasks: Task[] = [];

  add(description: string) {
    this.tasks.push({description, done: false});
  }

  toggle(index: number) {
    this.tasks[index].done = !this.tasks[index].done;
  }

  delete(index: number): void {console.log(index);
    this.tasks.splice(index, 1);
  }

  nest(): void {
    // todo: recursively add the todo input box and add button?
  }
}

bootstrapApplication(TodosComponent);
