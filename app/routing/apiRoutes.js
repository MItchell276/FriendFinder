// 4. Your `apiRoutes.js` file should contain two routes:

//    * A GET route with the url `/api/friends`. This will be used to display a JSON of all possible friends.
//    * A POST routes `/api/friends`. This will be used to handle incoming survey results. This route will also be used to handle the compatibility logic.

// We are linking our routes to a series of "data" sources.
const friends = require("../data/friends");

// ROUTING

module.exports = function (app) {
    // API GET Requests

    app.get("/api/friends", function (req, res) {
        res.json(friends);
    });

    app.post("/api/friends", function (req, res) {
        // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
        // It will do this by sending out the value "true" have a table
        var bestMatch = {
            name: "",
            photo: "",
            friendDifference: Infinity
        };

        let totalDifference;

        // req.body is available since we're using the body parsing middleware
        // loop thru all friend object

        for (let index = 0; index < friends.length; index++) {
            totalDifference = 0;
            const currentFriend = friends[index];
            // this will loop thru the scores of friends
            for (let j = 0; j < currentFriend.scores.length; j++) {
                totalDifference += Math.abs(parseInt(currentFriend.scores[j]) - parseInt(req.body.scores[j]))
            }
            if (totalDifference <= bestMatch.friendDifference) {
                bestMatch.name = currentFriend.name;
                bestMatch.photo = currentFriend.photo
            }
        }
        friends.push(req.body);
        res.json(bestMatch);


    });

    // ---------------------------------------------------------------------------
    // I added this below code so you could clear out the table while working with the functionality.
    // Don"t worry about it!

    app.post("/api/clear", function (req, res) {
        // Empty out the arrays of data
        friends.length = 0;
        res.json({ ok: true });
    });

}
