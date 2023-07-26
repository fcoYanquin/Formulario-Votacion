$(document).ready(function(){

    //Regla de validacion personalizada para textos que deben contener letras y numeros
    $.validator.addMethod("letrasynumeros", function(value, element) {
        return this.optional(element) || /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$/.test(value);
    }, "Debe contener letras y numeros");

    //Regla de validacion personalizada para conocer si el rut ya ingresado ya existe en el sistema
    $.validator.addMethod("validarrutexistente", function(value, element, params) {
        return this.optional(element) || validarRutExistente(value);
    }, "El rut ingresadado ya realizó la votación");

    //Regla de validacion personalizada para determina si se seleccionaron un minimo de checkbox en el formulario
    $.validator.addMethod("multiplescheckbox", function(value, element) {
        var checkboxes = $('input[name="check_canales"]:checked');
        console.log("marcados: " + checkboxes.length);
        return checkboxes.length > 1;
    }, "Selecciona al menos dos opciones.");

    //Regla de validacion personalizada para determinar si el rut es valido y esta en el formato correcto
    $.validator.addMethod('validarut', function(value, element) {
    return this.optional(element) || validarRut(value);
    }, 'Ingresa un RUT Chileno válido.');

    //Carga del plugin de validacion de formularion con reglas personalizadas para cada campo
    $("#form_votacion").validate(
        {
            rules: {
                nombre_votante: {
                    required: true
                },
                alias_votante: {
                    required: true,
                    minlength: 6,
                    letrasynumeros: true
                },
                rut_votante: {
                    required: true,
                    validarut: true,
                    validarrutexistente: true,
                },
                email_votante: {
                    required: true,
                    //email: true
                },
                region_votante: {
                    required: true
                },
                comuna_votante: {
                    required: true
                },
                candidato_votante: {
                    required: true,
                },
                check_canales: {
                    multiplescheckbox: true
                }
            },
            messages: {
                nombre_votante: {
                    required: "Este campo es requerido"
                },
                alias_votante: { 
                    required: "Este campo es requerido",
                    minlength: "Este campo debe contener más de 5 caracteres entre letra y números",
                    letrasynumeros: "Este campo debe contener letras y numeros"
                },
                rut_votante: {
                    required: "Este campo es requerido",
                    validarrutexistente: "El rut ingresado ya realizó la votación",
                    validarut: "Debe ingresar un rut válido con el formato 11111111-1"
                },
                email_votante: {
                    required: "Este campo es requerido",
                    email: "Ingrese un correo válido",
                },
                region_votante: {
                    required: "Este campo es requerido"
                },
                comuna_votante: {
                    required: "Este campo es requerido"
                },
                candidato_votante: {
                    required: "Este campo es requerido"  
                },
                check_canales: {
                    multiplescheckbox: "Debe seleccionar al menos 2 opciones" 
                }
            },
            errorElement: "span",
            errorPlacement: function(error, element) {
              //Ubicacion de mensaje de validacion especifica para checkbox grupales
              if (element.hasClass("checkbox-group")) {
                error.appendTo(".error-mensaje");
              } else {
                error.insertAfter(element); // Para los otros campos del formulario
              }
            }
        }
    );

    //Registro de votacion al hacer click en el voton Votar
    $("#btn_votar").on('click', function() {

        //Determina que todas las validaciones se cumplan antes de conectarse a la base de datos
        if ($("#form_votacion").valid()) {
            let nombre = $("#nombre_votante").val();
            let alias = $("#alias_votante").val();
            let rut = $('#rut_votante').val();
            let email = $("#email_votante").val();
            let region = $("#region_votante").val();
            let comuna = $("#comuna_votante").val();
            let candidato = $("#candidato_votante").val();
    
            let canales = [];
            $('input[name=check_canales]:checked').each(function(){ //Se obtiene un arreglo de los checkbox marcados para ser enviados en la solicitud   
                canales.push($(this).val());    		
            });
    
            //Cuerpo de la solicitud ajax
            let data = {
                nombre: nombre,
                alias: alias,
                rut: rut,
                email: email,
                region: region,
                comuna: comuna,
                candidato: candidato,
                canales: canales
            };
    
            $.ajax({
                type: 'post',
                url: 'guardarVotacion.php',
                data: data,
                success: function (data) {
                    if (data == "success") { //data retorna success o false al guardar el registro en la base de datos
                        alert("Su voto se ingresó correctamente");
                    } else {
                        alert("Ocurrió un problema al ingresar su voto");
                    }
                }
            });
        }

    });
    
    //Carga automatica de candidatos en el formulario
    $.ajax({
        type: 'get',
        url: 'cargaCandidatos.php',
        success: function (data) {
            let candidatos = JSON.parse(data);

            //Se cargan opciones con los registros de la base de datos
            candidatos.forEach(candidato => {
                $("#candidato_votante").append(
                    $('<option>', {
                        value: candidato['id'],
                        text: candidato['nombre']
                    })
                );
            });
        }
    });

    //Carga automatica de regiones en el formulario
    $.ajax({
        type: 'get',
        url: 'cargaRegiones.php',
        success: function (data) {
            let regiones = JSON.parse(data);

            //Se cargan opciones con los registros de la base de datos
            regiones.forEach(region => {
                $("#region_votante").append(
                    $('<option>', {
                        value: region['id'],
                        text: region['nombre']
                    })
                );
            });
        }
    });

    //Carga automatica de los canales informativos registrados en el sistema
    $.ajax({
        type: 'get',
        url: 'cargaCanales.php',
        success: function (data) {
            let canales = JSON.parse(data);

            //Llama a funcion para cargar checkbox en el formulario
            cargarCanales(canales);
        }
    });

    /**
     * Obtiene comunas de la region selecionada
     */
    $("#region_votante").on('change', function() {
        $.ajax({
            type: 'get',
            url: 'cargaComunas.php',
            data: {
                region: $(this).val()
            },
            success: function (data) {
                let comunas = JSON.parse(data);

                //Llama a funcion para cargar las comunas en el formulario
                cargaComunas(comunas);
            }
        });
    });

    /**
     * Carga comunas en select
     * @param comunas 
     */
    function cargaComunas(comunas) {
        let inputComuna = $("#comuna_votante");

        inputComuna.html("");
        inputComuna.append( //opcion por defecto
            $('<option>', {
                value: "",
                text: "Seleccione"
            })
        )

        comunas.forEach(comuna => {
            $("#comuna_votante").append(
                $('<option>', {
                    value: comuna['id'],
                    text: comuna['nombre']
                })
            );
        });
    }

    //Carga checkbox de canales informativos
    function cargarCanales(canales) {
        let canalesDiv = $("#canales");

        canales.forEach(element => {
            canalesDiv.append(
                '<label>' + element['nombre'] + '<input type="checkbox" value="' + element['nombre'] + '" name="check_canales" class="checkbox-group"></label>'
            )
        });
    }

    //Valida que el rut no este registrado en la base de datos
    function validarRutExistente(rut) {
        
        var valido = false;

        $.ajax({
            url: "validarUsuario.php",
            type: "POST",
            data: {
                rut: rut
            },
            async: false, // Peticion sincrona para retornar repuesta en la funcion
            success: function(data) {
                console.log(data);

                if (data === "success") {        
                    valido = true;
                } else {
                    valido = false;
                }
            },
            error: function(xhr, status, error) {
                //Ante cualquier error retorna false
                isValid = false;
            }
        });

        return valido
    }

    // Función para validar el RUT Chileno con el formato 111111111-1
    function validarRut(rutCompleto) {
        if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test( rutCompleto ))
                return false;
            var tmp 	= rutCompleto.split('-');
            var digv	= tmp[1]; 
            var rut 	= tmp[0];
            if ( digv == 'K' ) digv = 'k' ;
            return (obtenerDV(rut) == digv );
    }

    //Funcion para obtener digito verificador
    function obtenerDV(rut) {
        var M=0,S=1;
        for(;rut;rut=Math.floor(rut/10))
            S=(S+rut%10*(9-M++%6))%11;
        return S?S-1:'k';
    }

});