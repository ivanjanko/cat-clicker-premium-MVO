/*jshint esversion: 6 */

var model = {
    init: function() {
        this.names = ["Sima", "Pera", "Zuca", "Beli", "Tigar"];
        this.images = ['img/1.jpg', 'img/2.jpg', 'img/3.jpg', 'img/4.jpg', 'img/5.jpg'];
        this.cats = [];
        this.currentCat = null;
        // create cats
        this.names.forEach(catName => model.createCat(catName));
    },
    
    createCat: function(catName) {
        var catIndex = this.names.indexOf(catName);
            var newCat = new Cat(catName, this. images[catIndex]);
            this.cats.push(newCat);
    },
};

// cat class
class Cat {
    constructor(name, image) {
        this.name = name;
        this.image = image;
        this.clicks = 0;
    }
}

var octopus = {
    
    getCatNames: function() {
        return model.names;
    },

    getCats: function() {
        return model.cats;
    },

    getCurrentCat: function() {
        return model.currentCat;
    },

    setCurrentCat: function(cat) {
        model.currentCat = cat;
    },
    displayAdminView: function() {
        adminView.render();
    },
    hideAdminView: function() {
        adminView.adminViewCont.style.display = "none";
    },
    updateCurrentCat: function() {
        model.currentCat.name = adminView.nameInput.value;
        model.currentCat.image = adminView.urlInput.value;
        model.currentCat.clicks = adminView.clicksInput.value;
        catView.render();
    },
    init: function() {
        model.init();
        catList.init();
        catView.init();
        adminView.init();
    }
};

var catList = {
    init: function() {
        this.cats = octopus.getCats();
        catList.render();
    },
    render: function() {
        // create buttons for each cat name add listener and insert in DOM
        this.cats.forEach(cat => createAndInsertButton(cat));
        // create button function
        function createAndInsertButton(cat) {
            var button = document.createElement('button');
            button.addEventListener('click', function() {
                octopus.setCurrentCat(cat);
                catView.render();
            });
            button.innerHTML = cat.name;
            var buttons = document.body.querySelector('#buttons');
            buttons.appendChild(button);
        }
    }
};

var catView = {
    init: function() {
        // grab elements
        this.nameElement = document.getElementById('name');
        this.imageElement = document.getElementById('image');
        this.clicksElement = document.querySelector('.clicks');
        this.catElement = document.querySelector('content');
        
        // set event listener on image element
        this.imageElement.addEventListener('click', function() {
            catView.currentCat.clicks++;
            // update click text
            catView.clicksElement.innerHTML = `${catView.currentCat.clicks} cat click`;
        });
    },
    render: function(){
        // get current cat
        this.currentCat = octopus.getCurrentCat();
        // console.log(currentCat);
        // insert values in to the elements
        this.nameElement.innerText = this.currentCat.name;
        this.imageElement.src = this.currentCat.image;
        this.clicksElement.innerHTML = `${this.currentCat.clicks} cat clicks`;

        // make content visible
        this.catElement.style.display = "block";
    }
};
var adminView = {
    init: function() {
        // grab elements
        this.adminButton = document.getElementById('adminButt');
        this.adminViewCont = document.getElementById('admin_view');
        this.adCancelButt = document.getElementById('cancel');
        this.adSaveButt = document.getElementById('save');
        // grab input filed
        this.nameInput = document.getElementById('admin_name');
        this.urlInput = document.getElementById('admin_image');
        this.clicksInput = document.getElementById('admin_clicks');
        
        // set event listener on admin button
        this.adminButton.addEventListener('click', function() {
            octopus.displayAdminView();
        });
        // set event listener on cancel button
        this.adCancelButt.addEventListener('click', function() {
            octopus.hideAdminView();
        });
        // set event listener on save button
        this.adSaveButt.addEventListener('click', function() {
            octopus.updateCurrentCat();
        });
    },
    render: function(){
        /// make content visible
        this.adminViewCont.style.display = "block";
    }
};

octopus.init();