/**
 * aqui accedemos al document.
 * utilizamos el selector 'getElementById' el cual recibe el id del nodo o elemento 
 * del document que queremos accesar.
 * y  utilizamos el metodo addEventListener() el cual sirve para escuchar y recibe 2 argumentos 
 * 1er argumento es el nombre del evento que pondremos a escuchar
 * 2do argumento es una expresion funcion anonima o tambien puede recibir una funcion arrow
 */
document
  .getElementById("palindromo-form")
  .addEventListener("submit", function (event) {

    /**
     * (event)  hace referencia al evento que se captura tambien es habitual usar (e)
     * event.preventDefault() se utiliza para evitar que el evento se ejecute por default
     *al cargar la pagina evitando que se envie el formulario vacio.
     */
    event.preventDefault();
    // hacemos el llamado a nuestra funcion verificar()
    verificar();

});


function verificar (){
    /**
     * guardamos en constantes los nodos que contienen los datos que ingreso el usuario 
     * (la palabra o frase ) y tambien guardamos el nodo donde vamos a mostrar 
     * el resultado el cual esta identificado con el id='resultadoVerficacion' 
     * y lo guardaremos en una variable para poder modificarlo,
     * tambien guardamos el nodo donde mostraremos un mensaje de error en caso de que el usuario
     * envie el formulario vacio, nodo el cual esta identificado en nuestro 
     * html con el id='errorMsn' y lo guardamos en una variable para luego poder modificarlo
     */


      const nodoData = document.getElementById("data");
      
      let nodoResultadoVerficacion = document.getElementById("resultadoVerficacion");
      let nodoErrorMsn = document.getElementById("errorMsn");

      /**
       * accedemos a la propiedad (.value) de cada nodo la cual guarda el valor en texto (string)
       * ingresado por el usuario y lo guaramos en constantes
       */
      const data = nodoData.value;


    /**
     * validaremos que el usuario y la contraseña no lleguen vacios
     * en la expresion la expresion (===) se valida si las comparaciones son iguales
     * si se cumple la condicion sera suficiente para mostrar el mensaje de error
     */
    if (data === '') {
      const mensaje = 'No se permiten <strong>campos vacios</strong>';
      /**
       * hacemos el llamado a nuestra funcion showMsnError() que sera la encargada 
       * de mostrar el mensaje de error
       * esta recibe como argumentos el mensaje de error que debera mostrar
       * y el nodo nodoErrorMsn donde se mostrara el mensaje que se envia
       */
      showMsnError(mensaje, nodoErrorMsn);
    } 

    /**
     * creamos una constante llamada 'resp' para guardar el dato 
     * que nos retorne el llamado de la funcion validandoLogin()
     * la cual recibe 2 argumentos un usuario y una contraseña
     */
    const resp= verificandoPalindromo(data);

    /**
     * la siguiente sintaxis de validacion if(resp) esta evaluando si 'resp' trae
     * como valor true.
     * es equivalente a tener  if(resp === true){}
     */
    if (resp) {
    /**
     *  utilizaremos  nodoResultadoVerficacion accediendo a su propiedad '.innerHTML'
     * y asignaremos alli un mensaje indicando que si es un palindromo.
     */
     nodoResultadoVerficacion.innerHTML = 'Verificacion <strong>exitosa</strong> frase/palabra si es un<strong> Paolindromo</strong>';
      return;
    }

    /**
     * si el condicional anterior no se cumplio
     *  utilizaremos  nodoResultadoVerficacion accediendo a su propiedad '.innerHTML'
     * y asignaremos alli un mensaje indicando que no es un palindromo.
     */
     nodoResultadoVerficacion.innerHTML = 'Verificacion <strong>fallida</strong> frase/palabra no es un<strong> Paolindromo</strong>';
  
}

function verificandoPalindromo(data){
  
  /**
   * utilizaremos metodo .replace()se encarga en eliminar los 
   * espacios ( ) que puedan existir en una frase, este metodo recibe 
   * 2 argumentos el primero es el valor que queremos remplazar y el segundo
   * el valor por el cual lo queremos reemplazar en este caso usaremos una expresion
   * regalular (/ /g,) para reemplazar los espacios vacios en toda la frase ya que 
   * de no aplicarla solo nos eliminaria el primer espacio vacio que encuentre y deja
   * el resto de frase tal cual este llegando
   * el resultado de este proceso lo guardamos en una constante llamada dataSinEspacios
   */
  const dataSinEspacios = data.replace(/ /g, "");
 
  /**
   * utilizaremos el metodo .toLowerCase() para convertir mayusculas en minusculas
   */
  const dataEnMinusculas = dataSinEspacios.toLowerCase();
  /**
   * justo en este punto dataEnMinusculas contiene es una palabra
   * y utilizaremos la propiedad (.length) que es parte de todo string
   * para averiguar su tamaño y al resultado le restamos -1 y lo guardaremos 
   * en una constante llamada tamanio y esta constante la utilizaremos para empezar a recorrer
   * nuestra palabra desde su ultimo caracter
   */
  const tamanio= dataEnMinusculas.length -1;
  /**
   * en esta variable iremos guardando el caracter inicio hasta llegar al caracter 
   * final de la palabra
   */
  let caracterInicio;
  /**
   * en esta variable iremos guardando el caracter del final hasta llegar al caracter 
   * inial de la palabra
   */
  let caracterFin;
  /**
   * la variable result la inicializamos como verdadera solo cambiara su estado 
   * si la validacion falla
   */
  let result = true;
  /**
   * inicializamos nuestro ciclo for 
   */
  for (let index = 0; index < dataEnMinusculas.length; index++) {
    /**
     * cada vez que se realiza un ciclo o recorrido guardaremos el siguiente caracter
     * partiendo desde el caracter de inicio hasta llegar a guardar el ultimo caracter
     */
    caracterInicio = dataEnMinusculas[index];
    /**
     * cada vez que se realiza un ciclo o recorrido guardaremos el anterior caracter
     * partiendo desde el caracter de final hasta llegar a guardar el primer caracter
     */
    caracterFin = dataEnMinusculas[tamanio - index];
      if (caracterInicio !== caracterFin ) {
        /**
         * en el momento que los caracteres no son iguales  
         * cambiremos el valor de result 
         */
        result = false;
     }
    
  }
  /**
   * retonaremos el valor que se encuentre en la variable result;
   */
  return result;
}

function showMsnError (mensajeError, nodoErrorMsn){
  /**
         * en nuestro nodoErrorMsn accedemos al metodo .setAttribute()
         * el cual recibe como primer argumento el nombre de la propiead html que desamos modificar
         * para este caso vamos modificar la propiedad 'class' y como segundo argumento
         * enviamos las clases de estilo que seran asignadas a la propiedad 'class' en este caso
         * asignaremos algunas clases de estilos pertenecientes al framework de estilos boostrap
         * bg-danger --> genera un fondo rojo
         * rounded-3 --> redondea las esquinas 
         * mb-2 ---> margin-bottom agrega un margen en la parte inferior del nodoErrorMsn
         * p-2 ---> agrega un padding alrededor de todo el nodoErrorMsn 
         * 
         */
        
   nodoErrorMsn.setAttribute('class', 'bg-danger rounded-3 mb-2 p-2');
   /**
    * modificamos el nodoErrorMsn accediendo a su propiedad .innerHTML
    * la cual nos permite utilizar la sintaxis html para crear etiquetas 
    * desde javaScript en este caso crearemos una etiqueta 'strong'
    * para poner en negrita la palabra campos vacios
    */
    nodoErrorMsn.innerHTML = mensajeError;
   
   /**
    * utilizamos la instruccion de return para romper el flujo de nuestra aplicacion
    * y evitar que se continue ejecutando el codigo que pueda seguir
   */
    return;

}