let symbols_list;
let symbols_index = 0;

document.addEventListener('DOMContentLoaded', () => {


    document.getElementById("header").innerHTML = getHeader();
    document.getElementById("search_box").innerHTML = getSearchBox();
    document.getElementById("footer").innerHTML = getFooter();

    document.getElementById("title").innerHTML = "All Stocks"

    document.getElementById("getAllCards").appendChild(getAllCards('https://financialmodelingprep.com/api/v3/company/stock/list'));

    let elems = document.querySelectorAll('.autocomplete');
    let options = createOptions(symbols_list);
    let instances = M.Autocomplete.init(elems, options);

    document.getElementById("loadMore").addEventListener("click", loadMore);

    document.getElementById("all").addEventListener('click', () => {
        var list = document.getElementsByTagName("UL")[0];
        var items = list.getElementsByTagName("li");
    
        for (var i = 0; i < items.length; ++i) {
            if(items[i].classList.contains("active")) {
                items[i].classList.remove('active');
            }
        }
        document.getElementById("all").classList.add("active");
        document.getElementById("title").innerHTML = "All Stock";

        document.getElementById("getAllCards").innerHTML = '';
        document.getElementById("getAllCards").appendChild(render_cards(symbols_list));
    })

    function getHeader() {
        let header = new XMLHttpRequest();

        header.open("GET", "html/header.html", false);
        header.send(); 

        return header.responseText;        
    }

    function getSearchBox() {
        let search_box = new XMLHttpRequest();

        search_box.open("GET", "html/searchbox.html", false);
        search_box.send(); 

        return search_box.responseText;   
    }
    
    function getFooter() {
        let search_box = new XMLHttpRequest();

        search_box.open("GET", "html/footer.html", false);
        search_box.send(); 

        return search_box.responseText;   
    }

    function render_cards(list) {

        let card_lists = document.createElement("div");
        card_lists.id="card_container";
        card_lists.style.display = "grid";
        card_lists.style.gridTemplateColumns = "auto auto auto";

        for(let i = 0; i < 30; i++) {

            symbols_index++;

            let card = document.createElement("div");
            card.classList = "card";
            card.style.width = "350px";
            card.style.margin = ".5rem 1rem 1rem 0";
    
            let card_content = document.createElement("div");
            card_content.classList = "card-content";
    
            let p_tag = document.createElement("p");
            p_tag.innerHTML = "Company Initial : " + list[i].symbol + "<br>" + "Company name : " + list[i].name + "<br>" + "Stock Price : " + list[i].price + "<br>" + "Exchange : " + list[i].exchange ;
    
            card_content.appendChild(p_tag);
            card.appendChild(card_content);
            card_lists.appendChild(card);
        }

        let more = document.createElement("div");
        more.id ="load_card"
        more.classList = "card";
        more.style.width = "350px";

        let more_content = document.createElement("div");
        more_content.classList = "card-content";
        more_content.style.display = "grid";
        more_content.style.gridTemplateColumns = "auto auto";

        let a_tag = document.createElement("a");
        a_tag.classList = "btn-floating btn-large waves-effect waves-light red";
        a_tag.id = "loadMore";

        let p_tag = document.createElement("p");
        p_tag.innerHTML = "Load More";

        let i_tag = document.createElement("i");
        i_tag.classList = "material-icons";
        i_tag.innerHTML = "add";

        a_tag.appendChild(i_tag);
        more_content.appendChild(a_tag);
        more_content.appendChild(p_tag);
        more.appendChild(more_content);
        card_lists.appendChild(more);

        return card_lists;
    }

    function getAllCards(url) {

        let symbols_text = getAllCards_resquest(url);
        symbols_list = JSON.parse(symbols_text.responseText).symbolsList;

        return render_cards(symbols_list);
    }

    function getAllCards_resquest(url) {

        let request = new XMLHttpRequest();

        if(!request) {
            alert("Cannot bring information.");
        }

        request.open("GET", url, false);
        request.send(null);
        return request;
    }

    function createOptions(list) {
        let option = new Object();
        option.data = new Object();
        option.limit = 5;
        for(let i = 0; i < list.length; i++) {
            option.data[list[i].name] = null;
        }
        return option;
    }

    function loadMore() {
        let loadMore = document.getElementById("load_card");

        let length = symbols_index;

        let parent = document.getElementById("card_container");

        for(let i = length; i < length+30; i++) {

            symbols_index++;

            let card = document.createElement("div");
            card.classList = "card";
            card.style.width = "350px";
            card.style.margin = ".5rem 1rem 1rem 0";

            let card_content = document.createElement("div");
            card_content.classList = "card-content";

            let p_tag = document.createElement("p");
            p_tag.innerHTML = "Company Initial : " + symbols_list[i].symbol + "<br>" + "Company name : " + symbols_list[i].name + "<br>" + "Stock Price : " + symbols_list[i].price + "<br>" + "Exchange : " + symbols_list[i].exchange ;

            card_content.appendChild(p_tag);
            card.appendChild(card_content);
            parent.insertBefore(card,loadMore);
        }


    }

})

