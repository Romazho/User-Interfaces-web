//modele

class ChannelsObserver {

    //a voire

    constructor() {
        this.iteration = 0;
        this.created = 0;
    }

    
    updateChannelList(message){

        //faire une boucle qui ajoute tous les groupes
        //message.data
        if(this.created == 0){
            for(var i=3;i< message.data.length;i++){
                this.ajouterGroupe(message.data[i]);
            }
            this.created++;
        }
        else{
            this.ajouterGroupe(message.data[message.data.length-1]);
        }
    
    }
    
    ajouterGroupe(message){
    
        var groupeBox = document.createElement("div");
        //est-ce qu'on peut faire .class??
       
        if(this.iteration % 2 == 0 ){
            groupeBox.className = "equipe1";
            this.iteration++;

        }

        else{
            groupeBox.className = "grGeneral";
            this.iteration++;

        }

        /*var icone = document.createElement("div");

        icone.classList.add("fas");
        icone.classList.add("fa-plus"); */
     
        /*
        var itm = document.getElementById("groupe").lastChild;
        var cln = itm.cloneNode(true);
        //cln.innerHTML = message.name;
        document.getElementById("groupe").appendChild(cln);
        */

       groupeBox.innerHTML += message.name;

    
        document.getElementById("groupe").appendChild(groupeBox);

    }

    

}