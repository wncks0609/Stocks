let userInput_flag = false;
let income_chart, income, balance, balance_chart;

document.addEventListener('DOMContentLoaded', () => {

    document.getElementById("search").addEventListener('keydown', event => {
        if(event.key === "Enter") {
            getSearch();
        }
    })
    document.getElementById("search").addEventListener('change', getSearch);

    function getSearch() {
        if(userInput_flag) {
            userInput_flag = false;
            let input = document.getElementById("search").value;
            let symbol = symbols_list.find(x=> x.name === input);

            document.getElementById("search").value = "";

            if(!symbol) {
                document.getElementById("title").innerHTML = "Sorry! Could not find about " +input;
            } else {
                
                var list = document.getElementsByTagName("UL")[0];
                var items = list.getElementsByTagName("li");
            
                for (var i = 0; i < items.length; i++) {
                    if(items[i].classList.contains("active")) {
                        items[i].classList.remove('active');
                    }
                }
                document.getElementById("all").classList.add("active");
                document.getElementById("title").innerHTML = input;

                document.getElementById("getAllCards").innerHTML = getTabs();
                
                var tabs = document.querySelectorAll('.tabs')
                for (var i = 0; i < tabs.length; i++){
                    M.Tabs.init(tabs[i]);
                }
                var element = document.querySelectorAll('select');
                M.FormSelect.init(element);
                document.getElementById("income_chart").addEventListener('change', update_income_Chart);
                document.getElementById("balance_chart").addEventListener('change', update_balance_Chart);

                let profile_text = getProfile(symbol.symbol);
                let profile = JSON.parse(profile_text.responseText);
                loadProfile(profile);

                let income_text = getIncome(symbol.symbol);
                income = JSON.parse(income_text.responseText);
                loadIncome(income);

                let balance_text = getbalance(symbol.symbol);
                balance = JSON.parse(balance_text.responseText);
                loadbalance(balance);

            }
        } else {
            userInput_flag = true;
        }
    }

    function getTabs() {
        let header = new XMLHttpRequest();

        header.open("GET", "html/tabs.html", false);
        header.send(); 

        return header.responseText;    
    }

    function getProfile(symbol) {
        let url = "https://financialmodelingprep.com/api/v3/company/profile/"+symbol;
        let request = new XMLHttpRequest();

        if(!request) {
            alert("Cannot bring information.");
        }

        request.open("GET", url, false);
        request.send(null);
        return request;
    }

    function getIncome(symbol) {
        let url = "https://financialmodelingprep.com/api/v3/financials/income-statement/"+symbol+"?period=quarter";
        let request = new XMLHttpRequest();

        if(!request) {
            alert("Cannot bring information.");
        }

        request.open("GET", url, false);
        request.send(null);
        return request;
    } 

    function getbalance(symbol) {
        let url = "https://financialmodelingprep.com/api/v3/financials/balance-sheet-statement/"+symbol+"?period=quarter";
        let request = new XMLHttpRequest();

        if(!request) {
            alert("Cannot bring information.");
        }

        request.open("GET", url, false);
        request.send(null);
        return request;
    }

    function get_income_Object(response) {
        let object = { 
            type: "line", 
            data: { 
                labels: [], 
                datasets : [ 
                    { 
                        label : 'Revenue', 
                        backgroundColor: "rgb(255, 99, 132)", 
                        borderColor: "rgb(255, 99, 132)", 
                        data : []
                    }
                ]
            }, 
            options: {
                scales: {
                    yAxes: [
                        {
                            ticks: {
                                callback: function(label, index, labels) {
                                    return label/1000000+'M';
                                }
                            }
                        }
                    ]
                }
            }
        };

        let i = 0;
        while(i < response.financials.length) {
            object.data.labels.push(response.financials[i].date);
            i++;
        }

        let j = 0;
        while(j < response.financials.length) {
            object.data.datasets[0].data.push(parseFloat(response.financials[j].Revenue));
            j++;
        }
        
        return object;
    }

    function get_balance_Object(response) {
        let object = { 
            type: "line", 
            data: { 
                labels: [], 
                datasets : [ 
                    { 
                        label : 'Cash and cash equivalents', 
                        backgroundColor: "rgb(255, 99, 132)", 
                        borderColor: "rgb(255, 99, 132)", 
                        data : []
                    }
                ]
            }, 
            options: {
                scales: {
                    yAxes: [
                        {
                            ticks: {
                                callback: function(label, index, labels) {
                                    return label/1000000+'M';
                                }
                            }
                        }
                    ]
                }
            }
        };

        let i = 0;
        while(i < response.financials.length) {
            object.data.labels.push(response.financials[i].date);
            i++;
        }

        let j = 0;
        while(j < response.financials.length) {
            object.data.datasets[0].data.push(parseFloat(response.financials[j]['Cash and cash equivalents']));
            j++;
        }
        
        return object;
    }

    function update_income_Chart() {
        let val = document.getElementById("income_chart").value;

        income_chart.data.labels = [];

        let i = 0;
        while(i < income.financials.length) {
            income_chart.data.labels.push(income.financials[i].date);
            i++;
        }

        income_chart.data.datasets[0].label = val;
        income_chart.data.datasets[0].data = [];

        let j = 0;
        while(j < income.financials.length) {
            income_chart.data.datasets[0].data.push(parseFloat(income.financials[j][val]));
            j++;
        }

        income_chart.update();
    }

    function update_balance_Chart() {
        let val = document.getElementById("balance_chart").value;

        balance_chart.data.labels = [];

        let i = 0;
        while(i < balance.financials.length) {
            balance_chart.data.labels.push(balance.financials[i].date);
            i++;
        }

        balance_chart.data.datasets[0].label = val;
        balance_chart.data.datasets[0].data = [];

        let j = 0;
        while(j < balance.financials.length) {
            balance_chart.data.datasets[0].data.push(parseFloat(balance.financials[j][val]));
            j++;
        }

        balance_chart.update();
    }

    function loadProfile(profile) {
        let symbol = profile.symbol;
        let profile_data = profile.profile;

        document.getElementById("image").src = profile_data.image;
        document.getElementById("description").innerHTML = profile_data.description;

        document.getElementById("a_companyName").innerHTML = "<span class='badge'>"+ profile_data.companyName +"</span> Company Name";
        document.getElementById("a_symbol").innerHTML = "<span class='badge'>" + symbol +"</span>Symbol";
        document.getElementById("a_exchange").innerHTML = "<span class='badge'>" + profile_data.exchange +"</span>Exchange";
        document.getElementById("a_industry").innerHTML = "<span class='badge'>" + profile_data.industry +"</span>Industry";
        document.getElementById("a_ceo").innerHTML = "<span class='badge'>" + profile_data.ceo +"</span>CEO";
        document.getElementById("a_price").innerHTML = "<span class='badge'>" + profile_data.price +"</span>Price";
        document.getElementById("a_beta").innerHTML = "<span class='badge'>" + profile_data.beta +"</span>Beta";
        document.getElementById("a_volavg").innerHTML = "<span class='badge'>" + profile_data.volAvg +"</span>Avarage Volumn";
        document.getElementById("a_mkt").innerHTML = "<span class='badge'>" + profile_data.mktCap +"</span>Market Capitality";
        document.getElementById("a_last").innerHTML = "l<span class='badge'>" + profile_data.lastDiv +"</span>ast Div";
        document.getElementById("a_range").innerHTML = "<span class='badge'>" + profile_data.range +"</span>Range";
        document.getElementById("a_changes").innerHTML = "<span class='badge'>" + profile_data.changes +"</span>Changes";
        document.getElementById("a_changesPercentage").innerHTML = "<span class='badge'>" + profile_data.changesPercentage +"</span>Change Percentage";
        document.getElementById("a_sector").innerHTML = "<span class='badge'>" + profile_data.sector +"</span>Sector";
        document.getElementById("a_website").innerHTML = "Click to visit website";
        document.getElementById("a_website").href = profile_data.website;
    }

    function loadIncome(response) {
        var ctx = document.getElementById('income_statement').getContext('2d');

        let option = get_income_Object(response);
        income_chart = new Chart(ctx, option);
    }

    function loadbalance(response) {
        var ctx = document.getElementById('balance_statement').getContext('2d');

        let option = get_balance_Object(response);
        balance_chart = new Chart(ctx, option);
    }
});