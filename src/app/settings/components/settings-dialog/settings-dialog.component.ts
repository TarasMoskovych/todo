import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-settings-dialog',
  templateUrl: './settings-dialog.component.html',
  styleUrls: ['./settings-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsDialogComponent {
  @Input() showDialog: { value: boolean };
  @Output() toggleDialog = new EventEmitter<boolean>();
  @Output() openPrioritiesDialog = new EventEmitter<void>();

  onCloseDialog(show: boolean) {
    show && this.onToggleDialog(false);
  }

  onToggleDialog(toggler: boolean, event?: MouseEvent) {
    event?.preventDefault();
    this.toggleDialog.emit(toggler);
  }

  onPrioritiesDialogOpen() {
    this.openPrioritiesDialog.emit();
  }

}
