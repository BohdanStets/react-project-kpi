class MarvelService{
   getResource = async (url) =>{
      let res = await fetch(url);
      if(!res.ok){
         throw new Error(`Could not fetch ${url}, status: ${res.status}`)
      }
      return await res.json();
   }
   getAllCharacters = () =>{
      return this.getResource('https://gateway.marvel.com:443/v1/public/characters?apikey=c60732a3c11ef854cc73634a8b9cc36f');
   }
 }
 
 export default MarvelService;
 
 