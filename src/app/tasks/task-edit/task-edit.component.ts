// src/app/tasks/task-edit/task-edit.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../shared/services/task.service';
import { AuthService } from '../../shared/services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule]
})
export class TaskEditComponent implements OnInit {
  taskForm: FormGroup;
  usernames: string[] = [];
  taskId: number;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      dueDate: ['', Validators.required],
      assignedTo: ['', Validators.required]
    });
    this.taskId = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.authService.getAllUsernames().subscribe(usernames => {
      this.usernames = usernames;
    });

    this.taskService.getTask(this.taskId).subscribe(task => {
      // Format the due date to yyyy-MM-dd
      const formattedDueDate = new Date(task.dueDate).toISOString().split('T')[0];
      this.taskForm.patchValue({
        ...task,
        dueDate: formattedDueDate
      });
    });
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      this.taskService.updateTask(this.taskId, this.taskForm.value).subscribe(() => {
        this.router.navigate(['/tasks']);
      }, error => {
        console.error('Error updating task:', error);
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/tasks']);
  }
}