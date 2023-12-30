

function loveCalc(){
var loveScore = Math.random();

loveScore = Math.floor(loveScore*100) +1;

let yourName = document.getElementById("yourname").value;
let partnerName = document.getElementById("partnername").value;

console.log(yourName);

if(yourName =="" || partnerName == "")
{
    alert("Please enter your and your partner name first.");
}
else{

if(loveScore>= 70)
{

    document.getElementById("lovePercent").innerHTML = "Hello, "+yourName+ " and " +partnerName+ ". Your love score is " + loveScore + "%. Your are fantastic together" ;

//alert("Your love score is " +loveScore+ "%. Your are fantastic together");
}

if(loveScore> 30 && loveScore< 70)
{

    document.getElementById("lovePercent").innerHTML = "Hello, "+yourName+ " and " +partnerName+ ". Your love score is " + loveScore + "%" ;

//alert("Your love score is " +loveScore+ "%");
}

if(loveScore<= 30)
{

    document.getElementById("lovePercent").innerHTML = "Hello, "+yourName+ " and " +partnerName+ ". Your love score is " + loveScore + "%. Your love is not so great." ;

//alert("Your love score is " +loveScore+ "%. Your love is not so great.");
}
}
}