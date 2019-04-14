//modele

class ChannelsObserver {

    /** Cette fonction est responssable de construir l'objet ChannelsObserver
     */
    constructor() {
        this.iteration = 0;
        this.y=0;
    }


    /** Cette fonction efface et met à jour l'ensemble des channels du user
     @param {Message} channels - message contenant l'ensemble des channels
     */
    updateChannelList(channels){

       
        //1. on efface tout ce qu'il ya dans id=groupe
        var groupeList = document.getElementById("groupe").innerHTML = "";
        document.getElementById("messageText").innerHTML = "";

        //2. on ajoute tout les groupes dans id=groupe

        var general = document.createElement("div");
        general.className = "grGeneral";

        document.getElementById("groupe").appendChild(general);
        general.setAttribute("onclick", "changerGroupeGeneral(this)");

        general.innerHTML += "<div class='fas fa-star'> </div>  General <div class='defaut'> defaut </div>";

        this.iteration = 0;
        for (var i = 1; i < channels.data.length;i++){
            this.ajouterGroupe(channels.data[i]);
        }

        var container = document.getElementById("con22");
        var current = container.childNodes[1];

         var nom = "hello";

        //cr�ation du message
        let message = new Message("onGetChannel", current.id, nom, nom, nom);
        socket.send(JSON.stringify(message));
       
    }
    
    /** Cette fonction est responssable d'ajouter un nouveau channel
     @param {Message} channel - message contenant le nouveau channel
     */
    ajouterGroupe(channel){
    
        var groupeBox = document.createElement("div");
        var i = document.createElement("i");
        var groupName = document.createElement("p");
        groupName.innerHTML = channel.name;


        i.classList.add("fas");

        if (channel.joinStatus == false) {
            i.classList.add("fa-plus");
            
        }
        else {
            i.classList.add("fa-minus");
  
        }
        i.id = channel.id;     
        groupName.id = channel.id;

        groupName.setAttribute("onclick", "changerGroupe(this)");
        i.setAttribute("onclick", "changeStatus(this)");
       
        if(this.iteration % 2 == 0 ){
            groupeBox.className = "equipe1";
            this.iteration++;

        }

        else{
            groupeBox.className = "grGeneral";
            this.iteration++;

        }

        groupeBox.appendChild(i);
        groupeBox.appendChild(groupName);

        document.getElementById("groupe").appendChild(groupeBox);

        changerGroupe(groupName);      
    }



/** Cette fonction est responssable de modifier le bouton +/- selon son état courant
     @param {Boolean} bool - boolean déterminant l'état courant du bouton
     */
    changePlusMinus(bool) {

        var x = document.getElementById(id);

        if (bool == false) {
            x.classList.remove("fa-plus");
            x.classList.add("fa-minus");
        }
        else {
            x.classList.remove("fa-minus");
            x.classList.add("fa-plus");
        }


        

    }


}