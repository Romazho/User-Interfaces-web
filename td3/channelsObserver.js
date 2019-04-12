//modele

class ChannelsObserver {

    //a voire

    constructor() {
        this.iteration = 0;
        this.created = 0;
        this.y=0;
    }

    
    updateChannelList(message){

        //faire une boucle qui ajoute tous les groupes
        //message.data
        if(this.created == 0){
            for(var i=1;i< message.data.length;i++){
                this.ajouterGroupe(message.data[i]);
            }
            this.created++;
        }
        else{
            this.ajouterGroupe(message.data[message.data.length-1]);
        }
    
    }
    
    ajouterGroupe(channel){
    
      
        var groupeBox = document.createElement("div");
        var i = document.createElement("i");
        var groupName = document.createElement("p");
        groupName.innerHTML = channel.name;

        i.classList.add("fas");
        i.classList.add("fa-plus");
        i.id = channel.id

       i.addEventListener("click", this.changePlusMinus);
        //est-ce qu'on peut faire .class??
       
        if(this.iteration % 2 == 0 ){
            groupeBox.className = "equipe1";
            this.iteration++;

        }

        else{
            groupeBox.className = "grGeneral";
            this.iteration++;

        }

        groupeBox.appendChild(i)
        groupeBox.appendChild(groupName)

        /*var icone = document.createElement("div");

        icone.classList.add("fas");
        icone.classList.add("fa-plus"); */
     
        
        // //var itm = document.getElementById("groupe").lastChild;
        // //var itm = document.getElementById("grGeneral").firstChild;
        // //var cln = itm.cloneNode(true);
        // var clone = document.getElementById("groupe").firstElementChild.cloneNode(true);
        // cln.innerHTML += channel.name;
        // document.getElementById("groupe").appendChild(cln);
        

        // groupeBox.innerHTML += channel.name;

    
        document.getElementById("groupe").appendChild(groupeBox);

    }

 

changePlusMinus(x){

//x.classList.toggle("fa-plus");

	//a changer cette implementation...
	if(this.y % 2 == 0){
		x.classList.remove("fa-plus");
		x.classList.add("fa-minus");
	}
	
	else {
		x.classList.remove("fa-minus");
		x.classList.add("fa-plus");
	}

	this.y++;



	/*if (document.getElementById("eq").className === "fa-minus") {
		document.getElementById("eq").className = "fa-thumbs-up";
	
	}
	else {
		document.getElementById("eq").className = "fa-thumbs-down";
	
	}*/


	/*event.srcElement.style.display = "none";
	let indexIcon = event.srcElement.className === "fas fa-minus" ? 0 : 1;
	let divParent = event.srcElement.parentElement;
	divParent.children[indexIcon].style.display = "inline";
	*/
}

}