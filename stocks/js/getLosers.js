let loser_list;

document.addEventListener('DOMContentLoaded', () => {

    document.getElementById("losers").addEventListener('click', () => {
        var list = document.getElementsByTagName("UL")[0];
        var items = list.getElementsByTagName("li");
    
        for (var i = 0; i < items.length; i++) {
            if(items[i].classList.contains("active")) {
                items[i].classList.remove('active');
            }
        }
        document.getElementById("losers").classList.add("active");
        document.getElementById("title").innerHTML = "Most Lost";
        document.getElementById("search").value = "";
        createSortOption('loser');

        document.getElementById("getAllCards").innerHTML = '';
        document.getElementById("getAllCards").appendChild(getLoser('https://financialmodelingprep.com/api/v3/stock/losers'));
    })

    function getLoser(url) {

        let symbols_text = do_request(url);
        loser_list = JSON.parse(symbols_text.responseText).mostLoserStock;
        createSortOption('loser');

        return render_activity(loser_list);
    }

})
