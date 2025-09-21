/**
 * ! Abstract Factory:
 * Es un patrón de diseño que permite crear familias de objetos relacionados
 * sin especificar sus clases concretas.
 *
 * En lugar de crear objetos individuales directamente,
 * creamos fábricas que producen un conjunto de objetos relacionados.
 *
 * * Es útil cuando necesitas crear objetos que son parte de una familia
 * * y quieres asegurarte de que estos objetos se complementen entre sí.
 *
 * https://refactoring.guru/es/design-patterns/abstract-factory
 */

import { COLORS } from "../helpers/colors.ts";

/**
 *  El propósito del Abstract Factory es crear familias de objetos relacionados
 *  (en este caso, hamburguesas y bebidas) sin especificar las clases concretas
 *  de cada uno de esos objetos en el código principal.
 */


interface Hamburguer {
    prepare(): void;

}


interface Drink {
    pour(): void;

}


class ChickenHamburger implements Hamburguer{
    prepare(): void {
      console.log('Preparando la hamburguesa de %cpollo', COLORS.yellow);
    }
}


class BeefHamburger implements Hamburguer{
    prepare(): void {
      console.log('Preparando la hamburguesa de %cres', COLORS.red);
    }
}

class Water implements Drink{
    pour(): void {
      console.log('Preparando el %cagua', COLORS.blue);
    }
}

class Soda implements Drink{
    pour(): void {
      console.log('Preparando el %csoda', COLORS.gray);
    }
}



interface RestorantFactory {
    createHamburger(): Hamburguer;
    createDrink(): Drink;
}

class FastFoodRestorantFactory implements RestorantFactory{

    createDrink(): Drink {
      return new Soda();
    }

    createHamburger(): Hamburguer {
      return new BeefHamburger();
    }
}


class HelatyRestorantFactory implements RestorantFactory{

    createDrink(): Drink {
      return new Water();
    }

    createHamburger(): Hamburguer {
      return new ChickenHamburger();
    }
}


function main(factory: RestorantFactory){
    const hamburger = factory.createHamburger();
    const drink = factory.createDrink();

    hamburger.prepare();
    drink.pour();
}

console.log('Menu de comida regular')

main(new FastFoodRestorantFactory);