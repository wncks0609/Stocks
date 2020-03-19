let active_list;
let active_index = 0;

document.addEventListener('DOMContentLoaded', () => {

    document.getElementById("actives").addEventListener('click', () => {
        var list = document.getElementsByTagName("UL")[0];
        var items = list.getElementsByTagName("li");
    
        for (var i = 0; i < items.length; ++i) {
            if(items[i].classList.contains("active")) {
                items[i].classList.remove('active');
            }
        }
        document.getElementById("actives").classList.add("active");
        document.getElementById("title").innerHTML = "Most Actives";

        document.getElementById("getAllCards").innerHTML = '';
        document.getElementById("getAllCards").appendChild(getActives('https://financialmodelingprep.com/api/v3/stock/actives'));
    })

    function getActives(url) {

        let symbols_text = getActives_resquest(url);
        active_list = JSON.parse(symbols_text.responseText).mostActiveStock;


        let card_lists = document.createElement("div");
        card_lists.id="card_container";
        card_lists.style.display = "grid";
        card_lists.style.gridTemplateColumns = "auto auto";

        for(let i = 0; i < active_list.length; i++) {

            active_index++;

            let card = document.createElement("div");
            card.classList = "card horizontal";
            card.style.width = "500px";
            card.style.margin = ".5rem 1rem 1rem 0";

            let card_image = document.createElement("div");
            card_image.classList = "card-image";



            let image = document.createElement("img");
            image.src = (active_list[i].changes > 0 ? "img/growth.png": "img/down.png" ); 
            image.style.paddingTop = "30px";
            image.style.paddingLeft = "30px";
            image.style.paddingBottom = "30px";
            image.style.maxWidth = "80%";
            card_image.appendChild(image);

            let card_stacked = document.createElement("div");
            card_stacked.classList = "card-stacked";

            let card_content = document.createElement("div");
            card_content.classList = "card-content";

            let p_tag = document.createElement("p");
            p_tag.innerHTML = "<strong>"+active_list[i].companyName + "</strong><br>" + (active_list[i].changes > 0 ? "Up Amount : ": "Down Amount : " ) + active_list[i].changes  +" "+  active_list[i].changesPercentage +"<br>" + "Current Price : " + active_list[i].price + "<br>" ;
    
            card_content.appendChild(p_tag);
            card_stacked.appendChild(card_content);
            card.appendChild(card_image);
            card.appendChild(card_stacked);
            card_lists.appendChild(card);
        }

        return card_lists;
    }

    function getActives_resquest(url) {

        let request = new XMLHttpRequest();

        if(!request) {
            alert("Cannot bring information.");
        }

        request.open("GET", url, false);
        request.send(null);
        return request;
    }
})