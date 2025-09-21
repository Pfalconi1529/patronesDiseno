/**
 * ! Factory Method:
 * El patrón Factory Method permite crear objetos sin especificar
 * la clase exacta del objeto que se creará.
 *
 * En lugar de eso, delegamos la creación de objetos a subclases o métodos
 * que encapsulan esta lógica.
 *
 * * Es útil cuando una clase no puede anticipar la clase
 * * de objetos que debe crear.
 *
 * https://refactoring.guru/es/design-patterns/factory-method
 *
 */

import { COLORS } from "../helpers/colors.ts";

interface Hamburguer{
    prepare(): void;

}

class ChickenHamburger implements Hamburguer {

  prepare(): void {
    console.log('Preparando una hamburguesa de %cpollo', COLORS.yellow);
  }


}


class BeefHamburger implements Hamburguer {

  prepare(): void {
    console.log('Preparando una hamburguesa de %cres', COLORS.brown);
  }


}

class BeanHamburger implements Hamburguer {

  prepare(): void {
    console.log('Preparando una hamburguesa de %cbean', COLORS.green);
  }


}


abstract class Restorant {
    abstract createHamburger(): Hamburguer;
    orderHamburger():void{
        const hamburger = this.createHamburger();
        hamburger.prepare();
    }
}


class ChickenRestorant extends Restorant{

    override createHamburger(): Hamburguer {
      return new ChickenHamburger();
    }
}

class BeefRestorant extends Restorant{

    override createHamburger(): Hamburguer {
      return new BeefHamburger();
    }
}

class BeanRestorant extends Restorant{

    override createHamburger(): Hamburguer {
      return new BeanHamburger();
    }
}



function main(){
    let restaurant: Restorant;
    const burgerType = prompt('que tipo de amburgeuesa  quieres? (chicken/beef/bean)')
    switch(burgerType){
        case 'chicken':
            restaurant = new ChickenRestorant();
        break;

        case 'beef':
            restaurant = new BeefRestorant();
        break;
        case 'bean':
            restaurant = new BeanRestorant();
        break;

        default:
            throw new Error("Opcion no valida");
            
    }

    restaurant.orderHamburger();
}

main();