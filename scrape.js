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
        const posts =  subReddit.getTop({
            time: this._timeFrame,
            limit: this._numOfSubmissions
        })
        posts.forEach(post => {
        const slimPost = {
            'post_id': post.id,
            'coinValue': 0
        }  
        for (let i = 0;i < post.all_awardings.length; i++) {
            //iterates through each post and calls calulate coin function.
            //add value to slimpost.coinValue object
            slimPost['coinValue'] += calulateCoinValue(post.all_awardings[i].coin_price, post.all_awardings[i].count)
        }
        arrayOfPosts.push(slimPost);
        console.log(arrayOfPosts)
            })
        return arrayOfPosts
    }


    getComments() {
         
        let arrayOfPosts = [
            { post_id: 't4e8o6', coinValue: 1000 },
            { post_id: 't5tc7k', coinValue: 275 }
          ]
        const arrayOfComments = []
        
        
            //arrayOfComments.push(r.getSubmission(post.post_id).comments)
        console.log(r.getSubmission(arrayOfPosts[0].post_id))
        
        //console.log(arrayOfComments)
        
    }
}
    




todayCsCoin = new submissionCoinage('cscareerquestions', 2, 'week');



console.log(
todayCsCoin.getPosts()
)