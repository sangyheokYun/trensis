function getTodayWord(){

    fetch("https://api.trensis.site/api/getTodayWord")
        .then(res => res.json())
        .then(res => {
            for(var i=1; i<=10; i++){
                $('#today'+i).text(i + ". " + res[i]);
            }
        });
}

function getTodayPatent(){

    fetch("https://api.trensis.site/api/getTodayPatent")
        .then(res => res.json())
        .then(res => {
            for(var i=1; i<=10; i++){
                $('#patent'+i).text(i + ". " + res[i].title);
                $('#patent'+i).attr('title', res[i].title);
                $('#patent'+i).attr('style', "cursor:pointer");
                $('#patent'+i).attr('onclick', "location.href=" + "'" + res[i].link + "'" + ";");
            }
        });

}

function getRelationWord(){
    var searchWord = $('h1#word').text();
    var relationURL = "https://api.trensis.site/api/getRelationWord?searchWord=" + searchWord;
    fetch(relationURL)
        .then(res => res.json())
        .then(res => {
           if(res.success){
               var relationWordArea = document.getElementById("relationWord");

               if(res.length > 0){
                   var seperateLine = document.createElement("span");
                   seperateLine.innerText = "|";
                   seperateLine.setAttribute('class', 'breadcrumb-item active');
                   relationWordArea.appendChild(seperateLine);
               }

               for(var i=0; i<res.length; i++){
                   var relationWord = document.createElement("span");
                   relationWord.innerHTML = "&nbsp" + res[i] + " |";
                   relationWord.setAttribute('class', 'breadcrumb-item active');
                   relationWordArea.appendChild(relationWord);
               }

           }
        });


}