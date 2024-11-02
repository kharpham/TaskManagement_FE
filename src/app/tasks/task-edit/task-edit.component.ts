// src/app/tasks/task-edit/task-edit.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../shared/services/task.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule]
})
export class TaskEditComponent implements OnInit {
  task: any = { title: '', description: '', dueDate: '', assignedTo: '' };

  constructor(private route: ActivatedRoute, private taskService: TaskService, private router: Router) { }

  ngOnInit(): void {
    const taskId = Number(this.route.snapshot.paramMap.get('id'));
    if (isNaN(taskId)) {
      this.router.navigate(['/not-found']);
      return;
    }
    this.taskService.getTask(taskId).subscribe(task => {
      this.task = task;
    }, error => {
      console.error('Error fetching task:', error);
      this.router.navigate(['/not-found']);
    });
  }

  saveTask(): void {
    this.taskService.updateTask(this.task.id, this.task).subscribe(() => {
      this.router.navigate(['/tasks']);
    }, error => {
      console.error('Error updating task:', error);
      this.router.navigate(['/not-found']);
    });
  }

  cancel(): void {
    this.router.navigate(['/tasks']);
  }
}