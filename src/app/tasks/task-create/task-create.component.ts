// src/app/tasks/task-create/task-create.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from '../../shared/services/task.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule]
})
export class TaskCreateComponent {
  task: any = { title: '', description: '', dueDate: '', assignedTo: '' };

  constructor(private taskService: TaskService, private router: Router) { }

  createTask(): void {
    this.taskService.createTask(this.task).subscribe(() => {
      this.router.navigate(['/tasks']);
    }, error => {
      console.error('Error creating task:', error);
    });
  }

  cancel(): void {
    this.router.navigate(['/tasks']);
  }
}