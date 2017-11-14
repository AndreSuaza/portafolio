import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class ProductosService {

  productos:any[] = [];
  productos_filtrado:any[] = [];
  cargando:boolean = true;

  constructor( public http:Http ) {
    this.cargar_productos();
  }

  public buscar_producto(termino:String){

    if(this.productos.length === 0){
      this.cargar_productos().then( ()=>{
        //termino carga
        this.filtrar_productos(termino);
      });
    }else{
      this.filtrar_productos(termino);
    }


  }

  private filtrar_productos(termino:string){

    this.productos_filtrado = [];

    termino = termino.toLowerCase();

    this.productos.forEach( prod => {

      if( prod.categoria.indexOf(termino) >= 0 || prod.titulo.toLowerCase().indexOf(termino) >= 0){
        this.productos_filtrado.push(prod);
        //console.log( prod );
      }

      //console.log( prod );
    })
  }

  public cargar_producto( id:string ){

    return this.http.get(`https://paginaweb-818a7.firebaseio.com/productos/${ id }.json`);

  }

  public cargar_productos(){

      let promesa = new Promise((resolve,reject)=>{

        this.http.get('https://paginaweb-818a7.firebaseio.com/productos_idx.json')
          .subscribe( res=> {
            //console.log(res.json();)
            this.cargando = false;
            this.productos = res.json();
            resolve();
          });

      });

      return promesa;

  }

}
