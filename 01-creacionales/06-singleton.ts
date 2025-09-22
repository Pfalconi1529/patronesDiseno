/**
 * ! Singleton:
 * Es un patrón de diseño creacional que garantiza que una clase
 * tenga una única instancia y proporciona un punto de acceso global a ella.
 *
 * * Es útil cuando necesitas controlar el acceso a una única instancia
 * * de una clase, como por ejemplo, en un objeto de base de datos o en un
 * * objeto de configuración.
 *
 * https://refactoring.guru/es/design-patterns/singleton
 */


class Dragonball {

    private static instance: Dragonball;
    private ballsCollected: number;

    private constructor(){
        this.ballsCollected = 0;

    }


    // este metodo es el singleton
    
    public static getInstance(): Dragonball{
        if (!Dragonball.instance){
            Dragonball.instance = new Dragonball();
            console.log('las pelotas del dragon han sido creadas');

        }
        return Dragonball.instance;
    }

    collectBall(): void{
        if(this.ballsCollected < 7){
            this.ballsCollected++;
            console.log(`Pelotas recolectadas. Tolal de pelotas: ${this.ballsCollected}`);
            return;
        }
        console.log('Ya se han recolectao las 7 esferas del dragon: ');

    }

    summonShenlong(){
        if(this.ballsCollected === 7){
            console.log('shenlong ha sido invocado, pide tu deseo');
            this.ballsCollected = 0;
            return;
        }
        console.log(`Aun faltan ${7 - this.ballsCollected} pelotas para invocar a shenlong`)
    }

}




function main(){
    const goku =  Dragonball.getInstance();
    goku.collectBall();
    goku.collectBall();
    goku.collectBall();
    goku.collectBall();
    goku.summonShenlong();


    const vegeta = Dragonball.getInstance();
    vegeta.collectBall();
    vegeta.collectBall();
    vegeta.summonShenlong();
}
main();
