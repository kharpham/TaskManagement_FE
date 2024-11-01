// src/app/tasks/task-edit/task-edit.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../shared/services/task.service';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.css']
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
    if (taskId) {
      this.taskService.getTask(taskId).subscribe(task => {
        this.task = task;
      });
    } 
  }

  saveTask(): void {
    if (this.task.id) {
      this.taskService.updateTask(this.task.id, this.task).subscribe(() => {
        this.router.navigate(['/tasks']);
      }, error => {
        console.error('Error updating task:', error);
        this.router.navigate(['/not-found']);
      });
    } else {
      this.taskService.createTask(this.task).subscribe(() => {
        this.router.navigate(['/tasks']);
      });
    }
  }
}