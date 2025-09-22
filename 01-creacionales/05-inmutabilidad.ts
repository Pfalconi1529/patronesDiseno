import { COLORS } from './../helpers/colors.ts';
/**
 * ! Inmutabilidad con copia
 * Aunque la inmutabilidad es una buena práctica, no siempre es posible.
 * En estos casos, se puede hacer una copia del objeto y modificar la copia.
 *
 *  * Es útil para mantener un historial de estados en aplicaciones interactivas.
 *
 */
class CodeEditorState {
    
    readonly content: string;
    readonly cursorPosition: number;
    readonly unsaveChange: boolean;

    constructor(content: string, cursorPosition: number, unsaveChange: boolean){
        this.content = content;
        this.cursorPosition = cursorPosition;
        this.unsaveChange = unsaveChange;
    }


    copyWith({
        content,
        cursorPosition,
        unsaveChange
    }: Partial<CodeEditorState>): CodeEditorState {
        return new CodeEditorState(
            content ?? this.content,
            cursorPosition ?? this.cursorPosition,
            unsaveChange ?? this.unsaveChange
        );
    }

    displayState() {
        console.log('%cEstado del editor: ', COLORS.green);
        console.log(`
            Contenido: ${this.content}
            Cursor Pos: ${this.cursorPosition}
            Unsave changes: ${this.unsaveChange}
            `)
    }
}


class CodeEditorHistory {

    private history: CodeEditorState[] = []
    private currentIndex: number = -1;

    save(state: CodeEditorState): void {
        if(this.currentIndex < this.history.length - 1){
            this.history = this.history.splice(0, this.currentIndex + 1)
        }

        this.history.push(state)
        this.currentIndex++ 
    }

    undo(): CodeEditorState | null {
        if(this.currentIndex > 0){
            this.currentIndex--;
            return this.history[this.currentIndex];
        }
        return null;
    }


    redo(): CodeEditorState | null {
        if(this.currentIndex < this.history.length -1 ){
            this.currentIndex ++;
            return this.history[this.currentIndex]
        }
        return null;
    } 
}


function main(){
    const history = new CodeEditorHistory();
    let editorState = new CodeEditorState("console.log('Hola mundo');", 2, false);
    history.save(editorState);
    console.log('%cEstado inicial', COLORS.blue)
    editorState.displayState();
    editorState = editorState.copyWith(
        {
            content:"console.log('Hola mundo'); \nconsole.log('Nueva linea');",
            cursorPosition: 3,
            unsaveChange: true
        }
    );
    history.save(editorState);
    

    console.log('\n%cDespues del primer cambio', COLORS.pink);
    editorState.displayState();


    console.log('\n%cDespues de mover el cursor ', COLORS.red);
    editorState = editorState.copyWith({cursorPosition: 5});
    history.save(editorState);
   

    console.log('\n%cDespues del undo', COLORS.brown);
    editorState = history.undo()!;
    history.save(editorState);
    
}

main();