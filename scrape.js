const { r } = require('./connection.js');



//create class to create new postGuildTokens object
class submissionCoinage {
    constructor(subreddit, numOfSubmissions, timeFrame) {
        this._subreddit = subreddit;
        this._numOfSubmissions = numOfSubmissions;
        this._timeFrame = timeFrame;
        this._postGildTokens = {
            'url': '',
            'coinValue': 0
        }
    } // I want to have a new ob

    get subreddit() {
        return this._subreddit;
    }
    get numOfSubmissions() {
        return this._numOfSubmissions;
    }
    get timeFrame() {
        return this._timeFrame;
    }

    //this will need to be new class and this function wall call that class
    getSubData() {
        let subreddit = this._subreddit
        const subReddit = r.getSubreddit(subreddit)
        //get top subreddit by time range, limit number of submissions to retrieve
        subReddit.getTop({
            time: this._timeFrame,
            limit: this._numOfSubmissions
        }).then((posts) => {
            posts.forEach(post => {
        
                postGildTokens.url = post.url;
                post.all_awardings.forEach(
                    award => {
                        postGildTokens.coinValue += award.coin_price * award.count //counts coinvalue times num times given
                    }
                )
                console.log(postGildTokens);
            })
        });
    }
}



todayCsCoin = new submissionCoinage('cscareerquestions', 1, 'week');

console.log(todayCsCoin.getSubData());

