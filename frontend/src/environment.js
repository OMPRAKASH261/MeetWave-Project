let IS_PROD = true;
const server = IS_PROD ?
        "https://meetwavebackend.vercel.app/" :

        "http://localhost:8000" 
      

export default server;