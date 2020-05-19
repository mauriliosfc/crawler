const axios = require('axios');
const cheerio = require('cheerio');
const url = "https://g1.globo.com/";

fetchData(url)
    .then((res) => {
        const html = res.data;
        const $ = cheerio.load(html);

        const page = $('.bastian-page div div div div');
        let arr = []

        page.each(function () {
            let title = $(this).find('.feed-post-body-title').text();
            let subtitulo = $(this).find('.feed-post-body-resumo').text();
            let url = $(this).find('.feed-post-body-title').attr('href');
            if (title.length > 0 && arr.length < 3)
                arr.push({ title: title, subtitulo: subtitulo, url: url })
        });
        console.log(arr)
    })

async function fetchData(url) {
    console.log("Crawling data...")

    let response = await axios(url).catch((err) => console.log(err));

    if (response.status !== 200) {
        console.log("Erro ao buscar dados");
        return;
    }
    return response;
}