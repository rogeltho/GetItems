import { FileService } from './../services/file.service';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-item-tabs',
  templateUrl: './item-tabs.component.html',
  styleUrls: ['./item-tabs.component.scss'],
  providers: [MessageService]
})
export class ItemTabsComponent implements OnInit, OnChanges {
  @Input() formDataProp: { product: string; brand: string };

  cnetContent;
  cnetLoadedContent;
  iceCatContent;
  iceCatLoadedContent;

  constructor(
    private fileService: FileService,
    public sanitizer: DomSanitizer,
    private messageService: MessageService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    debugger;
    if (changes.formDataProp) {
      if (changes.formDataProp.currentValue) {
        this.fileService
          .getFiles(this.formDataProp)
          .subscribe(({ cnet, icecat }) => {
            this.cnetLoadedContent = cnet;
            this.iceCatLoadedContent = icecat;
            this.cnetContent = this.sanitizer.bypassSecurityTrustHtml(cnet);
            this.iceCatContent = this.sanitizer.bypassSecurityTrustHtml(icecat);
          });
      }
    }
  }

  async handleChange(event) {
    if (event.index === 0) {
      try {
        await navigator.clipboard.writeText(this.cnetLoadedContent);
        this.showSuccess();
        console.log('Clipboarded');
      } catch (error) {}
    } else {
      try {
        navigator.clipboard.writeText(this.iceCatLoadedContent);
        this.showSuccess();
        console.log('Clipboarded');
      } catch (error) {}
    }
  }

  showSuccess() {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Contenu Bien Copie',
    });
  }

  ngOnInit(): void {}
}
