class mapManager{
    searchManager;
    shopLocation;
    map;
    constructor() {
        this.ajaxWrapper = new AjaxWrapper();
        this.cache = {};
    }
}

const manager = new mapManager();

async function getMap() {

    manager.map = new Microsoft.Maps.Map('#map', {
        credentials: (await fetch(`${manager.ajaxWrapper.baseUrl}/map/getAPIKey`).then(response => response.text())).replace(/"/g, ''),
    });

    const locationButtons = document.querySelectorAll('.location_btn');
    locationButtons.forEach(button => {
        button.addEventListener('click', async () => {
            manager.map.entities.clear();
            const location = button.getAttribute('data-location');
            try {

                if (!manager.cache[location]) {
                    manager.shopLocation = await manager.ajaxWrapper.getMapData(location);
                    manager.cache[location] = manager.shopLocation;
                }

            } catch (err) {
                console.log('Error when fetching shopLocation from DB: ', err);
            }
            geocodeQuery(location);
        });
    });
}

function geocodeQuery(query) {
    if (!manager.searchManager) {
        Microsoft.Maps.loadModule('Microsoft.Maps.Search', function () {
            manager.searchManager = new Microsoft.Maps.Search.SearchManager(manager.map);
            geocodeQuery(query);
        });
    } else {
        let searchRequest = {
            where: query,
            callback: function (r) {
                if (r && r.results && r.results.length > 0) {
                    var pin = new Microsoft.Maps.Pushpin(manager.cache[query]);
                    manager.map.entities.push(pin);

                    manager.map.setView({ bounds: r.results[0].bestView });
                }
            },
            errorCallback: function (e) {
                alert("No results found.");
            }
        };
        manager.searchManager.geocode(searchRequest);
    }
}
