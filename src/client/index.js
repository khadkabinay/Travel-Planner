import {geoNamesCaller} from './js/app.js'
import "./styles/header.scss"
    
    
    
    
    
    
    
    // click event on generate button 
     const generator_btn = document.getElementById("save-trip");
     generator_btn.addEventListener("click", geoNamesCaller);

     export {
       geoNamesCaller
     }

