import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from '../../services/productos.service';


@Component({
  selector: 'app-item',
  templateUrl: './item.component.html'
})
export class ItemComponent {

  producto:any = undefined;
  id:string = undefined;

  constructor( private route:ActivatedRoute, private _ps: ProductosService ) {

    route.params.subscribe( parametros=>{
      //console.log(parametros['id']);
      _ps.cargar_producto ( parametros['id'] )
          .subscribe( res => {
            this.producto = res.json();
            this.id = parametros['id'];
            console.log( this.producto );
          });
    })

  }

}
