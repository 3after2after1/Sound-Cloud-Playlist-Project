async function asyncCall() {
  await new Promise(r => setTimeout(r, 500));
  // expected output: 'resolved'
}

/* Extra: Reset */


/* 1. Search */  

var UI = {};

UI.EnterKey = function(){
    document.querySelector(".js-search").addEventListener('keyup', function(e){
    var input = document.querySelector("input").value;
    //if key enter is pressed ...
    if (e.which === 13){
      console.log(input)
      SoundCloudAPI.getTrack(input);
    }   
});
};
UI.EnterKey();


UI.SubmitClick = function(){
    document.querySelector(".js-submit").addEventListener('click', function(){
    
    var input = document.querySelector("input").value;
    console.log(input);
    SoundCloudAPI.init();
    SoundCloudAPI.getTrack(input);
});
};
UI.SubmitClick();


UI.resetClick = function(){
    document.querySelector(".js-reset").addEventListener('click', function(){
    
      var sideBar = document.querySelector(".js-playlist");
      sideBar.innerHTML = localStorage.clear();
      // var input = document.querySelector("input").value;
      // console.log(input);
      // SoundCloudAPI.init();
      // SoundCloudAPI.getTrack(input);
});
};

UI.resetClick();
/* 2. Query soundcloud API */


var SoundCloudAPI = {};


SoundCloudAPI.init = function(){
  SC.initialize({
    client_id: 'cd9be64eeb32d1741c17cb39e41d254d'
  });
  
}

SoundCloudAPI.init();

SoundCloudAPI.getTrack = function(inputValue){
// find all sounds of buskers licensed under 'creative commons share alike'
    SC.get('/tracks', {
      q: inputValue
    }).then(function(tracks) {
      console.log(tracks);
      SoundCloudAPI.renderTracks(tracks);
    });
}

// SoundCloudAPI.getTrack("Rilo Key");

/* 3. Dsiplay the cards */  
SoundCloudAPI.renderTracks = function(tracks){
  
   var searchResults = document.querySelector(".js-search-results");
   searchResults.innerHTML = "";

   tracks.forEach(function(track) {
      var card  = document.createElement("div");
      card.classList.add("card");
  
      //image
      var imageDiv = document.createElement("div");
      imageDiv.classList.add("image");

      asyncCall();
      var image_img = document.createElement("img");
      image_img.classList.add("image_img");

      image_img.src = track.artwork_url || 'http://lorempixel.com/200/200/abstract/';
      imageDiv.appendChild(image_img);
  
      //content
      var content = document.createElement("div");
      content.classList.add("content");
      
      var header = document.createElement("div");
      header.classList.add("header");
      header.innerHTML = '<a href="' + track.permalink_url + '" target="_blank">' + track.title + '</a>';
  
      //button
      var button = document.createElement("div");
      button.classList.add("ui-bottom", "attached", "button" , "js-button");
  
      var icon = document.createElement('i');
      icon.classList.add("add","icon");
  
      var buttonText = document.createElement('span');
      buttonText.innerHTML = '<a href="' + "#" + '" target="_self">' + 'Add to playlist' + '</a>';
      buttonText.firstChild.classList.add("plus");
  
      //appendChild
      content.appendChild(header);
      
      button.appendChild(icon);
      button.appendChild(buttonText);

      button.addEventListener('click', function(){
        SoundCloudAPI.getEmbed(track.permalink_url);
      });
  
      card.appendChild(imageDiv);
      card.appendChild(content);
      card.appendChild(button);
  
      var searchResults = document.querySelector(".js-search-results");
      searchResults.appendChild(card);
      
   });
  //card
   
}

/* 4. Add to playlist and play */  

SoundCloudAPI.getEmbed = function(trackURL){
  SC.oEmbed(trackURL, {
    auto_play: true
  }).then(function(embed){
    // console.log('oEmbed response: ', embed);
  
    var sideBar = document.querySelector(".js-playlist");
    
    var box = document.createElement('div');
    box.innerHTML = embed.html;
    sideBar.insertBefore(box, sideBar.firstChild);
    localStorage.setItem("key", sideBar.innerHTML);
    
  
  });
}


var sideBar = document.querySelector(".js-playlist");
sideBar.innerHTML = localStorage.getItem("key");

