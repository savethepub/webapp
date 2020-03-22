import { Component, OnInit, ElementRef } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiDataUtils, JhiFileLoadError, JhiEventManager, JhiEventWithContent } from 'ng-jhipster';

import { IGastronomy, Gastronomy } from 'app/shared/model/gastronomy.model';
import { GastronomyService } from './gastronomy.service';
import { AlertError } from 'app/shared/alert/alert-error.model';

@Component({
  selector: 'jhi-gastronomy-update',
  templateUrl: './gastronomy-update.component.html'
})
export class GastronomyUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    category: [null, [Validators.required]],
    description: [],
    photo: [],
    photoContentType: [],
    contactName: [],
    addressLine: [],
    zipCode: [null, [Validators.maxLength(5)]],
    city: [],
    facebookLink: [],
    twitterLink: [],
    instagramLink: [],
    gofundmeName: [],
    supportLink: []
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected gastronomyService: GastronomyService,
    protected elementRef: ElementRef,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ gastronomy }) => {
      this.updateForm(gastronomy);
    });
  }

  updateForm(gastronomy: IGastronomy): void {
    this.editForm.patchValue({
      id: gastronomy.id,
      name: gastronomy.name,
      category: gastronomy.category,
      description: gastronomy.description,
      photo: gastronomy.photo,
      photoContentType: gastronomy.photoContentType,
      contactName: gastronomy.contactName,
      addressLine: gastronomy.addressLine,
      zipCode: gastronomy.zipCode,
      city: gastronomy.city,
      facebookLink: gastronomy.facebookLink,
      twitterLink: gastronomy.twitterLink,
      instagramLink: gastronomy.instagramLink,
      gofundmeName: gastronomy.gofundmeName,
      supportLink: gastronomy.supportLink
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType: string, base64String: string): void {
    this.dataUtils.openFile(contentType, base64String);
  }

  setFileData(event: Event, field: string, isImage: boolean): void {
    this.dataUtils.loadFileToForm(event, this.editForm, field, isImage).subscribe(null, (err: JhiFileLoadError) => {
      this.eventManager.broadcast(
        new JhiEventWithContent<AlertError>('savethepubApp.error', { ...err, key: 'error.file.' + err.key })
      );
    });
  }

  clearInputImage(field: string, fieldContentType: string, idInput: string): void {
    this.editForm.patchValue({
      [field]: null,
      [fieldContentType]: null
    });
    if (this.elementRef && idInput && this.elementRef.nativeElement.querySelector('#' + idInput)) {
      this.elementRef.nativeElement.querySelector('#' + idInput).value = null;
    }
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const gastronomy = this.createFromForm();
    if (gastronomy.id !== undefined) {
      this.subscribeToSaveResponse(this.gastronomyService.update(gastronomy));
    } else {
      this.subscribeToSaveResponse(this.gastronomyService.create(gastronomy));
    }
  }

  private createFromForm(): IGastronomy {
    return {
      ...new Gastronomy(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      category: this.editForm.get(['category'])!.value,
      description: this.editForm.get(['description'])!.value,
      photoContentType: this.editForm.get(['photoContentType'])!.value,
      photo: this.editForm.get(['photo'])!.value,
      contactName: this.editForm.get(['contactName'])!.value,
      addressLine: this.editForm.get(['addressLine'])!.value,
      zipCode: this.editForm.get(['zipCode'])!.value,
      city: this.editForm.get(['city'])!.value,
      facebookLink: this.editForm.get(['facebookLink'])!.value,
      twitterLink: this.editForm.get(['twitterLink'])!.value,
      instagramLink: this.editForm.get(['instagramLink'])!.value,
      gofundmeName: this.editForm.get(['gofundmeName'])!.value,
      supportLink: this.editForm.get(['supportLink'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IGastronomy>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }
}
