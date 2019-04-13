//modele

class ChannelsObserver {

    //a voire

    constructor() {
        this.iteration = 0;
        this.y=0;
    }

    
    updateChannelList(channels){


        //1. on efface tout ce qu'il ya dans id=groupe
        var groupeList = document.getElementById("groupe").innerHTML = "";

        //while (groupeList.firstChild) {
        //    groupeList.remove(groupeList.firstChild);
        //}

        //2. on ajoute tout les groupes dans id=groupe

        var general = document.createElement("div");
        general.className = "grGeneral";

        document.getElementById("groupe").appendChild(general);

        //var star = document.createElement("div");
        //star.className = "fas fa-star";
        //star.innerHTML = "";

        //var defaut = document.createElement("div");
        //defaut.className = "defaut";
        //defaut.innerHTML = "défaut";
        general.setAttribute("onclick", "changerGroupe(this)");
        general.innerHTML += "<div class='fas fa-star'> </div>  General <div class='defaut'> defaut </div>";

        this.iteration = 0;
        for (var i = 1; i < channels.data.length;i++){
            this.ajouterGroupe(channels.data[i]);
        }

       
    }
    
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
        //est-ce qu'on peut faire .class??
       
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

    }


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


        //x.classList.toggle("fa-plus");

}


    ajouterUtilisateur(name) {


    }




    retirerUtilisateur(name) {



    }


}