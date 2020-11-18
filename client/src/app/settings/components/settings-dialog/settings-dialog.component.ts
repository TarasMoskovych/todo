import { Color } from '@angular-material-components/color-picker';
import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Constants } from 'src/app/shared/classes';

@Component({
  selector: 'app-settings-dialog',
  templateUrl: './settings-dialog.component.html',
  styleUrls: ['./settings-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsDialogComponent {
  @Input() color: Color;
  @Input() image: string;
  @Input() darkTheme: boolean;
  @Input() showDialog: { value: boolean } = { value: false };
  @Output() toggleDarkTheme = new EventEmitter<boolean>();
  @Output() toggleDialog = new EventEmitter<boolean>();
  @Output() openPrioritiesDialog = new EventEmitter<void>();
  @Output() setColor = new EventEmitter<Color>();
  @Output() setImage = new EventEmitter<string>();

  readonly themeImages = Constants.THEME_IMAGES;
  readonly themeColors = Constants.THEME_COLORS;

  onCloseDialog(show: boolean) {
    show && this.onToggleDialog(false);
  }

  onToggleDialog(toggler: boolean, event?: MouseEvent) {
    event?.preventDefault();
    this.toggleDialog.emit(toggler);
  }

  onToggleDarkTheme() {
    this.toggleDarkTheme.emit(!this.darkTheme);
  }

  onPrioritiesDialogOpen() {
    this.openPrioritiesDialog.emit();
  }

  onSetColor(color: Color) {
    this.setColor.emit(color);
  }

  onSetImage(src: string) {
    this.setImage.emit(src);
  }

}
