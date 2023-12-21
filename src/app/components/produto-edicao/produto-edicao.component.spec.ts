import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutoEdicaoComponent } from './produto-edicao.component';

describe('ProdutoEdicaoComponent', () => {
  let component: ProdutoEdicaoComponent;
  let fixture: ComponentFixture<ProdutoEdicaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProdutoEdicaoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProdutoEdicaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
