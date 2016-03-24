var catData =  [ {name: 'Toby',   imgSrc: 'img/1413379559_412a540d29_z.jpg', imgAttribution: 'https://www.flickr.com/photos', clickCount: 0, nicknames: ['Bert', 'Betty'] },
                 {name: 'Gob',    imgSrc: 'img/4154543904_6e2428c421_z.jpg', imgAttribution: 'https://www.flickr.com/photos', clickCount: 0, nicknames: ['Apple'] },
                 {name: 'Tammy',  imgSrc: 'img/9648464288_2516b35537_z.jpg', imgAttribution: 'https://www.flickr.com/photos', clickCount: 0, nicknames: ['Orange'] },
                 {name: 'Angle',  imgSrc: 'img/22252709_010df3379e_z.jpg', imgAttribution: 'https://www.flickr.com/photos', clickCount: 0, nicknames: ['Sammy'] },
                 {name: 'Strip',  imgSrc: 'img/434164568_fea0ad4013_z.jpg', imgAttribution: 'https://www.flickr.com/photos', clickCount: 0, nicknames: ['Dirty'] }
              ];

var Cat = function(data) {
  this.name = ko.observable(data.name);
  this.clickCount = ko.observable(data.clickCount);
  this.imgSrc = ko.observable(data.imgSrc);
  this.imgAttribution = ko.observable(data.imgAttribution);
  this.nicknames = ko.observableArray(data.nicknames);

  this.level = ko.computed(function() {
    if (this.clickCount() < 10) {return "baby"}
    else if (this.clickCount() < 30) {return "child"}
    else {return "adult"};
  }, this);

}
 
var ViewModel = function() {
  var self = this;

  this.catList = ko.observableArray([]);

  catData.forEach(function(catItem){
    self.catList.push( new Cat(catItem) );
  });

  this.currentCat = ko.observable(this.catList()[0] );

  this.incrementCounter = function() {
    self.currentCat().clickCount(self.currentCat().clickCount() + 1);
  };

  this.switchCat = function(clickedCat) {
    self.currentCat(clickedCat); 
  };

};

ko.applyBindings(new ViewModel());
