class Usuarios {

    constructor() {

        this.personas = [];

    }

    agregarPersona(id, nombre, sala) {
        let persona = { id, nombre, sala };

        //lo agregamos al arreglo del contrctor
        this.personas.push(persona);

        return this.personas;

    }


    //devolver una persona
    getPersona(id) {
        //buscar dentro del array personas con el id que viene como parametro, recibe una funcion con una condicion a evaluar
        //regresa un nuevo arreglo y necesitamos la primera posicion por eso coloca [0]
        let persona = this.personas.filter(persona => {
            //triple igual(===) para comparar, retorna el primer elemento si coincide con el ID que viene
            return persona.id === id;
        })[0];

        return persona;

    }


    //regresar a todas las personas que hay en el chat
    getPersonas() {
        return this.personas;
    }



    getPersonasPorSala(sala) {
        let personasEnSala = this.personas.filter(persona => {
            return persona.sala === sala;
        })

        return personasEnSala;
    }

    //borrar persona
    borrarPersona(id) {

        let personaBorrada = this.getPersona(id);

        //regresa un nuevo array solo con aquellas personas activas en el chat
        this.personas = this.personas.filter(persona => {
            return persona.id != id;
        })

        return personaBorrada;

    }



}

module.exports = {
    Usuarios
}