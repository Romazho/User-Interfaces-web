
//le switch est ici!

var connectionHandler = function(){
    ws = new WebSocket("http://log2420-nginx.info.polymtl.ca");

    var message = JSON.parse(event.data)
    ws.onmessage = function(event){
    var message = JSON.parse(event.data)
    switch(event){
        case onMessage:{

        }
        case onJoinChannel:{

        }
        case 
    }
    }
}