import { createBot, createProvider, createFlow, addKeyword } from '@builderbot/bot';
import { MemoryDB as Database } from '@builderbot/bot';
import { BaileysProvider as Provider } from '@builderbot/provider-baileys';

const PORT = process.env.PORT ?? 3000;

// Flujo para volver al menú principal
const volverMenuPrincipalFlow = addKeyword('volver')
    .addAnswer(
        [
            'Regresando al menú principal...',
            '📋 Puedes preguntar sobre:',
            '👉 *Cuentas* Escribe cuentas para información sobre nuestras cuentas bancarias.',
            '👉 *Tarjetas* Escribe tarjetas para información sobre nuestras tarjetas de crédito.',
            '👉 *Créditos* Escribe créditos para información sobre nuestros créditos bancarios.',
        ].join('\n')
    );

// Flujo para volver al menú de cuentas
const volverMenuCuentasFlow = addKeyword('volver')
    .addAnswer(
        [
            '🔄 Regresando al menú de cuentas',
            '🏦 Ahorre con nuestras cuentas bancarias',
            '1. Escribe *Ahorros* para información sobre la cuenta "ahorros".',
            '2. Escribe *Corriente* para detalles sobre cuenta corriente.',
            '3. Escribe *Nómina* para conocer las cuentas de nómina.',
            '4. Escribe *Pensionados* para información sobre cuenta para pensionados.',
            '🔙 Escribe "*volver*" para regresar al menú principal.',
        ].join('\n')
    );

// Flujo para volver al menú de tarjetas
const volverMenuTarjetasFlow = addKeyword('volver')
    .addAnswer(
        [
            '🔄 Regresando al menú de tarjetas',
            '💳 En el Banco Caja Social Zipaquirá ofrecemos las siguientes tarjetas de crédito:',
            '1. Escribe *Clásica* para información sobre tarjeta de crédito clásica.',
            '2. Escribe *Oro* para información sobre tarjeta de crédito oro.',
            '3. Escribe *Premium* para información sobre tarjeta de crédito Premium.',
            '🔙 Escribe "*volver*" para regresar al menú principal.',
        ].join('\n')
    );

// Flujo para volver al menú de préstamos
const volverMenuPrestamosFlow = addKeyword('volver')
    .addAnswer(
        [
            '🔄 Regresando al menú de préstamos',
            '💰 Ofrecemos varios tipos de Créditos',
            '1. Escribe *Personal* para información sobre crédito de libre inversión.',
            '2. Escribe *Hipotecario* para información sobre crédito Hipotecario.',
            '3. Escribe *Cartera* para información sobre compra de cartera.',
            '4. Escribe *Libranza* para información sobre crédito para libranza.',
            '🔙 Escribe "*volver*" para regresar al menú principal.',
        ].join('\n')
    );

// Flujo para información de cuentas
const cuentasFlow = addKeyword(['cuentas', 'Cuenta','Cuentas', 'cuenta'],{delay: 3000})
    .addAnswer(
        [
            '🏦 Ahorre con nuestras cuentas bancarias',

            '1. Escribe *Ahorros* para información sobre la cuentamiga "ahorros".',
            '2. Escribe *Corriente* para detalles sobre cuenta corriente.',
            '3. Escribe *Nómina* para conocer las cuentas de nómina.',
            '4. Escribe *Pensionados* para información sobre cuenta para pensionados.',
        ].join('\n'),
        // Imagen de cuentas
    )
    .addAnswer(
        '',
        { capture: true },
        async (ctx, { flowDynamic }) => {
            const respuesta = ctx.body.toLowerCase();
            if (respuesta.includes('ahorros') || respuesta.includes('ahorro') || respuesta.includes('cuenta de ahorro')) {
                await flowDynamic([
                    {
                        body: 'Realice retiros ilimitados sin costo, no pague cuota de manejo, con bolsillo para ahorrar desde $5mil.\n',
                      media:'https://zipaquiradigital.com/wp-content/uploads/2024/08/Cuentamiga-img.jpg',

                    },
                    {
                        body:'Abrir Cuentaamiga 👉 https://digital.bancocajasocial.com/cuentamiga/?utm_source=portalwebcajasocial&utm_medium=detalle_producto&utm_campaign=medios_propios&utm_content=boton_cuentamiga',
                    },
                    {
                        body:'Activar tu Tarjeta 👉 https://digital.bancocajasocial.com/cuentamiga/activar-tarjeta/?utm_source=portalwebcajasocial&utm_medium=detalle_de_producto&utm_campaign=cad_sp_br&utm_term=asignacionclave',
                    },
                    {
                        body: '🔙 Escribe "*volver*" para regresar.',
                    }
                    
                ]);
            } else if  (respuesta.includes('corriente') || respuesta.includes('Corriente')){
                await flowDynamic([
                    {
                        body: 'Permite reducir la necesidad de efectivo, al tener la chequera como medio de manejo.\n',
                        media:'https://zipaquiradigital.com/wp-content/uploads/2024/08/Cuenta_Corriente.jpg',
                    
                    },
                    {
                        body:'¡Iniciar solicitud! 👉 https://digital.bancocajasocial.com/vivienda',
                    },
                   
                    {
                        body: '🔙 Escribe "*volver*" para regresar a el menu.',
                    }
                ]);
            } else if (respuesta.includes('nómina') || respuesta.includes('Nomina')|| respuesta.includes('nomina')|| respuesta.includes('Nómina')){
                await flowDynamic([
                    {
                        body: 'Abra su Cuentamiga Nómina con cero pesos, haga retiros ilimitados sin costo y ahorre desde $5.000\n',
                        media:'https://zipaquiradigital.com/wp-content/uploads/2024/08/Cuenta-nomina.jpg',
                    
                    },
                    {
                        body:'¡Iniciar solicitud! 👉 https://digital.bancocajasocial.com/cuentamiga/?utm_source=portalwebcajasocial&utm_medium=detalle_producto&utm_campaign=medios_propios&utm_content=boton_cuentamiga',
                    },
                    {
                        body:'Activar tu Tarjeta 👉 https://digital.bancocajasocial.com/cuentamiga/activar-tarjeta/?utm_source=portalwebcajasocial&utm_medium=detalle_de_producto&utm_campaign=cad_sp_br&utm_term=asignacionclave',
                    },
                    {
                        body: '🔙 Escribe "*volver*" para regresar.',
                    }
                ]);
            } else if (respuesta.includes('pensionados') || respuesta.includes('Pensionados')|| respuesta.includes('pension')|| respuesta.includes('pensión')){
                await flowDynamic([
                    {
                        body: 'Reciba su mesada pensional, elija el medio de manejo que prefiera y disfrute del resultado de sus esfuerzos.',
  
                        media:'https://zipaquiradigital.com/wp-content/uploads/2024/08/Cuenta-Pensionados.jpg',
                    
                    },
                    {
                        body:'¡Iniciar solicitud!  👉 https://digital.bancocajasocial.com/cuentamiga/pensionados/?utm_source=portalwebcajasocial&utm_medium=detalle_producto_pensionado&utm_campaign=medios_propios&utm_content=boton_cuentamiga_pensionados',
                    },
                    {
                        body:'Activar tu Tarjeta 👉 https://digital.bancocajasocial.com/cuentamiga/activar-tarjeta/?utm_source=portalwebcajasocial&utm_medium=detalle_de_producto&utm_campaign=cad_sp_br&utm_term=asignacionclave',
                    },
                    {
                        body: '🔙 Escribe "*volver*" para regresar.',
                    }
                ]);
          
        
            } else if (respuesta === 'volver') {
                await flowDynamic(volverMenuCuentasFlow);
            } else {
                await flowDynamic([
                    {
                        body: 'Lo siento, no entiendo tu opción. Por favor, elige entre "Ahorros", "Corriente", "Nómina" o Más.\n🔄 Escribe "*volver*" para regresar al menú de cuentas.',
                    }
                ]);
            }
        }
    );
// Flujo para información de tarjetas
const tarjetasFlow = addKeyword(['tarjetas', 'tarjeta'])
    .addAnswer(
        [
            '💳 En el Banco Caja Social Zipaquirá ofrecemos las siguientes tarjetas de crédito:',
            '1. Escribe *Clásica* para información sobre tarjeta de crédito clásica.',
            '2. Escribe *Oro* para información sobre tarjeta de crédito oro.',
            '3. Escribe *Premium* para información sobre tarjeta de crédito Premium.',
            '🔙 Escribe "*volver*" para regresar al menú principal.',
        ].join('\n'),
    )
    .addAnswer(
        '',
        { capture: true },
        async (ctx, { flowDynamic }) => {
            try {
                const respuesta = ctx.body.toLowerCase();
                if (respuesta.includes('clásica') || respuesta.includes('clasica')|| respuesta.includes('Clasica')|| respuesta.includes('Clásica')) {
                    await flowDynamic([
                        {
                            body: 'La Tarjeta de Crédito Clásica le brinda apoyo para financiar, y adquirir bienes y servicios.',
                            media: 'https://zipaquiradigital.com/wp-content/uploads/2024/08/t.clasica.jpg',
                        },
                        {
                            body: '🔙 Escribe "*volver*" para regresar al menú.',
                        }
                    ]);
                } else if (respuesta.includes('oro')|| respuesta.includes('Oro')) {
                    await flowDynamic([
                        {
                            body: 'La Tarjeta Oro proporciona recompensas adicionales y beneficios exclusivos.',
                            media: 'https://zipaquiradigital.com/wp-content/uploads/2024/08/toro.jpg',
                        },
                        {
                            body: '🔙 Escribe "*volver*" para regresar al menú.',
                        }
                    ]);
                } else if (respuesta.includes('premium') || respuesta.includes('platinum')|| respuesta.includes('Premium')) {
                    await flowDynamic([
                        {
                            body: 'Disfrute y financie plenamente todas sus actividades, en el lugar y en el momento deseados.',
                            media: 'https://zipaquiradigital.com/wp-content/uploads/2024/08/tplatinum.jpg',
                        },
                        {
                            body: '🔙 Escribe "*volver*" para regresar al menú.',
                        }
                    ]);
                } else if (respuesta === 'volver') {
                    await flowDynamic(volverMenuTarjetasFlow);
                } else {
                    await flowDynamic([
                        {
                            body: 'Lo siento, no entiendo tu opción. Por favor, elige entre "Clásica", "Oro" o "Premium".'
                        },
                        {
                            body: '🔙 Escribe "*volver*" para regresar al menú.',
                        }
                    ]);
                }
            } catch (error) {
                console.error('Error handling response:', error);
                await flowDynamic([
                    {
                        body: 'Ocurrió un error al procesar tu solicitud. Por favor, inténtalo de nuevo más tarde.',
                    }
                ]);
            }
        }
    );

// Flujo para información de Créditos
const prestamosFlow = addKeyword(['Créditos', 'créditos', 'Creditos', 'creditos'])
    .addAnswer(
        [
            '💰 Ofrecemos varios tipos de Créditos',
            '1. Escribe *Personal* para información sobre crédito de libre inversión.',
            '2. Escribe *Hipotecario* para información sobre crédito Hipotecario.',
            '3. Escribe *Cartera* para información sobre compra de cartera.',
            '4. Escribe *Libranza* para información sobre crédito para libranza.',
            '🔙 Escribe "*volver*" para regresar al menú principal.',
        ].join('\n'),
    )
    .addAnswer(
        '',
        { capture: true },
        async (ctx, { flowDynamic }) => {
            try {
                const respuesta = ctx.body.toLowerCase();
                if (respuesta.includes('personal')|| respuesta.includes('Personal')) {
                    await flowDynamic([
                        {
                            body: 'El Crédito de Libre Inversión se adapta a su capacidad de pago y le otorga el monto que mejor se ajuste a su proyecto.',
                            media: 'https://zipaquiradigital.com/wp-content/uploads/2024/08/liibre-inversion.jpg'
                        },
                        {
                            body: '🌐 Simular Crédito 👉 Calculadora de Crédito Personal (https://www.bancocajasocial.com/calculadora-financiera/simulador-credito-consumo/)',
                        },
                        {
                            body: '🔙 Escribe "*volver*" para regresar al menú.',
                        }
                    ]);
                } else if (respuesta.includes('hipotecario')|| respuesta.includes('Hipotecario')) {
                    await flowDynamic([
                        {
                            body: 'Financie la adquisición de vivienda nueva o usada. Haga realidad su sueño de tener vivienda propia.',
                            media: 'https://zipaquiradigital.com/wp-content/uploads/2024/08/hipotecario.jpg'
                        },
                        {
                            body: '🌐 Simular Crédito 👉 Calculadora de Crédito Hipotecario (https://www.bancocajasocial.com/calculadora-financiera/simulador-credito-hipotecario/)',
                        },
                        {
                            body: '🔙 Escribe "*volver*" para regresar al menú.',
                        }
                    ]);
                } else if (respuesta.includes('cartera')|| respuesta.includes('Cartera')) {
                    await flowDynamic([
                        {
                            body: 'Le permite consolidar las deudas que tenga con otras entidades y mejorar su flujo de caja.',
                            media: 'https://zipaquiradigital.com/wp-content/uploads/2024/08/compra-de-cartera.jpg'
                        },
                        {
                            body: '🌐 ¡Solicite su crédito! 👉 Solicitud de Crédito (https://www.bancocajasocial.com/solicitud-producto/)',
                        },
                        {
                            body: '🔙 Escribe "*volver*" para regresar al menú.',
                        }
                    ]);
                } else if (respuesta.includes('libranza')|| respuesta.includes('Libranza')) {
                    await flowDynamic([
                        {
                            body: 'Despreocúpese por el pago de las cuotas, pague tasas de interés preferenciales y acceda a este sin experiencia crediticia.',
                            media: 'https://zipaquiradigital.com/wp-content/uploads/2024/08/credito-Libranza.jpg'
                        },
                        {
                            body: '🌐 Simular Crédito 👉 Calculadora de Crédito Personal (https://www.bancocajasocial.com/calculadora-financiera/simulador-credito-consumo/)',
                        },
                        {
                            body: '🔙 Escribe "*volver*" para regresar al menú.',
                        }
                    ]);
                } else if (respuesta === 'volver') {
                    await flowDynamic(volverMenuPrestamosFlow);
                } else {
                    await flowDynamic([
                        {
                            body: 'Lo siento, no entiendo tu opción. Por favor, elige entre "Personal", "Hipotecario", "Cartera" o "Libranza".',
                        }
                    ]);
                }
            } catch (error) {
                console.error('Error handling response:', error);
                await flowDynamic([
                    {
                        body: 'Ocurrió un error al procesar tu solicitud. Por favor, inténtalo de nuevo más tarde.',
                    }
                ]);
            }
        }
    );

// Flujo de bienvenida
const bienvenidaFlow = addKeyword(['hola', 'buenos días', 'ola', 'ole', 'Buenas', 'buenas', 'buenas tardes', 'buenas noches', 'buen dia','Hola'])
    .addAnswer('🙌 Hola, soy Luisa Tinjacá, asesora integral del Banco Caja Social, sede Zipaquirá. En este momento no puedo atender tu consulta personalmente, pero puedes dejarme tu mensaje o enviarme los documentos que necesites. Tan pronto como esté disponible te responderé con gusto.', { delay: 4000 })
    .addAnswer('Mientras tanto, te proporcionaré información que podría ser útil para tus procesos de adquisición de productos del Banco Caja Social.', { delay: 6000 })
    .addAnswer('Utiliza las palabras clave que aparecen en negrita para recibir información.')
    .addAnswer(
        [
            'Puedes preguntar sobre:',
            '👉 *Cuentas* Escribe cuentas para información sobre nuestras cuentas bancarias.',
            '👉 *Tarjetas* Escribe "tarjetas" para conocer más acerca de nuestras tarjetas de crédito.',
            '👉 *Créditos* Escribe "créditos" para detalles sobre nuestros créditos bancarios.',
        ].join('\n')
    );

// Función principal para inicializar el bot
const main = async () => {
    const adapterFlow = createFlow([
        bienvenidaFlow,
        cuentasFlow,
        tarjetasFlow,
        prestamosFlow,
        volverMenuPrincipalFlow,
        volverMenuCuentasFlow,
        volverMenuTarjetasFlow,
        volverMenuPrestamosFlow,
    ]);
    
    const adapterProvider = createProvider(Provider);
    const adapterDB = new Database();

    const { handleCtx, httpServer } = await createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    });

    adapterProvider.server.post(
        '/v1/messages',
        handleCtx(async (bot, req, res) => {
            const { number, message, urlMedia } = req.body;
            await bot.sendMessage(number, message, { media: urlMedia ?? null });
            return res.end('sended');
        })
    );

    adapterProvider.server.post(
        '/v1/register',
        handleCtx(async (bot, req, res) => {
            const { number, name } = req.body;
            await bot.dispatch('REGISTER_FLOW', { from: number, name });
            return res.end('trigger');
        })
    );

    adapterProvider.server.post(
        '/v1/samples',
        handleCtx(async (bot, req, res) => {
            const { number, name } = req.body;
            await bot.dispatch('SAMPLES', { from: number, name });
            return res.end('trigger');
        })
    );

    adapterProvider.server.post(
        '/v1/blacklist',
        handleCtx(async (bot, req, res) => {
            const { number, intent } = req.body;
            if (intent === 'remove') bot.blacklist.remove(number);
            if (intent === 'add') bot.blacklist.add(number);

            res.writeHead(200, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ status: 'ok', number, intent }));
        })
    );

    httpServer(+PORT);
};
main();
