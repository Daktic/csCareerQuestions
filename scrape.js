const { r } = require('./connection.js');



//create class to create new postGuildTokens object
class submissionCoinage {
    constructor(subreddit, numOfSubmissions, timeFrame) {
        this._subreddit = subreddit;
        this._numOfSubmissions = numOfSubmissions;
        this._timeFrame = timeFrame;
        
    } 

    get subreddit() {
        return this._subreddit;
    }
    get numOfSubmissions() {
        return this._numOfSubmissions;
    }
    get timeFrame() {
        return this._timeFrame;
    }

    

    async getPosts() {
        const arrayOfPosts = [];
        let subreddit = this._subreddit
        const subReddit = r.getSubreddit(subreddit)

        const calulateCoinValue = (coin_price, count) => {
            return coin_price * count
        }
        //get top subreddit by time range, limit number of submissions to retrieve
        await subReddit.getTop({
            time: this._timeFrame,
            limit: this._numOfSubmissions
        }).then((posts) => {
            posts.forEach(post => {
                const slimPost = {
                    'url': post.url,
                    'coinValue': 0
                }  
                for (let i = 0;i < post.all_awardings.length; i++) {
                    //iterates through each post and calls calulate coin function.
                    //add value to slimpost.coinValue object
                    slimPost['coinValue'] += calulateCoinValue(post.all_awardings[i].coin_price, post.all_awardings[i].count)
                }
                arrayOfPosts.push(slimPost);
            })
        //console.log(arrayOfPosts) //should have one object per numOfSubmissions
        return arrayOfPosts
        })
    }
}
    




todayCsCoin = new submissionCoinage('cscareerquestions', 2, 'week');




console.log(
todayCsCoin.getPosts()
)