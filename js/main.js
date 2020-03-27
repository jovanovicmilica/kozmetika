$(document).ready(function(){
    dohvatiMeni();

    prikaziProizvode();

    sortiranje();

    brendovi();

    ///klk

    var po1=$("#po1")
    var po4=$("#po4")

    po1.on("click",function(){
        $(".blok").addClass("po1");
        $(".blok").removeClass("po4");
        $(".opis").show()
        console.log("RADI")
    })

    po4.on("click",function(){
        $(".blok").removeClass("po1");
        $(".blok").addClass("po4");
        $(".opis").hide()
        console.log("RADI2")
    })

    
});

function dohvatiMeni(){
    $.ajax({
        url:"js/meni.json",
        method:"GET",
        success:function(meniArr){
            ispisMeni(meniArr);
        },
        error:function(){
            console.log("Ne radi")
        }
        
    })
}


function ispisMeni(meniArr){
    var nav=document.createElement("nav");
    nav.setAttribute("id","meni");
    var header=document.createElement("header");
    header.appendChild(nav);
    document.getElementsByTagName("body")[0].prepend(header);
    var ul=document.createElement("ul");
    nav.appendChild(ul);
    for(li of meniArr){
        var liTag=document.createElement("li");
        ul.appendChild(liTag);
        var a=document.createElement("a");
        liTag.appendChild(a);
        a.setAttribute("href",li.putanja);
        a.innerHTML+=li.naziv;
        var podmeniProizvodi=li.kategorije;
        if(li.kategorije!=null){
            var ulProizvodi=document.createElement("ul");
            liTag.appendChild(ulProizvodi);
            podmeniProizvodi.forEach(element => {
                //console.log(element);
                var liproizvodi=document.createElement("li");
                ulProizvodi.appendChild(liproizvodi);
                var aTagProizvodi=document.createElement("a");
                liproizvodi.appendChild(aTagProizvodi);
                aTagProizvodi.setAttribute("href",element.putanja);
                aTagProizvodi.innerHTML+=element.naziv;
                var podmeniPodmenija=element.kategorije;
                if(podmeniPodmenija!=null){
                    var ulKat=document.createElement("ul");
                    podmeniPodmenija.forEach(element2 => {
                        liproizvodi.appendChild(ulKat);
                    var liKat=document.createElement("li");
                    ulKat.appendChild(liKat);
                    var aKat=document.createElement("a");
                    liKat.appendChild(aKat);
                    aKat.setAttribute("href",element2.putanja)
                    aKat.innerHTML+=element2.naziv;
                    });
                }
                
            });
        }

        
        
    }
    var nav=$('nav ul li');
    //nav.find('ul').hide()

    $('nav ul li>ul').find('li').toggle()
    
    
}




function prikaziProizvode(){
    $.ajax({
        url:"js/proizvodi.json",
        method:"GET",
        success:function(proizvodiArr){
            console.log("radi")
            ispisProizvodi(proizvodiArr);
        },
        error:function(){
            console.log("Ne radi")
        }
        
    })
}

var main=document.getElementById("centar");

function ispisProizvodi(proizvodi){
    var ispis="";
    for(pr in proizvodi){
        ispis+=`
        <div class="blok">
        <img src="${proizvodi[pr].slika.src}.jpg" alt="${proizvodi[pr].slika.alt}" >
        <div class="naslov">
        <p>${proizvodi[pr].naziv}</p>
        <p>${proizvodi[pr].brend.naziv.toUpperCase()}</p>
        </div>
        <p>${proizvodi[pr].cena},00 RSD</p>
        <p class="opis">${proizvodi[pr].opis}</p>
        <button class="btn">Korpa</button>
        </div>
        `
        
    }
main.innerHTML=ispis;
$(".opis").hide()

}


function sortirajRastuce(){
    $.ajax({
        url:"js/proizvodi.json",
        method:"GET",
        success:function(proizvodiArr){
            proizvodiArr.sort(function(a,b) {
                return a.cena-b.cena;
            });
            ispisProizvodi(proizvodiArr);
            console.log("radi")
        },
        error : function(xhr, error, status) {
            console.log(status);
        }
        
    })
    
}

function sortirajOpadajuce(){
    $.ajax({
        url:"js/proizvodi.json",
        method:"GET",
        success:function(proizvodiArr){
            proizvodiArr.sort(function(a,b) {
                return b.cena-a.cena;
            });
            ispisProizvodi(proizvodiArr);
            console.log("radi")
        },
        error : function(xhr, error, status) {
            console.log(status);
        }
        
    })
    
}
function sortirajOpadajuceNaziv(){
    $.ajax({
        url:"js/proizvodi.json",
        method:"GET",
        success:function(proizvodiArr){
            proizvodiArr.sort(function(a,b) {
                if (a.naziv > b.naziv ) {
                    return -1;
                  }
                  if (a.naziv < b.naziv ) {
                    return 1;
                  }
                  return 0;
            });
            ispisProizvodi(proizvodiArr);
            console.log("radi")
        },
        error : function(xhr, error, status) {
            console.log(status);
        }
        
    })
    
}

function sortirajRastuceNaziv(){
    $.ajax({
        url:"js/proizvodi.json",
        method:"GET",
        success:function(proizvodiArr){
            proizvodiArr.sort(function(a,b) {
                if (a.naziv < b.naziv ) {
                    return -1;
                  }
                  if (a.naziv > b.naziv ) {
                    return 1;
                  }
                  return 0;
            });
            ispisProizvodi(proizvodiArr);
            console.log("radi")
        },
        error : function(xhr, error, status) {
            console.log(status);
        }
        
    })
    
}

function sortiranje(){
    $('#select').on("change",function(){
        if($('select').val()=='rastuceCena'){
            sortirajRastuce();
        }
        if($('select').val()=='opadajuceCena'){
            sortirajOpadajuce();
        }
        if($('select').val()=='opadajuceNaziv'){
            sortirajOpadajuceNaziv();
        }
        if($('select').val()=='rastuceNaziv'){
            sortirajRastuceNaziv();
        }
    }
    
        
    );
}

function brendovi(){
    $.ajax({
        url:"js/brendovi.json",
        method:"GET",
        success:function(brendovi){
            ispisBrendova(brendovi);
        },
        error : function(xhr, error, status) {
            console.log(status);
        }
        
    })
}

function ispisBrendova(brendovi){
    ispis='';
    ispis+=`<span>Brend: </span>`;
    ispis+=`<select name="selectBrend" id="selectBrend">`;
    ispis+=`<option value="0">Izaberite</option>`;
    for(br of brendovi){
       ispis+= `<option value="${br.id}">${br.naziv}</option>`;
    }
    ispis+=`</select>`
    document.getElementById("filterBrendovi").innerHTML+=ispis;
    

    $('#selectBrend').on("change",function(){
        if(this.value==0){
            prikaziProizvode()
        }
        else{
            filtriranje(this.value)
        }
    })
}



function filtriranje(idBrend){
    $.ajax({
        url:"js/proizvodi.json",
        method:"GET",
        success:function(proizvodiArr){
            proizvodiArr=proizvodiArr.filter(x=>x.brend.id==idBrend);
            ispisProizvodi(proizvodiArr);
            console.log(proizvodiArr)
        },
        error:function(){
            console.log("Ne radi")
        }
        
    })
    
}

$('#primeni').click(function(){
    console.log("Proba");
})





