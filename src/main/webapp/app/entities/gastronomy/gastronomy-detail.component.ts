import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IGastronomy } from 'app/shared/model/gastronomy.model';

@Component({
  selector: 'jhi-gastronomy-detail',
  templateUrl: './gastronomy-detail.component.html'
})
export class GastronomyDetailComponent implements OnInit {
  gastronomy: IGastronomy | null = null;
  goFundMeEmbedUrl: SafeUrl | null = null;

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute, protected sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ gastronomy }) => {
      this.gastronomy = gastronomy;
      // TODO: Make sure no garbage is in gofundName
      this.goFundMeEmbedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
        'https://www.gofundme.com/mvc.php?route=widgets/mediawidget&fund=' + gastronomy.gofundmeName + '&image=1&coinfo=1&preview=1'
      );
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType: string, base64String: string): void {
    this.dataUtils.openFile(contentType, base64String);
  }

  previousState(): void {
    window.history.back();
  }
}
