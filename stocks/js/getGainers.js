let gainer_list;

document.addEventListener('DOMContentLoaded', () => {

    document.getElementById("gainers").addEventListener('click', () => {
        var list = document.getElementsByTagName("UL")[0];
        var items = list.getElementsByTagName("li");
    
        for (var i = 0; i < items.length; i++) {
            if(items[i].classList.contains("active")) {
                items[i].classList.remove('active');
            }
        }
        document.getElementById("gainers").classList.add("active");
        document.getElementById("title").innerHTML = "Most Gained";
        document.getElementById("search").value = "";
        createSortOption('gain');


        document.getElementById("getAllCards").innerHTML = '';
        document.getElementById("getAllCards").appendChild(getGainer('https://financialmodelingprep.com/api/v3/stock/gainers'));
    })

    function getGainer(url) {

        let symbols_text = do_request(url);
        gainer_list = JSON.parse(symbols_text.responseText).mostGainerStock;
        createSortOption('gain');
        return render_activity(gainer_list);
    }
})
