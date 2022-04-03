export const objectToQueryString = ( queryObject: any | null | undefined ) => {
    if ( queryObject === null || queryObject === undefined ) return '';

    const res = Object.keys( queryObject )
         .filter(key =>  queryObject[key])
         .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(queryObject[key])}`)
         .join( '&' );
    
    return res;
}