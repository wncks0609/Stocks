document.addEventListener('DOMContentLoaded', () => {

    document.getElementById("sort").addEventListener('change', sortList);

    function sortList() {
        let tab_list = document.getElementsByTagName("li");
        let sortBy = document.getElementById("sort").value;
        let current_tab;

        for(let i = 0; i < tab_list.length; i++) {
            if(tab_list[i].classList.contains("active")) {
                current_tab = tab_list[i].id;
                break;
            }
        }
        
        switch (current_tab) {
            case "all": 
                sort_symbol(symbols_list, sortBy);
                break;
            case "actives":
                sort_activity(active_list, sortBy);
                break;
            case "gainers":
                sort_activity(gainer_list, sortBy);
                break;
            case "losers" : 
                sort_activity(loser_list, sortBy);
            break;
            default:
                break;
        }
    }

    function sort_symbol(list, sortBy) {
        sorted_list = list;
        switch (sortBy) {
            case "h_price":
                sorted_list.sort(compare_all_h_price);
                sorted_all = true;
                document.getElementById("getAllCards").innerHTML = '';
                document.getElementById("getAllCards").appendChild(render_cards(sorted_list));
                break;
            case "l_price":
                sorted_list.sort(compare_all_l_price);
                sorted_all = true;
                document.getElementById("getAllCards").innerHTML = '';
                document.getElementById("getAllCards").appendChild(render_cards(sorted_list));
                break;
            case "i_name":
                sorted_list.sort(compare_all_i_name);
                sorted_all = true;
                document.getElementById("getAllCards").innerHTML = '';
                document.getElementById("getAllCards").appendChild(render_cards(sorted_list));
                break;
            case "c_name":
                sorted_list.sort(compare_all_c_name);
                sorted_all = true;
                document.getElementById("getAllCards").innerHTML = '';
                document.getElementById("getAllCards").appendChild(render_cards(sorted_list));
                break;
            case "e_name":
                sorted_list.sort(compare_all_e_name);
                sorted_all = true;
                document.getElementById("getAllCards").innerHTML = '';
                document.getElementById("getAllCards").appendChild(render_cards(sorted_list));
                break;
            default : 
                sorted_all = false;
                document.getElementById("getAllCards").innerHTML = '';
                document.getElementById("getAllCards").appendChild(render_cards(list));
        }
    }

    function compare_all_h_price(a,b) {
        if (a.price < b.price) {
            return 1;
        } else {
            return -1;
        }
    }
    function compare_all_l_price(a,b) {
        if (a.price > b.price) {
            return 1;
        } else {
            return -1;
        }
    }
    function compare_all_i_name(a,b) {
        if(a.symbol.toUpperCase() > b.symbol.toUpperCase()) {
            return 1;
        } else {
            return -1;
        }
    }
    function compare_all_c_name(a,b) {
        if(a.name && b.name) {
            if(a.name.toUpperCase() > b.name.toUpperCase()) {
                return 1;
            } else {
                return -1;
            }
        }
        return 1;
       
    }
    function compare_all_e_name(a,b) {
        if(a.exchange && b.exchange) {
            if(a.exchange.toUpperCase() > b.exchange.toUpperCase()) {
                return 1;
            } else {
                return -1;
            }
        }
        return 1;
    }

    function sort_activity(list, sortBy) {

        switch (sortBy) {
            case "h_price":
                list.sort(compare_activity_h_price);
                document.getElementById("getAllCards").innerHTML = '';
                document.getElementById("getAllCards").appendChild(render_activity(list));
                break;
            case "l_price":
                list.sort(compare_activity_l_price);
                document.getElementById("getAllCards").innerHTML = '';
                document.getElementById("getAllCards").appendChild(render_activity(list));
                break;
            case "i_name":
                list.sort(compare_activity_i_name);
                document.getElementById("getAllCards").innerHTML = '';
                document.getElementById("getAllCards").appendChild(render_activity(list));
                break;
            case "c_name":
                list.sort(compare_activity_c_name);
                document.getElementById("getAllCards").innerHTML = '';
                document.getElementById("getAllCards").appendChild(render_activity(list));
                break;
            case "h_change":
                list.sort(compare_activity_h_change);
                document.getElementById("getAllCards").innerHTML = '';
                document.getElementById("getAllCards").appendChild(render_activity(list));
                break;
            case "l_change":
                list.sort(compare_activity_l_change);
                document.getElementById("getAllCards").innerHTML = '';
                document.getElementById("getAllCards").appendChild(render_activity(list));
                break;
            default : 
                document.getElementById("getAllCards").innerHTML = '';
                document.getElementById("getAllCards").appendChild(render_activity(list));
        }
    }

    function compare_activity_h_price(a,b) {
        if(Number(a.price) < Number(b.price)) {
            return 1;
        } else {
            return -1;
        }
    }
    function compare_activity_l_price(a,b) {
        if(Number(a.price) > Number(b.price)) {
            return 1;
        } else {
            return -1;
        }
    }
    function compare_activity_i_name(a,b) {
        if(a.ticker.toUpperCase() > b.ticker.toUpperCase()) {
            return 1;
        } else {
            return -1;
        }
    }
    function compare_activity_c_name(a,b) {
        if(a.companyName && b.companyName) {
            if(a.companyName.toUpperCase() > b.companyName.toUpperCase()) {
                return 1;
            } else {
                return -1;
            }
        }
        return 1;
        
    }
    function compare_activity_h_change(a,b) {
        if(a.change < b.change) {
            return 1;
        } else {
            return -1;
        }
    }
    function compare_activity_l_change(a,b) {
        if(a.change < b.change) {
            return 1;
        } else {
            return -1;
        }
    }

});