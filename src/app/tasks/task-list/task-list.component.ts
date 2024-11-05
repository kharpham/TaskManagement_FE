// src/app/tasks/task-list/task-list.component.ts
import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../shared/services/task.service';
import { AuthService } from '../../shared/services/auth.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class TaskListComponent implements OnInit {
  tasks: any[] = [];
  username: string | null = null;
  constructor(private taskService: TaskService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(isComplete?: boolean): void {
    this.taskService.getTasks(isComplete).subscribe(tasks => {
      this.tasks = tasks;
    });
  }

  filterTasks(isComplete: boolean | null): void {
    this.loadTasks(isComplete === null ? undefined : isComplete);
  }

  deleteTask(taskId: number): void {
    this.taskService.deleteTask(taskId).subscribe(() => {
      this.loadTasks();
    });
  }
  logout(): void {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/login']);
    });
  }
  
}