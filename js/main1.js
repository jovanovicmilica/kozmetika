$(document).ready(ready=>{
    



(function dohvatiMeni(){
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
})()


function ispisMeni(meniArr){
    var nav=document.createElement("nav");
    nav.setAttribute("id","meni");
    var header=document.createElement("header");
    var logo=document.createElement("div");
    logo.setAttribute("id","logo");
    var logoTekst=document.createElement("a");
    logoTekst.setAttribute("href","index.html");
    logoTekst.innerHTML+="NLT"
    logo.appendChild(logoTekst)
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
    var link=document.createElement("a");
    link.setAttribute("href","#");
    var hamburger=document.createElement("i");
    divHamburger.appendChild(link)
    link.appendChild(hamburger)
    hamburger.classList.add("fas")
    hamburger.classList.add("fa-bars")
    nav.appendChild(divHamburger);

    $('#hamburger').on('click',function(e){
        e.preventDefault()
        $('nav ul').slideToggle()
    })
    $(window).scroll(function() {    
        var scroll = $(window).scrollTop();
    
        if (scroll >= 50) {
            $("header").addClass("bojaSkrol");
            $('nav ul').addClass("boja")
        } else {
            $("header").removeClass("bojaSkrol");
            $('nav ul').removeClass("boja")
        }
    })
}


let url=location.href;

if(url.indexOf("proizvodi.html")!=-1){
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

function prikaziProizvode(){
    $.ajax({
        url:"js/proizvodi.json",
        method:"GET",
        success:function(proizvodiArr){
            console.log("radi")
            ispisProizvodi(proizvodiArr);
            proizvodiLs(proizvodiArr);
        },
        error:function(){
            console.log("Ne radi")
        }
        
    })
}
function proizvodiLs(proizvodiArr){
    proizvodiId=proizvodiArr.map(x=>x.id);
    localStorage.setItem("proizvodId",JSON.stringify(proizvodiId));
}

function vratiProizvodeIzLs(){
    return JSON.parse(localStorage.getItem("proizvodId"))
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
        <div class="cenapr">
        <h3>${proizvodi[pr].brend.naziv.toUpperCase()}</h3>
        <p>${proizvodi[pr].cena},00 RSD</p>
        </div>
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
    for(br of brendovi){
       ispis+= `<option value="${br.id}">${br.naziv}</option>`;
    }
    document.getElementById("selectBrend").innerHTML+=ispis;
    

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
    var idproizovda=vratiProizvodeIzLs();
    //console.log(idproizovda);
    $.ajax({
        url:"js/proizvodi.json",
        method:"GET",
        success:function(proizvodiArr){
            var pfilter=[]
            for(let i of idproizovda){
                for(let p of proizvodiArr){
                    if(p.id==i){
                        pfilter.push(p)
                    }
                }
            }
            pfilter=pfilter.filter(x=>x.brend.id==idBrend)
            ispisProizvodi(pfilter)
            proizvodiLs(proizvodiArr)

            /*proizvodiArr=proizvodiArr.filter(x=>x.brend.id==idBrend);
            ispisProizvodi(proizvodiArr);
            console.log(proizvodiArr)*/
        },
        error:function(){
            console.log("Ne radi")
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
        ispis+=`<input type="checkbox" name="rb" value='${kat[k].id}'/><span>${kat[k].naziv}</span><br/>`
    }

    document.getElementById("kategorije").innerHTML+=ispis

    var rbat=document.getElementsByName('rb')
    for(let i=0;i<rbat.length;i++){
        rbat[i].addEventListener("change",dohvatiKat);
    }
}
var niz=[]
function dohvatiKat(){
    var cbVal=this.value
    var idpr=vratiProizvodeIzLs()
    console.log(idpr)
    if(niz.includes(cbVal)){
        niz=niz.filter(pr=>{
            return pr!=cbVal;
        })
    }
    else{
        niz.push(cbVal);
    }
    $.ajax({
        url:"js/proizvodi.json",
        method:"GET",
        success:function(data){
            var proizvod=[]
            for(let id of idpr){
                for(let d of data){
                    if(d.id == id){
                        proizvod=data
                    }
                }
            }
            proizvod=proizvod.filter(x=>{
                if(niz.length!=0){
                    for(let i=0;i<niz.length;i++){
                        if(niz[i]==x.kategorija.id){
                            return true;
                            
                        }
                    }
                }
                else{
                    return true
                }
            })
            console.log(proizvod)
            ispisProizvodi(proizvod)
            proizvodiLs(proizvod)
            

            /*data=data.filter(d=>d.kategorija.id==cbVal)
            ispisProizvodi(data)*/
            
        },
        error:function(){
            console.log("Ne radi")
        }
        
    })
}


$('#select').on('change',sortiranje);

function sortiranje(){
    var selectVal=$(this).val()
    var idproizovda=vratiProizvodeIzLs()
    //console.log(idproizovda)
    $.ajax({
        url:"js/proizvodi.json",
        method:"GET",
        success:function(data){
            var prfilter2=[];
            for(let id of idproizovda){
                for(let d of data){
                    if(d.id==id){
                        prfilter2.push(d)
                    }
                }
            }
            if(selectVal=='izaberi'){
                prikaziProizvode()
            }
            else if(selectVal=='rastuceCena'){
                prfilter2=prfilter2.sort(function(a,b){
                    return a.cena-b.cena;
                })
            }
            else if(selectVal=='opadajuceCena'){
                prfilter2=prfilter2.sort(function(a,b){
                    return b.cena-a.cena;
                })
            }
            else if(selectVal=='rastuceNaziv'){
                prfilter2=prfilter2.sort(function(a,b){
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
                prfilter2=prfilter2.sort(function(a,b){
                    if(a.naziv>b.naziv){
                        return -1
                    }
                    else if(a.naziv<b.naziv){
                        return 1
                    }
                    return 0
                })
            }


            ispisProizvodi(prfilter2)
            proizvodiLs(prfilter2)
            
        },
        error:function(){
            console.log("Ne radi")
        }
        
    })
}
}

if(url.indexOf("index.html")!=-1){

    var tekstovi=["Naš cilj je da se Ti osećaš lepom i kada se tek probudiš, i kada si u žurbi, i kada treba da osvojiš nečije srce. Biti negovana više nije luksuz. To je svakodnevna potreba svake dame koja drži do sebe.Zbog toga mi zastupamo brendove koji znaju šta te čini srećnom. Nema veće sreće nego kada kupiš omiljeni    kozmetičkiNeki od brendova koje zastupamo još nisu postali svetski poznati, ali su zasigurno osvojili srca mnogih dama širom Evrope. Besprekoran kvalitet naših kozmetičkih proizvoda već je stvorio ogroman broj zadovoljnih kupaca i u Srbiji.","Naša priča kao kompanije je priča o želji i požrtvovanju da se ta želja ostvari. Osnovani smo 2010. godine da bi u kratkom vremenskom periodu postali ozbiljan učesnik na tržištu kozmetičkih proizvoda Srbije. Od početka nas vodi želja da domaćem tržištu pružimo kvalitetnu kozmetiku po prihvatljivim cenama.Još važnija želja je da damama na ovim prostorima pružimo samopouzdanje i pomognemo im da istaknu svoju lepotu po kojoj su nadaleko poznate.Naš moto je da nije kvalitetno samo ono što je skupo! Pravi kvalitet leži u načinu upotrebe naših proizvoda.","Naš tim stalno osluškuje tvoje komentare, pitanja i molbe kako bi što bolje umeli da odgovorimo tvojim očekivanjima. Tu smo da posavetujemo ako ti je savet potreban, a volimo i da učimo od naših kupaca. Praktičnim uputstvima i zanimljivim detaljima podsećamo kako da upotrebom naših proizvoda postigneš najbolje efekte.Naš asortiman proizvoda pruža mogućnosti najraznovrsnijih kombinacija kako bi tvoja lepota bila naglašena na pravi način. Na tebi je da kombinuješ. Stalno pratimo svetske trendove i među prvima donosimo trendy proizvode damama u Srbiji."];
    var naslovi=["Za nas je važno tvoje samopozudanje","Naša priča je priča o tvojoj lepoti","Tu smo da ti pomognemo da pravilno biraš kozmetiku"]
    ispis='';
    for(let i=0;i<naslovi.length;i++){
        ispis+=`<div class="tekst"><h3><span>${i+1}.</span>${naslovi[i]}</h3><p>${tekstovi[i]}</p></div>`
    }
    document.getElementById("tekst").innerHTML+=ispis;


    (function ispisSlikaBrend(){
        $.ajax({
            url:"js/brendovi.json",
            method:"GET",
            success:function(brend){
                ispis=''
                for(let b of brend){
                    if(b.slika.src!=null){
                        ispis+=`<div class="brend"><img src="img/${b.slika.src}"/></div>`
                    }
                }
                $("#brendoviSlike").html(ispis);
            },
            error:function(){
                console.log("Ne radi")
            }
            
        })
    })()
    
}
if(url.indexOf("kontakt.html")!=-1){
    $('#btnPosalji').click(function(){
        var imePrezime=$("#imePrezime").val()
        var mail=$("#mail").val()
        var naslov=$("#naslov").val()
        var poruka=$("#poruka").val()

        var RegImePrezime=/^[A-ZČĆŠĐŽ][a-zčćšđž]{2,20}\s[A-ZČĆŠĐŽ][a-zčćšđž]{2,20}$/;
        var regMail=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/

        var greske=[];
        
        if(!RegImePrezime.test(imePrezime)){
            greske.push("Ime i prezime moraju početi velikim slovom,a između njih mora biti razmak(Pera Perić)")
        }
        if(!regMail.test(mail)){
            greske.push("E-mail nije u dobrom formatu")
        }
        naslov=naslov.split(" ")
        if(naslov.length<1){
            greske.push("Naslov mora imati barem jednu rec")
        }
        poruka=poruka.split(" ");
        if(poruka.length<3){
            greske.push("Poruka mora imati makar 3 reci")
        }
        if(greske.length==0){
            document.getElementById("greske").innerHTML="Uspesno ste poslali poruku"
        }
        else{
            document.getElementById("greske").innerHTML="Niste pravilno popunili sva polja u formi. Pogledajte upustvo za popunjavanje forme"
        }
    })
}


(function(){
    var futer=document.createElement("footer");
    futer.classList.add("futer");
    futer.innerHTML+=`<h1>NLT</h1>`
    var mreze=document.createElement("ul");
    futer.appendChild(mreze);
    var nizMreza=["fab fa-instagram","fab fa-facebook","fab fa-youtube"];
    var nizMrezaLink=["https://www.instagram.com/","https://www.facebook.com/","https://www.youtube.com/"]
    for(let i=0;i<nizMreza.length;i++){
        var liMreza=document.createElement("li");
        mreze.appendChild(liMreza);
        liMreza.innerHTML+=`<a href="${nizMrezaLink[i]}" target="_blank"><i class="${nizMreza[i]}"></i></a>`
    }
    document.getElementsByTagName("body")[0].appendChild(futer);
    futer.innerHTML+=`<a href="#">Dokumentacija</a><a href="sitemap.xml">Sitemap</a>`
})();

});