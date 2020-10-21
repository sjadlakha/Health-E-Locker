const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('bcac08182c7641ecb29f9c8ee826ee37');
const blogsContent = []
newsapi.v2.everything({
    q: 'health',
    language: 'en'

}).then(response => {
    blogsContent.push(response.articles[0])
    blogsContent.push(response.articles[1])
    blogsContent.push(response.articles[2])
    blogsContent.push(response.articles[3])
    blogsContent.push(response.articles[4])
    blogsContent.push(response.articles[5])

    // Article
    // {
    //     source: [Object],
    //     author: null,
    //     title: 'Health Check: Exercise can help fight breast cancer - WFAA',
    //     description: 'Exercise can improve outcomes for women being treated for breast cancer-- the more active a patient was, the more it can reduce their chance of fatality.',
    //     url: 'https://www.youtube.com/watch?v=O7I8RhNoTOo',
    //     urlToImage: 'https://i.ytimg.com/vi/O7I8RhNoTOo/maxresdefault.jpg',
    //     publishedAt: '2020-10-21T12:32:10Z',
    //     content: null
    // }
});
// console.log(blog)

module.exports = blogsContent