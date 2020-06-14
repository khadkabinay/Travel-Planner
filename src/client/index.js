        
         //importing
        import {geoWeathPixCaller} from './js/app.js'
        import {refreshPage} from './js/uiUpdate.js'
        import "./styles/style.scss"
            
            
            
            
            
            
            
            // click event on save button 

            window.addEventListener('DOMContentLoaded', (event) => {
                 event.preventDefault()
                 const saveBtn   = document.getElementById("save-trip");
                 const removeBtn = document.getElementById("remove-trip");
                
                saveBtn.addEventListener("click", geoWeathPixCaller);
                removeBtn.addEventListener("click",refreshPage);
            
            });

            
            
            export { geoWeathPixCaller  }



