$(document).ready(e=>{$.ajax({url:"js/meni.json",method:"GET",success:function(e){!function(e){var a=document.createElement("nav");a.setAttribute("id","meni");var o=document.createElement("header"),i=document.createElement("div");i.setAttribute("id","logo");var n=document.createElement("a");n.setAttribute("href","index.html"),n.innerHTML+="NLT",i.appendChild(n),a.appendChild(i),o.appendChild(i),o.appendChild(a),document.getElementsByTagName("body")[0].prepend(o);var t=document.createElement("ul");for(li of(a.appendChild(t),e)){var r=document.createElement("li");t.appendChild(r);var s=document.createElement("a");r.appendChild(s),s.setAttribute("href",li.putanja),s.innerHTML+=li.naziv}var l=document.createElement("div");l.setAttribute("id","hamburger");var d=document.createElement("a");d.setAttribute("href","#");var m=document.createElement("i");l.appendChild(d),d.appendChild(m),m.classList.add("fas"),m.classList.add("fa-bars"),a.appendChild(l),$("#hamburger").on("click",function(e){e.preventDefault(),$("nav ul").slideToggle()}),$(window).scroll(function(){var e=$(window).scrollTop();e>=50?($("header").addClass("bojaSkrol"),$("nav ul").addClass("boja")):($("header").removeClass("bojaSkrol"),$("nav ul").removeClass("boja"))})}(e)},error:function(){console.log("Ne radi")}});let a=location.href;if(-1!=a.indexOf("proizvodi.html")){n(),$.ajax({url:"js/kategorije.json",method:"GET",success:function(e){!function(e){var a="";for(k in a+=a+="<span>Kategorije:</span><br/>",e)a+=`<input type="checkbox" name="rb" value='${e[k].id}'/><span>${e[k].naziv}</span><br/>`;document.getElementById("kategorije").innerHTML+=a;var o=document.getElementsByName("rb");for(let e=0;e<o.length;e++)o[e].addEventListener("change",m)}(e)},error:function(){console.log("Ne radi")}});var o=$("#po1"),i=$("#po4");function n(){$.ajax({url:"js/proizvodi.json",method:"GET",success:function(e){console.log("radi"),l(e),t(e)},error:function(){console.log("Ne radi")}})}function t(e){proizvodiId=e.map(e=>e.id),localStorage.setItem("proizvodId",JSON.stringify(proizvodiId))}function r(){return JSON.parse(localStorage.getItem("proizvodId"))}o.on("click",function(){$(".blok").addClass("po1"),$(".blok").removeClass("po4"),$(".opis").show(),console.log("RADI")}),i.on("click",function(){$(".blok").removeClass("po1"),$(".blok").addClass("po4"),$(".opis").hide(),console.log("RADI2")});var s=document.getElementById("centar");function l(e){var a="";for(pr in e)a+=`\n            <div class="blok">\n            <div class="naslov">\n            <img src="${e[pr].slika.src}.jpg" alt="${e[pr].slika.alt}" >\n            <p class="opis">${e[pr].opis}</p>\n            </div>\n            <p>${e[pr].naziv}</p>\n            <div class="cenapr">\n            <h3>${e[pr].brend.naziv.toUpperCase()}</h3>\n            <p>${e[pr].cena},00 RSD</p>\n            </div>\n            </div>\n            `;s.innerHTML=a,$(".opis").hide()}var d=[];function m(){var e=this.value,a=r();console.log(a),d.includes(e)?d=d.filter(a=>a!=e):d.push(e),$.ajax({url:"js/proizvodi.json",method:"GET",success:function(e){var o=[];for(let i of a)for(let a of e)a.id==i&&(o=e);o=o.filter(e=>{if(0==d.length)return!0;for(let a=0;a<d.length;a++)if(d[a]==e.kategorija.id)return!0}),console.log(o),l(o),t(o),document.getElementById("select").selectedIndex=0},error:function(){console.log("Ne radi")}})}$("#select").on("change",function(){var e=$(this).val(),a=r();$.ajax({url:"js/proizvodi.json",method:"GET",success:function(o){var i=[];for(let e of a)for(let a of o)a.id==e&&i.push(a);"izaberi"==e?n():"rastuceCena"==e?i=i.sort(function(e,a){return e.cena-a.cena}):"opadajuceCena"==e?i=i.sort(function(e,a){return a.cena-e.cena}):"rastuceNaziv"==e?i=i.sort(function(e,a){return e.naziv>a.naziv?1:e.naziv<a.naziv?-1:0}):"opadajuceNaziv"==e&&(i=i.sort(function(e,a){return e.naziv>a.naziv?-1:e.naziv<a.naziv?1:0})),l(i),t(i)},error:function(){console.log("Ne radi")}})})}if(-1!=a.indexOf("index.html")){var u=["Naš cilj je da se Ti osećaš lepom i kada se tek probudiš, i kada si u žurbi, i kada treba da osvojiš nečije srce. Biti negovana više nije luksuz. To je svakodnevna potreba svake dame koja drži do sebe.Zbog toga mi zastupamo brendove koji znaju šta te čini srećnom. Nema veće sreće nego kada kupiš omiljeni    kozmetičkiNeki od brendova koje zastupamo još nisu postali svetski poznati, ali su zasigurno osvojili srca mnogih dama širom Evrope. Besprekoran kvalitet naših kozmetičkih proizvoda već je stvorio ogroman broj zadovoljnih kupaca i u Srbiji.","Naša priča kao kompanije je priča o želji i požrtvovanju da se ta želja ostvari. Osnovani smo 2010. godine da bi u kratkom vremenskom periodu postali ozbiljan učesnik na tržištu kozmetičkih proizvoda Srbije. Od početka nas vodi želja da domaćem tržištu pružimo kvalitetnu kozmetiku po prihvatljivim cenama.Još važnija želja je da damama na ovim prostorima pružimo samopouzdanje i pomognemo im da istaknu svoju lepotu po kojoj su nadaleko poznate.Naš moto je da nije kvalitetno samo ono što je skupo! Pravi kvalitet leži u načinu upotrebe naših proizvoda.","Naš tim stalno osluškuje tvoje komentare, pitanja i molbe kako bi što bolje umeli da odgovorimo tvojim očekivanjima. Tu smo da posavetujemo ako ti je savet potreban, a volimo i da učimo od naših kupaca. Praktičnim uputstvima i zanimljivim detaljima podsećamo kako da upotrebom naših proizvoda postigneš najbolje efekte.Naš asortiman proizvoda pruža mogućnosti najraznovrsnijih kombinacija kako bi tvoja lepota bila naglašena na pravi način. Na tebi je da kombinuješ. Stalno pratimo svetske trendove i među prvima donosimo trendy proizvode damama u Srbiji."],p=["Za nas je važno tvoje samopozudanje","Naša priča je priča o tvojoj lepoti","Tu smo da ti pomognemo da pravilno biraš kozmetiku"];ispis="";for(let e=0;e<p.length;e++)ispis+=`<div class="tekst"><h3><span>${e+1}.</span>${p[e]}</h3><p>${u[e]}</p></div>`;document.getElementById("tekst").innerHTML+=ispis,$.ajax({url:"js/brendovi.json",method:"GET",success:function(e){ispis="";for(let a of e)null!=a.slika.src&&(ispis+=`<div class="brend"><img src="img/${a.slika.src}"/></div>`);$("#brendoviSlike").html(ispis)},error:function(){console.log("Ne radi")}})}-1!=a.indexOf("kontakt.html")&&$("#btnPosalji").click(function(){var e=$("#imePrezime").val(),a=$("#mail").val(),o=$("#naslov").val(),i=$("#poruka").val(),n=[];/^[A-ZČĆŠĐŽ][a-zčćšđž]{2,20}\s[A-ZČĆŠĐŽ][a-zčćšđž]{2,20}$/.test(e)||n.push("Ime i prezime moraju početi velikim slovom,a između njih mora biti razmak(Pera Perić)"),/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(a)||n.push("E-mail nije u dobrom formatu"),(o=o.split(" ")).length<1&&n.push("Naslov mora imati barem jednu rec"),(i=i.split(" ")).length<3&&n.push("Poruka mora imati makar 3 reci"),0==n.length?document.getElementById("greske").innerHTML="Uspesno ste poslali poruku":document.getElementById("greske").innerHTML="Niste pravilno popunili sva polja u formi. Pogledajte upustvo za popunjavanje forme"}),function(){var e=document.createElement("footer");e.classList.add("futer"),e.innerHTML+="<h1>NLT</h1>";var a=document.createElement("ul");e.appendChild(a);var o=["fab fa-instagram","fab fa-facebook","fab fa-youtube"],i=["https://www.instagram.com/","https://www.facebook.com/","https://www.youtube.com/"];for(let e=0;e<o.length;e++){var n=document.createElement("li");a.appendChild(n),n.innerHTML+=`<a href="${i[e]}" target="_blank"><i class="${o[e]}"></i></a>`}document.getElementsByTagName("body")[0].appendChild(e),e.innerHTML+='<a href="dokumentacija.pdf">Dokumentacija</a><a href="sitemap.xml">Sitemap</a>'}()});