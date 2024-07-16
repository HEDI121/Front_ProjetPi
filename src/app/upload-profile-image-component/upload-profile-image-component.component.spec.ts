import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadProfileImageComponentComponent } from './upload-profile-image-component.component';

describe('UploadProfileImageComponentComponent', () => {
  let component: UploadProfileImageComponentComponent;
  let fixture: ComponentFixture<UploadProfileImageComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadProfileImageComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadProfileImageComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
