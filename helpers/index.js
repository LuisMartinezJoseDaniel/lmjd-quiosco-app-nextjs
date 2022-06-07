// tipo de Divisa (en-US), {opciones}
export const formatearDinero = (cantidad) => {
  return cantidad.toLocaleString( 'en-US', {
    style: 'currency', //Formato de dinero
    currency: 'USD' //Divisa
 })
}