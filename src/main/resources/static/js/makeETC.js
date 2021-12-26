function getTodayWord(){
    console.log("Client(JS) : getTodayWord - Kipris 실시간 특허 검색어 입력(요청중)");
    fetch("https://api.trensis.site/api/getTodayWord")
        .then(res => res.json())
        .then(res => {
            for(var i=1; i<=10; i++){
                $('#today'+i).text(i + ". " + res[i]);
            }
            console.log("Client(JS) : getTodayWord - 값 들어옴");
        });
}

function getTodayPatent(){
    console.log("Client(JS) : getTodayPatent - Kipris 오늘의 관심 특허 입력(요청중)");
    fetch("https://api.trensis.site/api/getTodayPatent")
        .then(res => res.json())
        .then(res => {
            for(var i=1; i<=10; i++){
                $('#patent'+i).text(i + ". " + res[i].title);
                $('#patent'+i).attr('title', res[i].title);
                $('#patent'+i).attr('style', "cursor:pointer");
                $('#patent'+i).attr('onclick', "location.href=" + "'" + res[i].link + "'" + ";");
            }
            console.log("Client(JS) : getTodayPatent - 값 들어옴");
        });

}

function getRelationWord(){
    console.log("Client(JS) : getRelationWord - Naver 연관검색어 입력(요청중)");
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
               console.log("Client(JS) : getRelationWord - 값 들어옴");
           }
        });


}