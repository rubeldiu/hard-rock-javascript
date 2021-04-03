const searchSongs= async()=>{
    const searchText=document.getElementById('search-field').value;
    toggleSpinner();
    const url=`https://api.lyrics.ovh/suggest/${searchText}`;
     const res= await fetch(url);
     const data=await res.json();
     displaySongs(data.data);
     
}

 document.getElementById('search-field')
.addEventListener("keypress", function(event) {   
   if (event.key === 'Enter') {
       document.getElementById("search-button").click();
    }
 });

const displaySongs=songs=>{
    const songContainer=document.getElementById('song-container');
    songContainer.innerHTML="";
    songs.map(song=>{
        //console.log(song);
        const songDiv =document.createElement('div');
        songDiv.className='single-result row align-items-center my-3 p-3';
        songDiv.innerHTML=`
            <div class="col-md-9">
                <h3 class="lyrics-name">${song.title}</h3>
                <p class="author lead">Album by <span>${song.artist.name}</span></p>
                <audio controls>
                  <source src="${song.preview}" type="audio/mpeg">
                </audio>
            </div>
            <div class="col-md-3 text-md-right text-center">
                <button onclick="getLyric('${song.artist.name}','${song.title}')" class="btn btn-success">Get Lyrics</button>
            </div>
        `;
        songContainer.appendChild(songDiv);
        toggleSpinner();
    })
}

const getLyric= async(artist,title)=>{
    //console.log(artist,title);
    
    const url=`https://api.lyrics.ovh/v1/${artist}/${title}`;

    try {
        const res=await fetch(url);
        const data= await res.json();
        displayLyrics(data.lyrics);
        
    } catch (error) {
        displayError('Something Went Wrong!!!');
    }
    
    // fetch(url)
    //   .then(res=>res.json())
    //   .then(data=>displayLyrics(data.lyrics))
    //   .catch(error=>displayError('Something Went Wrong!!!'))
}

const displayLyrics=lyrics=>{
    const songLyrics=document.getElementById('song-lyrics');
    songLyrics.innerText=lyrics;
}

const displayError = error =>{
    console.log(error);
    const errorTag = document.getElementById('error-message');
    errorTag.innerText = error;
    
}

const toggleSpinner=(show)=>{
    const spinner=document.getElementById("loadingSpinner");
    const song=document.getElementById("song-container");
    spinner.classList.toggle('d-none');
    song.classList.toggle('d-none');
    // if(show){
    //     spinner.classList.remove('d-none');
    // }else{
    //     spinner.classList.add('d-none');
    // }
    

    
}