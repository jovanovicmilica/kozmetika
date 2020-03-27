$(document).ready(function(){
    dohvatiMeni();

    prikaziProizvode();


    brendovi();

    kategorije()


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
    var logo=document.createElement("div");
    logo.setAttribute("id","logo");
    logo.innerHTML+="LOGO"
    nav.appendChild(logo);
    header.appendChild(logo)
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
        
    }


    var divHamburger=document.createElement("div")
    divHamburger.setAttribute('id','hamburger')
    var hamburger=document.createElement("i");
    divHamburger.appendChild(hamburger)
    hamburger.classList.add("fas")
    hamburger.classList.add("fa-bars")
    nav.appendChild(divHamburger);

    $('#hamburger').on('click',function(){
        $('nav ul').slideToggle()
    })
}


function prikaziProizvode(){
    $.ajax({
        url:"js/proizvodi.json",
        method:"GET",
        success:function(proizvodiArr){
            console.log("radi")
            $('#select').on('change',sortiranje(proizvodiArr));
        },
        error:function(){
            console.log("Ne radi")
        }
        
    })
}

function sortiranje(proizvodiArr){
    var selectVal=$(this).val();
            if(selectVal=='izaberi'){
                ispisProizvodi()
            }
            else if(selectVal=='rastuceCena'){
                data=data.sort(function(a,b){
                    return a.cena-b.cena;
                })
            }
            else if(selectVal=='opadajuceCena'){
                data=data.sort(function(a,b){
                    return b.cena-a.cena;
                })
            }
            else if(selectVal=='rastuceNaziv'){
                data=data.sort(function(a,b){
                    if(a.naziv>b.naziv){
                        return 1
                    }
                    else if(a.naziv<b.naziv){
                        return -1
                    }
                    return 0
                })
            }
            else if(selectVal=='opadajuceNaziv'){
                data=data.sort(function(a,b){
                    if(a.naziv>b.naziv){
                        return -1
                    }
                    else if(a.naziv<b.naziv){
                        return 1
                    }
                    return 0
                })
            }
            ispisProizvodi(proizvodiArr)
            
        }
        


var main=document.getElementById("centar");

function ispisProizvodi(proizvodi){
    var ispis="";
    for(pr in proizvodi){
        ispis+=`
        <div class="blok">
        <div class="naslov">
        <img src="${proizvodi[pr].slika.src}.jpg" alt="${proizvodi[pr].slika.alt}" >
        <p class="opis">${proizvodi[pr].opis}</p>
        </div>
        <p>${proizvodi[pr].naziv}</p>
        <h3>${proizvodi[pr].brend.naziv.toUpperCase()}</h3>
        <p>${proizvodi[pr].cena},00 RSD</p>
        <button class="btn">Dodaj u korpu</button>
        </div>
        `
        
    }
main.innerHTML=ispis;
$(".opis").hide()

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
            //filtriranje(this.value)
        }
    })
}




function kategorije(){
    $.ajax({
        url:"js/kategorije.json",
        method:"GET",
        success:function(kat){
            ispsiKategorije(kat)
        },
        error:function(){
            console.log("Ne radi")
        }
        
    })
}

function ispsiKategorije(kat){
    var ispis='';
    ispis+=ispis+=`<span>Kategorije:</span><br/>`
    for(k in kat){
        ispis+=`<input type="radio" name="rb" value='${kat[k].id}'/><span>${kat[k].naziv}</span><br/>`
    }

    document.getElementById("kategorije").innerHTML+=ispis

    var rbat=document.getElementsByName('rb')
    for(let i=0;i<rbat.length;i++){
        //rbat[i].addEventListener("change",dohvatiKat);
    }
}

