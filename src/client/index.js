import {geoWeathPixCaller} from './js/app.js'
import "./styles/style.scss"
    
    
    
    
    
    
    
    // click event on save  button 

    window.addEventListener('DOMContentLoaded', (event) => {
        event.preventDefault()
        const saveBtn = document.getElementById("save-trip");
        saveBtn.addEventListener("click", geoWeathPixCaller);
    });

     
     
     export {
      geoWeathPixCaller
     }



