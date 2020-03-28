let symbols_list;
let sorted_list;
let sorted_all = false;
let symbols_index = 0;

document.addEventListener('DOMContentLoaded', () => {


    document.getElementById("header").innerHTML = do_request("html/header.html").responseText;
    document.getElementById("search_box").innerHTML = do_request("html/searchbox.html").responseText;
    document.getElementById("footer").innerHTML = do_request("html/footer.html").responseText;
    document.getElementById("sort_box").innerHTML = do_request("html/sort.html").responseText;

    document.getElementById("title").innerHTML = "All Stocks"

    document.getElementById("getAllCards").appendChild(getAllCards('https://financialmodelingprep.com/api/v3/company/stock/list'));

    document.getElementById("loadMore").addEventListener("click", loadMore);

    document.getElementById("all").addEventListener('click', () => {
        var list = document.getElementsByTagName("UL")[0];
        var items = list.getElementsByTagName("li");
    
        for (var i = 0; i < items.length; i++) {
            if(items[i].classList.contains("active")) {
                items[i].classList.remove('active');
            }
        }
        document.getElementById("all").classList.add("active");
        document.getElementById("title").innerHTML = "All Stock";
        document.getElementById("search").value = "";

        createSortOption('all');

        document.getElementById("getAllCards").innerHTML = '';
        document.getElementById("getAllCards").appendChild(render_cards(symbols_list));
    })
   
    function getAllCards(url) {

        let symbols_text = do_request(url);
        symbols_list = JSON.parse(symbols_text.responseText).symbolsList;

        let elems = document.querySelectorAll('.autocomplete');
        let options = createOptions(symbols_list);
        let instances = M.Autocomplete.init(elems, options);

        createSortOption('all');

        return render_cards(symbols_list);
    }

    function createOptions(list) {
        let option = new Object();
        option.data = new Object();
        option.limit = 5;

        let i = 0; 
        while(i < list.length) {
            option.data[list[i].name] = null;
            i++;
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
            if(!sorted_all) {
                p_tag.innerHTML = "Company Initial : " + symbols_list[i].symbol + "<br>" + "Company name : " + symbols_list[i].name + "<br>" + "Stock Price : " + symbols_list[i].price + "<br>" + "Exchange : " + symbols_list[i].exchange ;
            } else {
                p_tag.innerHTML = "Company Initial : " + sorted_list[i].symbol + "<br>" + "Company name : " + sorted_list[i].name + "<br>" + "Stock Price : " + sorted_list[i].price + "<br>" + "Exchange : " + sorted_list[i].exchange ;

            }

            card_content.appendChild(p_tag);
            card.appendChild(card_content);
            parent.insertBefore(card,loadMore);
        }
    }

})
function removeOptions(selectElement) {
    var i, L = selectElement.options.length - 1;
    for(i = L; i > 2; i--) {
       selectElement.remove(i);
    }
 }

function createSortOption(type) {
    var select = document.getElementById("sort");
    let select_box = document.getElementById("sort_box");
    select_box.style.display = 'block';

    if(type == 'all') {
        
        removeOptions(select);        

        var option = document.createElement("option");
        option.text = "Initial Name";
        option.value = "i_name";
        select.appendChild(option);

        var option = document.createElement("option");
        option.text = "Company Name";
        option.value = "c_name";
        select.appendChild(option);

        var option = document.createElement("option");
        option.text = "Exchange Name";
        option.value = "e_name";
        select.appendChild(option);
    } else if(type == "hide") {
        select_box.style.display = 'none';
    } else {
        removeOptions(select);        

        var option = document.createElement("option");
        option.text = "Most Changes";
        option.value = "h_change";
        select.appendChild(option);

        var option = document.createElement("option");
        option.text = "Least Changes";
        option.value = "l_change";
        select.appendChild(option);

        var option = document.createElement("option");
        option.text = "Initial Name";
        option.value = "i_name";
        select.appendChild(option);


        var option = document.createElement("option");
        option.text = "Company Name";
        option.value = "c_name";
        select.appendChild(option);
    }


    var element = document.querySelectorAll('select');
    M.FormSelect.init(element);
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

function do_request(url) {

    let request = new XMLHttpRequest();

    if(!request) {
        alert("Cannot bring information.");
    }

    request.open("GET", url, false);
    request.send(null);
    return request;
}