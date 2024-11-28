const ClimaApi = "http://api.weatherapi.com/v1/current.json?key=78541992970a48d19c5123558242811&q=Sao Paulo&aqi=no"

async function climaCidade(){
      
    try {
        const respostaApi =  await fetch(ClimaApi, {
            method: "GET",

        });
        
  
        const respostaData =  await respostaApi.json();
        console.log("Dados da resposta:", respostaData); 
        console.log(respostaData.location.region);
        console.log(respostaData.current.temp_c );
        const item = document.getElementById('tempo');
        const item2 = document.getElementById('estado');
        let icon = respostaData.current.condition.icon;
        
       
        item.textContent = `${respostaData.location.region}` ;
        item2.textContent = `${respostaData.current.temp_c}` ;  
        document.getElementById("icon").src = icon;
    } catch (error) {
        console.error("Erro na requisição:", error);
       
    }
  }
climaCidade()
    

   