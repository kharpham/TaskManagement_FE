import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../shared/services/task.service';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent implements OnInit {
  task: any;

  constructor(private route: ActivatedRoute, private taskService: TaskService, private router: Router) { }

  ngOnInit(): void {
    const taskId = Number(this.route.snapshot.paramMap.get('id'));
    if (isNaN(taskId)) {
      this.router.navigate(['/not-found']);
      return;
    }
    this.taskService.getTask(taskId).subscribe(task => {
      this.task = task;
    });
  }

  toggleStatus(): void {
    const updatedStatus = !this.task.isComplete;
    this.taskService.updateTaskStatus(this.task.id, { isComplete: updatedStatus }).subscribe(task => {
      this.task.isComplete = updatedStatus;
    });
  }

  deleteTask(): void {
    this.taskService.deleteTask(this.task.id).subscribe(() => {
      this.router.navigate(['/tasks']);
    });
  }
}