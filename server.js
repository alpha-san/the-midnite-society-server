const express = require('express');
const app = express();

const ArtistAPI = {
    artists: [
        { id: 1, name: "allanxaesthetics", soundcloudLink: "soundcloud.com/kurenobeats" },
        { id: 2, name: "Dark Fade Ricochet", soundcloudLink: "soundcloud.com/dfr" },
        { id: 3, name: "Pyrex Vuitton", soundcloudLink: "soundcloud.com/pv" },
        { id: 4, name: "DPIH", soundcloudLink: "soundcloud.com/dpih" },
        { id: 5, name: "Yun J", soundcloudLink: "soundcloud.com/yunj" },
        { id: 6, name: "KC", soundcloudLink: "soundcloud.com/KC" }
    ],
    all: function() { return this.artists },
    get: function(id) { 
        const isArtist = a => a.id === id;
        return this.artists.find(isArtist);
    }
};

const BlogAPI = {
    blogposts: [
        { id: 1, title: "My New Blog", author: "allanxaesthetics", date: "8/7/17", content: "Lorem Khaled Ipsum is a major key to success. In life you have to take the trash out, if you have trash in your life, take it out, throw it away, get rid of it, major key. A major key, never panic. Don’t panic, when it gets crazy and rough, don’t panic, stay calm. Life is what you make it, so let’s make it. You see that bamboo behind me though, you see that bamboo? Ain’t nothin’ like bamboo. Bless up. In life there will be road blocks but we will over come it. Hammock talk come soon." },
        { id: 2, title: "A New Artists Emerges: Kureno!", author: "allanxaesthetics", date: "8/9/17", content: "Lorem Khaled Ipsum is a major key to success. In life you have to take the trash out, if you have trash in your life, take it out, throw it away, get rid of it, major key. A major key, never panic. Don’t panic, when it gets crazy and rough, don’t panic, stay calm. Life is what you make it, so let’s make it. You see that bamboo behind me though, you see that bamboo? Ain’t nothin’ like bamboo. Bless up. In life there will be road blocks but we will over come it. Hammock talk come soon." }
    ],
    all: function() { return this.blogposts }
};

var redis = require("redis"),
    // client = redis.createClient('redis://:wearethecerealkings@redis-14234.c8.us-east-1-3.ec2.cloud.redislabs.com:14234');
    client = redis.createClient('redis://:wearethecerealkings@redis-17643.c11.us-east-1-3.ec2.cloud.redislabs.com:17643');

client.on('connect', function() {
	console.log('Connected to redis db!');
});

app.get('/api/artist/:id', function(req, res) {
    var id = parseInt(req.params.id);
    res.json(ArtistAPI.get(id));
});

app.get('/api/artists', function(req, res) {
	res.json(ArtistAPI.artists);
});

app.get('/api/blog', function(req, res) {
	res.json(BlogAPI.blogposts);
});

app.get('/', function(req, res) {
	client.get('what', function(err, reply) {
		res.send(reply);
	});
})

app.listen(3001, function() {
	console.log('TMS server listening on port 3001!');
})
