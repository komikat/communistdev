var value = 1;
document.addEventListener("DOMContentLoaded", function (event) {
    document.getElementById("myButton").addEventListener("click", myFunction);
    document.getElementById("openButton").addEventListener("click", myFunction2);
    document.getElementById("removeButton").addEventListener("click", myFunction3);
    document.getElementById("removePrevious").addEventListener("click", myFunction4);


    function myFunction() {

        chrome.storage.sync.get({
                list: [''], 
            },
            function (data) {
                update(data.list); 
            }
        );

        function update(array) {

            chrome.tabs.query({
                'active': true,
                'lastFocusedWindow': true
            }, function (tabs) {
                let url = tabs[0].url;
                array.push(url);
                chrome.storage.sync.set({
                    list: array
                }, function () {
                    console.log("added to list with new values");
                    alert('Added!')
                });
            });




            

        }



    }

    function myFunction2() {

        chrome.storage.sync.get({
                list: [], 
            },
            function (data) {
               
                var array = data.list

                var newURL = "http://stackoverflow.com/";
                for (let index = 1; index < array.length; index++) {

                    chrome.tabs.create({
                        url: array[index]
                    });

                }


            }
        );

    }

    function myFunction3() {
        chrome.storage.sync.clear()
    }

    function myFunction4() {

        chrome.storage.sync.get({
                list: [''], 
            },
            function (data) {
                update2(data.list); 
            }
        );

        function update2(array) {


            array.splice(array.length - 1, 1);
            chrome.storage.sync.set({
                list: array
            }, function () {
                console.log("added to list with new values");
            });





        }

    }

});