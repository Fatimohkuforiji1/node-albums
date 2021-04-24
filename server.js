const express = require("express");
const albumsData = require("./AlbumsData")
const bodyParser = require("body-parser");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 4000;


app.get("/albums", (req, res) => {

  res.send(albumsData["albumsData"]);
});

app.get("/albums/:albumId", (req, res)=>{
  // req.params.albumId will match the value in the url after /albums/
  const albumIdSearch = req.params.albumId;
  const albumsFiltered = albumsData["albumsData"].find((albumFilter) => {
    if (albumFilter["albumId"] === albumIdSearch) {
      return albumFilter;
    }
  });

  if(albumsFiltered){
      res.send(albumsFiltered);
  } else {
      res.status(404); //Not found
      res.send ("Album not found")
  }
 });


app.post("/albums", (req, res) => {
    console.log("POST / albums route")
    albumsData.albumsData.push(req.body)
   res.send(albumsData);

});

// notice .delete
app.delete("/albums/:albumID", function (req, res) {
  const albumIdSearch = req.params.albumID;
  console.log("DELETE /albums route");

  const albumIndex = albumsData.albumsData.findIndex((element)=>{
    return element.albumId === albumIdSearch
  })
  albumsData.albumsData.splice(albumIndex, 1)
  res.send(204);
});

app.put("/albums/:Id", (req, res) => {
  const putAlbum = req.params.Id 
  console.log("PUT/ albums route");
const albumIndex = albumsData.albumsData.findIndex((element)=>{
    return element.albumId === putAlbum
  })
  albumsData.albumsData.splice(albumIndex, 1, {...albumsData.albumsData[albumIndex], 
    ...req.body})
  res.send("Ok");
});


app.listen(PORT, ()=>{
    console.log(`Fatimoh is coding on ${PORT}`)
})




// app.get("/albums/:albumIdFind", (req, res) => {
//   // req.params.albumId will match the value in the url after /albums/
//   const Id = req.params.albumIdFind;
//   console.log(Id)
//   const albumsFind = albumsData["albumsData"].find((albumFind) => {
//    return albumFind["albumId"] 
//     })
//     res.send(albumsFind);
//   });
  
 