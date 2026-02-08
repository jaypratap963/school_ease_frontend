import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import Swal from 'sweetalert2';

import { ClassService } from '../../core/services/class.service';
import { StudentService } from '../../core/services/student.service';
import { SubjectService } from '../../core/services/subject.service';
import { ExamService } from '../../core/services/exam.service';
import { MarksService } from '../../core/services/marks.service';

@Component({
  standalone: true,
  selector: 'app-marks',
  imports: [CommonModule, FormsModule, NgSelectModule],
  templateUrl: './marks.component.html',
})
export class MarksComponent implements OnInit {
  classes: any[] = [];
  subjects: any[] = [];
  exams: any[] = [];
  students: any[] = [];

  selectedClassId: number | null = null;
  selectedSubjectId: number | null = null;
  selectedExamId: number | null = null;

  loadingStudents = false;
  isLocked = false;

  constructor(
    private classService: ClassService,
    private subjectService: SubjectService,
    private studentService: StudentService,
    private examService: ExamService,
    private marksService: MarksService
  ) {}

  ngOnInit(): void {
    this.classService.getTeacherClasses().subscribe(res => {
      this.classes = res;
    });

    this.examService.getAll().subscribe(res => {
      this.exams = res;
    });
  }

  onClassChange() {
    this.selectedSubjectId = null;
    this.selectedExamId = null;
    this.students = [];

    if (!this.selectedClassId) return;

    this.subjectService.getByClass(this.selectedClassId).subscribe(res => {
      this.subjects = res;
    });
  }

  onSubjectOrExamChange() {
    if (!this.selectedClassId || !this.selectedSubjectId || !this.selectedExamId)
      return;

    this.loadingStudents = true;
    this.students = [];

    this.marksService
      .getMarks(this.selectedClassId, this.selectedSubjectId, this.selectedExamId)
      .subscribe(existingMarks => {
        this.isLocked = existingMarks.length
          ? existingMarks[0].is_locked
          : false;

        this.studentService.getByClass(this.selectedClassId!).subscribe(students => {
          this.students = students.map(s => {
            const found = existingMarks.find(m => m.student_id === s.id);
            return {
              ...s,
              marks: found ? found.marks_obtained : null
            };
          });
          this.loadingStudents = false;
        });
      });
  }

  saveMarks() {
    const payload = {
      classId: this.selectedClassId,
      subjectId: this.selectedSubjectId,
      examId: this.selectedExamId,
      marks: this.students.map(s => ({
        studentId: s.id,
        marks: s.marks
      }))
    };

    this.marksService.saveMarks(payload).subscribe(() => {
      Swal.fire({
        icon: 'success',
        title: 'Marks saved',
        timer: 1200,
        showConfirmButton: false
      });
    });
  }

  lockMarks() {
    Swal.fire({
      title: 'Lock marks?',
      text: 'Type LOCK MARKS to confirm',
      input: 'text',
      showCancelButton: true,
      preConfirm: val => {
        if (val !== 'LOCK MARKS') {
          Swal.showValidationMessage('You must type LOCK MARKS');
        }
        return val;
      }
    }).then(res => {
      if (res.isConfirmed) {
        const payload = {
          classId: this.selectedClassId,
          subjectId: this.selectedSubjectId,
          examId: this.selectedExamId,
          marks: this.students.map(s => ({
            studentId: s.id,
            marks: s.marks
          }))
        };

        this.marksService.lockMarks(payload).subscribe(() => {
          this.isLocked = true;
          Swal.fire('Locked', 'Marks saved and locked', 'success');
        });
      }
    });
  }
}
